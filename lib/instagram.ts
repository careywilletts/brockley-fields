/**
 * Instagram feeds.
 *
 * PLACEHOLDER DATA. The live site pulls aggregated posts from Curator.io,
 * connecting @brockleyfields plus every tenant account. To go live:
 *
 *   1. Create a Curator.io collection per surface (aggregated wall + one per tenant).
 *   2. Put the feed IDs on each person as `curatorFeedId` in lib/people.ts.
 *   3. Replace the body of `getFeed()` below with a fetch to
 *      `https://api.curator.io/v1/feeds/{feedId}/posts` (server-side, cached),
 *      mapping each post to the `InstagramPost` shape.
 *
 * Nothing else in the UI needs to change — every feed component reads from here.
 */

export type InstagramPost = {
  id: string
  image: string
  alt: string
  caption: string
  handle: string
  permalink: string
}

const imagePool: { src: string; alt: string }[] = [
  { src: '/images/hero-studio.png', alt: 'A studio room filled with afternoon light' },
  { src: '/images/room-a.png', alt: 'A small studio with a desk beneath a tall window' },
  { src: '/images/window-green.png', alt: 'Trees seen through a studio window' },
  { src: '/images/kitchen.png', alt: 'The shared kitchen table' },
  { src: '/images/communal.png', alt: 'The communal lounge with records stacked up' },
  { src: '/images/detail-plaster.png', alt: 'Bare plaster meeting a timber door frame' },
  { src: '/images/room-d.png', alt: 'Acoustic treatment in the corner of a studio' },
  { src: '/images/corridor.png', alt: 'A studio door left ajar on the corridor' },
  { src: '/images/yard.png', alt: 'The courtyard behind the Yard' },
  { src: '/images/brockley.png', alt: 'A quiet street in Brockley' },
  { src: '/images/exterior.png', alt: 'The entrance to the building' },
  { src: '/images/room-b.png', alt: 'An L-shaped studio room, empty' },
  { src: '/images/release-1.png', alt: 'Two-colour risograph record sleeve' },
  { src: '/images/release-3.png', alt: 'Halftone record sleeve of leaves' },
  { src: '/images/release-5.png', alt: 'Reduced skyline record sleeve' },
  { src: '/images/room-c.png', alt: 'A compact private office with a wooden desk' },
]

const captionPool = [
  'Long day, good day.',
  'Rough mix o’clock.',
  'This room in the morning is unbeatable.',
  'Borrowed a preamp off next door. Again.',
  'Something new coming.',
  'Tea break has become a two-hour A&R meeting.',
  'Tracking upstairs, kettle on downstairs.',
  'Six months of work, out on Friday.',
  'The light does this for about forty minutes a day.',
  'Session two of three.',
  'New arrival in the live room.',
  'Everyone in today. Rare.',
]

/** Small deterministic hash so feeds are stable between server and client. */
function hash(seed: string): number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

export function getFeed(handle: string, count = 6): InstagramPost[] {
  const base = hash(handle)
  return Array.from({ length: count }, (_, i) => {
    const image = imagePool[(base + i * 5) % imagePool.length]
    return {
      id: `${handle}-${i}`,
      image: image.src,
      alt: image.alt,
      caption: captionPool[(base + i * 3) % captionPool.length],
      handle,
      permalink: `https://instagram.com/${handle.replace('@', '')}`,
    }
  })
}

/** Interleaved wall across every supplied handle. */
export function getAggregatedFeed(handles: string[], count = 18): InstagramPost[] {
  const perHandle = handles.map((h) => getFeed(h, Math.ceil(count / handles.length) + 1))
  const out: InstagramPost[] = []
  let row = 0
  while (out.length < count) {
    let added = false
    for (const feed of perHandle) {
      if (feed[row]) {
        out.push(feed[row])
        added = true
        if (out.length === count) break
      }
    }
    if (!added) break
    row++
  }
  return out
}
