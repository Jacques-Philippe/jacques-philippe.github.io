<script setup lang="ts">
import { useHead } from '@unhead/vue'
import profile from '../../assets/images/profile.jpeg'
import { socials, isExternal } from '../data/socials'

useHead({
  title: 'About — Jacques-Philippe Amiot',
  meta: [
    {
      name: 'description',
      content:
        'Jacques-Philippe Amiot — a programmer focused on clean architecture, practical systems, and polished developer tools.',
    },
  ],
})
</script>

<template>
  <section class="container container--narrow about">
    <img
      class="about__photo"
      :src="profile"
      alt="Jacques-Philippe Amiot"
      width="150"
      height="150"
    />
    <h1>About</h1>

    <p>
      Hi! I'm Jacques-Philippe Amiot, a programmer focusing on all sorts of
      nifty projects and tools that combine clean architecture, documentation,
      practical systems, and polished user experiences. I've worked on many
      prototypes, released medical products, and open-source software. Maybe we
      can work together someday?
    </p>
    <p>
      I'm always exploring new ideas, building useful tools for other
      developers, and sharing knowledge through my projects.
    </p>

    <h2 class="about__contact-heading">Contact &amp; socials</h2>
    <ul class="about__contact">
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
  </section>
</template>

<style scoped>
.about {
  padding-block: var(--space-8);
}

.about__photo {
  width: 150px;
  height: 150px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 1px solid var(--border);
}

.about h1 {
  margin: var(--space-5) 0 var(--space-4);
}

.about p {
  color: var(--text-muted);
  margin: 0 0 var(--space-4);
}

.about__contact-heading {
  margin-top: var(--space-7);
  font-size: var(--text-lg);
}

.about__contact {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);
  margin: var(--space-4) 0 0;
  padding: 0;
  list-style: none;
}
</style>
