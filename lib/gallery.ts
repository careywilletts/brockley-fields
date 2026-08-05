/**
 * PLACEHOLDER PHOTOGRAPHY.
 * Replace with the real shoot — 20–30 images across both units.
 * Deliberately captionless on the page; alt text is for screen readers only.
 */

export type GalleryImage = { src: string; alt: string; span?: 'wide' | 'tall' }

export const studiosGallery: GalleryImage[] = [
  { src: '/images/hero-studio.png', alt: 'The largest upstairs studio, empty, lit from the window', span: 'wide' },
  { src: '/images/room-a.png', alt: 'An upstairs studio with a desk beneath a floor-to-ceiling window', span: 'tall' },
  { src: '/images/window-green.png', alt: 'Trees and grass seen through a studio window' },
  { src: '/images/detail-plaster.png', alt: 'Bare plaster meeting a timber door frame' },
  { src: '/images/room-d.png', alt: 'Acoustic absorbers in the corner of an upstairs studio', span: 'tall' },
  { src: '/images/corridor.png', alt: 'The upstairs corridor with a studio door ajar' },
  { src: '/images/kitchen.png', alt: 'The upstairs kitchen and dining table', span: 'wide' },
  { src: '/images/room-c.png', alt: 'A small upstairs room set up as a writing space' },
]

export const yardGallery: GalleryImage[] = [
  { src: '/images/room-b.png', alt: 'The L-shaped Yard studio, empty', span: 'tall' },
  { src: '/images/communal.png', alt: 'The Yard communal lounge with records against the wall', span: 'wide' },
  { src: '/images/yard.png', alt: 'The enclosed courtyard behind the Yard' },
  { src: '/images/room-c.png', alt: 'A private office in the Yard' },
  { src: '/images/exterior.png', alt: 'The entrance to the building' },
  { src: '/images/brockley.png', alt: 'A quiet residential street in Brockley', span: 'wide' },
]
