<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { useHead } from "@unhead/vue";

// Client-only: keeps the component and `three` out of the SSR pass and the
// initial homepage bundle. The CSS gradient on .hero__bg covers until it loads.
const HeroCanvas = defineAsyncComponent(
  () => import("../components/HeroCanvas.vue"),
);

useHead({
  title: "Jacques-Philippe Amiot",
  meta: [
    {
      name: "description",
      content:
        "Jacques-Philippe Amiot — Unity developer working on games, tools, and Asset Store packages.",
    },
  ],
});

const explore = [
  {
    to: "/games",
    title: "Games",
    blurb: "Playable titles and prototypes, from game jams to released builds.",
  },
  {
    to: "/tools",
    title: "Tools",
    blurb: "Software built around real production needs.",
  },
  {
    to: "/assets",
    title: "Assets",
    blurb: "Unity Asset Store packages.",
  },
];
</script>

<template>
  <section class="hero">
    <!--
      Stable mount point for <HeroCanvas> (issue 0006). The CSS gradient below
      is the default and the WebGL/reduced-motion fallback; the canvas layers
      on top when it lands.
    -->
    <div class="hero__bg" aria-hidden="true">
      <HeroCanvas />
    </div>

    <div class="container hero__inner">
      <h1 class="hero__title">
        Hi, I'm Jacques <span aria-hidden="true">👋</span>
      </h1>
      <p class="hero__lede">
        Unity developer working on games and tools, with a focus on clean
        systems, gameplay architecture, and practical production-ready code.
      </p>
      <div class="hero__actions">
        <RouterLink class="hero__link" to="/games">See the games</RouterLink>
        <RouterLink class="hero__link hero__link--ghost" to="/about">
          About me
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="container explore">
    <h2 class="explore__heading">Explore the work</h2>
    <ul class="explore__list">
      <li v-for="item in explore" :key="item.to">
        <RouterLink class="explore__card" :to="item.to">
          <h3 class="explore__title">{{ item.title }}</h3>
          <p class="explore__blurb">{{ item.blurb }}</p>
          <span class="explore__more" aria-hidden="true">→</span>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: clamp(24rem, 66vh, 40rem);
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(120% 80% at 15% 0%, var(--accent-tint), transparent 55%),
    radial-gradient(
      90% 70% at 100% 100%,
      color-mix(in srgb, var(--accent) 14%, transparent),
      transparent 70%
    ),
    var(--bg);
}

.hero__inner {
  position: relative;
  z-index: 1;
  padding-block: var(--space-9);
}

.hero__title {
  font-size: var(--text-4xl);
  margin: 0;
}

.hero__lede {
  margin: var(--space-5) 0 0;
  max-width: 46ch;
  font-size: var(--text-lg);
  color: var(--text-muted);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-top: var(--space-7);
}

.hero__link {
  display: inline-flex;
  align-items: center;
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius);
  background: var(--accent);
  color: var(--accent-contrast);
  font-weight: 600;
  text-decoration: none;
  transition:
    background var(--dur-fast) var(--ease),
    color var(--dur-fast) var(--ease);
}

.hero__link:hover {
  background: var(--accent-hover);
  color: var(--accent-contrast);
}

.hero__link--ghost {
  background: transparent;
  border: 1px solid var(--border-strong);
  color: var(--text);
}

.hero__link--ghost:hover {
  background: var(--surface);
  border-color: var(--accent);
  color: var(--accent);
}

.explore {
  padding-block: var(--space-8);
}

.explore__heading {
  margin: 0 0 var(--space-6);
  font-size: var(--text-xl);
}

.explore__list {
  display: grid;
  gap: var(--space-5);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
}

.explore__card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--space-5);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  color: inherit;
  text-decoration: none;
  transition:
    border-color var(--dur-fast) var(--ease),
    transform var(--dur-fast) var(--ease);
}

.explore__card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.explore__title {
  margin: 0;
  font-size: var(--text-lg);
}

.explore__blurb {
  margin: var(--space-2) 0 0;
  color: var(--text-muted);
  font-size: var(--text-sm);
}

.explore__more {
  margin-top: var(--space-4);
  color: var(--accent);
  font-size: var(--text-md);
}
</style>
