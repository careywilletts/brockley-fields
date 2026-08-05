import type { Metadata } from 'next'
import { units, roomsForUnit, studioCount, officeCount, rooms } from '@/lib/rooms'
import { waitingListHref } from '@/lib/site'
import {
  ActionLink,
  Container,
  InlineLink,
  PageHeader,
  Photo,
  Rule,
} from '@/components/primitives'
import { RoomCard } from '@/components/room-card'
import { StatusBadge } from '@/components/status-badge'

export const metadata: Metadata = {
  title: 'Studios',
  description:
    'Five soundproofed, acoustically treated music studios and two private offices across two units in Brockley, SE4. Scale floor plans, dimensions and current availability for every room.',
}

export default function StudiosPage() {
  const available = rooms.filter((r) => r.status !== 'Occupied')

  return (
    <>
      <PageHeader
        label={`${studioCount} studios · ${officeCount} offices`}
        title="Seven rooms, drawn to scale."
        intro={
          <>
            <p>
              Two units in the same building. Every room here is measured, drawn and published — the
              plan tells you more in a glance than a paragraph of adjectives ever could.
            </p>
            <p>
              {available.length === 0 ? (
                <>
                  Everything is currently occupied.{' '}
                  <InlineLink href={waitingListHref}>Join the waiting list</InlineLink> and we will
                  come to you before a room is advertised.
                </>
              ) : (
                <>
                  {available.length === 1 ? 'One room is' : `${available.length} rooms are`} free or
                  about to be.{' '}
                  <InlineLink href={waitingListHref}>Put your name down</InlineLink>.
                </>
              )}
            </p>
          </>
        }
      />

      {/* Availability index — the answer most visitors came for, before the detail. */}
      <Container className="pb-14 sm:pb-20">
        <Rule weight="heavy" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <li key={room.slug} className="border-foreground/20 border-b">
              <InlineLink
                href={`/studios/${room.slug}`}
                className="type-label-ink flex items-center justify-between gap-4 py-3 no-underline"
              >
                <span>
                  {room.name}
                  <span className="text-muted-foreground">
                    {' '}
                    · {units.find((u) => u.id === room.unit)?.shortName}
                  </span>
                </span>
                <StatusBadge status={room.status} />
              </InlineLink>
            </li>
          ))}
        </ul>
      </Container>

      {units.map((unit) => {
        const unitRooms = roomsForUnit(unit.id)
        return (
          <section
            key={unit.id}
            id={unit.id}
            className="border-foreground/20 border-t py-14 sm:py-20"
          >
            <Container>
              <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
                <div className="lg:w-[38%] lg:shrink-0">
                  <Photo
                    src={unit.hero.src}
                    alt={unit.hero.alt}
                    className="aspect-4/3"
                    sizes="(min-width: 1024px) 38vw, 100vw"
                  />
                </div>
                <div className="lg:flex-1">
                  <p className="type-label">
                    {unit.unitNumber} · {unit.floor}
                  </p>
                  <h2 className="type-display mt-3 text-[26px] sm:text-[34px]">{unit.name}</h2>
                  <p className="mt-5 max-w-[38rem] text-[17px] leading-relaxed">{unit.intro}</p>
                  <dl className="border-foreground/20 mt-7 flex flex-col border-t">
                    <div className="border-foreground/20 flex flex-col gap-1 border-b py-3 sm:flex-row sm:gap-8">
                      <dt className="type-label sm:w-40 sm:shrink-0 sm:pt-1">Shared spaces</dt>
                      <dd className="text-[15px] leading-relaxed">{unit.sharedSpaces}</dd>
                    </div>
                    <div className="border-foreground/20 flex flex-col gap-1 border-b py-3 sm:flex-row sm:gap-8">
                      <dt className="type-label sm:w-40 sm:shrink-0 sm:pt-1">Rooms</dt>
                      <dd className="text-[15px] leading-relaxed">
                        {unitRooms.filter((r) => r.kind === 'studio').length} studios
                        {unitRooms.some((r) => r.kind === 'office') &&
                          `, ${unitRooms.filter((r) => r.kind === 'office').length} offices`}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                {unitRooms.map((room, i) => (
                  <li key={room.slug}>
                    <RoomCard room={room} priority={unit.id === 'studios' && i === 0} />
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
              <p className="type-label">Nothing free today</p>
              <h2 className="type-display mt-3 max-w-[26rem] text-[26px] text-balance sm:text-[34px]">
                Tell us which room you want and we will come to you first.
              </h2>
            </div>
            <ActionLink href={waitingListHref} className="shrink-0">
              Join the waiting list
            </ActionLink>
          </div>
        </Container>
      </section>
    </>
  )
}
