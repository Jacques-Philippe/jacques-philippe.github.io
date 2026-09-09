<script setup lang="ts">
/*
 * MeshViewer — the Three.js renderer for the mesh gallery (issue 0014 / ADR-0007).
 *
 * Everything WebGL runs after mount, so `three` stays out of the vite-ssg
 * prerender and every other route's bundle (same pattern as <HeroCanvas> /
 * ADR-0004). One WebGLRenderer is created here and kept for the component's
 * lifetime; the dialog keeps this component mounted across prev/next, so
 * switching mesh only disposes the displayed geometry and clones the next node
 * from the already-loaded pack `.glb` — no context churn.
 */
import { onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import type { OrbitControls as OrbitControlsT } from 'three/examples/jsm/controls/OrbitControls.js'
import { PACKS, type Mesh } from '../data/meshes'

const props = defineProps<{ mesh: Mesh; wireframe: boolean }>()
const emit = defineEmits<{
  ready: []
  unsupported: []
  loaderror: []
}>()

const canvasRef = useTemplateRef<HTMLCanvasElement>('canvas')
const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Set once the renderer is live; guards prop watchers that would otherwise
// race the async setup.
const started = ref(false)

type ThreeNS = typeof import('three')
let THREE: ThreeNS
let renderer: import('three').WebGLRenderer | null = null
let scene: import('three').Scene
let camera: import('three').PerspectiveCamera
let controls: OrbitControlsT
let current: import('three').Object3D | null = null
const loaded = new Map<string, import('three').Group>()

let raf = 0
let idleUntil = 0
let disposed = false

async function setup() {
  if (typeof window === 'undefined' || !canvasRef.value) return
  const el = canvasRef.value

  try {
    THREE = await import('three')
  } catch {
    emit('unsupported')
    return
  }
  if (disposed || !canvasRef.value) return

  const { GLTFLoader } = await import(
    'three/examples/jsm/loaders/GLTFLoader.js'
  )
  const { OrbitControls } = await import(
    'three/examples/jsm/controls/OrbitControls.js'
  )
  const { MeshoptDecoder } = await import(
    'three/examples/jsm/libs/meshopt_decoder.module.js'
  )
  const { RoomEnvironment } = await import(
    'three/examples/jsm/environments/RoomEnvironment.js'
  )
  if (disposed) return

  try {
    renderer = new THREE.WebGLRenderer({ canvas: el, antialias: true, alpha: true })
  } catch {
    emit('unsupported')
    return
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(38, 1, 0.01, 100)

  // Image-based lighting so the PBR materials — matte panels and, especially,
  // the metallic chrome/aluminium parts — actually read as their material
  // rather than flat grey. The per-pack directional rig below adds the
  // DESIGN.md §8 key/fill direction and warmth on top.
  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  pmrem.dispose()

  controls = new OrbitControls(camera, el)
  controls.enablePan = false
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.autoRotate = !reducedMotion
  controls.autoRotateSpeed = 0.6 // ~2–4°/s at 60fps
  controls.addEventListener('start', () => {
    controls.autoRotate = false
    idleUntil = Infinity // held until the drag ends
  })
  controls.addEventListener('end', () => {
    // Resume the turntable after a short idle.
    idleUntil = performance.now() + 2500
  })

  const loader = new GLTFLoader()
  loader.setMeshoptDecoder(MeshoptDecoder)

  resize()
  window.addEventListener('resize', resize)

  started.value = true

  // Fetch both packs so the first selection and every prev/next is instant.
  const packIds = Object.keys(PACKS) as (keyof typeof PACKS)[]
  try {
    await Promise.all(
      packIds.map(
        (id) =>
          new Promise<void>((resolve, reject) => {
            loader.load(
              PACKS[id].glbUrl,
              (gltf) => {
                loaded.set(id, gltf.scene)
                resolve()
              },
              undefined,
              reject,
            )
          }),
      ),
    )
  } catch {
    emit('loaderror')
    return
  }
  if (disposed) return

  showMesh(props.mesh)
  animate()
}

function clearCurrent() {
  if (!current) return
  scene.remove(current)
  current.traverse((obj) => {
    const m = obj as import('three').Mesh
    if (m.isMesh) {
      m.geometry?.dispose()
      const mat = m.material
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
      else mat?.dispose()
    }
  })
  current = null
}

function showMesh(mesh: Mesh) {
  if (!renderer) return
  const packScene = loaded.get(mesh.pack)
  const src = packScene?.getObjectByName(mesh.node)
  if (!src) {
    emit('loaderror')
    return
  }

  clearCurrent()

  const obj = src.clone(true)
  obj.position.set(0, 0, 0)
  obj.rotation.set(0, 0, 0)

  // Recentre on the mesh's bounds and frame the camera to fit.
  const box = new THREE.Box3().setFromObject(obj)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())
  obj.position.sub(center)

  applyWireframe(obj, props.wireframe)
  scene.add(obj)
  current = obj

  const radius = Math.max(size.x, size.y, size.z) * 0.5 || 0.5
  const fov = (camera.fov * Math.PI) / 180
  const dist = (radius / Math.sin(fov / 2)) * 1.4
  camera.position.set(dist * 0.7, dist * 0.55, dist)
  camera.near = dist / 100
  camera.far = dist * 10
  camera.updateProjectionMatrix()
  controls.target.set(0, 0, 0)
  controls.autoRotate = !reducedMotion
  controls.update()

  rebuildLights(mesh)
}

let lightGroup: import('three').Group | null = null
function rebuildLights(mesh: Mesh) {
  if (lightGroup) scene.remove(lightGroup)
  lightGroup = new THREE.Group()
  const rig = PACKS[mesh.pack].lighting
  scene.background = new THREE.Color(rig.background)

  const key = new THREE.DirectionalLight(rig.key.color, rig.key.intensity)
  key.position.set(...rig.key.position)
  const fill = new THREE.DirectionalLight(rig.fill.color, rig.fill.intensity)
  fill.position.set(...rig.fill.position)
  const ambient = new THREE.HemisphereLight(
    rig.ambient.color,
    rig.background,
    rig.ambient.intensity,
  )
  lightGroup.add(key, fill, ambient)
  scene.add(lightGroup)
}

function applyWireframe(root: import('three').Object3D, on: boolean) {
  root.traverse((obj) => {
    const m = obj as import('three').Mesh
    if (!m.isMesh) return
    const mats = Array.isArray(m.material) ? m.material : [m.material]
    mats.forEach((mat) => {
      const std = mat as import('three').MeshStandardMaterial
      if ('wireframe' in std) std.wireframe = on
    })
  })
}

function resize() {
  if (!renderer || !canvasRef.value) return
  const el = canvasRef.value
  const w = el.clientWidth || 1
  const h = el.clientHeight || 1
  renderer.setSize(w, h, false)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
}

let framedOnce = false
function animate() {
  raf = requestAnimationFrame(animate)
  if (!renderer) return
  if (!controls.autoRotate && !reducedMotion && performance.now() > idleUntil) {
    controls.autoRotate = true
  }
  controls.update()
  renderer.render(scene, camera)
  if (!framedOnce) {
    framedOnce = true
    emit('ready')
  }
}

watch(
  () => props.mesh.slug,
  () => {
    if (started.value && loaded.size) showMesh(props.mesh)
  },
)

watch(
  () => props.wireframe,
  (on) => {
    if (current) applyWireframe(current, on)
  },
)

onMounted(setup)

onBeforeUnmount(() => {
  disposed = true
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
  clearCurrent()
  scene?.environment?.dispose()
  controls?.dispose()
  loaded.forEach((s) =>
    s.traverse((obj) => {
      const m = obj as import('three').Mesh
      if (m.isMesh) {
        m.geometry?.dispose()
        const mat = m.material
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
        else mat?.dispose()
      }
    }),
  )
  renderer?.dispose()
  renderer = null
})
</script>

<template>
  <canvas ref="canvas" class="mesh-viewer__canvas" />
</template>

<style scoped>
.mesh-viewer__canvas {
  display: block;
  width: 100%;
  height: 100%;
  touch-action: none;
}
</style>
