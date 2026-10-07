---
title: Mesh gallery — add the Medieval Environment Pack and the three Characters Packs
created: 2026-10-07
blocked-by: [14, 17]
---

## Problem / outcome

The `/meshes` gallery (issue 0014 / [ADR-0007](../adr/0007-mesh-gallery-viewer.md))
shows Free-tier meshes from the Office Pack and Warehouse Pack only. Add the
Free-tier models of four more packs:

| Pack | Repo (`../unity-project/…`) | Total | Free tier |
| --- | --- | --- | --- |
| Medieval Environment Pack | `medieval-environment-pack` | 114 meshes | 23 meshes |
| Medieval Characters Pack | `medieval-characters-pack` | 23 characters | 5 characters |
| Office Characters Pack | `office-characters-pack` | 16 characters | 4 characters |
| Warehouse Characters Pack | `warehouse-characters-pack` | 17 characters | 4 characters |

**Scope: Free-tier models only in the gallery**, for the reason settled in
0014 — the viewer ships real geometry to the client. That is 36 new entries
(23 + 5 + 4 + 4), taking the gallery from 25 to 61.

Their `/assets` cards are issue 0017, which this depends on for the
marketplace links and so the gallery has a card to sit beside.

Done looks like:

- Extend `PackId` and `PACKS` in `src/data/meshes.ts` with the four packs:
  `label`, `shortLabel`, `glbUrl`, `cta`, and a `lighting` rig matching each
  repo's `DESIGN.md` §8. CTA targets are listed under Pack CTAs.
- One Meshopt `.glb` per pack under `assets/models/`, imported with `?url`,
  plus one ~640 px WebP preview per model in `assets/images/` named
  `<slug>.webp`.
- 36 new `RAW` rows, kept sorted pack-then-alpha, with hand-set display names
  and real triangle counts from each pack's `<pack>.meshes.json`. Slugs stay
  `<pack>-<kebab(node)>` and globally unique.
- Replace the segmented pack control in `MeshGallery.vue` with a native
  `<select>` (labelled "Filter by pack"; options `All packs` + the six packs,
  generated from `PACKS` rather than a hand-kept list). The segmented control
  will not fit six labels on narrow screens. Behaviour is unchanged: single
  select, state reflected in the `?pack=` query, `normalizePack` accepts the
  four new ids. Remove the now-unused `.mesh-gallery__segmented` styles.
- Update `docs/mesh-gallery-refresh.md` to list all six repos, and the header
  comment in `src/data/meshes.ts` (it says "Office Pack and Warehouse Pack"
  and "only 25 rows").
- `npm run typecheck && npm run build` pass; click through `/meshes` for every
  new pack, including a `?mesh=<slug>` deep link per pack.

## Free-tier inventory (from each repo's `kit.json` `tiers.free.assets`)

- **Medieval Environment (23):** `SM_Barrel`, `SM_Bench_Wood`, `SM_Bucket`,
  `SM_Bush`, `SM_Crate`, `SM_Door_Single`, `SM_Fence_Wood_2m`, `SM_Flowers`,
  `SM_Grass_Tuft`, `SM_Hay_Bale`, `SM_House_Small`, `SM_Log`, `SM_Rock_Large`,
  `SM_Rock_Small`, `SM_Sack`, `SM_Signpost`, `SM_Table_Wood`, `SM_Tree_Oak`,
  `SM_Tree_Pine`, `SM_Tree_Stump`, `SM_Wall_Stone_4m`, `SM_Wall_Stone_Pillar`,
  `SM_Well`
- **Medieval Characters (5):** `Archer`, `Farmer`, `Knight`, `TownGuard`,
  `Wizard`
- **Office Characters (4):** `OfficeWorker`, `Receptionist`, `Manager`,
  `Janitor`
- **Warehouse Characters (4):** `WarehouseWorker`, `Picker`,
  `ForkliftOperator`, `Supervisor`

## Work needed outside this repo

- **`medieval-environment-pack` has no `etc/build_web_glb.py`.** The three
  characters packs have one; the environment pack needs it added (port from
  the kit-framework template / a sibling pack) before its `.glb`, manifest, and
  previews can be produced.
- None of the four repos has a `builds/web/` output yet — run the web export in
  each (needs `gltfpack`), then copy artifacts over per
  `docs/mesh-gallery-refresh.md`.

## Risks / things to check

- **Characters are skinned meshes.** Each character is an armature
  (`<Name>_Rig`, 25 bones) with a skinned `<Name>_Body` and held props
  parented to hand/forearm bones. `MeshViewer.vue` currently does
  `packScene.getObjectByName(mesh.node)` and clones that node, which was built
  for static props. Confirm what `build_web_glb.py` emits for a character
  (baked static T-pose vs. skinned + skeleton) and that the gallery `node`
  resolves to something containing the body *and* the props. A skinned node
  needs `SkeletonUtils.clone` rather than `Object3D.clone`, and the
  dispose/swap path must cover it. Baked static T-pose export is the simplest
  route if the script supports it.
- **`SM_` prefix.** Medieval Environment node names carry `SM_`; decide whether
  slugs keep it (`medieval-environment-sm-barrel`) or strip it
  (`medieval-environment-barrel`). Stripping reads better in `?mesh=` URLs;
  either way the preview filename must match the slug.
- **Bundle weight.** Characters run roughly 1,700–3,300 triangles each, and
  `SM_House_Small` / the trees are heavier than most existing props. Check the
  four `.glb` sizes against the existing 44 KB / 102 KB.
- **Framing.** Characters are tall and thin and `SM_House_Small` is much larger
  than a mug — confirm the viewer's auto-framing and the card previews hold up
  at both extremes.

## Pack CTAs

The "get this pack" link in the viewer, per `PACKS[pack].cta`:

| Pack | CTA target |
| --- | --- |
| Medieval Environment Pack | https://fromqcwithgamedev.itch.io/medieval-environment-pack |
| Medieval Characters Pack | https://assetstore.unity.com/packages/3d/characters/medieval-characters-pack-lite-411742 |
| Office Characters Pack | https://fromqcwithgamedev.itch.io/office-characters-pack-low-poly-rigged-office-cast |
| Warehouse Characters Pack | https://fromqcwithgamedev.itch.io/warehouse-characters-pack-low-poly-rigged-warehouse-cast |

Medieval Characters points at its free Asset Store listing, as the Office Pack
does. The other three point at itch.io until their Asset Store listings are
approved (issue 0019).
