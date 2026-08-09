/**
 * The extended family — the companies and people we work with who do not hold
 * keys to a room. Managers, labels, publishers, the people on the other end of
 * the phone.
 *
 * Same rule as lib/people.ts and lib/places.ts: real names only, no invented
 * partners and no placeholder logos. Add an entry here and it appears on the
 * Community page automatically. Everything except the name and the blurb is
 * optional, so an entry can go up as soon as we have one line about them.
 */

export type Ally = {
  name: string
  /**
   * What they do, in the way you would actually describe it. Pass an array to
   * break a longer entry into paragraphs rather than one unreadable block.
   */
  blurb: string | string[]
  /** Instagram handle, without the @. Undefined for anyone who has none. */
  handle?: string
  /** Their own site. Shown as one link labelled with the bare domain. */
  website?: string
  /**
   * Logos, unlike photographs, must not be cropped — this is drawn contained
   * inside a square, so any aspect ratio is safe to add.
   */
  logo?: { src: string; alt: string }
  /**
   * For the people rather than the companies. A face is cropped to fill its
   * square, which is the opposite of how a logo must be treated — so this is a
   * separate field rather than a flag on `logo`.
   */
  portrait?: { src: string; alt: string }
}

export const extendedFamily: Ally[] = [
  {
    name: 'Jax Management',
    blurb:
      'A London-based management company representing songwriters, producers and mixers.',
    handle: 'jax_management',
    website: 'https://jaxmanagement.com',
    logo: {
      src: '/images/extended-family/jax-management.jpg',
      alt: 'The Jax Management logo: JAX in white capitals above the word MANAGEMENT on a blue square',
    },
  },
  {
    name: 'Daniel Moyler',
    blurb: [
      'Daniel has worked on records for Dermot Kennedy, Nectar Woode and Still Blank, and engineered Olivia Dean’s Messy and George Ezra’s Gold Rush Kid. He has also built long-standing creative relationships with producers such as Cam Blackwood, Joel Pott and Matt Hales, helping shape a range of acclaimed records across genres.',
      'His work has earned him Engineer of the Year at the 2020 MPG Awards and a 2021 Grammy for his contributions to Dua Lipa’s Future Nostalgia.',
    ],
    handle: 'danielmoyler',
    portrait: {
      src: '/images/extended-family/daniel-moyler.png',
      alt: 'Portrait of Daniel Moyler',
    },
  },
]
