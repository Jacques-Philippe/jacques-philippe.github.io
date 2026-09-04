---
title: Tools page
created: 2026-09-04
blocked-by: [3, 4]
---

## Problem / outcome

`/tools` — general developer software only, per
[ADR-0003](../adr/0003-tools-assets-split.md).

Done looks like:

- `src/data/tools.ts`: datalint and replica-sync migrated from the old
  `tools.html` (repo links `kind: 'repo'`, tags, `highlights[]` from the
  current bullet lists, thumbnails `datalint.png` / `replicasync.png`)
- Pedometer is NOT here — it moves to #9
- Page header reworded for tools (current page is mistitled "Assets")

## Notes
