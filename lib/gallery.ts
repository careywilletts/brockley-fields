/**
 * The Studios list is real photography of the building. The Yard list is still
 * PLACEHOLDER — replace it as Yard photographs come in.
 *
 * Deliberately captionless on the page; alt text is for screen readers only.
 *
 * `span` mostly tracks each photograph's orientation, since the mosaic crops to
 * fill its cell: portrait files are 'tall' and landscape files 'wide', so a tall
 * room is never squeezed into a wide slot.
 *
 * The two unspanned entries are deliberate. A tall cell counts as two grid
 * cells and a wide one likewise, so five photographs otherwise total ten cells
 * and leave holes in a four-column grid. Two single cells bring the total to
 * eight, which fills two rows of four exactly — and four rows of two on mobile.
 * Adding or removing a photograph here means re-checking that arithmetic.
 */

export type GalleryImage = { src: string; alt: string; span?: 'wide' | 'tall' }

export const studiosGallery: GalleryImage[] = [
  {
    src: '/images/studios-live-room.jpg',
    alt: 'A drum kit set up and miked in front of the full-height studio windows, with an upright piano and the Brockley Fields neon to one side',
    span: 'tall',
  },
  {
    src: '/images/studios-piano.jpg',
    alt: 'The corner of a studio: an open upright piano beneath gold discs and the Brockley Fields Studios neon sign, an accordion on the floor and a chair by the windows',
    span: 'wide',
  },
  {
    // Also the Studios hero on /studios — the same file, not a second copy.
    src: '/images/studios-hero.jpg',
    alt: 'A leather sofa with a mandolin resting on it, shelves of books and records above, and keyboards stacked along the wall',
    span: 'tall',
  },
  // The two single cells. Both crop squarer than the files are, which is why
  // they are the two whose subject sits centre-frame and survives it.
  {
    src: '/images/studios-bass-corner.jpg',
    alt: 'A red buttoned-leather chair and a double bass on its stand beside a window looking onto ivy',
  },
  {
    src: '/images/studios-kitchen.jpg',
    alt: 'The shared kitchen: green cabinets, a butler sink, a long worktop and a red leather chair beside a double bass by the window',
  },
]

/** PLACEHOLDER PHOTOGRAPHY — awaiting real photographs of the Yard. */
export const yardGallery: GalleryImage[] = [
  { src: '/images/room-b.png', alt: 'The L-shaped Yard studio, empty', span: 'tall' },
  { src: '/images/communal.png', alt: 'The Yard communal lounge with records against the wall', span: 'wide' },
  { src: '/images/yard.png', alt: 'The enclosed courtyard behind the Yard' },
  { src: '/images/room-c.png', alt: 'A private office in the Yard' },
  { src: '/images/exterior.png', alt: 'The entrance to the building' },
  { src: '/images/brockley.png', alt: 'A quiet residential street in Brockley', span: 'wide' },
]
