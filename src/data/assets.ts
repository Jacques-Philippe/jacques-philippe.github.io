import type { Project } from './project'
import { thumbnail } from './thumbnails'

/*
 * Unity Asset Store packages (see docs/adr/0003).
 *
 * Content gap: Pedometer's store URL and finished feature copy are still
 * pending, so it stays `coming-soon` — do not invent a store link or a
 * release date. The Sliding Puzzle Kit / Factory entries are live but still
 * missing their thumbnail art (issue 0013) — the card falls back to a
 * placeholder panel until it lands.
 */
export const assets: Project[] = [
  {
    slug: 'pedometer',
    title: 'Pedometer',
    blurb:
      'A Unity plugin that surfaces the device pedometer — native step counting for iOS and Android behind one small C# API.',
    thumbnail: thumbnail('pedometer.png'),
    tags: ['Unity', 'iOS', 'Android', 'Native plugin'],
    links: [
      {
        kind: 'video',
        url: 'https://www.youtube.com/playlist?list=PLQMzAfas0PtJiQZsCRtglQcUWzL-pO78i',
        label: 'Dev playlist',
      },
    ],
    status: 'coming-soon',
    highlights: [
      'Reads native step-count data via Core Motion (iOS) and the sensor API (Android)',
      'Async queries plus a live update event, all from C#',
      'No platform-specific code needed in your project',
    ],
  },
  {
    slug: 'office-asset-pack',
    title: 'Office Asset Pack',
    blurb:
      'A low-poly office and break-room pack for Unity — modular cubicle partitions and desks, plus the props to dress them: monitors, laptops, lamps, potted plants, filing cabinets, and printers.',
    thumbnail: thumbnail('office-asset-pack.png'),
    tags: ['Unity', 'Low poly', '3D environment'],
    links: [
      {
        kind: 'store',
        url: 'https://assetstore.unity.com/packages/3d/environments/industrial/low-poly-office-pack-394148',
        label: 'Asset Store · Free',
      },
      {
        kind: 'store',
        url: 'https://assetstore.unity.com/packages/3d/props/interior/office-pack-full-complete-low-poly-office-break-room-collection-396892',
        label: 'Asset Store · Full',
      },
      {
        kind: 'itch',
        url: 'https://fromqcwithgamedev.itch.io/office-low-poly-pack',
        label: 'itch.io',
      },
    ],
    status: 'released',
    highlights: [
      'Modular cubicle partitions, desks, and seating for open-plan office layouts',
      'Desk and break-room props, from mugs and monitors to plants and filing cabinets',
      'Works in the Built-in, URP, and HDRP render pipelines',
      'Free starter pack, or the full collection for the complete break-room set',
    ],
  },
  {
    slug: 'sliding-puzzle-kit',
    title: 'Sliding Puzzle Kit',
    blurb:
      'A complete, reskinnable sliding puzzle game template for Unity — the shuffle, slide, and solve loop wired up and ready to ship.',
    tags: ['Unity', '2D', 'Game template'],
    links: [
      {
        kind: 'store',
        url: 'https://assetstore.unity.com/packages/templates/packs/sliding-puzzle-kit-379986',
        label: 'Asset Store',
      },
    ],
    status: 'released',
    highlights: [
      'Drop-in scene with the full shuffle → slide → solve loop',
      'Swap in your own image and board size to reskin it',
      'Works in the Built-in, URP, and HDRP render pipelines',
    ],
  },
  {
    slug: 'sliding-puzzle-factory',
    title: 'Sliding Puzzle Factory',
    blurb:
      'A Unity toolkit for building sliding puzzle games — turn a source image into a configurable sliding puzzle, tune board size and difficulty, and drop it into a mobile game.',
    tags: ['Unity', 'Editor tool', 'Puzzle'],
    links: [
      {
        kind: 'store',
        url: 'https://assetstore.unity.com/packages/tools/game-toolkits/sliding-puzzle-factory-384312',
        label: 'Asset Store',
      },
    ],
    status: 'released',
    highlights: [
      'Generate sliding puzzles from any source image',
      'Configurable board size and difficulty',
      'Aimed at mobile puzzle games',
      'Works in the Built-in, URP, and HDRP render pipelines',
    ],
  },
]
