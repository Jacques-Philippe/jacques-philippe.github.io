<script setup lang="ts">
/*
 * MeshViewerDialog — the modal shell around <MeshViewer> (issue 0014).
 *
 * role="dialog" / aria-modal, focus trap, Escape to close, open+close
 * transition (reduced-motion aware), full-screen sheet under 640px, on-screen
 * prev/next + ←/→ keys walking the frozen list (no wrap). The renderer is
 * mounted for as long as the dialog is open and switches mesh via prop, so
 * prev/next never recreates the WebGL context.
 */
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { PACKS, type Mesh } from '../data/meshes'
import MeshViewer from './MeshViewer.vue'

const props = defineProps<{
  mesh: Mesh
  index: number
  total: number
  wireframe: boolean
}>()
const emit = defineEmits<{
  close: []
  prev: []
  next: []
  'update:wireframe': [value: boolean]
}>()

type LoadState = 'loading' | 'ready' | 'unsupported' | 'error'
const state = ref<LoadState>('loading')
// Remount the renderer only on an explicit retry.
const viewerKey = ref(0)

const pack = computed(() => PACKS[props.mesh.pack])
const hasPrev = computed(() => props.index > 0)
const hasNext = computed(() => props.index < props.total - 1)

const dialogRef = useTemplateRef<HTMLElement>('dialog')
const closeRef = useTemplateRef<HTMLButtonElement>('close')

function onViewerReady() {
  state.value = 'ready'
}
function onUnsupported() {
  state.value = 'unsupported'
}
function onLoadError() {
  state.value = 'error'
}
function retry() {
  state.value = 'loading'
  viewerKey.value++
}

// The renderer is already live and every pack is loaded, so a prev/next swap
// is instant — no need to drop back to the loading state.
function goPrev() {
  if (hasPrev.value) emit('prev')
}
function goNext() {
  if (hasNext.value) emit('next')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.stopPropagation()
    emit('close')
    return
  }
  if (e.key === 'ArrowLeft') goPrev()
  if (e.key === 'ArrowRight') goNext()
  if (e.key === 'Tab') trapTab(e)
}

function trapTab(e: KeyboardEvent) {
  const root = dialogRef.value
  if (!root) return
  const focusables = root.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  )
  const list = Array.from(focusables).filter((el) => !el.hasAttribute('disabled'))
  if (!list.length) return
  const first = list[0]
  const last = list[list.length - 1]
  const active = document.activeElement as HTMLElement | null
  if (e.shiftKey && (active === first || !root.contains(active))) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && active === last) {
    e.preventDefault()
    first.focus()
  }
}

onMounted(async () => {
  document.body.style.overflow = 'hidden'
  await nextTick()
  closeRef.value?.focus()
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="mvd" @keydown="onKeydown">
    <div class="mvd__backdrop" @click="emit('close')" />

    <div
      ref="dialog"
      class="mvd__panel"
      role="dialog"
      aria-modal="true"
      :aria-label="mesh.name"
    >
      <header class="mvd__header">
        <h2 class="mvd__title">{{ mesh.name }}</h2>
        <span class="mvd__pos" aria-hidden="true">{{ index + 1 }} / {{ total }}</span>
        <button
          ref="close"
          type="button"
          class="mvd__close"
          aria-label="Close viewer"
          @click="emit('close')"
        >
          ✕
        </button>
      </header>

      <div class="mvd__stage">
        <img class="mvd__preview" :src="mesh.preview" :alt="mesh.name" />

        <MeshViewer
          v-if="state !== 'unsupported' && state !== 'error'"
          :key="viewerKey"
          class="mvd__viewer"
          :class="{ 'is-visible': state === 'ready' }"
          :mesh="mesh"
          :wireframe="wireframe"
          @ready="onViewerReady"
          @unsupported="onUnsupported"
          @loaderror="onLoadError"
        />

        <div v-if="state === 'loading'" class="mvd__status" aria-live="polite">
          <span class="mvd__spinner" aria-hidden="true" />
          <span class="mvd__sr">Loading model…</span>
        </div>
        <p v-else-if="state === 'unsupported'" class="mvd__note">
          3D preview unavailable in this browser.
        </p>
        <div v-else-if="state === 'error'" class="mvd__note">
          <p>Couldn't load the model.</p>
          <button type="button" class="mvd__retry" @click="retry">Retry</button>
        </div>

        <button
          v-if="hasPrev"
          type="button"
          class="mvd__nav mvd__nav--prev"
          aria-label="Previous mesh"
          @click="goPrev"
        >
          ‹
        </button>
        <button
          v-if="hasNext"
          type="button"
          class="mvd__nav mvd__nav--next"
          aria-label="Next mesh"
          @click="goNext"
        >
          ›
        </button>
      </div>

      <footer class="mvd__footer">
        <span class="mvd__meta">{{ mesh.triangles.toLocaleString() }} tris</span>
        <span class="mvd__meta">{{ pack.label }}</span>
        <label class="mvd__wire">
          <input
            type="checkbox"
            :checked="wireframe"
            @change="emit('update:wireframe', ($event.target as HTMLInputElement).checked)"
          />
          Wireframe
        </label>
        <a
          v-if="pack.cta.href.startsWith('/')"
          class="mvd__cta"
          :href="pack.cta.href"
        >{{ pack.cta.label }}</a>
        <a
          v-else
          class="mvd__cta"
          :href="pack.cta.href"
          target="_blank"
          rel="noopener"
        >{{ pack.cta.label }}</a>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.mvd {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-5);
}

.mvd__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
}

