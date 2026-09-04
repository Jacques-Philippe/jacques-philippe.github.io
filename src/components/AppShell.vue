<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { navLinks } from './nav-links'
import ThemeToggle from './ThemeToggle.vue'
import SiteFooter from './SiteFooter.vue'

const route = useRoute()
const menuOpen = ref(false)

function isActive(to: string): boolean {
  return to === '/' ? route.path === '/' : route.path.startsWith(to)
}

// Close the mobile menu whenever navigation completes.
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') menuOpen.value = false
}
</script>

<template>
  <div class="shell" @keydown="onKeydown">
    <a class="skip-link" href="#main">Skip to content</a>

    <header class="shell__header">
      <div class="container shell__bar">
        <RouterLink to="/" class="brand">Jacques-Philippe Amiot</RouterLink>

        <button
          type="button"
          class="nav-toggle"
          :aria-expanded="menuOpen"
          aria-controls="primary-nav"
          aria-label="Toggle navigation menu"
          @click="menuOpen = !menuOpen"
        >
          <span class="nav-toggle__bar" :class="{ 'is-open': menuOpen }" />
        </button>

        <nav
          id="primary-nav"
          class="nav"
          :class="{ 'is-open': menuOpen }"
          aria-label="Primary"
        >
          <ul class="nav__list">
            <li v-for="link in navLinks" :key="link.to">
              <RouterLink
                :to="link.to"
                class="nav__link"
                :class="{ 'is-active': isActive(link.to) }"
                :aria-current="isActive(link.to) ? 'page' : undefined"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
          <ThemeToggle class="nav__toggle" />
        </nav>
      </div>
    </header>

    <main id="main" class="shell__main">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.shell__main {
  flex: 1;
}

.skip-link {
  position: absolute;
  left: var(--space-3);
  top: var(--space-3);
  padding: var(--space-2) var(--space-4);
  background: var(--surface);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  transform: translateY(-150%);
  transition: transform var(--dur-fast) var(--ease);
  z-index: 10;
}

.skip-link:focus-visible {
  transform: translateY(0);
}

.shell__header {
  border-bottom: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(8px);
  position: sticky;
  top: 0;
  z-index: 5;
}

.shell__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: 3.5rem;
}

.brand {
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
  letter-spacing: -0.02em;
}

.brand:hover {
  color: var(--accent);
}

.nav {
  display: flex;
  align-items: center;
  gap: var(--space-5);
}

.nav__list {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav__link {
  color: var(--text-muted);
  text-decoration: none;
  font-size: var(--text-sm);
  padding-block: var(--space-2);
  border-bottom: 2px solid transparent;
  transition: color var(--dur-fast) var(--ease);
}

.nav__link:hover {
  color: var(--text);
}

.nav__link.is-active {
  color: var(--text);
  border-bottom-color: var(--accent);
}

.nav-toggle {
  display: none;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  cursor: pointer;
  position: relative;
}

.nav-toggle__bar,
.nav-toggle__bar::before,
.nav-toggle__bar::after {
  position: absolute;
  left: 50%;
  width: 1.1rem;
  height: 2px;
  background: var(--text);
  border-radius: 1px;
  transform: translateX(-50%);
  transition: transform var(--dur-fast) var(--ease);
}

.nav-toggle__bar {
  top: 50%;
  margin-top: -1px;
}

.nav-toggle__bar::before {
  content: '';
  top: -6px;
}

.nav-toggle__bar::after {
  content: '';
  top: 6px;
}

.nav-toggle__bar.is-open {
  background: transparent;
}

.nav-toggle__bar.is-open::before {
  transform: translateX(-50%) translateY(6px) rotate(45deg);
}

.nav-toggle__bar.is-open::after {
  transform: translateX(-50%) translateY(-6px) rotate(-45deg);
}

@media (max-width: 640px) {
  .nav-toggle {
    display: block;
  }

  .nav {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-4);
    padding: var(--space-5) var(--page-gutter) var(--space-6);
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    box-shadow: var(--shadow);
    display: none;
  }

  .nav.is-open {
    display: flex;
  }

  .nav__list {
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-3);
  }

  .nav__link {
    display: block;
    font-size: var(--text-md);
  }

  .nav__link.is-active {
    border-bottom-color: transparent;
    color: var(--accent);
  }
}
</style>
