# Glossary — personal-website

The personal website of Jacques-Philippe Amiot (FromQCWithGameDev), a Unity
developer. A static portfolio site hosted on GitHub Pages at
`jacquespamiot.github.io`.

## Language

**Project**:
Any single portfolio entry rendered as a card — a game, a tool, or an asset.
One shared shape: `{ slug, title, blurb, thumbnail, tags[], links[], status,
highlights? }`. Backed by a typed data file per category.
_Avoid_: entry, item, work, portfolio piece.

**ProjectCard**:
The single Vue component that renders a Project. Visual variation between
categories is driven by the Project's data (tags, link kinds, highlights), not
by separate components.
_Avoid_: card component (per type), GameCard/ToolCard/AssetCard.

**Game**:
A Project that is a playable title or prototype, typically linking to itch.io.
Lives in `src/data/games.ts`.

**Tool**:
A Project that is general-purpose developer software, typically open-source and
linking to a GitHub repo (e.g. datalint, replica-sync). Distinct from an Asset.
Lives in `src/data/tools.ts`.
_Avoid_: utility, library (when referring to the portfolio category).

**Asset**:
A Project that is a Unity Asset Store package aimed at Unity developers (e.g.
Pedometer, the Office asset pack). A commercial/marketplace artifact, not a
general dev tool. Lives in `src/data/assets.ts`.
_Avoid_: plugin, package, Unity tool.

**Link**:
A typed outbound reference on a Project: `{ kind, url, label? }` where `kind` is
one of `store` (Asset Store), `repo` (GitHub), `itch`, `video` (YouTube), `web`.
The card renders each kind with its own affordance.

**Status**:
A Project's lifecycle marker used to drive card presentation: `released`,
`wip`, or `coming-soon`. Enables an honest "more coming" state without
fabricating cards.

**Hero**:
The homepage's top region: the intro copy sitting in front of the HeroCanvas.

**HeroCanvas**:
The single Three.js surface behind the Hero — a full-screen fragment shader
rendering an animated cyan noise-gradient. Homepage only. Lazy-loaded,
client-only, with static-frame and CSS-gradient fallbacks.
_Avoid_: background, WebGL widget, animation.

**AppShell**:
The shared layout wrapping every route: navigation, footer, and the theme
toggle.

**Theme**:
The site's colour mode — `dark` (default) or `light` — initialised from
`prefers-color-scheme`, toggled by the user, persisted in `localStorage`.

**Accent**:
The single brand colour (cyan, `#38bdf8`) exposed as a design token. Drives
both UI accents and the HeroCanvas shader palette.

**Token**:
A CSS custom property in the global style layer (colour, type scale, spacing,
radius). The source of the "slick" refresh; components consume tokens only.

**Issue**:
A unit of planned work, one Markdown file under `docs/issues/`. Named
`NNNN-slug.md` with a stable sequential number. An open issue lives directly in
`docs/issues/`; a finished one is `git mv`d into `docs/issues/done/` keeping its
number. Location is the only status signal — there is no index file and no
status frontmatter.
_Avoid_: ticket, task, story, card.

**Redirect stub**:
A minimal generated `.html` file at a legacy path (`games.html`, `tools.html`,
`about.html`) that forwards to the new clean route. Preserves inbound links
from itch.io, YouTube, and LinkedIn.
