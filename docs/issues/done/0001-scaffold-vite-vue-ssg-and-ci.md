---
title: Scaffold Vite + Vue 3 + Router + vite-ssg, and the Pages deploy workflow
created: 2026-09-04
---

## Problem / outcome

The repo is hand-written static HTML. Stand up the app skeleton per
[ADR-0001](../adr/0001-vue-vite-ssg-on-github-pages.md).

Done looks like:

- `package.json` with Vite, `vue`, `vue-router`, `vite-ssg`; `npm` lockfile
- `vite.config` with `base: '/'` and vite-ssg wired
- Vue Router with routes `/`, `/games`, `/tools`, `/assets`, `/about` and
  placeholder route components
- `npm run build` produces prerendered HTML per route in `dist/`
- `.github/workflows/deploy.yml`: Node 20, `npm ci`, `vite build`,
  `actions/upload-pages-artifact` + `actions/deploy-pages`, triggered on push
  to `master`
- README notes the one manual step: repo Settings → Pages → Source → "GitHub
  Actions"
- `.gitignore` covers `node_modules`, `dist`, `.DS_Store`; existing committed
  `.DS_Store` files removed

## Notes

- Done 2026-09-04.
- `typescript` pinned to `~5.9.3`: `vue-tsc` 3.x is not yet compatible with the
  TypeScript 7 native port (`ERR_PACKAGE_PATH_NOT_EXPORTED` on `lib/tsc`).
- vite-ssg renders routes to `dist/games.html`, `tools.html`, `about.html` —
  the same paths as the old pages. Legacy inbound links therefore already land
  on the new pages; the stale root `about.html` / `games.html` / `tools.html`
  source files were removed (they also shadowed the SPA routes in dev). This
  narrows the scope of #0011 to canonical-URL handling.
- `@types/node` added; `dist/` and `.vite-ssg-temp/` gitignored.
