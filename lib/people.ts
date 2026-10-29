/**
 * The people of Brockley Fields. Real content only — no placeholders.
 *
 * All seven people in the building are listed. Adding someone with a
 * `roomSlug` puts them on the Community page, the Part of the Family page and
 * their room page at once.
 *
 * `portrait` and `quote` stay undefined until we have the genuine article.
 * Never fill them with an invented quote or a generated likeness — every page
 * is built to omit both cleanly.
 */

export type PersonLink = { label: string; href: string }

export type Person = {
  slug: string
  name: string
  group: 'resident' | 'family'
  disciplines: string[]
  /**
   * What to show where there is only room for one line of role. Defaults to the
   * first discipline, which is enough for most people but drops the second half
   * of a double act like songwriter / producer.
   */
  shortRole?: string
  /** One line that does the work of an introduction. */
  oneLiner: string
  /** 2–3 notable credits. Leave empty if they have none listed. */
  credits: string[]
  /** Their words about the building. Undefined until they have given us one. */
  quote?: string
  /**
   * Pass an array to break a longer bio into paragraphs rather than one
   * unreadable block. Both pages that render a bio handle either form.
   */
  bio: string | string[]
  /** A real photograph. Undefined until they have sent one. */
  portrait?: string
  /** Instagram handle. Undefined for people who do not have one. */
  handle?: string
  links: PersonLink[]
  /** Only for residents — matches a slug in lib/rooms.ts */
  roomSlug?: string
  /**
   * Further rooms the same person occupies, for anyone holding more than one
   * space. Every page reads rooms through `personRoomSlugs` so a second room
   * shows up everywhere at once.
   */
  alsoRoomSlugs?: string[]
  /** Shown instead of a room for extended-circle people. */
  relationship?: string
}

