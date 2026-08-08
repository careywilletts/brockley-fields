import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { rooms, getRoom, getUnit, roomsForUnit, spaceCount } from '@/lib/rooms'
import { peopleForRoom } from '@/lib/people'
import { site, waitingListHref } from '@/lib/site'
import { ActionLink, Container, InlineLink, Photo, Rule } from '@/components/primitives'
import { BackLink } from '@/components/back-link'
import { FloorPlan } from '@/components/floor-plan'
import { StatusBadge } from '@/components/status-badge'

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const room = getRoom(slug)
  if (!room) return { title: 'Room not found' }
  const unit = getUnit(room.unit)
  return {
    title: `${room.name} · ${unit.shortName}`,
    description: `${room.area} (${room.dimensions}) ${room.kind} at ${unit.name}, ${site.location}. ${room.blurb}`,
  }
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const room = getRoom(slug)
  if (!room) notFound()

  const unit = getUnit(room.unit)
  const occupants = peopleForRoom(room.occupants)
  const siblings = roomsForUnit(room.unit).filter((r) => r.slug !== room.slug)

  const specs: { term: string; detail: React.ReactNode }[] = [
    { term: 'Type', detail: room.kind === 'office' ? 'Private office' : 'Music studio' },
    { term: 'Floor area', detail: room.area },
    { term: 'Dimensions', detail: room.dimensions },
    { term: 'Unit', detail: `${unit.name} · ${unit.unitNumber}` },
    { term: 'Shared spaces', detail: unit.sharedSpaces },
    { term: 'Status', detail: <StatusBadge status={room.status} /> },
  ]

  return (
    <>
      <Container className="pt-10 pb-12 sm:pt-14 sm:pb-16">
        <nav aria-label="Breadcrumb" className="type-label">
          <ol className="flex flex-wrap items-center gap-x-2">
            <li>
              <InlineLink href="/studios" className="no-underline hover:underline">
                The building
              </InlineLink>
            </li>
            <li aria-hidden>·</li>
            <li>
              {/* The unit's own overview page, now that the rooms live there. */}
              <InlineLink
                href={`/studios/unit/${unit.id}`}
                className="no-underline hover:underline"
              >
                {unit.shortName}
              </InlineLink>
            </li>
            <li aria-hidden>·</li>
            <li aria-current="page" className="text-foreground">
              {room.name}
            </li>
          </ol>
        </nav>

        {/* Steps back through the site's own history, which the browser's own
            back button cannot do reliably when the site is embedded. */}
        <BackLink fallbackHref={`/studios/unit/${unit.id}`} className="type-label-ink mt-5">
          Back to {unit.shortName}
        </BackLink>

        <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-3">
          <h1 className="type-display text-[36px] sm:text-[52px]">{room.name}</h1>
          <StatusBadge status={room.status} />
        </div>
        <p className="type-label mt-3">
          {unit.name} · {room.area} · {room.dimensions}
        </p>
        <p className="mt-7 max-w-[42rem] text-[18px] leading-relaxed">{room.blurb}</p>
      </Container>

      {/* Photographs lead — the drawing follows further down the page. */}
      <section className="border-foreground/20 border-t py-12 sm:py-16">
        <Container>
          <p className="type-label-ink mb-6">The room</p>
          <div className="flex flex-col gap-4">
            <Photo
              src={room.photos[0].src}
              alt={room.photos[0].alt}
              className="aspect-16/9"
              sizes="(min-width: 1180px) 1116px, 100vw"
              priority
            />
            {room.photos.length > 1 && (
              <ul className="grid grid-cols-2 gap-4">
                {room.photos.slice(1).map((photo) => (
                  <li key={photo.src + photo.alt}>
                    <Photo
                      src={photo.src}
                      alt={photo.alt}
                      className="aspect-4/3"
                      sizes="(min-width: 1180px) 550px, 50vw"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="type-label mt-3">
            Room photography is indicative while the shoot is finished.
          </p>
        </Container>
      </section>

      {/* Specification */}
      <section className="border-foreground/20 border-t py-12 sm:py-16">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            <p className="type-label md:w-[13rem] md:shrink-0">Specification</p>
            <dl className="border-foreground/85 max-w-[46rem] flex-1 border-t">
              {specs.map((spec) => (
                <div
                  key={spec.term}
                  className="border-foreground/20 flex flex-col gap-1 border-b py-4 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <dt className="type-label sm:w-44 sm:shrink-0">{spec.term}</dt>
                  <dd className="text-[16px] leading-relaxed">{spec.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/*
        The scale drawing. This is the only place on the site a per-room plan
        appears — useful, but not what you want first.
      */}
      <section className="border-foreground/20 border-t py-12 sm:py-16">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            <p className="type-label md:w-[13rem] md:shrink-0">Scale plan</p>
            {/* Capped so the drawing's internal dimension labels stay legible. */}
            <div className="max-w-[26rem] flex-1">
              <FloorPlan room={room} />
            </div>
          </div>
        </Container>
      </section>

      {/* Who is in it */}
      {occupants.length > 0 && (
        <section className="border-foreground/20 border-t py-12 sm:py-16">
          <Container>
            <div className="flex flex-col gap-8 md:flex-row md:gap-12">
              <p className="type-label md:w-[13rem] md:shrink-0">Currently in this room</p>
              <ul className="flex max-w-[46rem] flex-1 flex-col gap-8">
                {occupants.map((person) => (
                  <li key={person.slug} className="flex gap-5">
                    <Photo
                      src={person.portrait}
                      alt={`Portrait of ${person.name}`}
                      className="aspect-square w-20 shrink-0 sm:w-28"
                      sizes="112px"
                    />
                    <div>
                      <h2 className="type-display text-[18px]">
                        <InlineLink
                          href={`/community/${person.slug}`}
                          className="no-underline hover:underline"
                        >
                          {person.name}
                        </InlineLink>
                      </h2>
                      <p className="type-label mt-2">{person.disciplines.join(' · ')}</p>
                      <p className="mt-3 text-[15px] leading-relaxed">{person.oneLiner}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      {/* Next steps + sibling rooms */}
      <section className="border-foreground/20 border-t">
        <Container className="py-14 sm:py-20">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="lg:flex-1">
              <h2 className="type-display max-w-[24rem] text-[26px] text-balance sm:text-[34px]">
                {room.status === 'Occupied'
                  ? `Want ${room.name} when it comes up?`
                  : `${room.name} is open.`}
              </h2>
              <p className="mt-5 max-w-[34rem] text-[17px] leading-relaxed">
                Name this room on the form and we will contact you the moment it changes hands. We
                share the address privately with applicants — you can also just email{' '}
                <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink>.
              </p>
              <div className="mt-8">
                <ActionLink href={`${waitingListHref}?room=${room.slug}`}>
                  Ask about {room.name}
                </ActionLink>
              </div>
            </div>

            <div className="lg:w-[34%] lg:shrink-0">
              <p className="type-label-ink">Also in {unit.shortName}</p>
              <Rule weight="heavy" />
              <ul className="flex flex-col">
                {siblings.map((sibling) => (
                  <li key={sibling.slug} className="border-foreground/20 border-b">
                    <Link
                      href={`/studios/${sibling.slug}`}
                      className="hover:text-primary flex items-baseline justify-between gap-4 py-3 transition-colors"
                    >
                      <span className="text-[15px]">
                        {sibling.name}
                        <span className="text-muted-foreground"> · {sibling.area}</span>
                      </span>
                      <StatusBadge status={sibling.status} />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-5">
                <InlineLink href="/studios" className="type-label-ink no-underline">
                  All {spaceCount} spaces →
                </InlineLink>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
