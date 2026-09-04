---
title: Office Asset Pack — real image, links, and copy
created: 2026-09-04
blocked-by: [9]
---

## Problem / outcome

The **Office Asset Pack** entry in `src/data/assets.ts` was scaffolded as
`coming-soon` with no image and no links (issue 0009 content gap). The pack is
in fact published, with **free and paid variants on both the Unity Asset Store
and itch.io** — four outbound links plus artwork and real feature copy.

Done looks like:

- Thumbnail added to `assets/images/` (e.g. `office-asset-pack.png`) and wired
  through the `thumbnail()` resolver
- All four marketplace URLs added to `links[]`:
  - Unity Asset Store — free (`kind: 'store'`)
  - Unity Asset Store — paid (`kind: 'store'`)
  - itch.io — free (`kind: 'itch'`)
  - itch.io — paid (`kind: 'itch'`)
- Each link carries a `label` that names the marketplace **and** the variant,
  since `kind` alone no longer disambiguates (e.g. "Asset Store · Free",
  "Asset Store · Pro", "itch.io · Free", "itch.io · Pro")
- `blurb` rewritten from placeholder to a real description
- `highlights[]` written from the actual pack contents (prop count, modularity,
  render pipeline support, etc.)
- `status` changed from `coming-soon` to `released`
- The content-gap comment at the top of `src/data/assets.ts` updated — only
  Pedometer's store URL remains outstanding at that point

## Notes

`<ProjectCard>` currently renders every `store` / `itch` link as a filled
primary button. Four filled buttons on one card will look heavy — decide on a
hierarchy as part of this issue: lead with the free variant, group Free vs Pro,
or give the paid variants a secondary (outline) treatment. This is the first
Project with more than one primary link, so whatever pattern lands here sets
the precedent.

⚠️ Content gap: waiting on the four URLs, the thumbnail asset, and feature copy
from Jacques.
