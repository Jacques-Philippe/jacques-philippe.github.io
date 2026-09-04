import type { Project } from './project'
import { thumbnail } from './thumbnails'

// Migrated from the legacy games.html.
export const games: Project[] = [
  {
    slug: 'gobara',
    title: 'Gobara',
    blurb:
      'A turn-based dungeon crawler based on the board game Karak, to be played in couch co-op with your friends.',
    thumbnail: thumbnail('gobara2.png'),
    tags: ['Unity', 'C#', 'Gameplay Systems', 'Board game like'],
    links: [{ kind: 'itch', url: 'https://fromqcwithgamedev.itch.io/gobara' }],
    status: 'released',
  },
  {
    slug: 'mushroom-mischief',
    title: 'Mushroom Mischief',
    blurb:
      'A single-player forest defence game based on The Untitled Goose Game, in which you play as a small chicken with a big attitude. Defend the forest from the mushroom pickers!',
    thumbnail: thumbnail('mushroom-mischief.png'),
    tags: ['Unity', 'C#', 'Enemy AI', 'Simulation'],
    links: [
      {
        kind: 'itch',
        url: 'https://fromqcwithgamedev.itch.io/mushroom-mischief',
      },
    ],
    status: 'released',
  },
]
