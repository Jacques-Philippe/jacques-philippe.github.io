# The mesh gallery shows Free-tier meshes only, in a modal Three.js viewer

The `/meshes` route (issue 0014) lets a visitor browse the procedurally
generated meshes from the Office Pack and Warehouse Pack and inspect any one of
them in an interactive 3D scene. This ADR records the decisions that shape it;
the interaction details live in the issue.

## Free-tier meshes only

Only the assets listed in each pack repo's `kit.json` `tiers.free.assets` are
published. Paid-tier meshes are excluded on purpose. A static site has to send
the real geometry to every visitor's browser to render it, so anything the
viewer shows is effectively extractable (devtools, `THREE.GLTFExporter`).
Decimating the paid meshes enough to devalue a rip would also visibly wreck the
silhouettes and facet shading that a single-object viewer puts under a
magnifying glass — for low-poly hard-surface models the topology essentially
*is* the product, so there is no fidelity level that both showcases well and
protects. The free meshes carry no such risk. If the paid packs ever warrant a
showcase it is a separate decision — a fixed-angle turntable video, not a live
viewer.

## `.glb` + Meshopt, bundled one file per pack, committed

Each pack repo gains a web export target that emits a single `.glb` (glTF 2.0
binary) per pack, containing every Free-tier mesh as a named node, compressed
and quantized with `gltfpack -cc` (Meshopt). glTF is Three.js's native format;
Meshopt gives Draco-class size with a ~10 KB shared decoder and much faster
decode. These meshes compress hard — low-poly, no textures or UVs, just the
flat `kit.json` material palette as PBR factors — so a whole pack lands well
under 300 KB. Two small files are committed under `assets/` (loaded through
Vite's asset pipeline with a `?url` import, like the card thumbnails, so a pack
update content-hashes the URL — not `public/`, which would leave a stale `.glb`
in caches) alongside a generated manifest (`src/data/meshes.ts`); no CDN, no
separate assets branch, nowhere near GitHub Pages limits. The export runs in the pack repos and its
output is copied here manually, the same way `assets.ts` marketing copy is
sourced today — CI here has no access to the pack repos, and even if it did,
building the `.glb` runs the asset *generators*, which are the paid tier's
source, so a public-site build must never touch them.

Committing the artifact to this public repo is safe: the `.glb` holds Free-tier
geometry only (the export filters to `kit.json` `tiers.free.assets`), byte-for-byte
what the live viewer already ships to every visitor's browser. The paid meshes'
geometry is never in the bundle, their names never reach `src/data/meshes.ts`,
and their generator source never leaves the private pack repos. Card thumbnails
are committed as ~640 px WebP (the pack export downscales them), not the ~1–2 MB
Blender renders, which stay in the pack repos.

## A modal viewer, not a route; one persistent WebGL context

Selecting a mesh opens an in-page modal, not a `/meshes/:slug` route. The
router forces `scrollBehavior: top:0` on every navigation, so a route would
lose the visitor's place in the grid on every close; a modal keeps grid scroll
and filter state for free and sidesteps SSG route enumeration. The open mesh is
still deep-linkable through a `?mesh=<slug>` query param, and browser Back
closes the viewer in one step — prev/next navigation uses history `replace`,
not push. One `WebGLRenderer` is created on first open and kept for the page
lifetime; switching mesh disposes the old geometry and swaps in the next node
from the already-loaded pack `.glb`.

Mesh slugs are flat and globally unique across packs (`warehouse-sink`,
`office-sink`) because the two packs share many mesh names. On a deep-link that
carries both filters and a `?mesh=` outside that filtered set, the mesh wins.

## No category filter in v1

The Free tier is ~25 meshes total (10 Office, 15 Warehouse). A segmented pack
control (`All · Office Pack · Warehouse Pack`) and a name search make that
navigable on their own; a category axis over 25 items yields either ~4 vague
buckets or ~8 buckets of ~3 that barely filter. So v1 has no category filter,
no category badge, and no `category` field in the manifest — nothing to keep in
sync with a taxonomy that doesn't exist. It is reconstructable later from the
`.glb` node names and each pack's `previews/` layout (Warehouse's Blender
sources are already foldered by area) if the catalogue ever grows enough to
need it.

## Consequences

- The gallery component tree is client-only past the initial grid: `three` is
  dynamically imported on `/meshes` only (per ADR-0004), and the viewer must
  not execute during the `vite-ssg` prerender.
- Every mesh needs a static preview PNG for its card and as the viewer's
  loading/fallback backdrop; Free-tier meshes with no `previews/*.png` in the
  pack repo need a render pass there.
- Adding or renaming a Free-tier mesh in either pack is a three-step manual
  sync: re-run the pack's web export, copy the `.glb` here, regenerate the
  manifest.
- Paid-tier meshes have no representation on the site beyond the existing
  marketplace links on the Assets page.
