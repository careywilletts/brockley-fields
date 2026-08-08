/**
 * The people of Brockley Fields. Real content only — no placeholders.
 *
 * Four of the seven people in the building are listed. The Yard residents are
 * still to come: add them here with a `roomSlug` and they appear on the
 * Community page, Part of the Family page and their room page at once.
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
  /** One line that does the work of an introduction. */
  oneLiner: string
  /** 2–3 notable credits. Leave empty if they have none listed. */
  credits: string[]
  /** Their words about the building. Undefined until they have given us one. */
  quote?: string
  bio: string
  /** A real photograph. Undefined until they have sent one. */
  portrait?: string
  handle: string
  links: PersonLink[]
  /** Only for residents — matches a slug in lib/rooms.ts */
  roomSlug?: string
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
    handle: '@itsgoodscott',
    links: [{ label: 'Instagram', href: 'https://instagram.com/itsgoodscott' }],
    roomSlug: 'upstairs-studio-1',
  },
  {
    slug: 'carey-willetts',
    name: 'Carey Willetts',
    group: 'resident',
    disciplines: ['Producer', 'Songwriter', 'Founder'],
    oneLiner: 'Founded the building. Writes and produces from Studio 2.',
    credits: ['Athlete', 'Dermot Kennedy', 'Freya Ridings', 'Kingfishr'],
    bio: 'Carey was a founding member of the multi-platinum-selling indie band Athlete. Along with his fellow band members, he wrote hits including Half Light, Superhuman Touch, El Salvador, You Got The Style, Chances, and Wires — which won an Ivor Novello Award for Best Contemporary Single. Since then, Carey has established himself as a sought-after producer and songwriter. He has worked extensively with Dermot Kennedy, co-writing and producing Better Days, which has streamed over 240 million times on Spotify alone. Other artist collaborations include Freya Ridings, Asha Banks, Tom Speight, Kingfishr, and You Me At Six, and Carey was shortlisted for Breakthrough Producer of the Year at the Music Producers Guild Awards. Carey also runs a label called Brickfield Records, which has released EPs by Jack Cullen and Harry Lyon to date.',
    handle: '@brockleyfields',
    links: [{ label: 'Brickfield Records', href: 'https://instagram.com/brickfieldrecords' }],
    roomSlug: 'upstairs-studio-2',
  },
  {
    slug: 'matt-rist',
    name: 'Matt Rist',
    group: 'resident',
    disciplines: ['Songwriter', 'Music Producer', 'Audio Engineer'],
    oneLiner: 'Started out as a label engineer and has been making records ever since.',
    credits: ['The 1975', 'Freya Ridings', 'Sekou'],
    bio: 'Matt Rist is a London-based songwriter, music producer and audio engineer. Matt began his career as an in-house engineer for the UK independent label Good Soldier and has since collaborated with major labels including Island, Republic, Capitol and EMI, contributing to projects for artists such as The 1975, Freya Ridings and Sekou.',
    handle: '@mattrist__',
    links: [{ label: 'Instagram', href: 'https://instagram.com/mattrist__' }],
    roomSlug: 'upstairs-studio-3',
  },
  {
    slug: 'josh-ager',
    name: 'Josh Ager',
    group: 'resident',
    disciplines: ['Mixing Engineer', 'Production Engineer'],
    oneLiner: 'Over a hundred released tracks across UK indie-pop and alternative.',
    credits: ['Beabadoobee', 'Matilda Mann', 'Sofy', 'Girli'],
    bio: 'Josh Ager is a London-based mixing and production engineer. He has worked on over 100 released tracks across the UK indie-pop and alternative scenes, collaborating with notable acts including Sofy, Matilda Mann, Girli and Beabadoobee.',
    handle: '@joshager',
    links: [{ label: 'Instagram', href: 'https://instagram.com/joshager' }],
    roomSlug: 'upstairs-studio-3',
  },
  // The four Yard rooms are tenanted, but we do not yet have those residents'
  // names and bios. They are deliberately left out rather than filled with
  // invented people — the room pages omit the occupant block cleanly.
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

export function peopleForRoom(slugs: string[]): Person[] {
  return slugs
    .map((slug) => people.find((p) => p.slug === slug))
    .filter((p): p is Person => Boolean(p))
}

/** Every handle whose posts feed the aggregated wall. */
export const allHandles = ['@brockleyfields', ...people.map((p) => p.handle)]
