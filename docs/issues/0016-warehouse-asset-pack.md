---
title: Assets — Warehouse Asset Pack
created: 2026-09-10
blocked-by: [9]
---

## Problem / outcome

A new Unity Asset Store package to add to `src/data/assets.ts`: the
**Warehouse Asset Pack** — a low-poly warehouse / industrial storage
environment pack (shelving, pallets, crates, forklifts, loading-dock props,
etc.).

Done looks like:

- A new `Project` entry in `src/data/assets.ts` (slug `warehouse-asset-pack`),
  appended after the existing assets
- Thumbnail added to `assets/images/` (e.g. `warehouse-asset-pack.png`) and
  wired through the `thumbnail()` resolver
- Marketplace links: `kind: 'store'` for the Unity Asset Store, `kind: 'itch'`
  if also on itch.io; each `label`ed with the marketplace and variant where
  there is more than one, per the precedent set in issues 0012 and 0013
- `blurb` and `highlights[]` written from the real package contents (prop
  inventory, modularity, render pipeline support) — keep it distinct from the
  Office Asset Pack card
- `tags[]` for the package (e.g. `Unity`, `Low poly`, `3D environment`)
- `status` set honestly: `released` with a store link, otherwise `coming-soon`
  with no invented URL or date
- Update the content-gap comment at the top of `src/data/assets.ts`

## Links

_TBD — Unity Asset Store URL (and itch.io URL if applicable) from Jacques._

## Notes

⚠️ Content gap: waiting on the store URL(s), the thumbnail asset, and feature
copy from Jacques.
