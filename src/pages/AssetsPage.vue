<script setup lang="ts">
import { useHead } from '@unhead/vue'
import PageHeader from '../components/PageHeader.vue'
import ProjectGrid from '../components/ProjectGrid.vue'
import { assets } from '../data/assets'

useHead({
  title: 'Assets — Jacques-Philippe Amiot',
  meta: [
    {
      name: 'description',
      content:
        'Unity Asset Store packages developed by Jacques-Philippe Amiot for other Unity developers.',
    },
  ],
})
</script>

<template>
  <section class="container">
    <PageHeader
      title="Assets"
      lede="Unity Asset Store packages I've developed."
    />
    <ProjectGrid :projects="assets" />
  </section>
</template>
