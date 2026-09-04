<script setup lang="ts">
import type { Project } from '../data/project'
import ProjectCard from './ProjectCard.vue'

defineProps<{ projects: Project[] }>()
</script>

<template>
  <ul class="project-grid">
    <li
      v-for="project in projects"
      :key="project.slug"
      class="project-grid__cell"
    >
      <ProjectCard :project="project" />
    </li>
  </ul>
</template>

<style scoped>
.project-grid {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
}

.project-grid__cell {
  display: flex;
}

.project-grid__cell > * {
  width: 100%;
}
</style>
