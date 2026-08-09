import type { Metadata } from 'next'
import Link from 'next/link'
import { family, personRoomSlugs, bioParagraphs } from '@/lib/people'
import { getRoom, getUnit } from '@/lib/rooms'
import { site } from '@/lib/site'
import { ActionLink, Container, InlineLink, PageHeader } from '@/components/primitives'
import { PersonPortrait } from '@/components/person-portrait'

export const metadata: Metadata = {
  title: 'Part of the Family',
  description: `The writers, producers and engineers who work out of Brockley Fields Studios in ${site.location} — everyone in the building, in their own words.`,
}

export default function PartOfTheFamilyPage() {
  return (
    <>
      <PageHeader
        label="In the building"
        title={
          <>
            Part of <span className="text-primary">the family</span>
          </>
        }
        intro={<p>Meet the people who call Brockley Fields home.</p>}
      />

      {/*
        A roster rather than a card grid: full bios are the point of this page,
        so each person gets a row with room to actually read them.
      */}
      <section className="border-foreground/20 border-t">
        <Container>
          <ul>
            {family.map((person, i) => {
              const roomList = personRoomSlugs(person)
                .map(getRoom)
                .filter((r): r is NonNullable<typeof r> => Boolean(r))
              const unit = roomList[0] ? getUnit(roomList[0].unit) : undefined

              // The handle is already shown as an Instagram link, so drop any
              // listed link that points at the same place.
              const handleHref = person.handle
                ? `https://instagram.com/${person.handle.slice(1)}`
                : undefined
              const extraLinks = person.links.filter(
                (link) => link.href.replace(/\/$/, '') !== handleHref,
              )

              return (
                <li
                  key={person.slug}
                  className={
                    i > 0 ? 'border-foreground/20 border-t py-14 sm:py-20' : 'py-14 sm:py-20'
                  }
                >
                  <div className="flex flex-col gap-8 md:flex-row md:gap-12">
                    <div className="md:w-[13rem] md:shrink-0">
                      <PersonPortrait
                        person={person}
                        className="aspect-4/5 max-w-[10rem] md:max-w-none"
                        sizes="(min-width: 768px) 13rem, 10rem"
                        priority={i < 2}
                      />
                      {roomList.length > 0 && unit && (
                        <p className="type-label mt-4">
                          {roomList.map((r, index) => (
                            <span key={r.slug}>
                              {index > 0 && ' & '}
                              <Link
                                href={`/studios/${r.slug}`}
                                className="hover:text-primary transition-colors"
                              >
                                {r.name}
                              </Link>
                            </span>
                          ))}
                          {` · ${unit.residentLabel ?? unit.shortName}`}
                        </p>
                      )}
                      {person.relationship && roomList.length === 0 && (
                        <p className="type-label mt-4">{person.relationship}</p>
                      )}
                    </div>

                    <div className="flex-1">
                      {/* Ink rather than the accent colour: at display size a
                          green heading fights the rest of the page. */}
                      <h2 className="type-display text-[26px] sm:text-[32px]">
                        <Link
                          href={`/community/${person.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {person.name}
                        </Link>
                      </h2>
                      <p className="type-label mt-3">{person.disciplines.join(' · ')}</p>

                      {bioParagraphs(person).map((paragraph, i) => (
                        <p
                          key={i}
                          className="mt-6 max-w-[42rem] text-[17px] leading-relaxed [&+p]:mt-4"
                        >
                          {paragraph}
                        </p>
                      ))}

                      {person.credits.length > 0 && (
                        <div className="mt-7 max-w-[42rem]">
                          <p className="type-label">Selected work</p>
                          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                            {person.credits.map((credit) => (
                              <li key={credit} className="text-[17px]">
                                {credit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Omitted for anyone with nothing to link to, rather
                          than leaving an empty row. */}
                      {(handleHref || extraLinks.length > 0) && (
                        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
                          {handleHref && person.handle && (
                            <li className="text-[17px]">
                              <InlineLink href={handleHref} external>
                                {person.handle}
                              </InlineLink>
                            </li>
                          )}
                          {extraLinks.map((link) => (
                            <li key={link.href} className="text-[17px]">
                              <InlineLink href={link.href} external>
                                {link.label}
                              </InlineLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      <section className="border-foreground/20 border-t">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
            <div>
              <p className="type-label">Want a room in the building?</p>
              <h2 className="type-display mt-3 max-w-[28rem] text-[26px] text-balance sm:text-[34px]">
                Rooms come up two or three times a year.
              </h2>
              <p className="mt-5 max-w-[34rem] text-[17px] leading-relaxed">
                Put your name down and we will come to you when one does. Or just email{' '}
                <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink>.
              </p>
            </div>
            <ActionLink href="/studios" className="shrink-0">
              See the studios
            </ActionLink>
          </div>
        </Container>
      </section>
    </>
  )
}
