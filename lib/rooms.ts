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

/**
 * A walkthrough clip for a room. Optional per room, and shown after the photos
 * where present. `poster` is the still shown before playback: nothing but the
 * poster downloads until the visitor asks for it, so the clip stays off the
 * critical path. Clips are silent, so there is no audio to caption;
 * `description` is the accessible name for the player.
 *
 * `caption` is printed under the player and is not decorative — a clip filmed
 * at a different time from the photographs has to say so, or it reads as the
 * room's current state.
 */
export type RoomVideo = {
  src: string
  poster: string
  description: string
  caption?: string
}

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
  /** Walkthrough clip, shown after the photos. Omit where there isn't one. */
  video?: RoomVideo
  /** Slugs from lib/people.ts */
  occupants: string[]
}

export type Unit = {
  id: UnitId
  name: string
  shortName: string
  /**
   * How the building is named in a resident's location tag (e.g. "Studio 1 ·
   * Brockley Fields"). Falls back to shortName when omitted, so this only
   * overrides the person-facing labels and never the unit/room page copy.
   */
  residentLabel?: string
  unitNumber: string
  intro: string
  sharedSpaces: string
  hero: Photo
  /** Longer description, one string per paragraph, for the unit overview page. */
  overview: string[]
  /** Photographs of the unit as a whole — the communal parts, not the rooms. */
  gallery: Photo[]
  /**
   * Whole-unit layout drawing for the overview page. Optional: the overview
   * page simply omits the plan block until a drawing is supplied here, so
   * nothing renders broken in the meantime.
   */
  unitPlan?: Photo
}

export const units: Unit[] = [
  {
    id: 'studios',
    name: 'Brockley Fields Studios',
    shortName: 'Studios',
    residentLabel: 'Brockley Fields',
    unitNumber: 'Unit 1',
    intro: 'Three studios with floor-to-ceiling windows, two with outlooks over green space.',
    sharedSpaces: 'Kitchen/dining area and 17 m² communal space.',
    hero: {
      src: '/images/studios-kitchen-diner.jpg',
      alt: 'The shared kitchen and dining area at Brockley Fields Studios: green shaker cabinets with timber worktops, a butler sink and metro-tiled splashback, an open shelf of bottles and glasses, a red leather chair and a double bass by the window onto the courtyard',
    },
    overview: [
      'Unit 1 is the quieter of the two. Three studios off a single corridor, each one soundproofed and acoustically treated, with a kitchen and dining area at the end that everybody ends up in at some point during the day.',
      'Every room has a floor-to-ceiling window and two of the three look out over green space. It is the unit people choose when they want to put their head down and work — sociable when you want it, easy to disappear into when you do not.',
    ],
    /*
     * Real photography. The first is the wide lead image on the unit page and
     * the other three form the row beneath it, so the lead is the landscape
     * file — the portrait ones would be cropped hard at 16/9.
     */
    gallery: [
      {
        src: '/images/studios-piano.jpg',
        alt: 'The corner of a studio: an open upright piano beneath gold discs and the Brockley Fields Studios neon sign, an accordion on the floor and a chair by the windows',
      },
      {
        src: '/images/studios-live-room.jpg',
        alt: 'A drum kit set up and miked in front of the full-height studio windows, with an upright piano to one side',
      },
      {
        src: '/images/studios-empty-room.jpg',
        alt: 'An empty studio: dark acoustic panelling, wide oak boards, a suspended acoustic cloud overhead and a floor-to-ceiling window looking onto trees',
      },
      {
        src: '/images/studios-kitchen.jpg',
        alt: 'The shared kitchen and dining area: green cabinets, a butler sink and a long timber worktop',
      },
    ],
  },
  {
    id: 'yard',
    name: 'Brockley Fields The Yard',
    shortName: 'The Yard',
    unitNumber: 'Unit 2',
    intro: 'Two music studios and two offices. More of a hangout vibe.',
    sharedSpaces: '25 m² reception/communal area, kitchen/dining, bathroom.',
    hero: {
      src: '/images/yard-hero.jpg',
      alt: 'The kitchen and dining area at the Yard, with a plywood table, red chairs and framed record sleeves',
    },
    overview: [
      'Unit 2 is built around its middle. A 25 m² reception and communal area sits at the centre, with two music studios and two private offices opening off it, plus a kitchen, dining area and bathroom.',
      'That layout makes it the more social of the two units — you cannot really cross it without talking to somebody. The two offices suit anyone whose day is mostly calls rather than sessions, and there is a courtyard out the back for when a room stops being the answer.',
    ],
    /*
     * Real photography, same shape as the Studios gallery above: one lead
     * photograph at 16/9 and three across beneath it at 4/3. yard-hero.jpg is
     * reused rather than saved twice — the hero only appears on the home and
     * studios index pages, never here, so there is no repeat within a page.
     */
    gallery: [
      {
        src: '/images/yard-hero.jpg',
        alt: 'The kitchen and dining area at the Yard: a plywood table with red steel chairs, a long oak worktop and framed record sleeves along the wall',
      },
      {
        src: '/images/yard-studio.jpg',
        alt: 'One of the two music studios at the Yard: a desk with monitor speakers and a mixing desk, an acoustic guitar on a stand, an upright piano miked up and a drum kit in the foreground',
      },
      {
        src: '/images/yard-lounge.jpg',
        alt: 'The communal corner at the Yard: a sofa with mustard cushions in the afternoon sun, a monstera by the window and a green step ladder against the wall',
      },
      {
        src: '/images/yard-shelves.jpg',
        alt: 'A corner of the Yard kitchen: wire shelves holding a clock, bottles and trailing pothos above a tiled splashback and oak worktop',
      },
    ],
  },
]

