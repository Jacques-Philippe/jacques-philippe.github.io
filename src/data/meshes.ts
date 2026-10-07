/*
 * Mesh gallery manifest (issue 0014 / docs/adr/0007).
 *
 * Free-tier meshes only, merged from six packs: the Office and Warehouse
 * environment packs, the Medieval Environment Pack, and the Medieval, Office,
 * and Warehouse Characters Packs. This file is an artifact derived from the
 * pack repos, not a build output — CI here has no access to them. Refresh
 * steps: docs/mesh-gallery-refresh.md.
 *
 * `slug` is flat and globally unique across packs (packs share mesh names):
 * it is the manifest key, the `?mesh=` query value, the card DOM id, and the
 * thumbnail filename (`<slug>.webp`). `node` is the name of the node inside
 * that pack's bundled `.glb`. Characters are baked to static rest-pose meshes
 * at export, so every node is a plain static mesh.
 */
import medievalCharactersPackGlb from '../../assets/models/medieval-characters-pack.glb?url'
import medievalEnvironmentPackGlb from '../../assets/models/medieval-environment-pack.glb?url'
import officeCharactersPackGlb from '../../assets/models/office-characters-pack.glb?url'
import officePackGlb from '../../assets/models/office-pack.glb?url'
import warehouseCharactersPackGlb from '../../assets/models/warehouse-characters-pack.glb?url'
import warehousePackGlb from '../../assets/models/warehouse-pack.glb?url'
import { thumbnail } from './thumbnails'

export type PackId =
  | 'office'
  | 'warehouse'
  | 'medieval-environment'
  | 'medieval-characters'
  | 'office-characters'
  | 'warehouse-characters'

export interface Pack {
  id: PackId
  /** Full display name, e.g. "Office Pack". */
  label: string
  /** Short label for the card badge and viewer chrome. */
  shortLabel: string
  /** Built URL of the bundled, Meshopt-compressed `.glb` for this pack. */
  glbUrl: string
  /** The prominent "get this pack" call to action shown in the viewer. */
  cta: { label: string; href: string }
  /**
   * Lighting rig, roughly matching each pack's DESIGN.md §8. Colour
   * temperatures are pre-converted to linear-ish sRGB hex; intensities are
   * tuned for the neutral studio look the section describes.
   */
  lighting: {
    key: { color: number; intensity: number; position: [number, number, number] }
    fill: { color: number; intensity: number; position: [number, number, number] }
    ambient: { color: number; intensity: number }
    background: number
  }
}

// The three Characters Packs share one neutral daylight studio (their DESIGN.md
// §8): a warm-white ~5500 K key from front-left and above, a cool sky fill.
const CHARACTER_LIGHTING: Pack['lighting'] = {
  key: { color: 0xffede0, intensity: 2.2, position: [-4, 6, 5] },
  fill: { color: 0xc8d4ea, intensity: 0.5, position: [5, 2, -4] },
  ambient: { color: 0xffffff, intensity: 0.15 },
  background: 0x15171b,
}

