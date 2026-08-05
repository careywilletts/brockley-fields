import type { Metadata } from 'next'
import { family } from '@/lib/people'
import { site } from '@/lib/site'
import { ActionLink, Container, InlineLink, PageHeader } from '@/components/primitives'
import { PersonCard } from '@/components/person-card'

export const metadata: Metadata = {
  title: 'Part of the Family',
  description:
    'The session singers, players, supervisors and studio manager who are at Brockley Fields Studios most weeks without renting a room.',
}

export default function PartOfTheFamilyPage() {
  return (
    <>
      <PageHeader
        label={`${family.length} people, no keys`}
        title="Here most weeks. Not on the rent roll."
        intro={
          <>
            <p>
              A studio building is not only its tenants. These are the people who turn up for
              sessions, take the records out into the world, and keep the diary straight — as much
              part of the place as anyone with a door of their own.
            </p>
            <p>
              The ten residents with rooms of their own are on the{' '}
              <InlineLink href="/community">Community</InlineLink> page.
            </p>
          </>
        }
      />

      <section className="border-foreground/20 border-t py-14 sm:py-20">
        <Container>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {family.map((person, i) => (
              <li key={person.slug}>
                <PersonCard person={person} priority={i < 2} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-foreground/20 border-t">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
            <div>
              <p className="type-label">Working with someone here?</p>
              <h2 className="type-display mt-3 max-w-[28rem] text-[26px] text-balance sm:text-[34px]">
                Tell us and we will put you on this page.
              </h2>
              <p className="mt-5 max-w-[34rem] text-[17px] leading-relaxed">
                No form for this one — just email{' '}
                <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink> with who you work
                with and what you do.
              </p>
            </div>
            <ActionLink href={`mailto:${site.email}`} className="shrink-0">
              Get in touch
            </ActionLink>
          </div>
        </Container>
      </section>
    </>
  )
}
