// Single source of truth for contact / social links. Consumed by the AppShell
// footer and the About page — do not duplicate these URLs elsewhere.
export interface Social {
  label: string
  href: string
}

export const socials: Social[] = [
  { label: 'Email', href: 'mailto:jacques.p.amiot@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/Jacques-Philippe' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jacques-philippe-amiot-757a90116/',
  },
  { label: 'YouTube', href: 'https://www.youtube.com/@FromQCWithGameDev' },
]

/** External links get target/rel; mailto: and other schemes do not. */
export function isExternal(href: string): boolean {
  return href.startsWith('http')
}
