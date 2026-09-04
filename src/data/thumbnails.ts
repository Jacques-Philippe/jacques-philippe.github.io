/*
 * Thumbnails live in /assets/images (outside src/). This resolves them through
 * Vite's asset pipeline — hashed and copied into dist — so data files can
 * reference an image by bare filename instead of importing each one.
 */

const urls = import.meta.glob<string>(
  '../../assets/images/*.{png,jpg,jpeg,webp,avif}',
  { eager: true, import: 'default', query: '?url' },
)

const byFilename = new Map<string, string>()
for (const [path, url] of Object.entries(urls)) {
  byFilename.set(path.slice(path.lastIndexOf('/') + 1), url)
}

/** Resolve a thumbnail filename to its built asset URL. */
export function thumbnail(filename: string): string {
  const url = byFilename.get(filename)
  if (!url) {
    throw new Error(
      `Unknown thumbnail "${filename}". Add it to assets/images/.`,
    )
  }
  return url
}
