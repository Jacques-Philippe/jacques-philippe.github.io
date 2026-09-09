<script setup lang="ts">
/*
 * MeshGallery — grid + filters + URL sync + viewer orchestration (issue 0014).
 *
 * Two filters (segmented pack control + name search), both reflected in the URL
 * query so a filtered view is shareable. Selecting a card opens
 * <MeshViewerDialog>; the open mesh is deep-linkable via `?mesh=<slug>`.
 * Opening pushes a history entry (so Back closes the viewer in one step);
 * prev/next use replace and walk the list frozen at open time. On a deep link
 * whose `?mesh=` falls outside the active filters, the mesh wins and the
 * filters are discarded for the session.
 */
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { meshBySlug, meshes, type Mesh, type PackId } from '../data/meshes'
import MeshCard from './MeshCard.vue'
import MeshViewerDialog from './MeshViewerDialog.vue'

const route = useRoute()
const router = useRouter()

type PackChoice = 'all' | PackId
const PACK_CHOICES: { value: PackChoice; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'office', label: 'Office Pack' },
  { value: 'warehouse', label: 'Warehouse Pack' },
]

function normalizePack(v: unknown): PackChoice {
  return v === 'office' || v === 'warehouse' ? v : 'all'
}

const packFilter = ref<PackChoice>(normalizePack(route.query.pack))
const search = ref(typeof route.query.q === 'string' ? route.query.q : '')

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return meshes.filter(
    (m) =>
      (packFilter.value === 'all' || m.pack === packFilter.value) &&
      (!q || m.name.toLowerCase().includes(q)),
  )
})

// --- Viewer state ---------------------------------------------------------
const openList = ref<Mesh[] | null>(null)
const openIndex = ref(0)
const wireframe = ref(false)
let didPush = false
let originId = ''

const isOpen = computed(() => openList.value !== null)
const currentMesh = computed(() => openList.value?.[openIndex.value] ?? null)

function filterQuery(): Record<string, string> {
  const q: Record<string, string> = {}
  if (packFilter.value !== 'all') q.pack = packFilter.value
  if (search.value.trim()) q.q = search.value.trim()
  return q
}

// Keep filters in the URL — but never while the modal owns the query string.
watch([packFilter, search], () => {
  if (isOpen.value) return
  router.replace({ query: filterQuery() })
})

function selectMesh(mesh: Mesh) {
  originId = `mesh-${mesh.slug}`
  openList.value = [...filtered.value]
  openIndex.value = openList.value.findIndex((m) => m.slug === mesh.slug)
  didPush = true
  router.push({ query: { ...filterQuery(), mesh: mesh.slug } })
}

function openFromSlug(slug: string) {
  const mesh = meshBySlug.get(slug)
  if (!mesh) return
  const inFiltered = filtered.value.some((m) => m.slug === slug)
  const list = inFiltered ? [...filtered.value] : [...meshes]
  openList.value = list
  openIndex.value = list.findIndex((m) => m.slug === slug)
  if (!inFiltered) {
    // Deep-link vs. filter conflict: the mesh wins.
    packFilter.value = 'all'
    search.value = ''
  }
}

function closeNow() {
  openList.value = null
  didPush = false
  const el = document.getElementById(originId)
  el?.focus()
}

function requestClose() {
  if (didPush) {
    didPush = false
    router.back()
  } else {
    router.replace({ query: filterQuery() })
  }
}

function step(delta: number) {
  const list = openList.value
  if (!list) return
  const next = openIndex.value + delta
  if (next < 0 || next >= list.length) return
  openIndex.value = next
  router.replace({ query: { ...route.query, mesh: list[next].slug } })
}

// React to external query changes: initial deep link, Back/Forward.
watch(
  () => route.query.mesh,
  (val) => {
    const slug = typeof val === 'string' ? val : ''
    if (slug) {
      if (!isOpen.value || currentMesh.value?.slug !== slug) openFromSlug(slug)
    } else if (isOpen.value) {
      closeNow()
    }
  },
)

onMounted(() => {
  const slug = typeof route.query.mesh === 'string' ? route.query.mesh : ''
  if (slug) openFromSlug(slug)
})
</script>

<template>
  <div class="mesh-gallery">
    <div class="mesh-gallery__filters">
      <div
        class="mesh-gallery__segmented"
        role="group"
        aria-label="Filter by pack"
      >
        <button
          v-for="choice in PACK_CHOICES"
          :key="choice.value"
          type="button"
          class="mesh-gallery__seg"
          :class="{ 'is-active': packFilter === choice.value }"
          :aria-pressed="packFilter === choice.value"
          :disabled="isOpen"
          @click="packFilter = choice.value"
        >
          {{ choice.label }}
        </button>
      </div>

      <label class="mesh-gallery__search">
        <span class="mesh-gallery__sr">Search meshes by name</span>
        <input
          v-model="search"
          type="search"
          placeholder="Search meshes…"
          :disabled="isOpen"
        />
      </label>
    </div>

    <p v-if="!filtered.length" class="mesh-gallery__empty">
      No meshes match “{{ search }}”.
    </p>

    <ul v-else class="mesh-gallery__grid">
      <li v-for="mesh in filtered" :key="mesh.slug">
        <MeshCard :mesh="mesh" @select="selectMesh(mesh)" />
      </li>
    </ul>

    <Transition name="mvd">
      <MeshViewerDialog
        v-if="currentMesh"
        v-model:wireframe="wireframe"
        :mesh="currentMesh"
        :index="openIndex"
        :total="openList!.length"
        @close="requestClose"
        @prev="step(-1)"
        @next="step(1)"
      />
    </Transition>
  </div>
</template>

<style scoped>
.mesh-gallery__filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  align-items: center;
  margin-bottom: var(--space-6);
}

.mesh-gallery__segmented {
  display: inline-flex;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  overflow: hidden;
}

.mesh-gallery__seg {
  padding: var(--space-2) var(--space-4);
  border: 0;
  border-left: 1px solid var(--border-strong);
  background: var(--surface);
  color: var(--text-muted);
  font: inherit;
  font-size: var(--text-sm);
  cursor: pointer;
}

.mesh-gallery__seg:first-child {
  border-left: 0;
}

.mesh-gallery__seg.is-active {
  background: var(--accent);
  color: var(--accent-contrast);
}

.mesh-gallery__seg:disabled {
  opacity: 0.5;
  cursor: default;
}

.mesh-gallery__search input {
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--text);
  font: inherit;
  font-size: var(--text-sm);
  min-width: 14rem;
}

.mesh-gallery__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

.mesh-gallery__empty {
  color: var(--text-muted);
  padding: var(--space-7) 0;
  text-align: center;
}

.mesh-gallery__grid {
  display: grid;
  gap: var(--space-5);
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
}

.mesh-gallery__grid > li {
  display: flex;
}

.mvd-enter-active,
.mvd-leave-active {
  transition:
    opacity 150ms var(--ease),
    transform 150ms var(--ease);
}

.mvd-enter-from,
.mvd-leave-to {
  opacity: 0;
  transform: scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .mvd-enter-active,
  .mvd-leave-active {
    transition: none;
  }
}
</style>
