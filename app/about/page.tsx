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
import { units } from '@/lib/rooms'
import { site, waitingListHref } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Brockley Fields was built on a simple belief: people matter. Two units in southeast London, seven rooms, and no address published online.',
}

const principles = [
  {
    title: 'People before rooms',
    body: 'We choose residents the way you would choose housemates. A room going to somebody who will be generous with it is worth more to the building than a room going to the highest bidder.',
  },
  {
    title: 'Treated properly, priced honestly',
    body: 'Every room is acoustically treated to the same standard, upstairs and down. The rent covers the building and nothing else — there is no margin being extracted here.',
  },
  {
    title: 'A door that shuts',
    body: 'Private rooms, held on a monthly basis, with keys. Not hot-desking, not hourly booking. You leave your setup where it is and come back to it tomorrow.',
  },
  {
    title: 'No address online',
    body: 'We share the address privately with people who are coming. It keeps the place calm for the residents and means nobody turns up unannounced during a vocal take.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title={site.mission}
        intro={
          <>
            <p>
              Brockley Fields is two units in {site.location}, run by the people who work in them.
              There are ten residents with rooms of their own, four more in the extended circle, and
              a waiting list that moves slowly for good reasons.
            </p>
            <p>
              It was not built as an investment. It was built because the people who started it
              could not find anywhere decent, affordable and quiet enough to work, and eventually
              stopped waiting for somebody else to make one.
            </p>
          </>
        }
      />

      <Container>
        <Photo
          src="/images/exterior.png"
          alt="The entrance to the Brockley Fields building on a quiet residential street"
          priority
          sizes="(min-width: 1024px) 1180px, 100vw"
          className="aspect-16/9 border-foreground/20 border"
        />
      </Container>

      <Section
        label="How it works"
        title="Four things we decided at the start and have not changed."
      >
        <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
          {principles.map((principle) => (
            <li key={principle.title} className="border-foreground/20 border-t pt-5">
              <h3 className="type-display text-[20px] leading-tight">{principle.title}</h3>
              <p className="mt-3 max-w-[30rem] text-[16px] leading-relaxed">{principle.body}</p>
            </li>
          ))}
        </ul>
      </Section>

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
        <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
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
