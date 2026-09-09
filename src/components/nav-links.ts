export interface NavLink {
  to: string
  label: string
}

// Primary site navigation, shared by the shell nav and any in-page menus.
export const navLinks: NavLink[] = [
  { to: '/', label: 'Home' },
  { to: '/games', label: 'Games' },
  { to: '/tools', label: 'Tools' },
  { to: '/assets', label: 'Assets' },
  { to: '/meshes', label: 'Meshes' },
  { to: '/about', label: 'About' },
]
