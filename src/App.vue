<script setup lang="ts">
import { useHead } from '@unhead/vue'
// Preload the latin subsets actually used above the fold.
import interWoff2 from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url'
import groteskWoff2 from '@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2?url'

// AppShell (nav, footer, theme toggle) arrives in issue 0003.

useHead({
  link: [
    {
      rel: 'preload',
      as: 'font',
      type: 'font/woff2',
      href: interWoff2,
      crossorigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      type: 'font/woff2',
      href: groteskWoff2,
      crossorigin: 'anonymous',
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
