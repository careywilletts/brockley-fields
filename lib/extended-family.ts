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
  portrait?: {
    src: string
    alt: string
    /**
     * CSS object-position, for the photographs that are not centred headshots.
     * Defaults to the centre of the image.
     */
    focus?: string
  }
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
  {
    name: 'Joel Pott',
    blurb: [
      'Joel is best known as the frontman of the multi-platinum indie band Athlete, across four studio albums. Athlete’s single Wires earned the prestigious Ivor Novello Award for Best Contemporary Song.',
      'These days Joel is a songwriter and producer, collaborating with artists including Joy Crookes, Jack Savoretti, Shura, Tom Walker, Elderbrook and Mabel.',
      'In 2017 he was nominated for Breakthrough Producer of the Year by the Music Producers Guild, and his songwriting has garnered two further Ivor Novello Award nominations. Joel also co-wrote and produced George Ezra’s number one album Gold Rush Kid.',
    ],
    portrait: {
      src: '/images/extended-family/joel-pott.png',
      alt: 'Portrait of Joel Pott',
    },
  },
  {
    name: 'Tobie Tripp',
    blurb: [
      'Tobie is a songwriter, producer, multi-instrumentalist and string arranger. He has collaborated with artists including Wizkid, Tom Misch, Dave, HONNE, George Ezra, MJ Cole, Joy Crookes, Matilda Mann, J Hus, Tom Chaplin, Olivia Dean, Venbee and Stormzy.',
      'Classically trained in violin at the Royal Welsh College of Music and Drama, Tobie developed his musical voice through bands, jazz ensembles and a wide range of genres, shaping a style that blends pop, R&B, indie, jazz and beyond.',
      'He has toured internationally as a session musician with artists including Tom Misch and Tom Chaplin before moving into songwriting and production. Today he collaborates with artists to develop distinctive, authentic sounds through songwriting, production and string arranging.',
    ],
    handle: 'tobietripp',
    portrait: {
      src: '/images/extended-family/tobie-tripp.png',
      alt: 'Portrait of Tobie Tripp',
    },
  },
  {
    name: 'Jonny Wright',
    blurb: [
      'Jonny’s songs have been cut by the likes of Aurora, Freya Ridings, Birdy, Foxes, Gracey, Lucy McWilliams and Fickle Friends.',
      'His songs have been placed across film, TV and video games including Ridley Scott’s Equals, Grey’s Anatomy and Mass Effect for Electronic Arts. He also composed and produced the full score for Sky Arts’ Foxtrot, starring Billie Piper and Ben Whishaw.',
      'Jonny co-wrote the Ronan Keating single Little Thing Called Love, which spent six weeks on the A-list, and he co-wrote Second Hand News from Birdy’s top five album.',
    ],
    handle: 'heresjonnywright',
    portrait: {
      src: '/images/extended-family/jonny-wright.png',
      alt: 'Portrait of Jonny Wright',
    },
  },
  {
    name: 'Jonny Breakwell',
    blurb: [
      'Jonny is a writer, producer, mixer and engineer, and a 2024 Grammy Award winner for his work on PinkPantheress’ Angel for the Barbie soundtrack.',
      'He has worked closely with PinkPantheress, mixing her debut album to hell with it, and has since recorded and mixed her latest singles including Boy’s a Liar Pt. 2 with Ice Spice, which peaked at number three on the Billboard Hot 100. He co-produced and mixed Bob Vylan’s album Humble As The Sun, and has mixed tracks for Goldlink, Rio Rainz, Llainwire and Lancey Foux.',
      'Jonny has written with artists including Joey Maxwell, Deema and Sam Dotia, and in 2023 co-wrote and produced Eden Rain’s single Crumb. He is also an experienced engineer, working with the likes of Florence and The Machine, Lizzo and Dua Lipa.',
    ],
    handle: 'jonnybreakwell',
    portrait: {
      src: '/images/extended-family/jonny-breakwell.png',
      alt: 'Jonny Breakwell working at a mixing console',
      // Not a headshot: he sits left of centre, so a centred square crop would
      // land on the console instead of him.
      focus: '38% 35%',
    },
  },
]
