<script setup lang="ts">
import { socials, isExternal } from '../data/socials'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__copy">© {{ year }} Jacques-Philippe Amiot</p>
      <ul class="footer__links">
        <li v-for="link in socials" :key="link.label">
          <a
            :href="link.href"
            :rel="isExternal(link.href) ? 'me noopener' : undefined"
            :target="isExternal(link.href) ? '_blank' : undefined"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  margin-top: var(--space-9);
  padding-block: var(--space-6);
  color: var(--text-muted);
  font-size: var(--text-sm);
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.footer__copy {
  margin: 0;
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
