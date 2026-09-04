/// <reference types="vite-ssg" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// User-pages repo (jacquespamiot.github.io) is served from the domain root.
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
  },
})
