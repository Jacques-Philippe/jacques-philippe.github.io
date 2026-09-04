<script setup lang="ts">
defineProps<{ title: string; lede?: string }>()
</script>

<template>
  <header class="page-header">
    <h1 class="page-header__title">{{ title }}</h1>
    <p v-if="lede" class="page-header__lede">{{ lede }}</p>
  </header>
</template>

<style scoped>
.page-header {
  padding-block: var(--space-8) var(--space-6);
}

.page-header__title {
  margin: 0;
}

.page-header__lede {
  margin: var(--space-3) 0 0;
  max-width: 52ch;
  color: var(--text-muted);
  font-size: var(--text-md);
}
</style>
