---
title: Mesh gallery — Office Pack cards are grey clay renders
created: 2026-09-09
blocked-by: [14]
---

## Problem / outcome

The mesh gallery (issue 0014) shipped with the Office Pack card thumbnails as
flat grey clay renders — `assets/images/office-*.webp`. They come from
`office-pack/builds/web/previews/*.webp`, which the pack's web export produces by
**downscaling `previews/*.png`** — and those PNGs are rendered from a
materialless FBX reimport, so every one is a single grey. Next to the Warehouse
Pack cards (rendered coloured, from the in-Blender generator build) the Office
cards look broken.

The `.glb` geometry and materials are fine — `office-pack.glb` is built straight
from the generators, so it carries the real (if deliberately restrained) Office
palette. Only the **previews** are wrong. The in-viewer 3D render is correct.

Fixed upstream in `office-pack/plan/m11-web-preview-materials.md`:

- the Office web export renders coloured previews from the generator build (§8
  rig), like Warehouse does;
- a palette audit of the 10 Free meshes, plus two judgement calls (lit vs. dark
  screens on Monitor/Laptop; a flat accent on the Desk/Wall pictures) — those
  may also change `office-pack.glb`.

Done looks like:

- [ ] Re-copy `office-pack/builds/web/office-pack.glb` → `assets/models/` and
      `builds/web/previews/*.webp` → `assets/images/office-*.webp` once m11 lands
      (per `docs/mesh-gallery-refresh.md`).
- [ ] If m11's palette work renamed or added Free-tier meshes/materials,
      reconcile `src/data/meshes.ts` (`node`, `triangles`, `preview`).
- [ ] Spot-check every Office card + viewer against the refreshed assets.

## Notes

- No code change in this repo is expected — this is an asset refresh. The viewer
  already renders the Office materials correctly (PBR Neutral tone mapping + IBL,
  commits after 0014).
- Warehouse Pack cards are unaffected.
- If m11 decides the restrained Office palette is correct as-is (very possible —
  DESIGN.md §6 is an "all white/grey/chrome office" by design), this issue still
  closes on the coloured-preview refresh alone.
