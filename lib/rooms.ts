/**
 * Room data for both units.
 *
 * `status` is the only field that changes often — edit the string here and the
 * badge updates everywhere on the site. No other code changes needed.
 *
 * Room photography is currently placeholder. Replace the `photos` entries with
 * the real shoot (3–5 per room) when it lands.
 */

export type RoomStatus = 'Occupied' | 'Available' | 'Coming Soon'

export type UnitId = 'studios' | 'yard'

export type Photo = { src: string; alt: string }

export type Room = {
  slug: string
  name: string
  kind: 'studio' | 'office'
  unit: UnitId
  area: string
  dimensions: string
  features: string[]
  status: RoomStatus
  floorPlan: string
  floorPlanPng: string
  blurb: string
  photos: Photo[]
  /** Slugs from lib/people.ts */
  occupants: string[]
}

export type Unit = {
  id: UnitId
  name: string
  shortName: string
  unitNumber: string
  floor: string
  intro: string
  sharedSpaces: string
  hero: Photo
}

export const units: Unit[] = [
  {
    id: 'studios',
    name: 'Brockley Fields Studios',
    shortName: 'Studios',
    unitNumber: 'Unit 1',
    floor: 'Upstairs',
    intro:
      'Three studios with floor-to-ceiling windows and two with outlooks over green space.',
    sharedSpaces: 'Kitchen/dining area and 17 m² communal space.',
    hero: {
      src: '/images/window-green.png',
      alt: 'A floor-to-ceiling studio window looking out onto green trees',
    },
  },
  {
    id: 'yard',
    name: 'Brockley Fields The Yard',
    shortName: 'The Yard',
    unitNumber: 'Unit 2',
    floor: 'Downstairs',
    intro: 'Two music studios and two offices. More of a hangout vibe.',
    sharedSpaces: '25 m² reception/communal area, kitchen/dining, bathroom.',
    hero: {
      src: '/images/yard.png',
      alt: 'The enclosed courtyard behind the Yard unit, with a bench and climbing vine',
    },
  },
]

