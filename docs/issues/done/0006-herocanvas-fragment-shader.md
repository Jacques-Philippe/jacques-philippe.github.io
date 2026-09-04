---
title: HeroCanvas — lazy Three.js fragment-shader background
created: 2026-09-04
blocked-by: [5]
---

## Problem / outcome

Implement `<HeroCanvas>` per
[ADR-0004](../adr/0004-hero-canvas-fragment-shader.md).

Done looks like:

- Full-screen fragment shader: animated cyan noise-gradient driven by `--accent`
- `three` loaded via dynamic `import()`; never in the bundle for other routes
- Client-only: no execution during the vite-ssg prerender
- `prefers-reduced-motion`: render a single static frame, no RAF loop
- No WebGL / context-creation failure: fall back to the CSS gradient from #5
- Render loop pauses when canvas is offscreen (IntersectionObserver) or tab
  hidden (visibilitychange)
- Resizes correctly with the viewport / devicePixelRatio cap

## Notes
