# Hand-built design system instead of a component library

The visual refresh is built from an owned layer of CSS tokens (colour, type
scale, spacing, radius) plus Vue scoped styles per component. We are not using
Pico.css (the current framework), and not adopting a Vue component library
(PrimeVue, Vuetify) or a utility framework.

A reader might expect a small site to lean on a component library for speed. We
chose not to because the goal is a distinctive, personal look, and generic
component libraries re-template the site toward their own identity — which is
exactly what makes the current Pico-based site feel like a template. The card
list is the only real repeated UI; a shared `<ProjectCard>` plus tokens covers
it. Typography (Space Grotesk headings + Inter body, self-hosted via
`@fontsource`) is treated as a core part of the system, not an afterthought.
