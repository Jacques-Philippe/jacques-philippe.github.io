<script setup lang="ts">
import { useHead } from '@unhead/vue'
import PageHeader from '../components/PageHeader.vue'
import MeshGallery from '../components/MeshGallery.vue'

useHead({
  title: 'Meshes — Jacques-Philippe Amiot',
  meta: [
    {
      name: 'description',
      content:
        'Browse the free-tier meshes and characters from my low-poly Unity asset packs and inspect any one of them in an interactive 3D viewer.',
    },
  ],
})
</script>

<template>
  <section class="container">
    <PageHeader
      title="Meshes"
      lede="The free-tier models from my Unity asset packs — filter the list and spin any one of them up close."
    />
    <MeshGallery />
  </section>
</template>
