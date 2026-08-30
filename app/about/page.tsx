import type { Metadata } from 'next'
import { ActionLink, Container, PageHeader, Photo, Rule, Section } from '@/components/primitives'
import { TerraceBand } from '@/components/brand'
import { cn } from '@/lib/utils'

/**
 * The "See the build" story: how the two commercial units went from a worn-out
 * open-plan office, back to the shell, and out the other side as soundproofed
 * studios. A curated, ordered narrative — order is meaningful, so it lives
 * here as data rather than being auto-loaded from a folder like the gallery.
 */
type BuildPhoto = { src: string; alt: string; className?: string; imageClassName?: string }
type BuildPhase = { step: string; title: string; note: string; gridClass: string; photos: BuildPhoto[] }

const buildPhases: BuildPhase[] = [
  {
    step: '01',
    title: 'Before',
    note: 'The units had spent their last life as an open-plan office — banks of desks, exposed ducting and strip lights.',
    gridClass: 'grid grid-cols-2 gap-3 sm:grid-cols-3',
    photos: [
      {
        src: '/images/build/01-before-office.jpg',
        alt: 'The units before conversion: an open-plan office with rows of white desks and monitors, mesh chairs, exposed ducting and strip lighting.',
      },
      {
        src: '/images/build/02-before-storeroom.jpg',
        alt: 'A back room before work began, used for office storage — spiral ventilation ducting overhead, slatted shelving, a fire-exit door and scattered equipment.',
      },
      {
        src: '/images/build/03-before-empty.jpg',
        alt: 'One of the units cleared but still in its office fit-out, with a glazed partition, a structural column, exposed ducting and a small kitchenette.',
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
        alt: 'A unit stripped back to metal-stud partitions with insulation exposed, a structural column, a pedestal fan and air-conditioning units waiting to be installed.',
      },
      {
        src: '/images/build/07-stripout-wide.jpg',
        alt: 'A wide view of a unit mid strip-out, with stud partitions, stacked timber, a step-ladder and trestle tables on bare grey carpet.',
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
]

export const metadata: Metadata = {
  title: 'About',
  description:
    'Carey Willetts on founding Brockley Fields — from Athlete and the Ivor Novello to five soundproofed studios and two creative spaces in Brockley, SE4 — plus a look at how the units were rebuilt from a tired office into acoustically treated studios.',
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title={
          <>
            Brockley Fields:{' '}
            {/* `block` forces the break, so the two halves always sit on their own line. */}
            <span className="text-primary block">the journey</span>
          </>
        }
        // The default 34rem measure is too narrow for "Brockley Fields:" at
        // 52px, which wrapped it onto two lines of its own. `text-wrap` undoes
        // the inherited text-balance so it cannot re-break either.
        titleClassName="max-w-none text-wrap"
        intro={
          <>
            <p>
              I&apos;m Carey Willetts. I&apos;ve been in the music industry since 2001 &mdash; first
              as a founding member of Athlete, signed to Regal Records and then Parlophone, releasing
              five albums over a decade, and picking up an Ivor Novello Award along the way. Our debut
              album <em>Vehicles and Animals</em> was nominated for the Mercury Music Prize and{' '}
              <em>Tourist</em> went to number one.
            </p>
            <p>
              In Athlete, I learned what it meant to write songs together and the value of
              collaboration has never left me. So, it was a natural transition to write and produce
              songs with other artists and in 2020, I was shortlisted for Breakthrough Producer of
              the Year at the Music Producers Guild Awards. Most recently I have written and produced
              with Dermot Kennedy, Freya Ridings, Amber Run, Asher Banks, Jeremy Loops and Kingfishr,
              and have been part of a further three number one albums.
            </p>
          </>
        }
      />

      <TerraceBand variant="perspective" bleed priority className="pb-12 sm:pb-16" />

      <section className="border-foreground/20 border-t py-14 sm:py-20" aria-labelledby="story">
        <Container>
          {/*
            Copy left, strapline right. Columns stretch to equal height so the
            sign-off can be pushed to the foot of the body copy.
          */}
          <div className="flex flex-col gap-10 md:flex-row md:gap-12">
            <div className="md:flex-1">
              {/*
                Kept for the section's aria-labelledby, but visually hidden: the
                grey "The story" label is no longer wanted above the copy.
              */}
              <h2 id="story" className="sr-only">
                The story
              </h2>
              <div className="flex flex-col gap-5 text-[17px] leading-relaxed">
                <p>
                  I find that great songs still come from the same place they always did:{' '}
                  <strong className="text-primary font-semibold">
                    the right people, in the right room, at the right time.
                  </strong>{' '}
                  And that brought me back to the same
                  problem every working songwriter eventually hits &mdash; where do you actually go
                  to work? Somewhere permanent, inspiring and affordable. It turns out that place is
                  genuinely hard to find.
                </p>
                <p>
                  Having built a large recording studio in Greenwich for Athlete, I know what makes a
                  space worth spending time in. So when a new opportunity came up &mdash; two large
                  commercial units in Brockley, with great space, loads of natural light, a view of
                  green spaces, in an existing hub full of creative businesses &mdash; I
                  couldn&apos;t say no.
                </p>
                <p>
                  Now we have five recording studios and two creative spaces, all soundproofed and
                  acoustically treated. Large windows are in every room, because I&apos;ve spent
                  enough time in dark rooms to know how much that matters. Plastered walls, warm
                  finishes, high spec without being clinical. Spaces that feel like somewhere you
                  want to be, not somewhere you&apos;re tolerating.
                </p>
                <p>
                  This is a building where the person next door might become your next collaborator,
                  your sounding board, your co-writer. Where someone&apos;s already solved the
                  problem you&apos;re stuck on. Our ethos hasn&apos;t changed since day one:{' '}
                  <strong className="text-primary font-semibold">people over things</strong>.
                  Affordable, high-quality
                  spaces for the people who need them most.
                </p>
              </div>
            </div>

            {/*
              A column so the sign-off can be pushed down with `mt-auto`, landing
              level with the last line of the body copy on the left.
            */}
            <div className="flex flex-col md:w-[38%] md:shrink-0">
              <p className="type-display text-[24px] leading-tight text-pretty sm:text-[28px]">
                Brockley Fields exists because I needed it to exist.{' '}
                <span className="text-primary">I think a lot of you do too</span>
              </p>
              <p className="type-label mt-6 md:mt-auto md:pt-6">&mdash; Carey</p>
            </div>
          </div>
        </Container>
      </section>

      <Section
        label="See the build"
        title={
          <>
            From tired office to <span className="text-primary">five studios</span>
          </>
        }
        intro={
          <p>
            The two units arrived as a worn-out open-plan office. Here&apos;s how they were taken
            back to the shell and rebuilt &mdash; room within room &mdash; into soundproofed,
            acoustically treated studios.
          </p>
        }
      >
        <div className="mt-12 flex flex-col">
          {buildPhases.map((phase, i) => (
            <div
              key={phase.step}
              className={cn(
                'flex flex-col gap-6 py-10 md:flex-row md:gap-12',
                i > 0 && 'border-foreground/20 border-t',
              )}
            >
              <div className="md:w-[13rem] md:shrink-0">
                <p className="type-label type-eyebrow">{phase.step}</p>
                <h3 className="type-display mt-2 text-[20px]">{phase.title}</h3>
                <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">
                  {phase.note}
                </p>
              </div>
              <div className="md:flex-1">
                <div className={phase.gridClass}>
                  {phase.photos.map((photo) => (
                    <Photo
                      key={photo.src}
                      src={photo.src}
                      alt={photo.alt}
                      className={photo.className ?? 'aspect-3/2'}
                      imageClassName={photo.imageClassName}
                      sizes="(min-width: 1024px) 28vw, (min-width: 768px) 30vw, 50vw"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-foreground/20 mt-4 flex flex-wrap gap-3 border-t pt-10">
          <ActionLink href="/studios" variant="fill">
            See the finished spaces
          </ActionLink>
          <ActionLink href="/gallery" variant="fill">
            Photo gallery
          </ActionLink>
        </div>
      </Section>

      <Rule />
    </>
  )
}
