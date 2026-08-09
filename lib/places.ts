/**
 * The wider community — the places around the building that make this part of
 * London what it is.
 *
 * Real places only, same rule as lib/people.ts: no invented neighbours and no
 * placeholder photography. Add an entry here and it appears on the Community
 * page automatically. `photo` and `handle` are both optional, so a place can go
 * in as soon as we have its name and one line about it.
 */

export type Place = {
  name: string
  /** One line. What the place is, in the way you would actually describe it. */
  blurb: string
  /** Instagram handle, without the @. Undefined for places that have none. */
  handle?: string
  photo?: { src: string; alt: string }
}

export const places: Place[] = [
  {
    name: 'Water into Beer',
    blurb: 'Best bottle shop in London.',
    handle: 'waterintobeer',
    photo: {
      src: '/images/water-into-beer.png',
      alt: 'Inside Water into Beer: blue shelves of craft beer cans and bottles, glass-fronted fridges and a few small tables',
    },
  },
]
