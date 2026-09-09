# Refreshing the mesh gallery assets

The `/meshes` gallery (issue 0014 / [ADR-0007](adr/0007-mesh-gallery-viewer.md))
renders Free-tier meshes from the Office Pack and Warehouse Pack. The geometry,
previews, and manifest here are **artifacts copied from the pack repos** — CI in
this repo has no access to the pack generators, so nothing is built here.

Re-run this whenever a Free-tier mesh is added, removed, or renamed in either
pack, or its geometry changes.

## Steps

1. **In each pack repo** (`../unity-project/office-pack`,
   `../unity-project/warehouse-pack`), run the web export target
   (`etc/build_web_glb.py` — needs `gltfpack`, `npm i -g gltfpack`). It writes
   `builds/web/<pack>.glb`, `builds/web/<pack>.meshes.json`, and
   `builds/web/previews/*.webp` (all gitignored there).

2. **Copy the `.glb` files** into `assets/models/`:
   - `office-pack/builds/web/office-pack.glb` → `assets/models/office-pack.glb`
   - `warehouse-pack/builds/web/warehouse-pack.glb` → `assets/models/warehouse-pack.glb`

   They load through Vite's asset pipeline via a `?url` import in
   `src/data/meshes.ts`, so the built URL is content-hashed and caches bust on
   update. Do not move them to `public/`.

3. **Copy the previews** into `assets/images/`, renamed to the mesh slug:
   each `builds/web/previews/<Node>.webp` becomes `<pack>-<kebab-node>.webp`
   (e.g. `PalletRack_AddOnBay.webp` → `warehouse-pack-rack-add-on-bay.webp`
   — match the `slug` column in `src/data/meshes.ts`).

4. **Update `src/data/meshes.ts`**: reconcile the `RAW` array against each
   pack's `<pack>.meshes.json` — `node`, `triangles`, and `preview` filename.
   Keep it sorted pack-then-alpha. Set a human display `name` for any new row.
   Slugs are `<pack>-<kebab(node)>` and must stay globally unique.

5. `npm run typecheck && npm run build`, then click through `/meshes`.
