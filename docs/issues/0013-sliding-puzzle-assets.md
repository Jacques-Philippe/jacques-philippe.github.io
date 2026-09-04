---
title: Assets — Sliding Puzzle Kit and Sliding Puzzle Factory
created: 2026-09-04
blocked-by: [9]
---

## Problem / outcome

Two more Unity Asset Store packages to add to `src/data/assets.ts`:
**Sliding Puzzle Kit** and **Sliding Puzzle Factory**.

Done looks like:

- Two new `Project` entries in `src/data/assets.ts` (slugs `sliding-puzzle-kit`
  and `sliding-puzzle-factory`), appended after the existing assets
- Thumbnails added to `assets/images/` and wired through the `thumbnail()`
  resolver
- Marketplace links as `kind: 'store'` (Asset Store) and `kind: 'itch'` if
  also on itch.io; each `label`ed with the marketplace and variant where there
  is more than one, per the precedent set in issue 0012
- `blurb` and `highlights[]` written from the real package contents — note how
  the Kit and the Factory differ (one builds the puzzle, the other generates
  content for it?) so the two cards don't read as duplicates
- `tags[]` per package
- `status` set honestly: `released` with a store link, otherwise `coming-soon`
  with no invented URL or date
- Update the content-gap comment at the top of `src/data/assets.ts`

## Links
### Sliding Puzzle Kit
Unity asset store https://assetstore.unity.com/packages/templates/packs/sliding-puzzle-kit-379986

### Sliding Puzzle Factory
Unity asset store https://assetstore.unity.com/packages/tools/game-toolkits/sliding-puzzle-factory-384312

## Notes

Both entries are in `src/data/assets.ts` as `released` with their Asset Store
links, blurbs, and highlights (commit "Add Sliding Puzzle Kit and Sliding
Puzzle Factory"). Neither is on itch.io.

⚠️ Still outstanding: the two thumbnail images. Add
`assets/images/sliding-puzzle-kit.*` and `assets/images/sliding-puzzle-factory.*`,
wire each through `thumbnail()`, and this issue is done. Until then the cards
fall back to the title placeholder panel.
