/**
 * The "Follow the build" story: how the commercial units were taken back to
 * the shell and rebuilt into soundproofed studios.
 *
 * A curated, ordered narrative — order is meaningful, so it lives here as data
 * rather than being auto-loaded from a folder like the gallery. The story is
 * split into tracks, one per unit, mirroring how the gallery is split by space.
 * Each track numbers its own phases from 01, so the two builds read as parallel
 * journeys rather than one long log.
 *
 * Keep it tight: lead with human moments and payoff shots, drop near-duplicates.
 * A build page that reads like a contractor's progress log is the thing to avoid.
 */
export type BuildPhoto = {
  src: string
  alt: string
  /** Aspect/size override for the cell. Defaults to `aspect-3/2` in the view. */
  className?: string
  /** e.g. `object-contain` for a document like a floor plan that must not crop. */
  imageClassName?: string
}

export type BuildPhase = {
  step: string
  title: string
  note: string
  /** The grid the phase's photos flow into — tuned per phase to its count. */
  gridClass: string
  photos: BuildPhoto[]
}

export type BuildTrack = {
  slug: string
  /** Short label for the track, e.g. "Brockley Fields Studios". */
  title: string
  /** One-line framing shown under the track title. */
  blurb: string
  phases: BuildPhase[]
}

const brockleyFieldsStudios: BuildTrack = {
  slug: 'brockley-fields-studios',
  title: 'Brockley Fields Studios',
  blurb:
    'The first unit: a worn-out open-plan office taken back to the shell and rebuilt, room within room, into five soundproofed studios.',
  phases: [
    {
      step: '01',
      title: 'Before',
      note: 'The unit had spent its last life as an open-plan office — banks of desks, exposed ducting and strip lights.',
      gridClass: 'grid grid-cols-2 gap-3 sm:grid-cols-3',
      photos: [
        {
          src: '/images/build/01-before-office.jpg',
          alt: 'The unit before conversion: an open-plan office with rows of white desks and monitors, mesh chairs, exposed ducting and strip lighting.',
        },
        {
          src: '/images/build/02-before-storeroom.jpg',
          alt: 'A back room before work began, used for office storage — spiral ventilation ducting overhead, slatted shelving, a fire-exit door and scattered equipment.',
        },
        {
          src: '/images/build/03-before-empty.jpg',
          alt: 'One of the rooms cleared but still in its office fit-out, with a glazed partition, a structural column, exposed ducting and a small kitchenette.',
        },
      ],
    },
    {
      step: '02',
      title: 'On paper',
      note: 'Building C, drawn up: three rooms, a kitchen and a WC, walls measured to the millimetre.',
      gridClass: 'grid grid-cols-1',
      photos: [
        {
          src: '/images/build/04-floor-plan.jpg',
          alt: 'The architect\u2019s floor plan for building C, showing three rooms of 16.5, 26 and 14 square metres, a small WC and a kitchen, with wall dimensions marked in millimetres.',
          className: 'aspect-3/4 max-w-[22rem]',
          imageClassName: 'object-contain',
        },
      ],
    },
    {
      step: '03',
      title: 'Strip-out',
      note: 'Back to the shell — partitions down, plasterboard and mineral wool out, the services laid bare.',
      gridClass: 'grid grid-cols-2 gap-3 sm:grid-cols-3',
      photos: [
        {
          src: '/images/build/05-stripout-debris.jpg',
          alt: 'Strip-out underway, seen through a glazed partition: piles of removed plasterboard and yellow mineral-wool insulation, a builder\u2019s rubble bag and a dustpan on the bare floor.',
        },
        {
          src: '/images/build/06-stripout-partitions.jpg',
          alt: 'A room stripped back to metal-stud partitions with insulation exposed, a structural column, a pedestal fan and air-conditioning units waiting to be installed.',
        },
        {
          src: '/images/build/07-stripout-wide.jpg',
          alt: 'A wide view of the unit mid strip-out, with stud partitions, stacked timber, a step-ladder and trestle tables on bare grey carpet.',
        },
      ],
    },
    {
      step: '04',
      title: 'Rebuilt for sound',
      note: 'New timber framing, floating floors on rubber isolation pucks and room-in-room construction — the bones of an acoustically treated studio.',
      gridClass: 'grid grid-cols-2 gap-3 lg:grid-cols-3',
      photos: [
        {
          src: '/images/build/08-floating-floor.jpg',
          alt: 'An acoustic floating floor being laid — chipboard decking on rubber isolation pucks with timber battens set out, beside new metal-stud partitions and a stack of boards.',
        },
        {
          src: '/images/build/09-osb-room.jpg',
          alt: 'A small studio taking shape, framed and lined in Sterling OSB board, with the ceiling joists and insulation still exposed and a work light in the doorway.',
        },
        {
          src: '/images/build/10-framing-lights.jpg',
          alt: 'A larger room in timber-stud framing with new strip lights fitted, a step-ladder and a trestle table of tools mid-build.',
        },
        {
          src: '/images/build/11-framing-window.jpg',
          alt: 'A room fully framed in timber studwork with fresh lighting and a large window onto greenery, ready for lining and soundproofing.',
        },
        {
          src: '/images/build/12-floor-laid.jpg',
          alt: 'A long room with its floating-floor boards laid toward a window onto trees, a boxed-in structural steel column and timber head framing overhead.',
        },
      ],
    },
    {
      step: '05',
      title: 'Lining for silence',
      note: 'Acoustic plasterboard, then walls hand-wrapped in fabric over dense mineral wool \u2014 the slow, careful part that actually stops the sound.',
      gridClass: 'grid grid-cols-2 gap-3 lg:grid-cols-4',
      photos: [
        {
          src: '/images/build/13-soundboard-partition.jpg',
          alt: 'A new room being built inside the shell, its partitions clad in dense grey acoustic plasterboard over metal studs, with a floor access hatch and a glazed door onto greenery.',
        },
        {
          src: '/images/build/14-fabric-wrapping.jpg',
          alt: 'Two builders wrapping a studio wall in grey acoustic fabric \u2014 one on a hop-up stapling the fabric to the ceiling battens, the other crouched below, with the hardboard substrate and wiring holes still visible.',
        },
        {
          src: '/images/build/15-fabric-wall.jpg',
          alt: 'A finished grey fabric-covered acoustic wall with dark trim, its power sockets being wired in mid-installation and a dust mask resting on a black plinth.',
        },
        {
          src: '/images/build/16-fabric-fitout.jpg',
          alt: 'A studio mid fit-out, its grey acoustic wall panels and a black-framed ceiling cloud being wrapped in fabric under warm downlights, with a worktable and step-ladder on the protected floor.',
        },
      ],
    },
    {
      step: '06',
      title: 'The finish',
      note: 'Oak floors, olive acoustic panels and a hand-built kitchen \u2014 the rooms that Brockley Fields is today.',
      gridClass: 'grid grid-cols-2 gap-3 lg:grid-cols-4',
      photos: [
        {
          src: '/images/build/17-treated-room.jpg',
          alt: 'A near-finished studio: olive-green fabric acoustic panels with oak trim, a black-framed ceiling raft with recessed downlights, industrial wall lamps, Crittall-style glazed doors and a warm oak floor.',
        },
        {
          src: '/images/build/18-treated-room-doors.jpg',
          alt: 'Another view of the treated room, looking toward the black Crittall-style glazed doors, with fabric acoustic panels, an articulated industrial wall light and the ceiling cloud overhead.',
        },
        {
          src: '/images/build/19-oak-floor.jpg',
          alt: 'A finished engineered-oak floating floor laid across a freshly plastered room, its boards running toward a window that looks out onto trees.',
        },
        {
          src: '/images/build/20-kitchen.jpg',
          alt: 'The communal kitchen mid fit-out: dark green shaker cabinets, a white Belfast sink with a brass tap, a live-edge timber worktop, a white metro-tile splashback, an under-counter fridge and a dishwasher.',
        },
      ],
    },
  ],
}

/**
 * The Yard — the second unit. Photos land next; until then the track renders a
 * short "being photographed" note so the two-track structure reads as intended.
 * New Yard build images live under /images/build/yard/.
 */
const theYard: BuildTrack = {
  slug: 'the-yard',
  title: 'The Yard',
  blurb:
    'The second unit, taken from shell to soundproofed studios in exactly the same way.',
  phases: [],
}

export const buildTracks: BuildTrack[] = [brockleyFieldsStudios, theYard]

/** A couple of hero frames — before and after — for teasers elsewhere. */
export const buildTeaser = {
  before: {
    src: '/images/build/01-before-office.jpg',
    alt: 'The unit before conversion: an open-plan office with rows of desks, exposed ducting and strip lighting.',
  },
  after: {
    src: '/images/build/17-treated-room.jpg',
    alt: 'The same kind of space finished: a studio with olive acoustic panels, a black ceiling raft with downlights and a warm oak floor.',
  },
  human: {
    src: '/images/build/14-fabric-wrapping.jpg',
    alt: 'Two builders hand-wrapping a studio wall in grey acoustic fabric.',
  },
} as const
