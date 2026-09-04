<script setup lang="ts">
import { useHead } from '@unhead/vue'
import PageHeader from '../components/PageHeader.vue'
import ProjectGrid from '../components/ProjectGrid.vue'
import { tools } from '../data/tools'

useHead({
  title: 'Tools — Jacques-Philippe Amiot',
  meta: [
    {
      name: 'description',
      content:
        'Open-source developer tools built by Jacques-Philippe Amiot, from data validation to directory synchronisation.',
    },
  ],
})
</script>

<template>
  <section class="container">
    <PageHeader
      title="Tools"
      lede="Open-source developer software I've built around real production needs."
    />
    <ProjectGrid :projects="tools" />
  </section>
</template>
