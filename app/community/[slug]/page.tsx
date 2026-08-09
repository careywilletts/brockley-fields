import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { people, getPerson, personRoomSlugs } from '@/lib/people'
import { getRoom, getUnit } from '@/lib/rooms'
import { site } from '@/lib/site'
import { ActionLink, Container, InlineLink, Rule } from '@/components/primitives'
import { PersonPortrait } from '@/components/person-portrait'
import { StatusBadge } from '@/components/status-badge'

export function generateStaticParams() {
  return people.map((person) => ({ slug: person.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const person = getPerson(slug)
  if (!person) return { title: 'Profile not found' }
  return {
    title: person.name,
    description: `${person.name} — ${person.disciplines.join(', ')} at Brockley Fields Studios, ${site.location}. ${person.oneLiner}`,
  }
}

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const person = getPerson(slug)
  if (!person) notFound()

  const ownRoomSlugs = personRoomSlugs(person)
  const roomList = ownRoomSlugs.map(getRoom).filter((r): r is NonNullable<typeof r> => Boolean(r))
  const room = roomList[0]
  const unit = room ? getUnit(room.unit) : undefined
  const isResident = person.group === 'resident'
  const indexHref = isResident ? '/community' : '/part-of-the-family'
  const indexLabel = isResident ? 'Community' : 'Part of the Family'

  // Neighbours: anyone sharing any of their rooms, then the rest of the group.
  const roommates = people.filter(
    (p) => p.slug !== person.slug && personRoomSlugs(p).some((s) => ownRoomSlugs.includes(s)),
  )
  const others = people
    .filter((p) => p.group === person.group && p.slug !== person.slug)
    .filter((p) => !roommates.some((r) => r.slug === p.slug))
    .slice(0, 4)

  return (
    <>
      <Container className="pt-10 pb-14 sm:pt-14 sm:pb-20">
        <nav aria-label="Breadcrumb" className="type-label">
          <ol className="flex flex-wrap items-center gap-x-2">
            <li>
              <InlineLink href={indexHref} className="no-underline hover:underline">
                {indexLabel}
              </InlineLink>
            </li>
            <li aria-hidden>·</li>
            <li aria-current="page" className="text-foreground">
              {person.name}
            </li>
          </ol>
        </nav>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:gap-16">
          <div className="max-w-[20rem] lg:w-[30%] lg:max-w-none lg:shrink-0">
            <PersonPortrait
              person={person}
              className="aspect-4/5"
              sizes="(min-width: 1024px) 30vw, 320px"
              priority
            />
          </div>

          <div className="lg:flex-1">
            <h1 className="type-display text-[36px] sm:text-[52px]">{person.name}</h1>
            <p className="type-label mt-3">{person.disciplines.join(' · ')}</p>
            <p className="mt-7 max-w-[38rem] text-[19px] leading-relaxed">{person.oneLiner}</p>
            <p className="mt-5 max-w-[38rem] text-[17px] leading-relaxed">{person.bio}</p>

            <dl className="border-foreground/85 mt-9 max-w-[38rem] border-t">
              <div className="border-foreground/20 flex flex-col gap-1 border-b py-3 sm:flex-row sm:items-baseline sm:gap-8">
                <dt className="type-label sm:w-36 sm:shrink-0">
                  {isResident ? (roomList.length > 1 ? 'Rooms' : 'Room') : 'Connection'}
                </dt>
                <dd className="flex flex-wrap items-center gap-x-3 text-[16px]">
                  {room && unit ? (
                    <>
                      {/* Each room links separately so both office pages are
                          reachable from here. */}
                      <span className="flex flex-wrap items-center gap-x-1.5">
                        {roomList.map((r, index) => (
                          <span key={r.slug}>
                            {index > 0 && ' & '}
                            <InlineLink href={`/studios/${r.slug}`}>{r.name}</InlineLink>
                          </span>
                        ))}
                        {` · ${unit.shortName}`}
                      </span>
                      <StatusBadge status={room.status} />
                    </>
                  ) : (
                    person.relationship
                  )}
                </dd>
              </div>

              {person.credits.length > 0 && (
                <div className="border-foreground/20 flex flex-col gap-1 border-b py-3 sm:flex-row sm:gap-8">
                  <dt className="type-label sm:w-36 sm:shrink-0 sm:pt-1">Selected credits</dt>
                  <dd>
                    <ul className="flex flex-col gap-1">
                      {person.credits.map((credit) => (
                        <li key={credit} className="text-[16px] leading-relaxed">
                          {credit}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}

              {(person.handle || person.links.length > 0) && (
                <div className="border-foreground/20 flex flex-col gap-1 border-b py-3 sm:flex-row sm:items-baseline sm:gap-8">
                  <dt className="type-label sm:w-36 sm:shrink-0">Elsewhere</dt>
                  <dd className="flex flex-wrap items-baseline gap-x-5 gap-y-1 text-[16px]">
                    {person.handle && (
                      <span className="text-muted-foreground">{person.handle}</span>
                    )}
                    {person.links.map((link) => (
                      <InlineLink key={link.href + link.label} href={link.href} external>
                        {link.label}
                      </InlineLink>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </Container>

      {/* Their words, given room to breathe. Omitted entirely until we have a
          real quote from them — never invent one. */}
      {person.quote && (
        <section className="border-foreground/20 border-y">
          <Container className="py-14 sm:py-20">
            <figure className="max-w-[44rem]">
              <blockquote className="type-display text-[22px] leading-[1.3] text-pretty sm:text-[30px]">
                {`\u201C${person.quote}\u201D`}
              </blockquote>
              <figcaption className="type-label mt-6">
                {person.name}
                {room && unit ? ` · ${room.name}, ${unit.shortName}` : ` · ${person.relationship}`}
              </figcaption>
            </figure>
          </Container>
        </section>
      )}

      <Container className="py-14 sm:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="lg:flex-1">
            <h2 className="type-display max-w-[24rem] text-[26px] text-balance sm:text-[32px]">
              {isResident
                ? 'Want a room in the same building?'
                : 'Want to be around people like this?'}
            </h2>
            <p className="mt-5 max-w-[34rem] text-[17px] leading-relaxed">
              Everything is occupied at the moment, which is why the waiting list exists. Put your
              name down and we will come to you before a room is advertised.
            </p>
            <div className="mt-8">
              <ActionLink href="/waiting-list">Join the waiting list</ActionLink>
            </div>
          </div>

          <div className="lg:w-[34%] lg:shrink-0">
            <p className="type-label-ink">
              {roommates.length > 0 ? `Shares ${room?.name} with` : `Also in ${indexLabel}`}
            </p>
            <Rule weight="heavy" />
            <ul className="flex flex-col">
              {[...roommates, ...others].slice(0, 5).map((neighbour) => (
                <li key={neighbour.slug} className="border-foreground/20 border-b">
                  <Link
                    href={`/community/${neighbour.slug}`}
                    className="hover:text-primary flex items-baseline justify-between gap-4 py-3 transition-colors"
                  >
                    <span className="text-[15px]">{neighbour.name}</span>
                    <span className="type-label">
                      {neighbour.shortRole ?? neighbour.disciplines[0]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5">
              <InlineLink href={indexHref} className="type-label-ink no-underline">
                {`All of ${indexLabel} \u2192`}
              </InlineLink>
            </p>
          </div>
        </div>
      </Container>
    </>
  )
}