export const people: Person[] = [
  // ── Brockley Fields Studios ────────────────────────────────────────────
  {
    slug: 'scott-verrill',
    name: 'Scott Verrill',
    group: 'resident',
    disciplines: ['Singer', 'Songwriter', 'Producer'],
    oneLiner: 'One half of Good Neighbours, writing and producing out of Studio 1.',
    credits: ['Good Neighbours', 'KYKO'],
    bio: 'Scott Verrill is a singer, songwriter and producer from South London. He is best known as one half of the viral indie-rock duo Good Neighbours alongside Oli Fox, and previously made music and released projects under solo aliases including KYKO.',
    portrait: '/images/people/scott-verrill.webp',
    handle: '@itsgoodscott',
    links: [{ label: 'Instagram', href: 'https://instagram.com/itsgoodscott' }],
    roomSlug: 'upstairs-studio-1',
  },
  {
    slug: 'carey-willetts',
    name: 'Carey Willetts',
    group: 'resident',
    disciplines: ['Songwriter', 'Producer', 'Founder'],
    shortRole: 'Songwriter / Producer',
    oneLiner: 'Songwriter and producer. Founded the building, and writes and produces from Studio 2.',
    credits: ['Athlete', 'Dermot Kennedy', 'Freya Ridings', 'Kingfishr'],
    bio: [
      'Carey was a founding member of the multi-platinum-selling indie band Athlete, whose hit Wires won an Ivor Novello Award for Best Contemporary Single.',
      'Carey is now a songwriter and producer who has worked extensively with Dermot Kennedy since 2017, and collaborated with Freya Ridings, Asha Banks, Tom Speight, Kingfishr and You Me At Six.',
      'Carey was shortlisted for Breakthrough Producer of the Year at the Music Producers Guild Awards.',
      'Carey also runs a label called Brickfield Records, which has so far released EPs by Jack Cullen and Harry Lyon.',
    ],
    portrait: '/images/people/carey-willetts.jpg',
    // His own account rather than the building's. @brockleyfields is still
    // listed on its own in `allHandles` below, so the wall is unaffected.
    handle: '@carey.willetts',
    links: [
      { label: 'Brickfield Records', href: 'https://brickfieldrecords.com/index.php' },
      { label: '@brickfield.records', href: 'https://instagram.com/brickfield.records' },
      { label: 'Jax Management', href: 'https://jaxmanagement.com/carey-willetts' },
    ],
    roomSlug: 'upstairs-studio-2',
  },
  {
    slug: 'matt-rist',
    name: 'Matt Rist',
    group: 'resident',
    disciplines: ['Songwriter', 'Music Producer', 'Audio Engineer'],
    oneLiner: 'Started out as a label engineer and has been making records ever since.',
    credits: ['Benjamin Francis Leftwich', 'Freya Ridings', 'Sekou'],
    bio: 'Matt Rist is a songwriter, music producer and audio engineer. Matt began his career as an in-house engineer for the UK independent label Good Soldier and has since collaborated with major labels including Island, Republic, Capitol and EMI, contributing to projects for artists such as Benjamin Francis Leftwich, Freya Ridings and Sekou.',
    portrait: '/images/people/matt-rist.webp',
    handle: '@mattrist__',
    links: [{ label: 'Instagram', href: 'https://instagram.com/mattrist__' }],
    roomSlug: 'upstairs-studio-3',
  },
  {
    slug: 'josh-ager',
    name: 'Josh Ager',
    group: 'resident',
    disciplines: ['Mixer', 'Producer'],
    oneLiner: 'Mixes and produces indie, pop and alternative records.',
    credits: ['Alfie Templeman', 'Matilda Mann', 'Sofy', 'Girli'],
    bio: 'Josh Ager is a mixer and producer, working across indie, pop and alternative music. His credits include Sofy, Matilda Mann, Girli and Alfie Templeman.',
    portrait: '/images/people/josh-ager.jpg',
    handle: '@joshager',
    links: [{ label: 'Instagram', href: 'https://instagram.com/joshager' }],
    roomSlug: 'upstairs-studio-3',
  },
  // ── Brockley Fields The Yard ───────────────────────────────────────────
  {
    slug: 'atticus-blue',
    name: 'Atticus Blue',
    group: 'resident',
    disciplines: ['Singer-Songwriter', 'Producer'],
    oneLiner: 'Self-taught, and road-tested on the busiest pavements in London.',
    credits: [],
    bio: "Atticus Blue is an independent singer-songwriter and self-taught music producer. He first gained local recognition through prominent street busking performances in areas like London's Southbank and Leicester Square.",
    portrait: '/images/people/atticus-blue.png',
    handle: '@atticus.blue',
    links: [{ label: 'Instagram', href: 'https://instagram.com/atticus.blue' }],
    roomSlug: 'yard-studio-1',
  },
  {
    slug: 'rich-cooper',
    name: 'Rich Cooper',
    group: 'resident',
    disciplines: ['Producer', 'Writer', 'Mixer'],
    oneLiner: 'Produces, writes and mixes across alternative, pop and indie.',
    credits: ['Rina Sawayama', 'CMAT', 'Tom Odell', 'Josef Salvat', 'The Temper Trap'],
    bio: 'Rich Cooper is a music producer, writer and mixer known for his work with prominent alternative, pop and indie artists such as Josef Salvat, CMAT, Rina Sawayama, Tom Odell and The Temper Trap.',
    portrait: '/images/people/rich-cooper.jpg',
    handle: '@rich_cooper_',
    links: [{ label: 'Instagram', href: 'https://instagram.com/rich_cooper_' }],
    roomSlug: 'yard-studio-2',
  },
  {
    slug: 'david-eserin',
    name: 'David Eserin',
    group: 'resident',
    disciplines: ['Product Leader', 'Entrepreneur', 'Music Technology'],
    oneLiner: 'Builds the software the rest of the building ends up using.',
    credits: ['Reflex', 'New Sonic Arts', 'Version Music'],
    portrait: '/images/people/david-eserin.jpg',
    bio: 'David Eserin is a seasoned product leader and entrepreneur in the music technology sector, with a track record of building groundbreaking creative software — from frameworks like Reflex to music tools like New Sonic Arts and open platforms like Version Music — bridging production, distribution and marketing through next-generation tech.',
    links: [{ label: 'Reflex++', href: 'https://reflexplusplus.dev' }],
    // Takes both offices in the Yard as one commercial space.
    roomSlug: 'yard-office-1',
    alsoRoomSlugs: ['yard-office-2'],
  },
]

export const residents = people.filter((p) => p.group === 'resident')

/**
 * Everyone who works in the building is part of the family, so this is the
 * whole list rather than a subset. Kept as its own export because the Part of
 * the Family page reads better saying what it means.
 */
export const family = people

export function getPerson(slug: string): Person | undefined {
  return people.find((p) => p.slug === slug)
}

/**
 * A bio as paragraphs, whether it was written as one string or several. Both
 * pages that show a bio read it through here so the two stay in step.
 */
export function bioParagraphs(person: Person): string[] {
  return Array.isArray(person.bio) ? person.bio : [person.bio]
}

export function peopleForRoom(slugs: string[]): Person[] {
  return slugs
    .map((slug) => people.find((p) => p.slug === slug))
    .filter((p): p is Person => Boolean(p))
}

/**
 * Every room a person occupies, primary first. Use this rather than reading
 * `roomSlug` directly so anyone holding two rooms is handled everywhere.
 */
export function personRoomSlugs(person: Person): string[] {
  return person.roomSlug ? [person.roomSlug, ...(person.alsoRoomSlugs ?? [])] : []
}

/** Every handle whose posts feed the aggregated wall. */
export const allHandles = [
  '@brockleyfields',
  ...people.map((p) => p.handle).filter((h): h is string => Boolean(h)),
]
