<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Jacques-Philippe Amiot' })
</script>

<template>
  <main>
    <h1>Hi, I'm Jacques 👋</h1>
    <p>
      Unity developer working on games and tools, with a focus on clean systems,
      gameplay architecture, and practical production-ready code.
    </p>
    <nav>
      <RouterLink to="/games">Games</RouterLink>
      <RouterLink to="/tools">Tools</RouterLink>
      <RouterLink to="/assets">Assets</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </main>
</template>
