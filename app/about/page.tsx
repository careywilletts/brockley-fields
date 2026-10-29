import type { Metadata } from 'next'
import { ActionLink, Container, PageHeader, Photo, Rule, Section } from '@/components/primitives'
import { TerraceBand } from '@/components/brand'
import { buildTeaser } from '@/lib/build'

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
        label="Follow the build"
        title={
          <>
            From a tired office to <span className="text-primary">five studios</span>
          </>
        }
        intro={
          <p>
            Every room here was built from the shell up. The whole story &mdash; the strip-out, the
            framing, the hand-wrapped fabric walls and the finish &mdash; is worth a look.
          </p>
        }
      >
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:gap-12">
          <div className="grid flex-1 grid-cols-2 gap-3">
            <figure className="flex flex-col gap-2">
              <Photo
                src={buildTeaser.before.src}
                alt={buildTeaser.before.alt}
                className="aspect-3/2"
                sizes="(min-width: 768px) 24vw, 46vw"
              />
              <figcaption className="type-label text-muted-foreground">Before</figcaption>
            </figure>
            <figure className="flex flex-col gap-2">
              <Photo
                src={buildTeaser.after.src}
                alt={buildTeaser.after.alt}
                className="aspect-3/2"
                sizes="(min-width: 768px) 24vw, 46vw"
              />
              <figcaption className="type-label text-muted-foreground">After</figcaption>
            </figure>
          </div>
          <ActionLink href="/follow-the-build">Follow the build</ActionLink>
        </div>
      </Section>

      <Rule />
    </>
  )
}
