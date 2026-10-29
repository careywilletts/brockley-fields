import type { Metadata } from 'next'
import Link from 'next/link'
import { units, roomsForUnit, rooms } from '@/lib/rooms'
import { site, waitingListHref } from '@/lib/site'
import { ActionLink, Container, InlineLink, Photo, Rule } from '@/components/primitives'
import { TerraceBand } from '@/components/brand'
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
        <p className="type-label type-eyebrow">The building</p>
        {/* text-wrap rather than text-balance, so the two lines break exactly
            where they are written rather than being re-balanced. */}
        <h1 className="type-display mt-3 text-[34px] text-wrap sm:text-[52px]">
          Creative spaces,
          <span className="text-primary block">real community</span>
        </h1>
        <div className="mt-7 flex max-w-[46rem] flex-col gap-4 text-[17px] leading-relaxed">
          <p>
            Just a two-minute walk from Brockley Station,{' '}
            <strong className="text-primary font-semibold">Zone 2</strong>, we are located on a quiet
            road in the heart of a creative neighbourhood, with great coffee, good food, and green
            space close by.
          </p>
          <p>
            {available.length === 0 ? (
              <>
                {/* The sentence break is a real line break here, as written. */}
                All studios are currently occupied.
                <br />
                <InlineLink href={waitingListHref} className="font-semibold">
                  Join the waiting list
                </InlineLink>{' '}
                and we will contact you before we advertise.
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
                    <h2 className="type-display text-[22px]">
                      <Link
                        href={`/studios/unit/${unit.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        {unit.name}
                      </Link>
                    </h2>
                    <p className="type-label text-muted-foreground shrink-0">{unit.unitNumber}</p>
                  </div>
                  <Rule />

                  {/*
                    The photograph leads to the unit as well. Hidden from
                    assistive tech and out of the tab order, since the heading
                    above and "View the space" below already go there.
                  */}
                  <Link
                    href={`/studios/unit/${unit.id}`}
                    aria-hidden
                    tabIndex={-1}
                    className="group mt-5 block"
                  >
                    <Photo
                      src={unit.hero.src}
                      alt={unit.hero.alt}
                      className="aspect-4/3"
                      imageClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width: 768px) 46vw, 100vw"
                      priority={i === 0}
                    />
                  </Link>

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

      {/*
        Closes the page: how rooms actually come up, and how to reach us. This
        replaces the old "Nothing free today" panel, which made the same
        waiting-list ask twice over.
      */}
      <section className="border-foreground/20 border-t py-14 sm:py-20" aria-labelledby="contact">
        <Container>
          {/* Label sits directly above the heading, flush with the page's left
              edge, matching the way the page header itself is set. */}
          <p className="type-label type-eyebrow">We don&apos;t have rooms often.</p>
          <h2 id="contact" className="type-display mt-3 max-w-[30rem] text-[26px] sm:text-[32px]">
            But when we do, we <span className="text-primary">love to welcome</span> someone new.
          </h2>
          <p className="mt-5 max-w-[42rem] text-[17px] leading-relaxed">
            When a room becomes available, we work through our waiting list and start a
            conversation. Tell us what you make and what you need the space for — that&apos;s all we
            need to know.
          </p>

          {/* Full width now the label column is gone, so three across fits. */}
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
        </Container>
      </section>
    </>
  )
}
