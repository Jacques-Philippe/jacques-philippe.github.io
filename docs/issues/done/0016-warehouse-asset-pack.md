---
title: Assets — Warehouse Asset Pack
created: 2026-09-10
blocked-by: [9]
---

## Problem / outcome

A new asset package to add to `src/data/assets.ts`: the **Warehouse Asset
Pack** — a low-poly warehouse and logistics collection, 147 flat-colour props
in a cozy/bright style rather than industrial-harsh. Free tier (15 essential
props) and a paid tier ($5+ for the full 147). Ships as engine-agnostic `.fbx`
with baked materials; works with Unity, Godot, Unreal, and Blender.

Prop categories: storage & racking, dock/receiving, packing, material-handling
equipment, maintenance bay, cold storage, hazmat storage, lighting, markings &
signage, restroom & staff welfare, break room & kitchenette.

Done looks like:

- A new `Project` entry in `src/data/assets.ts` (slug `warehouse-asset-pack`),
  appended after the existing assets
- Thumbnail `assets/images/warehouse-thumbnail.png` (already added — a warehouse
  aisle between pallet racks) wired through the `thumbnail()` resolver
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

- itch.io (`kind: 'itch'`) — free + paid tiers, one page:
  `https://fromqcwithgamedev.itch.io/warehouse-pack-low-poly-warehouse-logistics-collection`
- Trailer (`kind: 'video'`) — `https://youtu.be/4b0AskV1DXw`, label "Trailer"

Not on the Unity Asset Store yet — no `kind: 'store'` link. Card carries the
itch.io button plus the trailer link.

## Draft copy

**blurb:** A low-poly warehouse and logistics pack — 147 flat-colour
props covering pallet racking, loading docks, packing stations, forklifts and
pallet jacks, plus the staff-room and signage details to finish the scene.

**highlights[]:**

- 147 modular props across storage, receiving, packing, material handling, cold
  and hazmat storage, lighting, signage, and staff areas
- Cozy, bright flat-colour style rather than industrial-harsh
- 50–6,000 triangles per prop, with contact-point pivots and grid-modular parts
  for fast placement — built for real-time, mobile, and VR
- Free 15-prop starter tier, or the full 147-prop collection

**tags[]:** `Unity`, `Low poly`, `3D environment`

**status:** `released` (published on itch.io).

## Notes

All content is in hand — thumbnail, links, and copy. No open content gap.
