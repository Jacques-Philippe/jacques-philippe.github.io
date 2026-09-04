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
