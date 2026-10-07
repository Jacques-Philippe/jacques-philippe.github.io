---
title: Assets — add Asset Store links for the three packs awaiting Unity review
created: 2026-10-07
blocked-by: [17]
---

## Problem / outcome

Three of the packs added in issue 0017 are submitted to the Unity Asset Store
but not yet reviewed, so their cards ship with itch.io and trailer links only:

- Medieval Environment Pack
- Office Characters Pack
- Warehouse Characters Pack

**Blocked externally on Unity approving each listing.** Packs can be done one
at a time as they are approved.

Done looks like, per approved pack:

- Two `kind: 'store'` links added to its entry in `src/data/assets.ts`, labelled
  "Asset Store · Free" and "Asset Store · Full", placed before the itch.io link
  as on the Office Asset Pack card
- Its `PACKS[pack].cta` in `src/data/meshes.ts` switched from itch.io to the
  free Asset Store listing (only once issue 0018 has landed)
- The pack removed from the content-gap comment at the top of
  `src/data/assets.ts`

## Links

| Pack | Asset Store · Free | Asset Store · Paid |
| --- | --- | --- |
| Medieval Environment Pack | TBD | TBD |
| Office Characters Pack | TBD | TBD |
| Warehouse Characters Pack | TBD | TBD |
