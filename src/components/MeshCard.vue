<script setup lang="ts">
import { PACKS, type Mesh } from '../data/meshes'

defineProps<{ mesh: Mesh }>()
defineEmits<{ select: [] }>()
</script>

<template>
  <button
    :id="`mesh-${mesh.slug}`"
    type="button"
    class="mesh-card"
    @click="$emit('select')"
  >
    <span class="mesh-card__media">
      <img
        class="mesh-card__image"
        :src="mesh.preview"
        :alt="`${mesh.name} preview`"
        loading="lazy"
        decoding="async"
      />
      <span class="mesh-card__badge">{{ PACKS[mesh.pack].shortLabel }}</span>
    </span>
    <span class="mesh-card__body">
      <span class="mesh-card__name">{{ mesh.name }}</span>
      <span class="mesh-card__tris">{{ mesh.triangles.toLocaleString() }} tris</span>
    </span>
  </button>
</template>

<style scoped>
.mesh-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  text-align: left;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  color: inherit;
  font: inherit;
  transition:
    border-color var(--dur-fast) var(--ease),
    box-shadow var(--dur-fast) var(--ease),
    transform var(--dur-fast) var(--ease);
}

.mesh-card:hover {
  border-color: var(--border-strong);
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}

.mesh-card__media {
  position: relative;
  display: block;
  aspect-ratio: 4 / 3;
  background: var(--surface-2);
}

.mesh-card__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.mesh-card__badge {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  background: var(--accent-tint);
  color: var(--accent);
  font-size: var(--text-xs);
  font-weight: 600;
  backdrop-filter: blur(4px);
}

.mesh-card__body {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
}

.mesh-card__name {
  font-family: var(--font-display);
  font-size: var(--text-md);
}

.mesh-card__tris {
  color: var(--text-faint);
  font-size: var(--text-xs);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .mesh-card {
    transition: none;
  }
}
</style>
