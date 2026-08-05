import type { Metadata } from 'next'
import { residents, family } from '@/lib/people'
import { units, getRoom } from '@/lib/rooms'
import { site } from '@/lib/site'
import { ActionLink, Container, InlineLink, PageHeader } from '@/components/primitives'
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
              {site.mission} These are the people who hold the keys — writers, producers, engineers,
              a manager and a publisher, spread across two units and seven rooms.
            </p>
            <p>
              There is a second circle too: the singers, supervisors and players who are here most
              weeks without renting a room. You will find them on{' '}
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
        const unitPeople = residents.filter((person) => {
          const room = person.roomSlug ? getRoom(person.roomSlug) : undefined
          return room?.unit === unit.id
        })
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

      <section className="border-foreground/20 border-t">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
            <div>
              <p className="type-label">{family.length} more in the extended circle</p>
              <h2 className="type-display mt-3 max-w-[28rem] text-[26px] text-balance sm:text-[34px]">
                Not everyone who belongs here pays rent.
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
