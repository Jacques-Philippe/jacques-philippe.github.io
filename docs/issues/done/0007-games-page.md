---
title: Games page
created: 2026-09-04
blocked-by: [3, 4]
---

## Problem / outcome

`/games` rendered from data via `<ProjectGrid>`.

Done looks like:

- `src/data/games.ts`: Gobara and Mushroom Mischief migrated from
  `games.html` (title, blurb, tags, itch link `kind: 'itch'`, thumbnail,
  `status: 'released'`)
- Page header copy preserved ("Projects I've worked on, from prototypes to
  released titles.")
- Existing thumbnails (`gobara2.png`, `mushroom-mischief.png`) reused
- Per-route title/meta

## Notes