// Insertion order is the pack filter's option order.
export const PACKS: Record<PackId, Pack> = {
  office: {
    id: 'office',
    label: 'Office Pack',
    shortLabel: 'Office',
    glbUrl: officePackGlb,
    cta: {
      label: 'Get the Office Pack →',
      href: 'https://assetstore.unity.com/packages/3d/environments/industrial/low-poly-office-pack-394148',
    },
    lighting: {
      // ~6500 K cool-neutral daylight key, neutral grey fill. IBL fills the
      // shadows; these give the mesh its form and a clean highlight.
      key: { color: 0xfff4e8, intensity: 2.2, position: [4, 6, 5] },
      fill: { color: 0xdfe7f0, intensity: 0.5, position: [-5, 2, -4] },
      ambient: { color: 0xffffff, intensity: 0.15 },
      background: 0x12181f,
    },
  },
  warehouse: {
    id: 'warehouse',
    label: 'Warehouse Pack',
    shortLabel: 'Warehouse',
    glbUrl: warehousePackGlb,
    // The Warehouse Pack has no marketplace page yet — funnel to the Assets page.
    cta: { label: 'See the Warehouse Pack →', href: '/assets' },
    lighting: {
      // ~6000 K daylight key with a warm ~3000 K high-bay fill. IBL fills the
      // shadows; these give the mesh its form and a clean highlight.
      key: { color: 0xfff1df, intensity: 2.2, position: [4, 6, 5] },
      fill: { color: 0xffd8a8, intensity: 0.6, position: [-5, 3, -4] },
      ambient: { color: 0xffffff, intensity: 0.12 },
      background: 0x14140f,
    },
  },
  'medieval-environment': {
    id: 'medieval-environment',
    label: 'Medieval Environment Pack',
    shortLabel: 'Medieval',
    glbUrl: medievalEnvironmentPackGlb,
    // Asset Store listing still in review (docs/issues/0019) — itch.io until then.
    cta: {
      label: 'Get the Medieval Environment Pack →',
      href: 'https://fromqcwithgamedev.itch.io/medieval-environment-pack',
    },
    lighting: {
      // The pack's DESIGN.md §8 is still TODO: a warm afternoon-sun key with a
      // cool sky fill, to suit the outdoor village props.
      key: { color: 0xfff0d6, intensity: 2.2, position: [4, 6, 5] },
      fill: { color: 0xcfe0f5, intensity: 0.55, position: [-5, 3, -4] },
      ambient: { color: 0xffffff, intensity: 0.15 },
      background: 0x141811,
    },
  },
  'medieval-characters': {
    id: 'medieval-characters',
    label: 'Medieval Characters Pack',
    shortLabel: 'Medieval Characters',
    glbUrl: medievalCharactersPackGlb,
    cta: {
      label: 'Get the Medieval Characters Pack →',
      href: 'https://assetstore.unity.com/packages/3d/characters/medieval-characters-pack-lite-411742',
    },
    lighting: CHARACTER_LIGHTING,
  },
  'office-characters': {
    id: 'office-characters',
    label: 'Office Characters Pack',
    shortLabel: 'Office Characters',
    glbUrl: officeCharactersPackGlb,
    // Asset Store listing still in review (docs/issues/0019) — itch.io until then.
    cta: {
      label: 'Get the Office Characters Pack →',
      href: 'https://fromqcwithgamedev.itch.io/office-characters-pack-low-poly-rigged-office-cast',
    },
    lighting: CHARACTER_LIGHTING,
  },
  'warehouse-characters': {
    id: 'warehouse-characters',
    label: 'Warehouse Characters Pack',
    shortLabel: 'Warehouse Characters',
    glbUrl: warehouseCharactersPackGlb,
    // Asset Store listing still in review (docs/issues/0019) — itch.io until then.
    cta: {
      label: 'Get the Warehouse Characters Pack →',
      href: 'https://fromqcwithgamedev.itch.io/warehouse-characters-pack-low-poly-rigged-warehouse-cast',
    },
    lighting: CHARACTER_LIGHTING,
  },
}

export interface Mesh {
  slug: string
  name: string
  pack: PackId
  /** Node name inside `PACKS[pack].glbUrl`. */
  node: string
  /** Built URL of the ~640 px WebP card preview / viewer backdrop. */
  preview: string
  triangles: number
}

