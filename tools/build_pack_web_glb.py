"""Builds one pack's mesh-gallery artifacts from its already-built Free-tier FBX files.

Run inside Blender, from this repo's root:

    blender --background --python tools/build_pack_web_glb.py -- <pack-repo> <pack-id>

e.g. `-- ../unity-project/office-characters-pack office-characters`. Requires `gltfpack`
on PATH (`npm i -g gltfpack`). Full refresh steps: docs/mesh-gallery-refresh.md.

Reads `<pack-repo>/kit.json` `tiers.free.assets` and imports `<Asset>.fbx` for each from
`<pack-repo>/builds/itchio_meshes/` (the loose, materials-baked-in meshes the itch.io build
produces). It never runs a pack's generators and never reads a Paid-tier file — see
docs/adr/0007 for why the gallery is Free-tier only.

Writes, into this repo:

    assets/models/<pack-id>-pack.glb    every Free asset as one named node, Meshopt-compressed
    assets/images/<slug>.webp           one 640x480 card preview per asset

and prints the `RAW` rows for src/data/meshes.ts (slug, node, triangles).

Rigged characters are baked to static meshes in their rest (T) pose: the armature is
dropped and bone-parented props are joined into the body, so the viewer can treat every
asset as a plain static node.
"""

import json
import math
import re
import shutil
import subprocess
import sys
from pathlib import Path

import bpy
from mathutils import Vector

SITE_ROOT = Path(__file__).resolve().parent.parent
MODELS_DIR = SITE_ROOT / "assets" / "models"
IMAGES_DIR = SITE_ROOT / "assets" / "images"

# -cc      Meshopt-compressed .glb
# -vp 12   quantize vertex positions to 12 bits
# -vn 8    quantize vertex normals to 8 bits
# -kn      keep the per-asset node names — the viewer and the manifest key on them
GLTFPACK_ARGS = ["-cc", "-vp", "12", "-vn", "8", "-kn"]

PREVIEW_SIZE = (640, 480)  # 4:3, the MeshCard image box
CAMERA_FOV = math.radians(30)
# Same three-quarter view the viewer opens on (its camera sits at (0.7, 0.55, 1) in
# glTF's Y-up space, which is (0.7, -1, 0.55) in Blender's Z-up space).
CAMERA_DIR = Vector((0.7, -1.0, 0.55)).normalized()
BACKGROUND = (0.216, 0.216, 0.216, 1.0)  # linear; ~50% grey in sRGB


def slug_for(pack_id: str, node: str) -> str:
    """`<pack>-<kebab(node)>`, minus the static-mesh `SM_` prefix some packs use."""
    name = re.sub(r"^SM_", "", node)
    name = re.sub(r"([a-z0-9])([A-Z])", r"\1-\2", name)
    name = re.sub(r"([A-Z]+)([A-Z][a-z])", r"\1-\2", name)
    return f"{pack_id}-{name.replace('_', '-').lower()}"


def import_asset(fbx: Path, node: str) -> bpy.types.Object:
    """Imports one FBX and collapses it to a single static mesh object named `node`."""
    before = set(bpy.data.objects)
    bpy.ops.import_scene.fbx(filepath=str(fbx), use_anim=False)
    imported = [o for o in bpy.data.objects if o not in before]
    bpy.context.view_layer.update()

    meshes = [o for o in imported if o.type == "MESH"]
    if not meshes:
        raise RuntimeError(f"{fbx.name} contains no mesh")

    # Detach from the armature / bones, keeping the rest-pose world transform.
    for obj in meshes:
        world = obj.matrix_world.copy()
        for mod in list(obj.modifiers):
            if mod.type == "ARMATURE":
                obj.modifiers.remove(mod)
        obj.vertex_groups.clear()
        obj.parent = None
        obj.matrix_world = world

    for obj in imported:
        if obj.type != "MESH":
            bpy.data.objects.remove(obj, do_unlink=True)

    bpy.ops.object.select_all(action="DESELECT")
    for obj in meshes:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = meshes[0]
    if len(meshes) > 1:
        bpy.ops.object.join()
    merged = bpy.context.view_layer.objects.active
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    merged.name = node
    merged.data.name = node
    return merged


def triangle_count(obj: bpy.types.Object) -> int:
    obj.data.calc_loop_triangles()
    return len(obj.data.loop_triangles)


