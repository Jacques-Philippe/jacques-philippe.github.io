import type { RouteRecordRaw } from 'vue-router'

// Placeholder page components — fleshed out in issues 0005, 0007–0010.
export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('./pages/HomePage.vue') },
  { path: '/games', name: 'games', component: () => import('./pages/GamesPage.vue') },
  { path: '/tools', name: 'tools', component: () => import('./pages/ToolsPage.vue') },
  { path: '/assets', name: 'assets', component: () => import('./pages/AssetsPage.vue') },
  { path: '/about', name: 'about', component: () => import('./pages/AboutPage.vue') },
]
