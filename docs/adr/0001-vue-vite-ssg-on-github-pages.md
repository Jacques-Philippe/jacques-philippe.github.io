# Vue 3 + Vue Router + vite-ssg, prerendered for GitHub Pages

The site moves from hand-written static HTML files to a Vue 3 application built
with Vite. Routing is client-side via Vue Router (`/`, `/games`, `/tools`,
`/assets`, `/about`), and `vite-ssg` prerenders every route to static HTML at
build time.

We chose prerendering over a plain client-rendered SPA because a portfolio must
serve real HTML to crawlers and recruiters and load instantly, and over Nuxt
because a five-page site does not justify Nuxt's footprint. GitHub Pages remains
the host (`jacques-philippe.github.io`, no custom domain); deployment is a GitHub
Actions workflow running `vite build` and publishing `dist/` via
`actions/deploy-pages`, with Pages source set to "GitHub Actions". Vite `base`
is `/` (user-pages repo served from root).

## Consequences

- A `package.json`, lockfile, and CI workflow now exist and must be maintained.
- Deploys take ~40s of CI rather than an instant push.
- Any code touching `window`/WebGL must be guarded for the SSG build (see
  ADR-0004).
- The repo must be named `jacques-philippe.github.io` (matching the account) to
  publish at the domain root with `base: '/'`. It was originally
  `jacquespamiot.github.io`, which GitHub served as a project site under
  `/jacquespamiot.github.io/` and broke every absolute asset URL.
