import Link from 'next/link'
import { site, waitingListHref } from '@/lib/site'
import { rooms, units, roomsForUnit, studioCount, officeCount } from '@/lib/rooms'
import { events, news, formatDate, formatDateShort } from '@/lib/news'
import {
  ActionLink,
  Container,
  InlineLink,
  Photo,
  Rule,
  Section,
} from '@/components/primitives'
import { FloorPlan } from '@/components/floor-plan'
import { StatusBadge } from '@/components/status-badge'

export default function HomePage() {
  const nextEvent = [...events].sort((a, b) => a.date.localeCompare(b.date))[0]
  const latestNews = [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
  const planStrip = rooms.slice(0, 4)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Container className="pt-14 pb-16 sm:pt-24 sm:pb-24">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:gap-16">
          <div className="lg:flex-1">
            <p className="type-label">{site.location}</p>
            <h1 className="type-display mt-5 text-[32px] leading-[1.04] text-balance sm:max-w-[27rem] sm:text-[56px] lg:max-w-[30rem] lg:text-[66px]">
              Studios for people who make things.
            </h1>
            <p className="mt-8 max-w-[34rem] text-[18px] leading-relaxed">
              Seven rooms across two units in Brockley, southeast London. Music studios, private
              offices, bare plaster and good light. Built on the belief that{' '}
              <span className="text-primary">people matter</span> more than square footage.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ActionLink href={waitingListHref}>Join the waiting list</ActionLink>
              <ActionLink href="/studios" variant="outline">
                See the seven rooms
              </ActionLink>
            </div>
          </div>

          <div className="lg:w-[42%] lg:shrink-0">
            <Photo
              src="/images/hero-studio.png"
              alt="An empty studio room with bare plaster walls and a tall window letting in daylight"
              className="aspect-4/5"
              sizes="(min-width: 1024px) 42vw, 100vw"
              priority
            />
            <p className="type-label mt-3">Studio 2 · Upstairs · 26 m²</p>
          </div>
        </div>
      </Container>

      {/* ── The plans ─────────────────────────────────────────────────────── */}
      <section className="border-foreground/20 border-t py-14 sm:py-20">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between md:gap-12">
            <div>
              <p className="type-label">Every room, measured</p>
              <h2 className="type-display mt-3 max-w-[30rem] text-[26px] text-balance sm:text-[32px]">
                We publish the drawings, not just the adjectives.
              </h2>
            </div>
            <InlineLink href="/studios" className="type-label-ink shrink-0 no-underline">
              All seven rooms →
            </InlineLink>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {planStrip.map((room, i) => (
              <li key={room.slug}>
                <Link
                  href={`/studios/${room.slug}`}
                  className="focus-visible:ring-primary group block focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
                >
                  <div className="transition-opacity group-hover:opacity-90">
                    <FloorPlan room={room} priority={i < 2} />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <h3 className="type-display group-hover:text-primary text-[18px] transition-colors">
                      {room.name}
                    </h3>
                    <StatusBadge status={room.status} />
                  </div>
                  <p className="type-label mt-2">
                    {room.area} · {units.find((u) => u.id === room.unit)?.shortName}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Two units ─────────────────────────────────────────────────────── */}
      <Section
        label="Two units"
        title="Upstairs is for concentration. The Yard is for company."
        intro={
          <p>
            Same building, two different temperaments. Between them: {studioCount} studios,{' '}
            {officeCount} offices, two kitchens, two communal rooms and a kettle that is always just
            about to boil.
          </p>
        }
      >
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
          {units.map((unit) => {
            const unitRooms = roomsForUnit(unit.id)
            return (
              <article key={unit.id} className="flex flex-col">
                <Photo
                  src={unit.hero.src}
                  alt={unit.hero.alt}
                  className="aspect-3/2"
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
                <p className="type-label mt-4">
                  {unit.unitNumber} · {unit.floor}
                </p>
                <h3 className="type-display mt-2 text-[22px]">{unit.name}</h3>
                <p className="mt-3 text-[16px] leading-relaxed">{unit.intro}</p>
                <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">
                  Shared: {unit.sharedSpaces}
                </p>
                <ul className="border-foreground/20 mt-5 flex flex-col border-t">
                  {unitRooms.map((room) => (
                    <li key={room.slug} className="border-foreground/20 border-b">
                      <Link
                        href={`/studios/${room.slug}`}
                        className="hover:text-primary flex items-baseline justify-between gap-4 py-3 transition-colors"
                      >
                        <span className="text-[15px]">
                          {room.name}
                          <span className="text-muted-foreground"> · {room.area}</span>
                        </span>
                        <StatusBadge status={room.status} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </Section>

      {/* ── People matter ─────────────────────────────────────────────────── */}
      <Section label="Why we exist">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <div className="lg:flex-1">
            <h2 className="type-display max-w-[26rem] text-[28px] text-balance sm:text-[38px]">
              {site.mission}
            </h2>
            <div className="mt-7 flex max-w-[38rem] flex-col gap-4 text-[17px] leading-relaxed">
              <p>
                Most places that rent creative space are in the business of renting space. We are in
                the business of who ends up next to whom. We choose residents slowly and we choose
                them for the room and for the corridor.
              </p>
              <p>
                It is why the kitchen is as considered as the studios, why we hold open days instead
                of viewings, and why more collaborations start here at the sink than over email.
              </p>
              <p>
                <InlineLink href="/about">Read how the building came about</InlineLink>, or{' '}
                <InlineLink href="/part-of-the-family">meet the family</InlineLink>.
              </p>
            </div>
          </div>
          <div className="lg:w-[38%] lg:shrink-0">
            <Photo
              src="/images/kitchen.png"
              alt="The shared kitchen with a long wooden table and mismatched chairs"
              className="aspect-4/5"
              sizes="(min-width: 1024px) 38vw, 100vw"
            />
            <p className="type-label mt-3">The kitchen, where most of it happens</p>
          </div>
        </div>
      </Section>

      {/* ── Next event + news ─────────────────────────────────────────────── */}
      <Section label="What's on">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="lg:w-[46%] lg:shrink-0">
            <p className="type-label-ink text-primary">Next up</p>
            <div className="border-foreground/85 mt-4 border-t pt-6">
              <p className="type-label">{formatDate(nextEvent.date)}</p>
              <h3 className="type-display mt-2 text-[26px] sm:text-[30px]">{nextEvent.title}</h3>
              <p className="mt-4 text-[16px] leading-relaxed">{nextEvent.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {nextEvent.cta && (
                  <ActionLink href={nextEvent.cta.href}>{nextEvent.cta.label}</ActionLink>
                )}
                <ActionLink href="/events-and-news" variant="outline">
                  Everything else on
                </ActionLink>
              </div>
            </div>
          </div>

          <div className="lg:flex-1">
            <p className="type-label-ink">Lately</p>
            <ul className="border-foreground/20 mt-4 flex flex-col border-t">
              {latestNews.map((item) => {
                const d = formatDateShort(item.date)
                return (
                  <li key={item.slug} className="border-foreground/20 border-b py-5">
                    <div className="flex gap-5">
                      <p className="type-label w-14 shrink-0 pt-1">
                        {d.day} {d.month}
                      </p>
                      <div>
                        <h3 className="text-[17px] leading-snug font-medium">{item.title}</h3>
                        <p className="text-muted-foreground mt-2 text-[15px] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── Waiting list ──────────────────────────────────────────────────── */}
      <section className="border-foreground/20 border-t">
        <Container className="py-16 sm:py-24">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="lg:flex-1">
              <p className="type-label">Rooms rarely come up</p>
              <h2 className="type-display mt-4 max-w-[24rem] text-[30px] text-balance sm:text-[42px]">
                When one does, the list hears first.
              </h2>
              <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed">
                Every room is currently taken. Tell us what you make and which room you have your
                eye on, and we will come to you before anything is advertised. We share the address
                privately with applicants.
              </p>
              <div className="mt-9">
                <ActionLink href={waitingListHref}>Join the waiting list</ActionLink>
              </div>
            </div>
            <div className="lg:w-[34%] lg:shrink-0">
              <Rule weight="heavy" />
              <dl className="mt-5 flex flex-col gap-4">
                <div className="flex justify-between gap-4">
                  <dt className="type-label">Rooms</dt>
                  <dd className="text-[15px]">
                    {studioCount} studios, {officeCount} offices
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="type-label">Where</dt>
                  <dd className="text-[15px]">{site.location}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="type-label">Email</dt>
                  <dd className="text-[15px]">
                    <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink>
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="type-label">Instagram</dt>
                  <dd className="text-[15px]">
                    <InlineLink href={site.instagramUrl} external>
                      {site.instagram}
                    </InlineLink>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