// Sorted pack-then-alpha, packs in PACKS order. Display names are hand-set.
const RAW: Omit<Mesh, 'preview'>[] = [
  { slug: 'office-chair', name: 'Chair', pack: 'office', node: 'Chair', triangles: 998 },
  { slug: 'office-coffee-mug', name: 'Coffee Mug', pack: 'office', node: 'CoffeeMug', triangles: 272 },
  { slug: 'office-cubicle-divider', name: 'Cubicle Divider', pack: 'office', node: 'CubicleDivider', triangles: 132 },
  { slug: 'office-desk', name: 'Desk', pack: 'office', node: 'Desk', triangles: 700 },
  { slug: 'office-desk-lamp', name: 'Desk Lamp', pack: 'office', node: 'DeskLamp', triangles: 212 },
  { slug: 'office-desk-picture', name: 'Desk Picture', pack: 'office', node: 'DeskPicture', triangles: 58 },
  { slug: 'office-laptop', name: 'Laptop', pack: 'office', node: 'Laptop', triangles: 102 },
  { slug: 'office-monitor', name: 'Monitor', pack: 'office', node: 'Monitor', triangles: 134 },
  { slug: 'office-potted-plant', name: 'Potted Plant', pack: 'office', node: 'PottedPlant', triangles: 112 },
  { slug: 'office-wall-picture', name: 'Wall Picture', pack: 'office', node: 'WallPicture', triangles: 46 },
  { slug: 'warehouse-assembled-cardboard-box', name: 'Assembled Cardboard Box', pack: 'warehouse', node: 'AssembledCardboardBox', triangles: 176 },
  { slug: 'warehouse-blank-a-frame-sign', name: 'Blank A-Frame Sign', pack: 'warehouse', node: 'BlankAFrameSign', triangles: 220 },
  { slug: 'warehouse-boltless-shelving-unit', name: 'Boltless Shelving Unit', pack: 'warehouse', node: 'BoltlessShelvingUnit', triangles: 804 },
  { slug: 'warehouse-dock-bumper', name: 'Dock Bumper', pack: 'warehouse', node: 'DockBumper', triangles: 224 },
  { slug: 'warehouse-euro-pallet', name: 'Euro Pallet', pack: 'warehouse', node: 'EuroPallet', triangles: 792 },
  { slug: 'warehouse-floor-line-kit', name: 'Floor Line Kit', pack: 'warehouse', node: 'FloorLineKit', triangles: 180 },
  { slug: 'warehouse-hand-pallet-jack', name: 'Hand Pallet Jack', pack: 'warehouse', node: 'HandPalletJack', triangles: 788 },
  { slug: 'warehouse-high-bay-light', name: 'High Bay Light', pack: 'warehouse', node: 'HighBayLight', triangles: 192 },
  { slug: 'warehouse-packing-table', name: 'Packing Table', pack: 'warehouse', node: 'PackingTable', triangles: 680 },
  { slug: 'warehouse-pallet-rack-add-on-bay', name: 'Pallet Rack — Add-On Bay', pack: 'warehouse', node: 'PalletRack_AddOnBay', triangles: 2048 },
  { slug: 'warehouse-pallet-rack-start-bay', name: 'Pallet Rack — Start Bay', pack: 'warehouse', node: 'PalletRack_StartBay', triangles: 2704 },
  { slug: 'warehouse-rack-upright-post-protector', name: 'Rack Upright Post Protector', pack: 'warehouse', node: 'RackUprightPostProtector', triangles: 136 },
  { slug: 'warehouse-sectional-overhead-door', name: 'Sectional Overhead Door', pack: 'warehouse', node: 'SectionalOverheadDoor', triangles: 1116 },
  { slug: 'warehouse-shipped-parcel', name: 'Shipped Parcel', pack: 'warehouse', node: 'ShippedParcel', triangles: 220 },
  { slug: 'warehouse-stacking-tote', name: 'Stacking Tote', pack: 'warehouse', node: 'StackingTote', triangles: 404 },
  { slug: 'medieval-environment-barrel', name: 'Barrel', pack: 'medieval-environment', node: 'SM_Barrel', triangles: 134 },
  { slug: 'medieval-environment-bench-wood', name: 'Wooden Bench', pack: 'medieval-environment', node: 'SM_Bench_Wood', triangles: 36 },
  { slug: 'medieval-environment-bucket', name: 'Bucket', pack: 'medieval-environment', node: 'SM_Bucket', triangles: 148 },
  { slug: 'medieval-environment-bush', name: 'Bush', pack: 'medieval-environment', node: 'SM_Bush', triangles: 40 },
  { slug: 'medieval-environment-crate', name: 'Crate', pack: 'medieval-environment', node: 'SM_Crate', triangles: 156 },
  { slug: 'medieval-environment-door-single', name: 'Single Door', pack: 'medieval-environment', node: 'SM_Door_Single', triangles: 48 },
  { slug: 'medieval-environment-fence-wood-2m', name: 'Wooden Fence — 2 m', pack: 'medieval-environment', node: 'SM_Fence_Wood_2m', triangles: 60 },
  { slug: 'medieval-environment-flowers', name: 'Flowers', pack: 'medieval-environment', node: 'SM_Flowers', triangles: 148 },
  { slug: 'medieval-environment-grass-tuft', name: 'Grass Tuft', pack: 'medieval-environment', node: 'SM_Grass_Tuft', triangles: 28 },
  { slug: 'medieval-environment-hay-bale', name: 'Hay Bale', pack: 'medieval-environment', node: 'SM_Hay_Bale', triangles: 36 },
  { slug: 'medieval-environment-house-small', name: 'Small House', pack: 'medieval-environment', node: 'SM_House_Small', triangles: 200 },
  { slug: 'medieval-environment-log', name: 'Log', pack: 'medieval-environment', node: 'SM_Log', triangles: 78 },
  { slug: 'medieval-environment-rock-large', name: 'Large Rock', pack: 'medieval-environment', node: 'SM_Rock_Large', triangles: 20 },
  { slug: 'medieval-environment-rock-small', name: 'Small Rock', pack: 'medieval-environment', node: 'SM_Rock_Small', triangles: 40 },
  { slug: 'medieval-environment-sack', name: 'Sack', pack: 'medieval-environment', node: 'SM_Sack', triangles: 60 },
  { slug: 'medieval-environment-signpost', name: 'Signpost', pack: 'medieval-environment', node: 'SM_Signpost', triangles: 48 },
  { slug: 'medieval-environment-table-wood', name: 'Wooden Table', pack: 'medieval-environment', node: 'SM_Table_Wood', triangles: 60 },
  { slug: 'medieval-environment-tree-oak', name: 'Oak Tree', pack: 'medieval-environment', node: 'SM_Tree_Oak', triangles: 80 },
  { slug: 'medieval-environment-tree-pine', name: 'Pine Tree', pack: 'medieval-environment', node: 'SM_Tree_Pine', triangles: 56 },
  { slug: 'medieval-environment-tree-stump', name: 'Tree Stump', pack: 'medieval-environment', node: 'SM_Tree_Stump', triangles: 72 },
  { slug: 'medieval-environment-wall-stone-4m', name: 'Stone Wall — 4 m', pack: 'medieval-environment', node: 'SM_Wall_Stone_4m', triangles: 84 },
  { slug: 'medieval-environment-wall-stone-pillar', name: 'Stone Wall Pillar', pack: 'medieval-environment', node: 'SM_Wall_Stone_Pillar', triangles: 84 },
  { slug: 'medieval-environment-well', name: 'Well', pack: 'medieval-environment', node: 'SM_Well', triangles: 128 },
  { slug: 'medieval-characters-archer', name: 'Archer', pack: 'medieval-characters', node: 'Archer', triangles: 2484 },
  { slug: 'medieval-characters-farmer', name: 'Farmer', pack: 'medieval-characters', node: 'Farmer', triangles: 2576 },
  { slug: 'medieval-characters-knight', name: 'Knight', pack: 'medieval-characters', node: 'Knight', triangles: 2092 },
  { slug: 'medieval-characters-town-guard', name: 'Town Guard', pack: 'medieval-characters', node: 'TownGuard', triangles: 2388 },
  { slug: 'medieval-characters-wizard', name: 'Wizard', pack: 'medieval-characters', node: 'Wizard', triangles: 2256 },
  { slug: 'office-characters-janitor', name: 'Janitor', pack: 'office-characters', node: 'Janitor', triangles: 2192 },
  { slug: 'office-characters-manager', name: 'Manager', pack: 'office-characters', node: 'Manager', triangles: 2196 },
  { slug: 'office-characters-office-worker', name: 'Office Worker', pack: 'office-characters', node: 'OfficeWorker', triangles: 1876 },
  { slug: 'office-characters-receptionist', name: 'Receptionist', pack: 'office-characters', node: 'Receptionist', triangles: 2036 },
  { slug: 'warehouse-characters-forklift-operator', name: 'Forklift Operator', pack: 'warehouse-characters', node: 'ForkliftOperator', triangles: 2322 },
  { slug: 'warehouse-characters-picker', name: 'Picker', pack: 'warehouse-characters', node: 'Picker', triangles: 1956 },
  { slug: 'warehouse-characters-supervisor', name: 'Supervisor', pack: 'warehouse-characters', node: 'Supervisor', triangles: 1806 },
  { slug: 'warehouse-characters-warehouse-worker', name: 'Warehouse Worker', pack: 'warehouse-characters', node: 'WarehouseWorker', triangles: 1564 },
]

export const meshes: Mesh[] = RAW.map((m) => ({
  ...m,
  preview: thumbnail(`${m.slug}.webp`),
}))

export const meshBySlug: Map<string, Mesh> = new Map(
  meshes.map((m) => [m.slug, m]),
)
