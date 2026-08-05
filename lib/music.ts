/**
 * PLACEHOLDER CONTENT — releases made in the building.
 * Add a new entry each time a resident puts something out.
 */

export type Release = {
  slug: string
  title: string
  artist: string
  year: number
  format: 'Album' | 'EP' | 'Single'
  artwork: string
  /** Which resident(s) worked on it — slugs from lib/people.ts */
  credits: string[]
  links: { label: string; href: string }[]
}

export const releases: Release[] = [
  {
    slug: 'low-country',
    title: 'Low Country',
    artist: 'Orla Finn',
    year: 2025,
    format: 'Album',
    artwork: '/images/release-1.png',
    credits: ['orla-finn', 'delroy-pierce'],
    links: [
      { label: 'Spotify', href: 'https://open.spotify.com' },
      { label: 'Apple Music', href: 'https://music.apple.com' },
      { label: 'Rough Trade', href: 'https://roughtrade.com' },
    ],
  },
  {
    slug: 'second-floor',
    title: 'Second Floor',
    artist: 'Dev Raichura',
    year: 2025,
    format: 'EP',
    artwork: '/images/release-2.png',
    credits: ['dev-raichura', 'naomi-achebe'],
    links: [
      { label: 'Spotify', href: 'https://open.spotify.com' },
      { label: 'Apple Music', href: 'https://music.apple.com' },
    ],
  },
  {
    slug: 'holding-pattern',
    title: 'Holding Pattern',
    artist: 'Naomi Achebe',
    year: 2025,
    format: 'Single',
    artwork: '/images/release-3.png',
    credits: ['naomi-achebe', 'rob-danson'],
    links: [
      { label: 'Spotify', href: 'https://open.spotify.com' },
      { label: 'Apple Music', href: 'https://music.apple.com' },
    ],
  },
  {
    slug: 'quarter-tone',
    title: 'Quarter Tone',
    artist: 'Mei Lindqvist',
    year: 2024,
    format: 'Album',
    artwork: '/images/release-4.png',
    credits: ['mei-lindqvist'],
    links: [
      { label: 'Spotify', href: 'https://open.spotify.com' },
      { label: 'Rough Trade', href: 'https://roughtrade.com' },
    ],
  },
  {
    slug: 'yard-tapes-vol-1',
    title: 'Yard Tapes, Vol. 1',
    artist: 'Various',
    year: 2024,
    format: 'Album',
    artwork: '/images/release-5.png',
    credits: ['kofi-bell-hughes', 'sam-ojo', 'ezra-quaye'],
    links: [
      { label: 'Spotify', href: 'https://open.spotify.com' },
      { label: 'Apple Music', href: 'https://music.apple.com' },
    ],
  },
  {
    slug: 'nightingale-lane',
    title: 'Nightingale Lane',
    artist: 'Sam Ojo',
    year: 2024,
    format: 'EP',
    artwork: '/images/release-6.png',
    credits: ['sam-ojo'],
    links: [{ label: 'Spotify', href: 'https://open.spotify.com' }],
  },
]
