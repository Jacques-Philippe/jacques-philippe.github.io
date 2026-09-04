/// <reference types="vite-ssg" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// User-pages repo (jacques-philippe.github.io) is served from the domain root.
export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // vite-ssg options
  ssgOptions: {
    formatting: 'minify',
    // Emit routes as games/index.html, not games.html, so the legacy
    // redirect stubs in public/ can own games.html / tools.html / about.html.
    dirStyle: 'nested',
    // We hand-pick font preloads in App.vue; stop beasties from auto-preloading
    // every @font-face subset (cyrillic, greek, vietnamese, …).
    beastiesOptions: {
      preloadFonts: false,
      fonts: false,
    },
  },
})
