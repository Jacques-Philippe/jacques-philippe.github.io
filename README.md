# personal-website

Personal site of Jacques-Philippe Amiot — Vue 3 + Vite, prerendered to static
HTML with `vite-ssg`, hosted on GitHub Pages at `jacques-philippe.github.io`.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # prerender to dist/
npm run preview    # serve dist/
npm run typecheck  # vue-tsc
```

## Deploy

Push to `master`. `.github/workflows/deploy.yml` builds and publishes `dist/`
via GitHub Pages.

**One-time setup:** repo **Settings → Pages → Source → "GitHub Actions"**.

## Docs

- `docs/glossary.md` — domain language
- `docs/adr/` — architecture decisions
- `docs/issues/` — planned work (`docs/issues/done/` = completed)
