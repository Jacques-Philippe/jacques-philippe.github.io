---
title: Assets page (Unity Asset Store)
created: 2026-09-04
blocked-by: [3, 4]
---

## Problem / outcome

New `/assets` route per [ADR-0003](../adr/0003-tools-assets-split.md) — Unity
Asset Store packages for Unity developers.

Done looks like:

- `src/data/assets.ts` with two entries: **Pedometer** and the **Office asset
  pack**
- Real Asset Store URLs wired as `kind: 'store'` links
- `highlights[]` written from real feature descriptions (the current
  `tools.html` Pedometer bullets are placeholders — replace, don't migrate)
- Pedometer's YouTube playlist kept as a secondary `kind: 'video'` link if
  desired
- `status` set honestly per asset; `coming-soon` state used for anything not
  yet published
- Page header: "Unity Asset Store packages I've developed."

## Notes

⚠️ Content gap: waiting on the two Asset Store URLs and real feature copy from
Jacques. Scaffold with `coming-soon` placeholders until provided.
