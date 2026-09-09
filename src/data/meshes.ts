/*
 * Mesh gallery manifest (issue 0014 / docs/adr/0007).
 *
 * Free-tier meshes only, merged from the Office Pack and Warehouse Pack. This
 * file is an artifact copied from the pack repos, not a build output — CI here
 * has no access to the pack generators. Refresh steps: docs/mesh-gallery-refresh.md.
 *
 * `slug` is flat and globally unique across packs (the two packs share many
 * mesh names): it is the manifest key, the `?mesh=` query value, the card DOM
 * id, and the thumbnail filename (`<slug>.webp`). `node` is the name of the
 * node inside that pack's bundled `.glb`.
 */
import officePackGlb from '../../assets/models/office-pack.glb?url'
import warehousePackGlb from '../../assets/models/warehouse-pack.glb?url'
import { thumbnail } from './thumbnails'

export type PackId = 'office' | 'warehouse'

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
      // ~6500 K cool-neutral daylight key, neutral grey fill. Intensities are
      // low because RoomEnvironment IBL does most of the lifting.
      key: { color: 0xfff4e8, intensity: 1.4, position: [4, 6, 5] },
      fill: { color: 0xdfe7f0, intensity: 0.35, position: [-5, 2, -4] },
      ambient: { color: 0xffffff, intensity: 0.12 },
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
      // ~6000 K daylight key with a warm ~3000 K high-bay fill. Low
      // intensities — RoomEnvironment IBL does most of the lifting.
      key: { color: 0xfff1df, intensity: 1.4, position: [4, 6, 5] },
      fill: { color: 0xffd8a8, intensity: 0.45, position: [-5, 3, -4] },
      ambient: { color: 0xffffff, intensity: 0.1 },
      background: 0x14140f,
    },
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

// Sorted pack-then-alpha (see below). Display names are hand-set — only 25 rows.
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
]

export const meshes: Mesh[] = RAW.map((m) => ({
  ...m,
  preview: thumbnail(`${m.slug}.webp`),
}))

export const meshBySlug: Map<string, Mesh> = new Map(
  meshes.map((m) => [m.slug, m]),
)
