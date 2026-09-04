# HeroCanvas is a lazy-loaded fragment shader, homepage only

The homepage Hero sits in front of a single Three.js surface (`HeroCanvas`)
rendering a full-screen fragment shader — an animated cyan noise-gradient driven
by the `Accent` token. No geometry, no 3D models. It appears on the homepage
only, not site-wide.

A full-screen shader on one quad is the cheapest way to get a "slick" animated
background: it scales to any resolution, has no asset-sourcing cost, and has a
trivial reduced-motion fallback (render one static frame). Three.js (~150KB gz)
is dynamically imported so it never loads on other routes.

## Consequences

- `HeroCanvas` is client-only: it must not execute during the `vite-ssg`
  prerender (guard on `onMounted` / dynamic import).
- Fallbacks required: static single frame under `prefers-reduced-motion`; a CSS
  gradient when WebGL is unavailable.
- The render loop pauses when the canvas is offscreen or the tab is hidden.
