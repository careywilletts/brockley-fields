import type { Metadata } from 'next'
import {
  ActionLink,
  Container,
  InlineLink,
  PageHeader,
  Photo,
  Rule,
  Section,
} from '@/components/primitives'
import { TerraceBand } from '@/components/brand'
import { units } from '@/lib/rooms'
import { site, waitingListHref } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Carey Willetts on founding Brockley Fields — from Athlete and the Ivor Novello to five soundproofed studios and two private offices in Brockley, SE4, built on the belief that people matter.',
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title={site.mission}
        intro={
          <>
            <p>
              I&apos;m Carey Willetts. I&apos;ve been in the music industry since 2001 &mdash; first
              as a founding member of Athlete, where we signed to Regal Records and then Parlophone,
              released five albums over a decade, and picked up an Ivor Novello Award along the way.
              Our debut album <em>Vehicles and Animals</em> was nominated for the Mercury Music
              Prize. <em>Tourist</em> went to number one.
            </p>
            <p>
              We learned what it meant to write songs together &mdash; properly together &mdash; and
              that experience of collaboration as the engine of creativity has never left me.
            </p>
          </>
        }
      />

      <TerraceBand
        variant="perspective"
        bleed
        caption="As drawn · the terrace along the street"
        priority
        className="pb-12 sm:pb-16"
      />

      <Container>
        <Photo
          src="/images/exterior.png"
          alt="The entrance to the Brockley Fields building on a quiet residential street"
          sizes="(min-width: 1024px) 1180px, 100vw"
          className="aspect-16/9 border-foreground/20 border"
        />
        <p className="type-label mt-3">As built · the entrance</p>
      </Container>

      <section className="border-foreground/20 border-t py-14 sm:py-20" aria-labelledby="story">
        <Container>
          <div className="flex flex-col gap-10 md:flex-row md:gap-12">
            <div className="md:w-[13rem] md:shrink-0">
              <h2 id="story" className="type-label">
                The story
              </h2>
            </div>
            <div className="flex-1">
              <div className="flex max-w-[38rem] flex-col gap-5 text-[17px] leading-relaxed">
                <p>
                  During those years I built a large recording studio in Greenwich. After Athlete I
                  moved into songwriting and producing for other artists &mdash; working with Dermot
                  Kennedy, Freya Ridings, Amber Run and others, and was shortlisted for Breakthrough
                  Producer of the Year at the Music Producers Guild Awards in 2020. Good work, I
                  found, still comes from the same place it always did: the right people, in the
                  right room, at the right time.
                </p>
                <p>
                  Which brought me back to the same problem every working songwriter eventually
                  hits. Where do you actually go to work? Somewhere permanent, inspiring and
                  affordable. It turns out that place is genuinely hard to find.
                </p>
                <p>
                  After Covid, an opportunity came up. An office space in Brockley, SE4 &mdash; two
                  units. A friend took one, I took the other, and we converted them properly
                  &mdash; soundproofed and acoustically treated by
                  Fritz, whose work can be heard across studios all over the country. Large windows
                  in every room, because I&apos;ve spent enough time in windowless rooms to know how
                  much that matters. Plastered walls, warm finishes, high spec without being
                  clinical. Spaces that feel like somewhere you want to be, not somewhere
                  you&apos;re tolerating.
                </p>
                <p>
                  That was four years ago. Word spread the way good things do &mdash; quietly,
                  through people. This February we added two more studios downstairs. There are now
                  five Brockley Fields studios plus two private offices &mdash; seven spaces in all
                  &mdash; and between our tenants and the wider community around them, over nine
                  music professionals working here every day.
                </p>
                <p>
                  The ethos hasn&apos;t changed since day one:{' '}
                  <span className="text-primary">people over things</span>. Affordable, high-quality
                  spaces for the people who need them most. A building where the person next door
                  might become your next collaborator, your sounding board, your co-writer. Where
                  someone&apos;s already solved the problem you&apos;re stuck on.
                </p>
              </div>

              <p className="type-display mt-10 max-w-[34rem] text-[24px] leading-tight text-pretty sm:text-[28px]">
                Brockley Fields exists because I needed it to exist. I think a lot of you do too.
              </p>
              <p className="type-label mt-6">&mdash; Carey</p>
            </div>
          </div>
        </Container>
      </section>

      <Section
        label="The building"
        title="Two units, one postcode, two completely different atmospheres."
        intro={
          <p>
            They are a short walk apart and share a waiting list, a kettle habit and most of the
            same people. Beyond that they behave nothing alike.
          </p>
        }
      >
        <TerraceBand
          variant="elevation"
          caption="Front elevation · the terrace as drawn"
          className="mt-12"
        />

        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
          {units.map((unit) => (
            <li key={unit.id} className="flex flex-col">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="type-display text-[22px]">{unit.name}</h3>
                <p className="type-label text-muted-foreground shrink-0">
                  {unit.unitNumber} · {unit.floor}
                </p>
              </div>
              <Rule />
              <p className="mt-4 text-[16px] leading-relaxed">{unit.intro}</p>
              <p className="type-label mt-4">{unit.sharedSpaces}</p>
              <div className="mt-5">
                <InlineLink href="/studios" className="type-label-ink">
                  See the rooms and plans
                </InlineLink>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        label="The neighbourhood"
        title="Brockley, which is quieter than it has any right to be."
        intro={
          <>
            <p>
              Southeast London, fifteen minutes from London Bridge, on a street where the loudest
              thing most afternoons is somebody&apos;s extension being built. There is a park at
              the end of the road and enough cafés to argue about.
            </p>
            <p>
              We do not publish the address. Applicants get it by email, and everybody who has been
              here once knows exactly which door it is.
            </p>
          </>
        }
      >
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Photo
            src="/images/brockley.png"
            alt="A quiet residential street in Brockley, southeast London"
            className="border-foreground/20 aspect-4/3 border sm:col-span-2"
            sizes="(min-width: 640px) 60vw, 100vw"
          />
          <Photo
            src="/images/yard.png"
            alt="The enclosed courtyard behind the Yard unit"
            className="border-foreground/20 aspect-4/3 border"
            sizes="(min-width: 640px) 30vw, 100vw"
          />
        </div>
      </Section>

      <section className="border-foreground/20 border-t py-14 sm:py-20" aria-labelledby="contact">
        <Container>
          <div className="flex flex-col gap-10 md:flex-row md:gap-12">
            <div className="md:w-[13rem] md:shrink-0">
              <p className="type-label">Contact</p>
            </div>
            <div className="flex-1">
              <h2 id="contact" className="type-display max-w-[30rem] text-[26px] sm:text-[32px]">
                Rooms come up two or three times a year.
              </h2>
              <p className="mt-5 max-w-[42rem] text-[17px] leading-relaxed">
                When one does, we go down the waiting list and start a conversation. Tell us what
                you make and what you need a room for — that is genuinely all we are reading for.
              </p>

              <dl className="mt-9 flex flex-col gap-5 sm:flex-row sm:gap-14">
                <div>
                  <dt className="type-label">Email</dt>
                  <dd className="mt-1 text-[17px]">
                    <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink>
                  </dd>
                </div>
                <div>
                  <dt className="type-label">Instagram</dt>
                  <dd className="mt-1 text-[17px]">
                    <InlineLink href={site.instagramUrl} external>
                      {site.instagram}
                    </InlineLink>
                  </dd>
                </div>
                <div>
                  <dt className="type-label">Where</dt>
                  <dd className="text-muted-foreground mt-1 text-[17px]">
                    {site.location}
                    <span className="block text-[14px]">Address shared with applicants</span>
                  </dd>
                </div>
              </dl>

              <ActionLink href={waitingListHref} className="mt-9">
                Join the waiting list
              </ActionLink>
            </div>
          </div>
        </Container>
      </section>
      <Rule />
    </>
  )
}