.mvd__panel {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(880px, 100%);
  max-height: 100%;
  background: var(--surface);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.mvd__header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--border);
}

.mvd__title {
  margin: 0;
  font-size: var(--text-lg);
  flex: 1;
}

.mvd__pos {
  color: var(--text-faint);
  font-size: var(--text-sm);
  font-variant-numeric: tabular-nums;
}

.mvd__close {
  border: 1px solid var(--border-strong);
  background: var(--surface-2);
  color: var(--text);
  border-radius: var(--radius);
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  line-height: 1;
}

.mvd__close:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.mvd__stage {
  position: relative;
  aspect-ratio: 4 / 3;
  background: var(--surface-2);
}

.mvd__preview,
.mvd__viewer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.mvd__preview {
  object-fit: contain;
}

.mvd__viewer {
  opacity: 0;
  transition: opacity var(--dur) var(--ease);
}

.mvd__viewer.is-visible {
  opacity: 1;
}

.mvd__status,
.mvd__note {
  position: absolute;
  left: 50%;
  bottom: var(--space-4);
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  margin: 0;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius);
  background: color-mix(in srgb, var(--bg) 80%, transparent);
  color: var(--text-muted);
  font-size: var(--text-sm);
  text-align: center;
}

.mvd__spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--border-strong);
  border-top-color: var(--accent);
  border-radius: var(--radius-full);
  animation: mvd-spin 0.8s linear infinite;
}

.mvd__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

.mvd__retry {
  border: 1px solid var(--border-strong);
  background: var(--surface);
  color: var(--text);
  border-radius: var(--radius);
  padding: var(--space-1) var(--space-3);
  cursor: pointer;
}

.mvd__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--bg) 78%, transparent);
  color: var(--text);
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
}

.mvd__nav:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.mvd__nav--prev {
  left: var(--space-3);
}

.mvd__nav--next {
  right: var(--space-3);
}

.mvd__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-4);
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--border);
}

.mvd__meta {
  color: var(--text-muted);
  font-size: var(--text-sm);
}

.mvd__wire {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--text-muted);
  font-size: var(--text-sm);
  cursor: pointer;
}

.mvd__cta {
  margin-left: auto;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius);
  background: var(--accent);
  color: var(--accent-contrast);
  font-size: var(--text-sm);
  font-weight: 600;
  text-decoration: none;
}

.mvd__cta:hover {
  background: var(--accent-hover);
}

@keyframes mvd-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .mvd {
    padding: 0;
  }

  .mvd__panel {
    width: 100%;
    height: 100%;
    max-height: 100%;
    border: 0;
    border-radius: 0;
  }

  .mvd__stage {
    flex: 1;
    aspect-ratio: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mvd__viewer {
    transition: none;
  }

  .mvd__spinner {
    animation-duration: 2s;
  }
}
</style>
