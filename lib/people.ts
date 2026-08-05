/**
 * PLACEHOLDER CONTENT.
 *
 * Every name, credit, quote and link below is a stand-in so the layout can be
 * judged with realistic content in it. Swap each entry for the real resident
 * once bios, credits, portraits and handles have been collected.
 *
 * `group: 'resident'`  → Community page (formal tenants)
 * `group: 'family'`    → Part of the Family page (extended circle)
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
  /** Their words about the building. */
  quote: string
  bio: string
  portrait: string
  handle: string
  links: PersonLink[]
  /** Only for residents — matches a slug in lib/rooms.ts */
  roomSlug?: string
  /** Shown instead of a room for extended-circle people. */
  relationship?: string
}

export const people: Person[] = [
  {
    slug: 'naomi-achebe',
    name: 'Naomi Achebe',
    group: 'resident',
    disciplines: ['Songwriter', 'Topliner'],
    oneLiner: 'Writes the melody before anyone has decided what the song is about.',
    credits: ['Placeholder credit — major label album, 2024', 'Placeholder credit — sync, 2023'],
    quote:
      'I had been writing in bedrooms for eight years. Having a door that shuts and a window that opens changed how much I get done in a day.',
    bio: 'Placeholder bio. Naomi has been writing for other artists since her early twenties, mostly in the space between pop and soul. She took Studio 1 upstairs when the building opened and has barely left since.',
    portrait: '/images/person-1.png',
    handle: '@naomiachebe',
    links: [
      { label: 'Spotify', href: 'https://open.spotify.com' },
      { label: 'Instagram', href: 'https://instagram.com' },
    ],
    roomSlug: 'upstairs-studio-1',
  },
  {
    slug: 'rob-danson',
    name: 'Rob Danson',
    group: 'resident',
    disciplines: ['Mix Engineer'],
    oneLiner: 'Twenty years of records, mixed loud and finished on time.',
    credits: ['Placeholder credit — album mix, 2025', 'Placeholder credit — single mix, 2024'],
    quote:
      'The soundproofing is the real thing, not a bit of foam and a promise. I can work at proper level at nine at night and nobody knocks.',
    bio: 'Placeholder bio. Rob mixes records — rock, indie, the occasional country session that arrives by accident. He shares the big upstairs room and has strong opinions about monitor placement.',
    portrait: '/images/person-2.png',
    handle: '@robdansonmix',
    links: [
      { label: 'Website', href: 'https://example.com' },
      { label: 'Instagram', href: 'https://instagram.com' },
    ],
    roomSlug: 'upstairs-studio-2',
  },
  {
    slug: 'dev-raichura',
    name: 'Dev Raichura',
    group: 'resident',
    disciplines: ['Producer', 'Programmer'],
    oneLiner: 'Builds tracks out of almost nothing, then keeps going.',
    credits: ['Placeholder credit — EP production, 2025'],
    quote:
      'I came for the room and stayed for the people upstairs. Three of the things I am proudest of started as a conversation by the kettle.',
    bio: 'Placeholder bio. Dev produces and programmes, mostly for new artists, and is the person everyone asks when a session needs an extra pair of ears at short notice.',
    portrait: '/images/person-3.png',
    handle: '@devraichura',
    links: [
      { label: 'SoundCloud', href: 'https://soundcloud.com' },
      { label: 'Instagram', href: 'https://instagram.com' },
    ],
    roomSlug: 'upstairs-studio-2',
  },
  {
    slug: 'mei-lindqvist',
    name: 'Mei Lindqvist',
    group: 'resident',
    disciplines: ['Arranger', 'String Writer'],
    oneLiner: 'Writes the parts that make a demo sound like a record.',
    credits: ['Placeholder credit — string arrangement, 2024', 'Placeholder credit — film score, 2023'],
    quote:
      'Fourteen square metres and a window is all I have ever needed. The rest is a piano and no interruptions.',
    bio: 'Placeholder bio. Mei arranges strings and horns for records made all over London and writes for picture when the deadline allows. Studio 3 upstairs is mostly a piano and a lot of manuscript paper.',
    portrait: '/images/person-4.png',
    handle: '@meilindqvist',
    links: [
      { label: 'Website', href: 'https://example.com' },
      { label: 'Spotify', href: 'https://open.spotify.com' },
    ],
    roomSlug: 'upstairs-studio-3',
  },
  {
    slug: 'kofi-bell-hughes',
    name: 'Kofi Bell-Hughes',
    group: 'resident',
    disciplines: ['Producer', 'Multi-instrumentalist'],
    oneLiner: 'Plays everything, badly enough to be interesting and well enough to keep.',
    credits: ['Placeholder credit — album production, 2025', 'Placeholder credit — remix, 2024'],
    quote:
      'The Yard is the sociable end of the building. You leave your door open and something happens.',
    bio: 'Placeholder bio. Kofi produces and plays, and has slowly filled the Yard studio with instruments other people are welcome to borrow.',
    portrait: '/images/person-5.png',
    handle: '@kofibh',
    links: [
      { label: 'Spotify', href: 'https://open.spotify.com' },
      { label: 'Instagram', href: 'https://instagram.com' },
    ],
    roomSlug: 'yard-studio-1',
  },
  {
    slug: 'sam-ojo',
    name: 'Sam Ojo',
    group: 'resident',
    disciplines: ['Producer', 'Beatmaker'],
    oneLiner: 'Makes beats fast and finishes them slowly.',
    credits: ['Placeholder credit — mixtape production, 2025'],
    quote:
      'I am the youngest person here by about a decade and it is the best thing that has happened to my work.',
    bio: 'Placeholder bio. Sam shares the Yard studio, works mostly in rap and club records, and is the reason the building now owns a decent drum machine.',
    portrait: '/images/person-8.png',
    handle: '@samojo',
    links: [
      { label: 'SoundCloud', href: 'https://soundcloud.com' },
      { label: 'Instagram', href: 'https://instagram.com' },
    ],
    roomSlug: 'yard-studio-1',
  },
  {
    slug: 'orla-finn',
    name: 'Orla Finn',
    group: 'resident',
    disciplines: ['Songwriter', 'Artist'],
    oneLiner: 'Writes her own records and other people’s when they ask nicely.',
    credits: ['Placeholder credit — debut album, 2024'],
    quote:
      'The L-shape gives me a corner to sing in that I did not have to build. I did not know I wanted that until I had it.',
    bio: 'Placeholder bio. Orla is an artist and writer working out of the L-shaped Yard studio, where the short leg has quietly become a vocal booth.',
    portrait: '/images/person-6.png',
    handle: '@orlafinnmusic',
    links: [
      { label: 'Spotify', href: 'https://open.spotify.com' },
      { label: 'Rough Trade', href: 'https://roughtrade.com' },
    ],
    roomSlug: 'yard-studio-2',
  },
  {
    slug: 'delroy-pierce',
    name: 'Delroy Pierce',
    group: 'resident',
    disciplines: ['Mixer', 'Engineer'],
    oneLiner: 'Has recorded more vocals than anyone else in the postcode.',
    credits: ['Placeholder credit — album engineering, 2025', 'Placeholder credit — live album, 2022'],
    quote:
      'Affordable and treated properly is not a combination you find often. I looked for two years before this.',
    bio: 'Placeholder bio. Delroy engineers and mixes, largely vocal-led records, and shares the L-shaped Yard studio with Orla.',
    portrait: '/images/person-7.png',
    handle: '@delroypierce',
    links: [
      { label: 'Website', href: 'https://example.com' },
      { label: 'Instagram', href: 'https://instagram.com' },
    ],
    roomSlug: 'yard-studio-2',
  },
  {
    slug: 'yasmin-haddad',
    name: 'Yasmin Haddad',
    group: 'resident',
    disciplines: ['Artist Manager'],
    oneLiner: 'Manages four artists and answers the phone before anyone else is up.',
    credits: [],
    quote:
      'Being in the same building as the people who make the records my artists need is worth more than any office in town.',
    bio: 'Placeholder bio. Yasmin runs her management roster out of Office 1 in the Yard, and is the first person residents ask when a contract lands in their inbox.',
    portrait: '/images/person-9.png',
    handle: '@yasminhaddadmgmt',
    links: [{ label: 'Website', href: 'https://example.com' }],
    roomSlug: 'yard-office-1',
  },
  {
    slug: 'gerry-wallace',
    name: 'Gerry Wallace',
    group: 'resident',
    disciplines: ['Publisher', 'A&R'],
    oneLiner: 'Signs writers, then leaves them alone to write.',
    credits: [],
    quote:
      'I have signed two people from this building without leaving the building. That is not normally how it works.',
    bio: 'Placeholder bio. Gerry runs a small publishing operation from Office 2 and can usually be found at the kitchen table rather than at his desk.',
    portrait: '/images/person-10.png',
    handle: '@gerrywallacepub',
    links: [{ label: 'Website', href: 'https://example.com' }],
    roomSlug: 'yard-office-2',
  },

  // ── Part of the family ─────────────────────────────────────────────────
  {
    slug: 'tasha-boateng',
    name: 'Tasha Boateng',
    group: 'family',
    disciplines: ['Session Vocalist'],
    oneLiner: 'In the building most weeks, on half the records that leave it.',
    credits: ['Placeholder credit — backing vocals, 2025'],
    quote: 'I do not have a room here. I am here constantly.',
    bio: 'Placeholder bio. Tasha sings on sessions across both units and has an unofficial mug in the upstairs kitchen.',
    portrait: '/images/person-11.png',
    handle: '@tashaboateng',
    links: [{ label: 'Instagram', href: 'https://instagram.com' }],
    relationship: 'Regular collaborator',
  },
  {
    slug: 'priya-sandhu',
    name: 'Priya Sandhu',
    group: 'family',
    disciplines: ['Music Supervisor'],
    oneLiner: 'Puts the building’s records into other people’s films.',
    credits: ['Placeholder credit — feature film supervision, 2024'],
    quote: 'I come here to listen to things before anyone else can.',
    bio: 'Placeholder bio. Priya supervises music for film and television and treats Brockley Fields as her first port of call.',
    portrait: '/images/person-12.png',
    handle: '@priyasandhu',
    links: [{ label: 'Website', href: 'https://example.com' }],
    relationship: 'Adjacent business',
  },
  {
    slug: 'jean-marsh',
    name: 'Jean Marsh',
    group: 'family',
    disciplines: ['Studio Manager', 'Bookings'],
    oneLiner: 'Knows where everything is and who borrowed it.',
    credits: [],
    quote: 'Somebody has to run the diary, and it turns out I like it.',
    bio: 'Placeholder bio. Jean handles bookings, keys and the waiting list, and has been keeping the building upright since the second month.',
    portrait: '/images/person-13.png',
    handle: '@brockleyfields',
    links: [],
    relationship: 'Keeps the place running',
  },
  {
    slug: 'ezra-quaye',
    name: 'Ezra Quaye',
    group: 'family',
    disciplines: ['Drummer'],
    oneLiner: 'The reason the neighbours have never once complained.',
    credits: ['Placeholder credit — album drums, 2025'],
    quote: 'They built a room I can actually hit things in. That is rarer than it sounds.',
    bio: 'Placeholder bio. Ezra plays on sessions in both units and tests the soundproofing more thoroughly than anyone.',
    portrait: '/images/person-14.png',
    handle: '@ezraquaye',
    links: [{ label: 'Instagram', href: 'https://instagram.com' }],
    relationship: 'Regular collaborator',
  },
]

export const residents = people.filter((p) => p.group === 'resident')
export const family = people.filter((p) => p.group === 'family')

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
