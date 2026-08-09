import type { Metadata } from 'next'
import { residents, personRoomSlugs } from '@/lib/people'
import { units, getRoom, spaceCount } from '@/lib/rooms'
import { site } from '@/lib/site'
import {
  ActionLink,
  Container,
  InlineLink,
  PageHeader,
  Photo,
  Section,
} from '@/components/primitives'
import { PersonCard } from '@/components/person-card'

export const metadata: Metadata = {
  title: 'Community',
  description: `The songwriters, producers, engineers, managers and publishers who work out of Brockley Fields Studios in ${site.location}. ${residents.length} residents across two units.`,
}

export default function CommunityPage() {
  const disciplines = Array.from(new Set(residents.flatMap((p) => p.disciplines))).sort()

  return (
    <>
      <PageHeader
        label={`${residents.length} residents`}
        title="The building is the people in it."
        intro={
          <>
            <p>
              {site.mission} These are the people who hold the keys — writers, producers and
              engineers, spread across two units and {spaceCount} spaces.
            </p>
            <p>
              Everybody here is part of the family, and their full bios are on{' '}
              <InlineLink href="/part-of-the-family">Part of the Family</InlineLink>.
            </p>
          </>
        }
      />

      {/* What is actually in the building, stated plainly. */}
      <Container className="pb-14 sm:pb-20">
        <ul className="border-foreground/85 flex flex-wrap gap-x-6 gap-y-2 border-t pt-4">
          {disciplines.map((discipline) => (
            <li key={discipline} className="type-label">
              {discipline}
            </li>
          ))}
        </ul>
      </Container>

      {units.map((unit) => {
        // Group by the room's actual unit rather than by slug shape.
        const unitPeople = residents.filter((person) =>
          personRoomSlugs(person).some((slug) => getRoom(slug)?.unit === unit.id),
        )
        if (unitPeople.length === 0) return null

        return (
          <section
            key={unit.id}
            id={unit.id}
            className="border-foreground/20 border-t py-14 sm:py-20"
          >
            <Container>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <h2 className="type-display text-[26px] sm:text-[34px]">{unit.name}</h2>
                <p className="type-label shrink-0 whitespace-nowrap">
                  {unitPeople.length} {unitPeople.length === 1 ? 'person' : 'people'} ·{' '}
                  {unit.unitNumber}
                </p>
              </div>

              <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {unitPeople.map((person, i) => (
                  <li key={person.slug}>
                    <PersonCard person={person} priority={unit.id === 'studios' && i < 2} />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        )
      })}

      {/*
        The neighbourhood, moved over from the about page: it sits with the people
        rather than the founding story, and leads into the full bios below.
      */}
      <Section
        title={
          <>
            Brockley
            <span className="text-primary block">The best place in London</span>
          </>
        }
        intro={
          <>
            <p>
              Southeast London, fifteen minutes from London Bridge, on a street where the loudest
              thing most afternoons is somebody&apos;s extension being built. There is a park at the
              end of the road and enough cafés to argue about.
            </p>
            <p>
              We do not publish the address. Applicants get it by email, and everybody who has been
              here once knows exactly which door it is.
            </p>
          </>
        }
      >
        {/* Both images are close to square, so an equal pair keeps the murals
            intact rather than cropping them to a wider ratio. */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Photo
            src="/images/brockley-bridge.jpg"
            alt="The railway bridge in Brockley, with a blue and yellow BROCKLEY mural painted on the brick arch beneath it"
            className="border-foreground/20 aspect-square border"
            sizes="(min-width: 640px) 45vw, 100vw"
          />
          <Photo
            src="/images/se4.jpg"
            alt="A green corner shop in Brockley beside gates painted with a large blue SE4 mural"
            className="border-foreground/20 aspect-square border"
            sizes="(min-width: 640px) 45vw, 100vw"
          />
        </div>
      </Section>

      <section className="border-foreground/20 border-t">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
            <div>
              <p className="type-label">The longer read</p>
              <h2 className="type-display mt-3 max-w-[28rem] text-[26px] text-balance sm:text-[34px]">
                Everybody here is part of the family.
              </h2>
            </div>
            <ActionLink href="/part-of-the-family" className="shrink-0">
              Part of the Family
            </ActionLink>
          </div>
        </Container>
      </section>
    </>
  )
}
