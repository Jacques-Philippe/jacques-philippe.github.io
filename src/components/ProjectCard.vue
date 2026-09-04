<script setup lang="ts">
import { computed } from 'vue'
import type { LinkKind, Project, Status } from '../data/project'

const props = defineProps<{ project: Project }>()

const LINK_LABELS: Record<LinkKind, string> = {
  store: 'Asset Store',
  repo: 'Source',
  itch: 'itch.io',
  video: 'Video',
  web: 'Website',
}

const STATUS_LABELS: Record<Status, string> = {
  released: 'Released',
  wip: 'In progress',
  'coming-soon': 'Coming soon',
}

// Released is the norm — only flag the states worth calling out.
const badge = computed(() =>
  props.project.status === 'released'
    ? null
    : STATUS_LABELS[props.project.status],
)

const isComingSoon = computed(() => props.project.status === 'coming-soon')

function linkLabel(kind: LinkKind, label?: string): string {
  return label ?? LINK_LABELS[kind]
}
</script>

<template>
  <article class="card" :class="`card--${project.status}`">
    <div class="card__media">
      <img
        v-if="!isComingSoon"
        class="card__image"
        :src="project.thumbnail"
        :alt="`${project.title} thumbnail`"
        loading="lazy"
        decoding="async"
      />
      <div v-else class="card__placeholder" aria-hidden="true">
        <span>In the works</span>
      </div>
      <span v-if="badge" class="card__badge">{{ badge }}</span>
    </div>

    <div class="card__body">
      <h3 class="card__title">{{ project.title }}</h3>
      <p class="card__blurb">{{ project.blurb }}</p>

      <ul v-if="project.tags.length" class="card__tags">
        <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
      </ul>

      <ul v-if="project.highlights?.length" class="card__highlights">
        <li v-for="item in project.highlights" :key="item">{{ item }}</li>
      </ul>

      <p v-if="isComingSoon && !project.links.length" class="card__note">
        Not published yet — check back soon.
      </p>

      <div v-if="project.links.length" class="card__links">
        <a
          v-for="link in project.links"
          :key="link.url"
          class="card__link"
          :data-kind="link.kind"
          :href="link.url"
          target="_blank"
          rel="noopener"
        >
          {{ linkLabel(link.kind, link.label) }}
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition:
    border-color var(--dur-fast) var(--ease),
    box-shadow var(--dur-fast) var(--ease),
    transform var(--dur-fast) var(--ease);
}

.card:hover {
  border-color: var(--border-strong);
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}

.card--coming-soon {
  border-style: dashed;
}

.card--coming-soon:hover {
  transform: none;
  box-shadow: none;
}

.card__media {
  position: relative;
  aspect-ratio: 16 / 9;
  background: var(--surface-2);
}

.card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    var(--surface-2),
    var(--surface-2) 10px,
    var(--surface) 10px,
    var(--surface) 20px
  );
  color: var(--text-faint);
  font-family: var(--font-display);
  font-size: var(--text-sm);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.card__badge {
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

.card__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-5);
  flex: 1;
}

.card__title {
  font-size: var(--text-lg);
  margin: 0;
}

.card__blurb {
  margin: 0;
  color: var(--text-muted);
  font-size: var(--text-sm);
}

.card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.card__tags li {
  padding: var(--space-1) var(--space-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  color: var(--text-faint);
}

.card__highlights {
  margin: 0;
  padding-left: var(--space-5);
  color: var(--text-muted);
  font-size: var(--text-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.card__note {
  margin: 0;
  color: var(--text-faint);
  font-size: var(--text-sm);
}

.card__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: auto;
  padding-top: var(--space-2);
}

.card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  font-size: var(--text-sm);
  text-decoration: none;
  color: var(--text);
  transition:
    border-color var(--dur-fast) var(--ease),
    color var(--dur-fast) var(--ease),
    background var(--dur-fast) var(--ease);
}

.card__link::before {
  content: '';
  width: 0.5rem;
  height: 0.5rem;
  border-radius: var(--radius-full);
  background: var(--text-faint);
}

.card__link:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.card__link:hover::before {
  background: var(--accent);
}

/* The primary marketplace / play links read as the main call to action. */
.card__link[data-kind='store'],
.card__link[data-kind='itch'] {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--accent-contrast);
}

.card__link[data-kind='store']::before,
.card__link[data-kind='itch']::before {
  background: var(--accent-contrast);
}

.card__link[data-kind='store']:hover,
.card__link[data-kind='itch']:hover {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
  color: var(--accent-contrast);
}
</style>
