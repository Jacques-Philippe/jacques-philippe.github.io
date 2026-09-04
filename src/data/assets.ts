import type { Project } from './project'
import { thumbnail } from './thumbnails'

/*
 * Unity Asset Store packages (see docs/adr/0003).
 *
 * Content gap (issue 0009): the real Asset Store URLs and finished feature
 * copy are still pending. Entries are scaffolded honestly as `coming-soon`
 * until that lands — do not invent a store link or a release date.
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
      'A Unity Asset Store package of modular office environment assets, currently in development.',
    tags: ['Unity', '3D assets'],
    links: [],
    status: 'coming-soon',
  },
]
