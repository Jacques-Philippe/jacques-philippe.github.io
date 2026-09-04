import type { Project } from './project'
import { thumbnail } from './thumbnails'

// General-purpose developer software (see docs/adr/0003). Unity Asset Store
// packages live in assets.ts, not here.
export const tools: Project[] = [
  {
    slug: 'datalint',
    title: 'datalint',
    blurb:
      'An open-source tool for setting expectations on structured input files. Define the expected layout and per-field rules, run it against a CSV or JSON file, and get back a JSON report of every violation.',
    thumbnail: thumbnail('datalint.png'),
    tags: ['C++', 'Cross-platform', 'Open source'],
    links: [
      { kind: 'repo', url: 'https://github.com/Jacques-Philippe/datalint' },
    ],
    status: 'released',
    highlights: [
      'Layout and field-rule validation for CSV and JSON inputs',
      'Emits a JSON report listing every error found',
      'Consumed as a library, with the parsing step left to the caller',
    ],
  },
  {
    slug: 'replica-sync',
    title: 'replica-sync',
    blurb:
      'A C# command-line utility that periodically synchronises a source directory to a replica, keeping the replica an exact mirror of the source on a fixed interval.',
    thumbnail: thumbnail('replicasync.png'),
    tags: ['C#', 'CLI', 'File I/O'],
    links: [
      { kind: 'repo', url: 'https://github.com/Jacques-Philippe/replica-sync' },
    ],
    status: 'released',
    highlights: [
      'One-way source → replica mirroring',
      'Runs on a configurable interval',
      'Logs every operation to file and console',
    ],
  },
]
