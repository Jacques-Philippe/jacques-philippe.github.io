<script setup lang="ts">
import { useHead } from '@unhead/vue'
import PageHeader from '../components/PageHeader.vue'
import ProjectGrid from '../components/ProjectGrid.vue'
import { games } from '../data/games'

useHead({
  title: 'Games — Jacques-Philippe Amiot',
  meta: [
    {
      name: 'description',
      content:
        'Games Jacques-Philippe Amiot has worked on, from prototypes to released titles.',
    },
  ],
})
</script>

<template>
  <section class="container">
    <PageHeader
      title="Games"
      lede="Projects I've worked on, from prototypes to released titles."
    />
    <ProjectGrid :projects="games" />
  </section>
</template>
