<script setup lang="ts">
import { useHead } from '@unhead/vue'
// Preload the latin subsets actually used above the fold.
import interWoff2 from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url'
import groteskWoff2 from '@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2?url'

import AppShell from './components/AppShell.vue'

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
  <AppShell>
    <RouterView />
  </AppShell>
</template>
