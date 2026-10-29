import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { units, roomsForUnit, type UnitId } from '@/lib/rooms'
import { site, waitingListHref } from '@/lib/site'
import { ActionLink, BackLink, Container, InlineLink, Photo, Rule } from '@/components/primitives'
import { RoomCard } from '@/components/room-card'

export function generateStaticParams() {
  return units.map((unit) => ({ unitId: unit.id }))
}

/** units.find rather than getUnit(), which throws on an unknown id. */
function findUnit(id: string) {
  return units.find((unit) => unit.id === (id as UnitId))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unitId: string }>
}): Promise<Metadata> {
  const { unitId } = await params
  const unit = findUnit(unitId)
  if (!unit) return { title: 'Unit not found' }
  return {
    title: unit.name,
    description: `${unit.name} (${unit.unitNumber}) in ${site.location}. ${unit.intro} ${unit.sharedSpaces}`,
  }
}

export default async function UnitPage({ params }: { params: Promise<{ unitId: string }> }) {
  const { unitId } = await params
  const unit = findUnit(unitId)
  if (!unit) notFound()

  const unitRooms = roomsForUnit(unit.id)
  const studios = unitRooms.filter((room) => room.kind === 'studio').length
  const offices = unitRooms.filter((room) => room.kind === 'office').length
  const available = unitRooms.filter((room) => room.status !== 'Occupied')
  const other = units.find((u) => u.id !== unit.id)

  const specs: { term: string; detail: React.ReactNode }[] = [
    { term: 'Unit', detail: unit.unitNumber },
    {
      term: 'Spaces',
      detail: `${studios} studios${offices > 0 ? `, ${offices} offices` : ''}`,
    },
    { term: 'Shared spaces', detail: unit.sharedSpaces },
    { term: 'Location', detail: site.location },
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
            <li aria-current="page" className="text-foreground">
              {unit.shortName}
            </li>
          </ol>
        </nav>

        <BackLink href="/studios" className="type-label-ink mt-5">
          Back to the building
        </BackLink>

        <p className="type-label mt-6">{unit.unitNumber}</p>
        <h1 className="type-display mt-3 text-[34px] sm:text-[52px]">{unit.name}</h1>
        <div className="mt-7 flex max-w-[46rem] flex-col gap-4 text-[17px] leading-relaxed">
          {unit.overview.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </Container>

      {/* The unit as a whole — communal parts rather than the rooms. */}
      <section className="border-foreground/20 border-t py-12 sm:py-16" aria-labelledby="pictures">
        <Container>
          <h2 id="pictures" className="type-label-ink">
            The space
          </h2>
          <div className="mt-6 flex flex-col gap-4">
            <Photo
              src={unit.gallery[0].src}
              alt={unit.gallery[0].alt}
              className="aspect-16/9"
              sizes="(min-width: 1180px) 1116px, 100vw"
              priority
            />
            {/* Three across from sm up so the three secondary photographs form
                one complete row rather than leaving an orphan. */}
            {unit.gallery.length > 1 && (
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {unit.gallery.slice(1).map((photo) => (
                  <li key={photo.src + photo.alt}>
                    <Photo
                      src={photo.src}
                      alt={photo.alt}
                      className="aspect-4/3"
                      sizes="(min-width: 640px) 33vw, 50vw"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </section>

      {/*
        Whole-unit layout. Rendered only when a drawing has been supplied, so the
        section disappears rather than breaking while the plans are in progress.
      */}
      {unit.unitPlan && (
        <section className="border-foreground/20 border-t py-12 sm:py-16" aria-labelledby="plan">
          <Container>
            <div className="flex flex-col gap-8 md:flex-row md:gap-12">
              <div className="md:w-[13rem] md:shrink-0">
                <h2 id="plan" className="type-label">
                  Layout
                </h2>
              </div>
              <figure className="max-w-[46rem] flex-1">
                {/* On the raw ground, framed by a hairline, never cropped —
                    the same treatment the per-room drawings get. */}
                <div className="border-foreground/20 border p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={unit.unitPlan.src || '/placeholder.svg'}
                    alt={unit.unitPlan.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full object-contain"
                  />
                </div>
                <figcaption className="type-label mt-3">
                  {unit.name} · {unit.unitNumber}, {studios} studios
                  {offices > 0 && `, ${offices} offices`}
                </figcaption>
              </figure>
            </div>
          </Container>
        </section>
      )}

      {/* Specification */}
      <section className="border-foreground/20 border-t py-12 sm:py-16" aria-labelledby="spec">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            <h2 id="spec" className="type-label md:w-[13rem] md:shrink-0">
              Specification
            </h2>
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
        The rooms as photographic cards. Full width rather than in the indented
        label column the sections above use, so three cards fit across.
      */}
      <section className="border-foreground/20 border-t py-12 sm:py-16" aria-labelledby="rooms">
        <Container>
          <h2 id="rooms" className="type-label-ink">
            The rooms
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {unitRooms.map((room) => (
              <li key={room.slug}>
                <RoomCard room={room} />
              </li>
            ))}
          </ul>
          <p className="type-label mt-10">
            Each room has its own page, with a scale plan and dimensions.
          </p>
        </Container>
      </section>

      <section className="border-foreground/20 border-t">
        <Container className="py-14 sm:py-20">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="lg:flex-1">
              <h2 className="type-display max-w-[26rem] text-[26px] text-balance sm:text-[34px]">
                {available.length === 0
                  ? `Every room in ${unit.shortName} is taken.`
                  : `${available.length === 1 ? 'One room is' : `${available.length} rooms are`} open in ${unit.shortName}.`}
              </h2>
              <p className="mt-5 max-w-[34rem] text-[17px] leading-relaxed">
                Name the unit on the form and we will come to you before anything here is
                advertised. You can also just email{' '}
                <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink>.
              </p>
              <div className="mt-8">
                <ActionLink href={waitingListHref}>Join the waiting list</ActionLink>
              </div>
            </div>

            {other && (
              <div className="lg:w-[34%] lg:shrink-0">
                <p className="type-label-ink">The other unit</p>
                <Rule weight="heavy" />
                <h3 className="type-display mt-4 text-[20px]">{other.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed">{other.intro}</p>
                <p className="mt-5">
                  <InlineLink href={`/studios/unit/${other.id}`} className="type-label-ink">
                    View the space
                  </InlineLink>
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  )
}
