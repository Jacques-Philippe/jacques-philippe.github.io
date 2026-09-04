import { ref } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

// Module-level singleton so every caller shares one reactive value.
const theme = ref<Theme>('dark')
let synced = false

function readDomTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme')
  return attr === 'light' ? 'light' : 'dark'
}

/**
 * Reactive colour theme. The pre-paint inline script in index.html has already
 * resolved and applied the correct theme; this composable mirrors it into Vue
 * state and lets components change it. SSR-safe (no-ops during prerender).
 */
export function useTheme() {
  if (!synced && typeof document !== 'undefined') {
    theme.value = readDomTheme()
    synced = true
  }

  function setTheme(next: Theme) {
    theme.value = next
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* private mode / storage disabled — in-memory only */
    }
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, setTheme, toggleTheme }
}
