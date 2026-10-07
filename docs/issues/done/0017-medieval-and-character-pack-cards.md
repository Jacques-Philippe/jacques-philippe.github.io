---
title: Assets — Medieval Environment Pack and the three Characters Packs
created: 2026-10-07
blocked-by: [9]
---

## Problem / outcome

Four more packs exist in the sibling repos and the Assets page does not mention
any of them:

| Pack | Repo (`../unity-project/…`) | Total | Free tier |
| --- | --- | --- | --- |
| Medieval Environment Pack | `medieval-environment-pack` | 114 meshes | 23 meshes |
| Medieval Characters Pack | `medieval-characters-pack` | 23 characters | 5 characters |
| Office Characters Pack | `office-characters-pack` | 16 characters | 4 characters |
| Warehouse Characters Pack | `warehouse-characters-pack` | 17 characters | 4 characters |

Add a card for each to `/assets`, the same way the Office Asset Pack (0012) and
Warehouse Asset Pack (0016) were added. Their models go into the `/meshes`
gallery separately — issue 0018.

Done looks like:

- Four new `Project` entries in `src/data/assets.ts`, appended after
  `warehouse-asset-pack`: `medieval-environment-pack`,
  `medieval-characters-pack`, `office-characters-pack`,
  `warehouse-characters-pack`.
- One thumbnail per pack in `assets/images/`, wired through the `thumbnail()`
  resolver. Source art is each repo's `previews/key_art/paid/` (`card.png` /
  `cover.png`).
- `blurb`, `highlights[]`, and `tags[]` written from each repo's
  `listings/itch-io.md` — see Draft copy. Keep the four cards distinct from
  each other and from the two existing environment-pack cards.
- Marketplace links `label`ed with marketplace and variant, per the 0012 / 0013
  precedent. All four are `status: 'released'` — see Links. No `store` link for
  a pack whose Asset Store listing is still in review.
- Update the content-gap comment at the top of `src/data/assets.ts`.
- `npm run typecheck && npm run build` pass.

## Links

All four packs are published on itch.io (free + paid tiers on one page) and
have a trailer, so every card ships as `released`.

| Pack | itch.io | Asset Store · Free | Asset Store · Paid | Trailer |
| --- | --- | --- | --- | --- |
| Medieval Environment Pack | https://fromqcwithgamedev.itch.io/medieval-environment-pack | TBD | TBD | https://youtu.be/248o-EBbUPg |
| Medieval Characters Pack | https://fromqcwithgamedev.itch.io/medieval-characters-pack-low-poly-rigged-medieval-cast | https://assetstore.unity.com/packages/3d/characters/medieval-characters-pack-lite-411742 | https://assetstore.unity.com/packages/3d/characters/medieval-characters-pack-pro-411746 | https://youtu.be/WOnKgh80-0c |
| Office Characters Pack | https://fromqcwithgamedev.itch.io/office-characters-pack-low-poly-rigged-office-cast | TBD | TBD | https://youtu.be/e7-hCV7xAYc |
| Warehouse Characters Pack | https://fromqcwithgamedev.itch.io/warehouse-characters-pack-low-poly-rigged-warehouse-cast | TBD | TBD | https://youtu.be/hJSyZPEtZHY |

**TBD = submitted to the Unity Asset Store, awaiting review.** Only the
Medieval Characters Pack is listed there so far. Do not add a `kind: 'store'`
link for the other three until their listings are approved — add them in a
follow-up, and record the gap in the `src/data/assets.ts` content-gap comment.

Per card:

- `kind: 'itch'`, label "itch.io · Free & Full" (the 0016 wording)
- `kind: 'store'` ×2 for Medieval Characters only, labels "Asset Store · Free"
  and "Asset Store · Full" (the 0012 wording; the listings are named Lite / Pro)
- `kind: 'video'`, label "Trailer"

Adding the pending Asset Store links is tracked as issue 0019.

## Draft copy

Counts and feature claims below are taken from each repo's
`listings/itch-io.md`. The Warehouse Characters listing is marked there as a
draft written with 1 of 17 characters built — re-check its copy against the
built cast before publishing.

### Medieval Environment Pack

**blurb:** A low-poly medieval world in 114 flat-colour meshes — castle walls
and towers, a royal keep, tavern, chapel, smithy, and market stalls, plus the
props, goods, and nature to fill a walled town and the woods around it.

**highlights[]:**

- 114 meshes: enough for a walled castle town with its keep, market, tavern,
  chapel, smithy, and farm
- Walls snap on a 4 m grid; doorways and gates sized for the Medieval
  Characters Pack cast
- Plain `.fbx` with materials baked in and no texture maps — works in Unity,
  Godot, Unreal, and Blender
- Free 23-mesh hamlet starter tier, or the full 114-mesh collection

**tags[]:** `Unity`, `Low poly`, `3D environment`

### Medieval Characters Pack

**blurb:** A low-poly medieval cast of 23 rigged characters on one shared
Mixamo-compatible skeleton — knights, royalty, villagers, clergy, rogues, and
mages.

**highlights[]:**

- 23 characters on one 25-bone skeleton with Unity Humanoid bone names — one
  animation set drives the whole cast
- Held props (sword, shield, bow, staff, lute…) are separate meshes parented to
  hand bones, so they can be hidden or swapped
- Roughly 1,700–3,300 triangles per character including props
- Free 5-character starter tier (Knight, Archer, Wizard, Farmer, Town Guard),
  or the full cast of 23

**tags[]:** `Unity`, `Low poly`, `Characters`, `Rigged`

### Office Characters Pack

**blurb:** A low-poly office cast of 16 rigged characters on one
Mixamo-compatible skeleton — the people at the desks, the people who run the
place, and the people who keep the building going.

**highlights[]:**

- 16 characters on the same 25-bone Humanoid skeleton as the other Characters
  Packs — casts can share a scene and an animation set
- Made for office, tycoon, simulation, and comedy games
- Plain `.fbx` with materials baked in and no texture maps
- Free 4-character starter tier (Office Worker, Receptionist, Manager,
  Janitor), or the full cast of 16

**tags[]:** `Unity`, `Low poly`, `Characters`, `Rigged`

### Warehouse Characters Pack

**blurb:** A low-poly warehouse cast of 17 rigged characters on one
Mixamo-compatible skeleton — the people on the floor, at the dock doors, and
keeping the site running.

**highlights[]:**

- 17 characters on the same 25-bone Humanoid skeleton as the other Characters
  Packs — casts can share a scene and an animation set
- Made for warehouse, logistics, tycoon, and simulation games
- Plain `.fbx` with materials baked in and no texture maps
- Free 4-character starter tier (Warehouse Worker, Picker, Forklift Operator,
  Supervisor), or the full cast of 17

**tags[]:** `Unity`, `Low poly`, `Characters`, `Rigged`

## Notes

All content is in hand except the three pending Asset Store listings (0019).
Thumbnails still need to be copied in from the pack repos.
