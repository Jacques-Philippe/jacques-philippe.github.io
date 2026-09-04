import type { Project } from './project'
import { thumbnail } from './thumbnails'

/*
 * Unity Asset Store packages (see docs/adr/0003).
 *
 * Content gap: Pedometer's store URL and finished feature copy are still
 * pending, so it stays `coming-soon` — do not invent a store link or a
 * release date. Everything else here is published.
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
      'A Unity tool for building your own sliding puzzle games — set up the board, tiles, and the shuffle-and-solve rules without writing the core logic yourself.',
    thumbnail: thumbnail('sliding-puzzle-toolkit.png'),
    tags: ['Unity', '2D', 'Puzzle'],
    links: [
      {
        kind: 'store',
        url: 'https://assetstore.unity.com/packages/templates/packs/sliding-puzzle-kit-379986',
        label: 'Asset Store',
      },
    ],
    status: 'released',
    highlights: [
      'Configurable board size and tile set',
      'Shuffle, slide, and solve logic handled for you',
      'Works in the Built-in, URP, and HDRP render pipelines',
    ],
  },
  {
    slug: 'sliding-puzzle-factory',
    title: 'Sliding Puzzle Factory',
    blurb:
      'The Sliding Puzzle Kit scaled up into a production pipeline — turn source images into fully configured sliding puzzles in bulk and feed them straight into a mobile game.',
    thumbnail: thumbnail('sliding-puzzle-toolkit-factory.png'),
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
      'Generate configured sliding puzzles from source images',
      'Batch production for content-heavy puzzle games',
      'Built with mobile in mind',
      'Works in the Built-in, URP, and HDRP render pipelines',
    ],
  },
]
