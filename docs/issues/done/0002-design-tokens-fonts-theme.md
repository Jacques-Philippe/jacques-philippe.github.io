---
title: Global design-token layer, self-hosted fonts, dark/light theme
created: 2026-09-04
blocked-by: [1]
---

## Problem / outcome

Build the owned style foundation per
[ADR-0002](../adr/0002-hand-built-design-system.md). No Pico, no component
library.

Done looks like:

- Global stylesheet with CSS custom-property tokens: colour (incl. `--accent`
  cyan `#38bdf8`), type scale, spacing scale, radii, shadows, container widths
- Modern reset
- Fonts via `@fontsource`: Space Grotesk (headings), Inter (body),
  `font-display: swap`, preloaded
- `Theme`: `dark` default, `light` toggle; initial value from
  `prefers-color-scheme`, persisted in `localStorage`; tokens redefined per
  theme; no flash of wrong theme on load
- Documented rule: components consume tokens only, never raw colour values

## Notes

- Done 2026-09-04.
- Files: `src/styles/{index,tokens,reset,base}.css`,
  `src/composables/useTheme.ts`, pre-paint theme script in `index.html`,
  font preloads via `useHead` in `App.vue`.
- Used `@fontsource-variable/*` (true variable fonts, weight 300–700 in one
  file) rather than the static `@fontsource/*` the issue named. `font-display:
  swap` is the fontsource default.
- Dark is the base `:root`; light is `:root[data-theme='light']`.
- `beastiesOptions: { preloadFonts: false, fonts: false }` in `vite.config.ts` —
  otherwise beasties auto-injects a preload for every `@font-face` subset
  (cyrillic/greek/vietnamese/…). We preload only the two latin woff2s.
- Theme toggle *UI* is issue 0003; the composable it will call is ready.
