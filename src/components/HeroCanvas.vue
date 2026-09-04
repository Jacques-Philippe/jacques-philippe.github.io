<script setup lang="ts">
/*
 * HeroCanvas — the animated cyan noise-gradient behind the homepage Hero.
 * See docs/adr/0004. Everything WebGL-related is loaded and run only after
 * mount, so it never executes during the vite-ssg prerender and `three` stays
 * out of every other route's bundle. When WebGL is unavailable the canvas
 * stays transparent and the CSS gradient on .hero__bg shows through.
 */
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'

const FRAGMENT = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_accent;
uniform vec3 u_bg;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i), f), dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = vec2(vUv.x * aspect, vUv.y) * 2.2;
  float t = u_time * 0.05;
  vec2 q = vec2(fbm(p + t), fbm(p - t + 3.1));
  float n = fbm(p + 1.5 * q + t);
  n = smoothstep(-0.35, 0.75, n);
  vec3 col = mix(u_bg, u_accent, n * 0.55);
  col *= 1.0 - 0.28 * length(vUv - 0.5);
  gl_FragColor = vec4(col, 1.0);
}
`

const VERTEX = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const canvasRef = useTemplateRef<HTMLCanvasElement>('canvas')

function tokenColor(name: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
  const hex = raw.replace('#', '')
  const full =
    hex.length === 3
      ? hex
          .split('')
          .map((c) => c + c)
          .join('')
      : hex
  const int = parseInt(full || '000000', 16)
  return [
    ((int >> 16) & 255) / 255,
    ((int >> 8) & 255) / 255,
    (int & 255) / 255,
  ]
}

let stop: (() => void) | null = null

onMounted(async () => {
  if (!canvasRef.value || typeof window === 'undefined') return
  // Non-null alias that survives into the closures below.
  const el: HTMLCanvasElement = canvasRef.value

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  let THREE: typeof import('three')
  try {
    THREE = await import('three')
  } catch {
    return
  }
  if (!canvasRef.value) return // unmounted while loading

  THREE.ColorManagement.enabled = false

  let renderer: import('three').WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: el,
      antialias: false,
      alpha: true,
      powerPreference: 'low-power',
    })
  } catch {
    return // no WebGL — CSS gradient stays visible
  }

  const scene = new THREE.Scene()
  const camera = new THREE.Camera()
  const uniforms = {
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(1, 1) },
    u_accent: { value: new THREE.Color(...tokenColor('--accent')) },
    u_bg: { value: new THREE.Color(...tokenColor('--bg')) },
  }
  const material = new THREE.ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    uniforms,
  })
  const geometry = new THREE.PlaneGeometry(2, 2)
  scene.add(new THREE.Mesh(geometry, material))

  const DPR_CAP = 2

  function resize() {
    const { clientWidth: w, clientHeight: h } = el
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, DPR_CAP))
    renderer.setSize(w, h, false)
    uniforms.u_resolution.value.set(w, h)
  }
  resize()

  let raf = 0
  let last = 0
  let onScreen = true

  function running() {
    return onScreen && !document.hidden && !reducedMotion
  }

  function frame(now: number) {
    raf = 0
    if (last) uniforms.u_time.value += Math.min(now - last, 100) / 1000
    last = now
    renderer.render(scene, camera)
    if (running()) raf = requestAnimationFrame(frame)
  }

  function kick() {
    if (!raf && running()) {
      last = 0
      raf = requestAnimationFrame(frame)
    }
  }

  // One static frame for reduced-motion; otherwise start the loop.
  if (reducedMotion) renderer.render(scene, camera)
  else kick()

  const io = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting
      kick()
    },
    { threshold: 0 },
  )
  io.observe(el)

  const onVisibility = () => kick()
  const onResize = () => {
    resize()
    if (!running()) renderer.render(scene, camera)
  }
  const themeObserver = new MutationObserver(() => {
    uniforms.u_accent.value.setRGB(...tokenColor('--accent'))
    uniforms.u_bg.value.setRGB(...tokenColor('--bg'))
    if (!running()) renderer.render(scene, camera)
  })
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  document.addEventListener('visibilitychange', onVisibility)
  window.addEventListener('resize', onResize)

  stop = () => {
    cancelAnimationFrame(raf)
    io.disconnect()
    themeObserver.disconnect()
    document.removeEventListener('visibilitychange', onVisibility)
    window.removeEventListener('resize', onResize)
    geometry.dispose()
    material.dispose()
    renderer.dispose()
  }
})

onBeforeUnmount(() => {
  stop?.()
  stop = null
})
</script>

<template>
  <canvas ref="canvas" class="hero-canvas" aria-hidden="true"></canvas>
</template>

<style scoped>
.hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
</style>
