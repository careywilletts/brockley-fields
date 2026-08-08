import type { Metadata } from 'next'
import { units, roomsForUnit, rooms } from '@/lib/rooms'
import { waitingListHref } from '@/lib/site'
import { ActionLink, Container, InlineLink, Photo, Rule } from '@/components/primitives'
import { TerraceBand } from '@/components/brand'
import { RoomCard } from '@/components/room-card'
import { StatusBadge } from '@/components/status-badge'

export const metadata: Metadata = {
  title: 'Studios',
  description:
    'Five soundproofed, acoustically treated music studios and two private offices across two units in Brockley, SE4. Dimensions, photographs and current availability for every room.',
}

export default function StudiosPage() {
  const available = rooms.filter((r) => r.status !== 'Occupied')

  return (
    <>
      {/*
        The page opens on the building rather than a spaces-and-scale header, so
        this block carries the h1.
      */}
      <Container className="pt-12 pb-12 sm:pt-16 sm:pb-16">
        <p className="type-label">The building</p>
        {/* text-wrap rather than text-balance, so the two lines break exactly
            where they are written rather than being re-balanced. */}
        <h1 className="type-display mt-3 text-[34px] text-wrap sm:text-[52px]">
          Creative spaces,
          <span className="block">real community</span>
        </h1>
        <div className="mt-7 flex max-w-[46rem] flex-col gap-4 text-[17px] leading-relaxed">
          <p>
            Situated in <span className="text-primary">zone 2</span>, only a 2 minute walk from
            Brockley Station. We are surrounded by incredible coffee, quirky bars, vibrant
            restaurants and loads of green spaces&hellip;
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
                {available.length === 1 ? 'One space is' : `${available.length} spaces are`} free or
                about to be. <InlineLink href={waitingListHref}>Put your name down</InlineLink>.
              </>
            )}
          </p>
        </div>
      </Container>

      <TerraceBand variant="elevation" />

      {/*
        One column per unit: the unit, a photograph of it, and its own rooms
        listed directly underneath — Studios on the left, the Yard on the right.
      */}
      <section className="border-foreground/20 border-t py-14 sm:py-20">
        <Container>
          <ul className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
            {units.map((unit, i) => {
              const unitRooms = roomsForUnit(unit.id)
              return (
                <li key={unit.id} className="flex flex-col">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="type-display text-[22px]">{unit.name}</h2>
                    <p className="type-label text-muted-foreground shrink-0">{unit.unitNumber}</p>
                  </div>
                  <Rule />

                  <Photo
                    src={unit.hero.src}
                    alt={unit.hero.alt}
                    className="mt-5 aspect-4/3"
                    sizes="(min-width: 768px) 46vw, 100vw"
                    priority={i === 0}
                  />

                  <p className="mt-5 text-[16px] leading-relaxed">{unit.intro}</p>
                  {/* Two lines reserved from md up, where the columns sit side
                      by side, so the link and room list below line up. */}
                  <p className="type-label mt-4 md:min-h-9">{unit.sharedSpaces}</p>
                  <div className="mt-5">
                    <InlineLink href={`/studios/unit/${unit.id}`} className="type-label-ink">
                      View the space
                    </InlineLink>
                  </div>

                  <div className="mt-8">
                    <Rule weight="heavy" />
                    <ul className="flex flex-col">
                      {unitRooms.map((room) => (
                        <li key={room.slug} className="border-foreground/20 border-b">
                          <InlineLink
                            href={`/studios/${room.slug}`}
                            className="type-label-ink flex items-center justify-between gap-4 py-3 no-underline"
                          >
                            <span>
                              {room.name}
                              <span className="text-muted-foreground"> · {room.area}</span>
                            </span>
                            <StatusBadge status={room.status} />
                          </InlineLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      {units.map((unit) => {
        const unitRooms = roomsForUnit(unit.id)
        return (
          <section
            key={unit.id}
            id={unit.id}
            className="border-foreground/20 border-t py-14 sm:py-20"
          >
            <Container>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
                <div>
                  <p className="type-label">{unit.unitNumber}</p>
                  <h2 className="type-display mt-3 text-[26px] sm:text-[34px]">{unit.name}</h2>
                </div>
                <InlineLink
                  href={`/studios/unit/${unit.id}`}
                  className="type-label-ink shrink-0 no-underline"
                >
                  View the space →
                </InlineLink>
              </div>

              <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                {unitRooms.map((room) => (
                  <li key={room.slug}>
                    <RoomCard room={room} />
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
