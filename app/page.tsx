import Link from 'next/link'
import { site, waitingListHref } from '@/lib/site'
import { units, roomsForUnit, studioCount, officeCount, spaceCount } from '@/lib/rooms'
import { events, news, formatDate, formatDateShort } from '@/lib/news'
import {
  ActionLink,
  Container,
  InlineLink,
  Photo,
  Rule,
  Section,
} from '@/components/primitives'
import { TerraceBand } from '@/components/brand'
import { StatusBadge } from '@/components/status-badge'

export default function HomePage() {
  const nextEvent = [...events].sort((a, b) => a.date.localeCompare(b.date))[0]
  const latestNews = [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Container className="pt-14 pb-16 sm:pt-24 sm:pb-24">
        {/* Buttons moved to "Why we exist", so the columns align at the top now. */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          <div className="lg:flex-1">
            <p className="type-label">Brockley, SE4</p>
            <h1 className="type-display mt-5 max-w-[20rem] text-[30px] leading-[1.06] text-balance sm:max-w-[34rem] sm:text-[42px] lg:max-w-[36rem] lg:text-[54px]">
              Brockley Fields was built on a simple belief:{' '}
              <span className="text-primary">people matter.</span>
            </h1>
            <p className="mt-8 max-w-[34rem] text-[18px] leading-relaxed">
              One of the hardest parts of being a creative person is finding a space to work. Then
              finding a place to create that is inspiring and affordable is even harder, so we did
              something about it.
            </p>
          </div>

          <div className="lg:w-[42%] lg:shrink-0">
            <Photo
              src="/images/hero-studio.png"
              alt="An empty studio room with bare plaster walls and a tall window letting in daylight"
              className="aspect-4/5"
              sizes="(min-width: 1024px) 42vw, 100vw"
              priority
            />
            <p className="type-label mt-3">Studio 2 · Brockley Fields Studios · 26 m²</p>
          </div>
        </div>
      </Container>

      {/* ── Why we exist ──────────────────────────────────────────────────── */}
      {/*
        The eyebrow lives inside the copy column rather than in Section's own
        label slot: that slot sits in a row above the children, which would push
        the image down and stop the two columns lining up at the top.
      */}
      <Section>
        {/*
          Image left, copy right, top-aligned via `items-start` so the top of the
          photograph lines up with the eyebrow label. `order` flips the pair on
          mobile, where the copy has to come first and the image sits below it.
        */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-10 lg:gap-16">
          {/*
            The window photograph rather than the terrace drawing: that drawing is
            a ~4:1 panorama and can only ever work as a full-width band, so it now
            lives lower down the page beside the elevation. A portrait 4:5 crop
            fills this column properly.
          */}
          <div className="order-2 md:order-1 md:w-[45%] md:shrink-0">
            <Photo
              src="/images/window-green.png"
              alt="Floor-to-ceiling studio windows looking out onto greenery"
              className="aspect-4/5"
              sizes="(min-width: 768px) 45vw, 100vw"
            />
            <p className="type-label mt-3">Floor-to-ceiling windows, green outlook</p>
          </div>

          <div className="order-1 md:order-2 md:flex-1">
            <p className="type-label">Why we exist</p>
            {/* Matched to the hero h1 scale so both straplines carry equal weight. */}
            {/*
              Stepped down at md: from there the copy shares the row with the
              photograph, so the hero's 42px would break "To collaborate" across
              two lines in the narrower column.
            */}
            <h2 className="type-display mt-3 max-w-[20rem] text-[30px] leading-[1.06] text-balance sm:max-w-[34rem] sm:text-[42px] md:text-[34px] lg:text-[44px]">
              To collaborate <span className="text-primary">and create</span>
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-[17px] leading-relaxed">
              <p>
                Brockley Fields is based in the heart of Southeast London, with five carefully
                designed studios and two office spaces which are full of natural light and spaces in
                which you want to creatively spend your day. All are sound proofed, treated and with
                communal spaces.
              </p>
              <p>
                What&apos;s happened since has been the best part &ndash; songwriters, producers,
                mixers, arrangers and managers who work side by side. We collaborate, spark ideas
                and create. That&apos;s not accidental, it&apos;s the whole point.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ActionLink href="/about" variant="fill">
                Our story
              </ActionLink>
              <ActionLink href="/studios" variant="fill">
                All {spaceCount} spaces
              </ActionLink>
              <ActionLink href={waitingListHref} variant="fill">
                Waiting list
              </ActionLink>
            </div>
          </div>
        </div>
      </Section>

      {/* ── The two units ─────────────────────────────────────────────────── */}
      <Section>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
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
                {/*
                  The unit name is now the eyebrow label, replacing the old
                  "Unit 1 · Upstairs" line, so the heading carries the shortName
                  to avoid printing the same words twice.
                */}
                <p className="type-label mt-4">{unit.name}</p>
                <h3 className="type-display mt-2 text-[22px]">{unit.shortName}</h3>
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

      {/* ── The drawings ──────────────────────────────────────────────────── */}
      {/*
        Both terrace drawings are extreme panoramas, so they only ever appear as
        full-width bands — never inside a column, where they collapse to a strip.
        Their job here is to break the page up before What's on.
      */}
      <TerraceBand
        variant="perspective"
        bleed
        caption="The terrace on approach"
        className="pt-14 sm:pt-20"
      />
      <TerraceBand
        variant="elevation"
        bleed
        caption="Front elevation · both units, drawn to the same scale"
        className="py-14 sm:py-20"
      />

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
                All studios are currently occupied &mdash;{' '}
                <InlineLink href={waitingListHref}>join our waiting list here</InlineLink>. Tell us
                what you make and which room you have your eye on, and we will come to you before
                anything is advertised.
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
