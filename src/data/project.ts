/*
 * The Project model — the shared content primitive behind Games, Tools, and
 * Assets. One shape, one card component; visual variation is driven by this
 * data (tags, link kinds, highlights, status), never by separate components.
 * See docs/glossary.md and docs/adr/0003.
 */

export type LinkKind = 'store' | 'repo' | 'itch' | 'video' | 'web'

/** A typed outbound reference rendered as its own affordance on the card. */
export interface Link {
  kind: LinkKind
  url: string
  /** Overrides the default label for the kind. */
  label?: string
}

/** Lifecycle marker driving card presentation. */
export type Status = 'released' | 'wip' | 'coming-soon'

export interface Project {
  /** URL-safe id, unique within its category. Used as the list key. */
  slug: string
  title: string
  /** One or two sentences of plain-language summary. */
  blurb: string
  /** Filename under assets/images — resolved via {@link thumbnail}. */
  thumbnail: string
  tags: string[]
  links: Link[]
  status: Status
  /** Short feature bullets, shown for tools and assets. */
  highlights?: string[]
}
