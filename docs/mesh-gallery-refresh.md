# Refreshing the mesh gallery assets

The `/meshes` gallery (issues 0014 and 0018 / [ADR-0007](adr/0007-mesh-gallery-viewer.md))
renders Free-tier meshes from six packs. The geometry, previews, and manifest
here are **artifacts derived from the pack repos** — CI in this repo has no
access to them, so nothing is built here.

Re-run this whenever a Free-tier mesh is added, removed, or renamed in a pack,
or its geometry changes.

| Pack id (`PackId`) | Pack repo (`../unity-project/…`) | `.glb` in `assets/models/` |
| --- | --- | --- |
| `office` | `office-pack` | `office-pack.glb` |
| `warehouse` | `warehouse-pack` | `warehouse-pack.glb` |
| `medieval-environment` | `medieval-environment-pack` | `medieval-environment-pack.glb` |
| `medieval-characters` | `medieval-characters-pack` | `medieval-characters-pack.glb` |
| `office-characters` | `office-characters-pack` | `office-characters-pack.glb` |
| `warehouse-characters` | `warehouse-characters-pack` | `warehouse-characters-pack.glb` |

The `.glb` files load through Vite's asset pipeline via a `?url` import in
`src/data/meshes.ts`, so the built URL is content-hashed and caches bust on
update. Do not move them to `public/`.

## Medieval Environment and the three Characters Packs

These four are exported by `tools/build_pack_web_glb.py` in this repo, from the
pack's already-built Free-tier FBX files. It needs Blender and `gltfpack`
(`npm i -g gltfpack`).

1. **In the pack repo**, run its itch.io build so `builds/itchio_meshes/*.fbx`
   is current (`uv run --no-sync python etc/build_itchio_packages.py`).

2. **From this repo's root**, run the export once per pack:

   ```sh
   blender --background --python tools/build_pack_web_glb.py -- \
     ../unity-project/office-characters-pack office-characters
   ```

   It reads `kit.json` `tiers.free.assets`, writes
   `assets/models/<pack-id>-pack.glb` and one 640×480
   `assets/images/<slug>.webp` per asset, and prints the `RAW` rows (slug, node,
   triangle count). Characters are baked to static rest-pose meshes; the `SM_`
   prefix on Medieval Environment nodes is dropped from the slug but kept in
   `node`.

3. **Update `src/data/meshes.ts`**: reconcile that pack's `RAW` rows against the
   printed ones and set a human display `name` for any new row. Delete the
   `.webp` of any mesh that was removed.

4. `npm run typecheck && npm run build`, then click through `/meshes`.

## Office Pack and Warehouse Pack

These two have their own web export target in the pack repo.

1. **In the pack repo**, run `etc/build_web_glb.py` (needs `gltfpack`). It
   writes `builds/web/<pack>.glb`, `builds/web/<pack>.meshes.json`, and
   `builds/web/previews/*.webp` (all gitignored there).

2. **Copy the `.glb`** to `assets/models/<pack>.glb`.

3. **Copy the previews** into `assets/images/`, renamed to the mesh slug:
   each `builds/web/previews/<Node>.webp` becomes `<pack>-<kebab-node>.webp`
   (e.g. `PalletRack_AddOnBay.webp` → `warehouse-pallet-rack-add-on-bay.webp`
   — match the `slug` column in `src/data/meshes.ts`).

4. **Update `src/data/meshes.ts`**: reconcile the `RAW` array against the pack's
   `<pack>.meshes.json` — `node`, `triangles`, and `preview` filename. Set a
   human display `name` for any new row.

5. `npm run typecheck && npm run build`, then click through `/meshes`.

Either way, keep `RAW` sorted pack-then-alpha; slugs are `<pack-id>-<kebab(node)>`
and must stay globally unique.
