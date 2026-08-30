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
      note: 'Oak floors, olive acoustic panels and a hand-built kitchen \u2014 then moved into and switched on. The rooms that Brockley Fields is today.',
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
        {
          src: '/images/build/23-studio-live.jpg',
          alt: 'Studio 1 finished and in use: dark acoustic-fabric walls and a suspended grey ceiling cloud with downlights, racks of synths and outboard beside studio monitors, an upright piano, a rolling desk with a DAW on screen, a mustard-yellow armchair and a grey sofa, lit by a full-height window onto the trees.',
        },
        {
          src: '/images/build/21-studio-desk.jpg',
          alt: 'Studio 2 finished and kitted out: a reclaimed-timber control desk with monitors and racks of outboard gear, a sunburst Fender Precision bass, wall-shelved synthesizers including a Sequential and a Juno-106, a floor of guitar pedals and the neon \u201cBrockley Fields Studios\u201d sign with framed gold and platinum discs.',
        },
        {
          src: '/images/build/22-studio-piano.jpg',
          alt: 'The window corner of the finished Studio 2: a full-height glazed wall onto the trees, a green mid-century sling chair and a red accordion on the oak floor, and a black upright piano topped with the neon sign, framed gold and platinum awards and a fringed vintage lamp.',
        },
      ],
    },
  ],
}

/**
 * The Yard — the second unit, given the same treatment. Curated down to two
 * frames per phase, leading each with the most legible or dramatic shot so the
 * story reads as highlights rather than a progress log. Images live under
 * /images/build/yard/.
 */
const theYard: BuildTrack = {
  slug: 'the-yard',
  title: 'The Yard',
  blurb:
    'The second unit, given the same treatment: another tired office, stripped back and rebuilt into soundproofed rooms \u2014 this time with perforated-timber acoustic panels as the finishing touch.',
  phases: [
    {
      step: '01',
      title: 'Before',
      note: 'Another end-of-life office: worn vinyl floors, a wall-hung boiler, strip lights and a back room lost to storage.',
      gridClass: 'grid grid-cols-2 gap-3',
      photos: [
        {
          src: '/images/build/yard/01-before-office.jpg',
          alt: 'The Yard before conversion: a tired office with worn vinyl plank flooring, a wall-mounted boiler, exposed strip lights and ducting, and a small WC in the corner.',
        },
        {
          src: '/images/build/yard/02-before-storeroom.jpg',
          alt: 'A back room before work began, crammed with cardboard boxes, a bicycle, blue steel shelving and patched-up walls under fluorescent strip lights.',
        },
      ],
    },
    {
      step: '02',
      title: 'Stripped back and framed',
      note: 'Partitions down to the shell, then a forest of new timber studwork setting out the rooms and a framed grid for the ceiling rafts.',
      gridClass: 'grid grid-cols-2 gap-3',
      photos: [
        {
          src: '/images/build/yard/03-framing-wide.jpg',
          alt: 'A wide view of the unit mid-rebuild: extensive new timber-stud framing dividing the space into rooms, exposed timber ceiling beams and a workbench on trestles.',
        },
        {
          src: '/images/build/yard/04-ceiling-frame.jpg',
          alt: 'A ceiling being framed with black steel and timber into a suspended grid, temporary pendant bulbs and wiring hanging down over freshly plastered walls.',
        },
      ],
    },
    {
      step: '03',
      title: 'Room within a room',
      note: 'Each studio built as a box inside the shell \u2014 lined in Sterling OSB and floated on a new timber floor, isolated from the structure around it.',
      gridClass: 'grid grid-cols-2 gap-3',
      photos: [
        {
          src: '/images/build/yard/05-osb-room.jpg',
          alt: 'A studio taking shape as a room within a room, its walls and ceiling lined in Sterling OSB Zero board with mineral wool still exposed overhead and a work light on a tripod.',
        },
        {
          src: '/images/build/yard/06-floating-floor.jpg',
          alt: 'A new engineered-oak floor being laid across a room, with a plunge saw on its track, a Henry vacuum and ratchet straps tensioning the boards together.',
        },
      ],
    },
    {
      step: '04',
      title: 'Lining for silence',
      note: 'Dense mineral wool and plaster to seal the rooms, and deep timber-framed cavities built out from the walls to trap the low end.',
      gridClass: 'grid grid-cols-2 gap-3',
      photos: [
        {
          src: '/images/build/yard/07-plastered.jpg',
          alt: 'A freshly plastered room with a boxed-in structural steel beam overhead and a doorway through to an OSB-lined studio beyond.',
        },
        {
          src: '/images/build/yard/08-bass-trap-frame.jpg',
          alt: 'Two large timber-framed cavities with black trim built out from a plastered wall \u2014 the frames for deep acoustic bass-trap panels, with a drill and level resting on a step-ladder.',
        },
      ],
    },
    {
      step: '05',
      title: 'The finish',
      note: 'The Yard\u2019s signature: perforated-timber acoustic panels across the walls and a matching ceiling cloud, lit from behind with a warm LED glow.',
      gridClass: 'grid grid-cols-2 gap-3',
      photos: [
        {
          src: '/images/build/yard/09-acoustic-panels.jpg',
          alt: 'A near-finished room with two large brown perforated-timber acoustic panels on the wall and a matching perforated ceiling cloud above, lit from behind with a warm LED glow.',
        },
        {
          src: '/images/build/yard/10-acoustic-cloud.jpg',
          alt: 'Another view of the perforated-timber acoustic treatment: a suspended ceiling cloud and two wall panels glowing against warm plaster, with premium wood flooring boxed up ready to lay.',
        },
      ],
    },
  ],
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