export const rooms: Room[] = [
  // ── Brockley Fields Studios — upstairs ──────────────────────────────────
  {
    slug: 'upstairs-studio-1',
    name: 'Studio 1',
    kind: 'studio',
    unit: 'studios',
    area: '16.5 m²',
    dimensions: '3677 × 4500 mm',
    features: ['Floor-to-ceiling window', 'Green outlook'],
    status: 'Occupied',
    floorPlan: '/floorplans/upstairs-studio-1.svg',
    floorPlanPng:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/upstairs-studio-1-t3SWDDp7saD618o6RAYhe1bzH9WxD0.png',
    blurb:
      'A square, calm room at the front of the building. The window runs the full width of one wall, so the light changes all day and you always know what the weather is doing.',
    photos: [
      { src: '/images/room-a.png', alt: 'Studio 1 upstairs, empty, with tall window and wood floor' },
      { src: '/images/window-green.png', alt: 'The green outlook from Studio 1' },
      { src: '/images/detail-plaster.png', alt: 'Bare plaster wall detail in Studio 1' },
    ],
    occupants: ['naomi-achebe'],
  },
  {
    slug: 'upstairs-studio-2',
    name: 'Studio 2',
    kind: 'studio',
    unit: 'studios',
    area: '26 m²',
    dimensions: '4005 × 6630 mm',
    features: ['Floor-to-ceiling window', 'Green outlook'],
    status: 'Occupied',
    floorPlan: '/floorplans/upstairs-studio-2.svg',
    floorPlanPng:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/upstairs-studio-2-SbbmfXA0vmVjSXedLG5WcBLMpwuRFU.png',
    blurb:
      'The largest room in the building. Long enough to put a live area at one end and still have a proper working position at the other. Two people share it comfortably.',
    photos: [
      { src: '/images/hero-studio.png', alt: 'Studio 2 upstairs, the largest room, empty' },
      { src: '/images/room-d.png', alt: 'The far end of Studio 2 with acoustic treatment' },
      { src: '/images/corridor.png', alt: 'The soundproofed door into Studio 2' },
    ],
    occupants: ['rob-danson', 'dev-raichura'],
  },
  {
    slug: 'upstairs-studio-3',
    name: 'Studio 3',
    kind: 'studio',
    unit: 'studios',
    area: '14 m²',
    dimensions: '4040 × 3500 mm',
    features: ['Floor-to-ceiling window', 'Natural light'],
    status: 'Occupied',
    floorPlan: '/floorplans/upstairs-studio-3.svg',
    floorPlanPng:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/upstairs-studio-3-nHnqNXkZY3oJ8OpYYOdKD9FgnkvCBU.png',
    blurb:
      'The smallest of the upstairs rooms and the one people are most surprised by. Wide rather than deep, with the window along the long wall — it feels much bigger than the number suggests.',
    photos: [
      { src: '/images/room-c.png', alt: 'Studio 3 upstairs, empty, with a desk beneath the window' },
      { src: '/images/detail-plaster.png', alt: 'Plaster and timber detail in Studio 3' },
    ],
    occupants: ['mei-lindqvist'],
  },

  // ── The Yard — downstairs ──────────────────────────────────────────────
  {
    slug: 'yard-studio-1',
    name: 'Studio 1',
    kind: 'studio',
    unit: 'yard',
    area: '16 m²',
    dimensions: '3800 × 4000 mm',
    features: ['Soundproofed and treated', 'Natural light'],
    status: 'Occupied',
    floorPlan: '/floorplans/yard-studio-1.svg',
    floorPlanPng:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yard-studio-1-eZnMEQigAhEP9qJjcVx6bxkC60kzKu.png',
    blurb:
      'Almost exactly square, which makes it forgiving to set up in. Opens straight onto the Yard communal area, so it is the most sociable room in the building.',
    photos: [
      { src: '/images/room-b.png', alt: 'The Yard Studio 1, empty, with soundproofed door' },
      { src: '/images/communal.png', alt: 'The Yard communal area outside Studio 1' },
    ],
    occupants: ['kofi-bell-hughes', 'sam-ojo'],
  },
  {
    slug: 'yard-studio-2',
    name: 'Studio 2',
    kind: 'studio',
    unit: 'yard',
    area: '17 m²',
    dimensions: '3900 × 5000 mm',
    features: ['Soundproofed and treated', 'Natural light', 'L-shaped'],
    status: 'Occupied',
    floorPlan: '/floorplans/yard-studio-2.svg',
    floorPlanPng:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yard-studio-2-ArsLuSaK9uKXtyE6NiBE7JGhXMFq1H.png',
    blurb:
      'The L-shape is a gift rather than a compromise — the return gives you a natural booth without building one. Fire exit off the short leg.',
    photos: [
      { src: '/images/room-d.png', alt: 'The Yard Studio 2, empty, showing the L-shaped return' },
      { src: '/images/yard.png', alt: 'The courtyard beyond Studio 2' },
    ],
    occupants: ['orla-finn', 'delroy-pierce'],
  },
  {
    slug: 'yard-office-1',
    name: 'Office 1',
    kind: 'office',
    unit: 'yard',
    area: '9 m²',
    dimensions: '2600 × 3570 mm',
    features: ['Private office'],
    status: 'Occupied',
    floorPlan: '/floorplans/yard-office-1.svg',
    floorPlanPng:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yard-office-1-akgbTa3K0rbyHElDzGOQU9VWeXSeQ0.png',
    blurb:
      'A proper door-closing office for anyone who spends their day on calls rather than in a session. Window along the full front wall.',
    photos: [
      { src: '/images/room-c.png', alt: 'Office 1 in the Yard, empty, with a desk under the window' },
    ],
    occupants: ['yasmin-haddad'],
  },
  {
    slug: 'yard-office-2',
    name: 'Office 2',
    kind: 'office',
    unit: 'yard',
    area: '8 m²',
    dimensions: '2470 × 3250 mm',
    features: ['Private office'],
    status: 'Occupied',
    floorPlan: '/floorplans/yard-office-2.svg',
    floorPlanPng:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yard-office-2-jep6Z2FF74vDmxxsnc0EGwC56TeuIr.png',
    blurb:
      'The smallest space we have, and the quietest corner of the Yard. Room for a desk, a chair and a filing cabinet you will never open.',
    photos: [
      { src: '/images/room-c.png', alt: 'Office 2 in the Yard, empty' },
    ],
    occupants: ['gerry-wallace'],
  },
]

export function getUnit(id: UnitId): Unit {
  const unit = units.find((u) => u.id === id)
  if (!unit) throw new Error(`Unknown unit: ${id}`)
  return unit
}

export function getRoom(slug: string): Room | undefined {
  return rooms.find((r) => r.slug === slug)
}

export function roomsForUnit(id: UnitId): Room[] {
  return rooms.filter((r) => r.unit === id)
}

/** "Studio 1 · Brockley Fields Studios" — used in the waiting list dropdown. */
export function roomLabel(room: Room): string {
  return `${room.name} · ${getUnit(room.unit).name}`
}

export const studioCount = rooms.filter((r) => r.kind === 'studio').length
export const officeCount = rooms.filter((r) => r.kind === 'office').length
