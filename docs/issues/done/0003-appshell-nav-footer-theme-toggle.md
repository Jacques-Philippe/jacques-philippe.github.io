---
title: AppShell — shared nav, footer, theme toggle
created: 2026-09-04
blocked-by: [2]
---

## Problem / outcome

One layout wrapping every route (glossary: **AppShell**).

Done looks like:

- `<AppShell>` with `<slot>` for page content
- Nav: Home / Games / Tools / Assets / About, active-route styling, responsive
  (mobile menu), keyboard accessible
- Footer: contact/social links (email, GitHub, LinkedIn, YouTube — from
  `about.html`)
- Theme toggle control living in the shell, wired to the Theme logic from #2
- Applied to all five routes

## Notes