def setup_render() -> bpy.types.Object:
    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE"
    scene.render.resolution_x, scene.render.resolution_y = PREVIEW_SIZE
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "WEBP"
    scene.render.image_settings.quality = 85
    scene.render.film_transparent = False
    scene.view_settings.view_transform = "Standard"  # keep the flat colours true

    world = bpy.data.worlds.new("Preview")
    world.use_nodes = True
    bg = world.node_tree.nodes["Background"]
    bg.inputs["Color"].default_value = BACKGROUND
    bg.inputs["Strength"].default_value = 1.0
    scene.world = world

    for name, energy, rotation in (
        ("Key", 3.0, (math.radians(50), 0.0, math.radians(35))),
        ("Fill", 1.0, (math.radians(65), 0.0, math.radians(-120))),
    ):
        light = bpy.data.lights.new(name, "SUN")
        light.energy = energy
        light.angle = math.radians(10)
        obj = bpy.data.objects.new(name, light)
        obj.rotation_euler = rotation
        scene.collection.objects.link(obj)

    cam = bpy.data.objects.new("PreviewCamera", bpy.data.cameras.new("PreviewCamera"))
    cam.data.sensor_fit = "HORIZONTAL"
    cam.data.angle = CAMERA_FOV
    scene.collection.objects.link(cam)
    scene.camera = cam
    return cam


def frame(cam: bpy.types.Object, obj: bpy.types.Object) -> None:
    """Points the camera at `obj` from CAMERA_DIR, just far enough back to fit its bounds."""
    corners = [obj.matrix_world @ Vector(c) for c in obj.bound_box]
    center = sum(corners, Vector()) / 8
    rotation = CAMERA_DIR.to_track_quat("Z", "Y")  # camera looks down its own -Z
    right = rotation @ Vector((1, 0, 0))
    up = rotation @ Vector((0, 1, 0))

    tan_h = math.tan(CAMERA_FOV / 2)
    tan_v = tan_h * PREVIEW_SIZE[1] / PREVIEW_SIZE[0]
    dist = 0.0
    for corner in corners:
        rel = corner - center
        dist = max(
            dist,
            rel.dot(CAMERA_DIR) + abs(rel.dot(right)) / tan_h,
            rel.dot(CAMERA_DIR) + abs(rel.dot(up)) / tan_v,
        )
    dist *= 1.15

    cam.rotation_mode = "QUATERNION"
    cam.rotation_quaternion = rotation
    cam.location = center + CAMERA_DIR * dist
    cam.data.clip_start = dist / 100
    cam.data.clip_end = dist * 10


def main() -> int:
    argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    if len(argv) != 2:
        print(__doc__, file=sys.stderr)
        return 1
    pack_repo, pack_id = Path(argv[0]).resolve(), argv[1]

    gltfpack = shutil.which("gltfpack")
    if not gltfpack:
        print("gltfpack not found on PATH (npm i -g gltfpack).", file=sys.stderr)
        return 1

    free_assets = json.loads((pack_repo / "kit.json").read_text())["tiers"]["free"]["assets"]
    fbx_dir = pack_repo / "builds" / "itchio_meshes"
    missing = [a for a in free_assets if not (fbx_dir / f"{a}.fbx").is_file()]
    if missing:
        print(f"Missing in {fbx_dir}: {', '.join(missing)}", file=sys.stderr)
        return 1

    bpy.ops.wm.read_factory_settings(use_empty=True)
    assets = [(node, import_asset(fbx_dir / f"{node}.fbx", node)) for node in free_assets]

    cam = setup_render()
    rows = []
    for node, obj in assets:
        for _, other in assets:
            other.hide_render = other is not obj
        frame(cam, obj)
        slug = slug_for(pack_id, node)
        bpy.context.scene.render.filepath = str(IMAGES_DIR / f"{slug}.webp")
        bpy.ops.render.render(write_still=True)
        rows.append({"slug": slug, "node": node, "triangles": triangle_count(obj)})

    raw = MODELS_DIR / f"{pack_id}-pack.raw.glb"
    packed = MODELS_DIR / f"{pack_id}-pack.glb"
    bpy.ops.object.select_all(action="DESELECT")
    for _, obj in assets:
        obj.select_set(True)
    bpy.ops.export_scene.gltf(
        filepath=str(raw),
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_texcoords=False,
        export_animations=False,
        export_skins=False,
        export_yup=True,
    )
    subprocess.run([gltfpack, "-i", str(raw), "-o", str(packed), *GLTFPACK_ARGS], check=True)
    raw.unlink()

    print(f"\nWrote {packed} ({packed.stat().st_size / 1024:.0f} KB) and {len(rows)} previews.")
    print("RAW rows for src/data/meshes.ts (set a display `name` for each):\n")
    for row in sorted(rows, key=lambda r: r["slug"]):
        print(
            f"  {{ slug: '{row['slug']}', name: '', pack: '{pack_id}', "
            f"node: '{row['node']}', triangles: {row['triangles']} }},"
        )
    return 0


if __name__ == "__main__":
    code = main()
    if code:
        sys.exit(code)