export const rooms: Room[] = [
  // ── Brockley Fields Studios ─────────────────────────────────────────────
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
    /*
     * Real photography, all 4/3 so the files sit in the grid cells uncropped —
     * the portrait original was cropped to 4/3 on the way in rather than left
     * to a centre crop. The empty wide shot leads because it reads as the room
     * and only it gives up height to the 16/9 lead slot; the furnished shot
     * follows, since the room is let and this is how it is actually used.
     */
    photos: [
      {
        src: '/images/upstairs-studio-1-empty.jpg',
        alt: 'Studio 1 at Brockley Fields Studios, empty, showing the grey acoustic panelling, the cloud panel in the ceiling, the oak floor and the full-width window',
      },
      {
        src: '/images/upstairs-studio-1-desk.jpg',
        alt: 'Studio 1 in use: a standing desk with a session open on screen, monitor speakers and racks of outboard gear, a yellow armchair and sofa by the window and an electric piano in the foreground',
      },
      {
        src: '/images/upstairs-studio-1-window.jpg',
        alt: 'The full-width window in Studio 1 looking straight out into the trees, with the blind rolled up and acoustic panels either side',
      },
    ],
    occupants: ['scott-verrill'],
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
      'The largest room in the building. Long enough to put a live area at one end and still have a proper working position at the other.',
    /*
     * Real photography, all 4/3 so the files sit in the grid cells uncropped —
     * the two portrait originals were cropped to 4/3 on the way in rather than
     * left to a centre crop. The desk shot leads because it reads as the room,
     * and only it has to give up height to the 16/9 lead slot. Five photos fill
     * the two-column grid evenly: one lead, then two full rows.
     */
    photos: [
      {
        src: '/images/upstairs-studio-2-desk.jpg',
        alt: 'The working end of Studio 2: a wooden desk with monitor speakers and outboard racks, a Fender Precision bass on a stand and shelves of synthesisers along the wall',
      },
      {
        src: '/images/upstairs-studio-2-window.jpg',
        alt: 'The far end of Studio 2, with floor-to-ceiling glazing onto the trees, an armchair, an accordion on the floor and the upright piano in the corner',
      },
      {
        src: '/images/upstairs-studio-2-sofa.jpg',
        alt: 'The sofa corner of Studio 2: a brown leather sofa with a bouzouki resting on it, plywood cube shelving of books and records above, and an acoustic guitar and old television beside it',
      },
      {
        src: '/images/upstairs-studio-2-piano.jpg',
        alt: 'The upright piano in Studio 2 with its front removed to show the hammers and strings, beneath a Brockley Fields Studios neon sign and a fringed lamp',
      },
      {
        src: '/images/upstairs-studio-2-wurlitzer.jpg',
        alt: 'A Wurlitzer electronic piano in Studio 2 with a vintage Sankei organ resting on top and record sleeves propped behind',
      },
    ],
    occupants: ['carey-willetts'],
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
      'The smallest of the three Studios rooms and the one people are most surprised by. Wide rather than deep, with the window along the long wall — it feels much bigger than the number suggests.',
    photos: [
      {
        src: '/images/room-c.png',
        alt: 'Studio 3 at Brockley Fields Studios, empty, with a desk beneath the window',
      },
      { src: '/images/detail-plaster.png', alt: 'Plaster and timber detail in Studio 3' },
    ],
    occupants: ['matt-rist', 'josh-ager'],
  },

  // ── Brockley Fields The Yard ────────────────────────────────────────────
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
    /*
     * Real photography, all 4/3 so the files sit in the grid cells uncropped —
     * the portrait original was cropped to 4/3 on the way in rather than left
     * to a centre crop. The room is let and fully kitted out, so the wide shot
     * of it in use leads; it is also the only one that gives up height to the
     * 16/9 lead slot.
     */
    photos: [
      {
        src: '/images/yard-studio-1-desk.jpg',
        alt: 'Studio 1 in the Yard set up to record: a desk of outboard gear and synths between monitor speakers, a drum kit in the foreground, guitars on stands and an upright piano beside the window',
      },
      {
        src: '/images/yard-studio-1-live-room.jpg',
        alt: 'A wider corner view of Studio 1 in the Yard, showing the drum kit and desk under the treated ceiling panel, with the window onto the Yard and its festoon lights',
      },
      {
        src: '/images/yard-studio-1-sofa.jpg',
        alt: 'The far end of Studio 1 in the Yard: a striped sofa against floor-to-ceiling acoustic panels, the soundproofed door, an archtop guitar hung on the wall and overhead mics above the drum kit',
      },
    ],
    /*
     * Filmed before the tenant moved in, so it shows the empty shell — which is
     * the more useful view for anyone weighing up a room of their own, but only
     * if it is captioned as such. Uncaptioned it would contradict the
     * photographs directly above it.
     */
    video: {
      src: '/videos/yard-studio-1-tour.mp4',
      poster: '/images/yard-studio-1-tour-poster.jpg',
      description:
        'A walk around Studio 1 in the Yard before it was furnished, showing the bare floor, the acoustic panelling, the treated ceiling and the window onto the communal area',
      caption: 'Filmed before the current tenant moved in. No sound.',
    },
    occupants: ['atticus-blue'],
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
    /*
     * Real photography, all 4/3 so the files sit in the grid cells uncropped.
     * The establishing shot leads because it is the one that reads the L-shape.
     * A fourth frame of the piano end was supplied but is close to a duplicate
     * of the lead, so it is left out rather than shown twice.
     */
    photos: [
      {
        src: '/images/yard-studio-2-room.jpg',
        alt: 'Studio 2 in the Yard looking down the long leg of the L: a desk and monitors under the window, racks of synths to the left, an acoustic guitar on a stand and an upright piano miked up on the right',
      },
      {
        src: '/images/yard-studio-2-gear-wall.jpg',
        alt: 'The gear wall in Studio 2 in the Yard: shelves of synthesisers, a rack of outboard preamps and compressors, a tape echo, a valve combo amp and pedals, with a Telecaster hung on the acoustic panelling',
      },
      {
        src: '/images/yard-studio-2-kit.jpg',
        alt: 'The short leg of Studio 2 in the Yard used as a booth: a blue sparkle drum kit on a rug against a large acoustic absorber, a bass and a classical guitar on the wall, and an armchair beside the door',
      },
    ],
    /*
     * As with Studio 1: filmed empty, before the tenant moved in. The bare
     * shell is the more useful view for anyone judging whether their own setup
     * fits, but it has to be captioned or it contradicts the photographs above.
     */
    video: {
      src: '/videos/yard-studio-2-tour.mp4',
      poster: '/images/yard-studio-2-tour-poster.jpg',
      description:
        'A walk around Studio 2 in the Yard before it was furnished, showing the bare floor, the acoustic panelling, the window onto the communal area and the return that forms the short leg of the L',
      caption: 'Filmed before the current tenant moved in. No sound.',
    },
    occupants: ['rich-cooper'],
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
    occupants: ['david-eserin'],
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
    occupants: ['david-eserin'],
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

/**
 * Names several rooms in one breath: "Office 1" alone, or "Office 1 & 2" for
 * somebody holding two. Collapses the shared word when every room is the same
 * kind of space, so it reads as one thing rather than a list.
 */
export function roomsLabel(list: Room[]): string {
  if (list.length === 0) return ''
  if (list.length === 1) return list[0].name

  const words = list.map((room) => room.name.split(' '))
  const prefix = words[0][0]
  const allSamePrefix = words.every((parts) => parts.length === 2 && parts[0] === prefix)

  return allSamePrefix
    ? `${prefix} ${words.map((parts) => parts[1]).join(' & ')}`
    : list.map((room) => room.name).join(' & ')
}

export const studioCount = rooms.filter((r) => r.kind === 'studio').length
export const officeCount = rooms.filter((r) => r.kind === 'office').length

/**
 * Collective total. Copy across the site says either "five studios and two
 * offices" or "seven spaces" — never a bare room count — so the two phrasings
 * always agree. Derived so adding a room updates every page at once.
 */
export const spaceCount = rooms.length
