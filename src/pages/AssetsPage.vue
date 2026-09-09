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

    <p class="assets-meshes-link">
      Want a closer look at the models?
      <RouterLink to="/meshes">Browse the mesh gallery →</RouterLink>
    </p>
  </section>
</template>

<style scoped>
.assets-meshes-link {
  margin: var(--space-7) 0 0;
  color: var(--text-muted);
  font-size: var(--text-sm);
}

.assets-meshes-link a {
  color: var(--accent);
  text-decoration: none;
}

.assets-meshes-link a:hover {
  text-decoration: underline;
}
</style>
