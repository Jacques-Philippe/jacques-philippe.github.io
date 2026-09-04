---
title: Project data model, ProjectCard, ProjectGrid
created: 2026-09-04
blocked-by: [2]
---

## Problem / outcome

The shared content primitive behind Games, Tools, and Assets (glossary:
**Project**, **ProjectCard**, **Link**, **Status**).

Done looks like:

- `Project` type: `{ slug, title, blurb, thumbnail, tags[], links[], status,
  highlights? }`
- `Link` type: `{ kind: 'store'|'repo'|'itch'|'video'|'web', url, label? }`
- `Status`: `'released'|'wip'|'coming-soon'`
- `<ProjectCard>`: renders one Project; visual variation driven by data (tags,
  link kinds, highlights, status badge). One component, not three.
- `<ProjectGrid>`: responsive grid of cards
- Thumbnails resolved through the Vite asset pipeline
- `coming-soon` renders a distinct, honest placeholder state

## Notes
