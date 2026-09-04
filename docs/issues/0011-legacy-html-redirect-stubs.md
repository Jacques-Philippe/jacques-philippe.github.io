---
title: Redirect stubs for legacy .html URLs
created: 2026-09-04
blocked-by: [1]
---

## Problem / outcome

Per [ADR-0005](../adr/0005-legacy-html-redirect-stubs.md), keep old inbound
links alive.

Done looks like:

- Build emits `games.html`, `tools.html`, `about.html` in `dist/` (not
  `index.html` — that's the app)
- Each stub: `<meta http-equiv="refresh" content="0; url=/games">`,
  `<link rel="canonical">`, `<script>location.replace(...)</script>`, minimal
  visible "Redirecting…" fallback
- Implemented as static files in `public/` or a tiny Vite plugin — pick the
  simpler one
- Manually verified after deploy that `/(games|tools|about).html` land on the
  right route

## Notes
