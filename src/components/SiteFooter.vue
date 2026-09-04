<script setup lang="ts">
interface SocialLink {
  label: string;
  href: string;
  text: string;
}

// Contact / social links carried over from the legacy about.html.
const links: SocialLink[] = [
  { label: "Email", href: "mailto:jacques.p.amiot@gmail.com", text: "Email" },
  {
    label: "GitHub",
    href: "https://github.com/Jacques-Philippe",
    text: "GitHub",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jacques-philippe-amiot-757a90116/",
    text: "LinkedIn",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@FromQCWithGameDev",
    text: "YouTube",
  },
];

const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__copy">© {{ year }} Jacques-Philippe Amiot</p>
      <ul class="footer__links">
        <li v-for="link in links" :key="link.label">
          <a
            :href="link.href"
            :rel="link.href.startsWith('http') ? 'me noopener' : undefined"
            :target="link.href.startsWith('http') ? '_blank' : undefined"
          >
            {{ link.text }}
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
