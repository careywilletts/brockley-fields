import Link from 'next/link'
import { site, waitingListHref } from '@/lib/site'
import { units, roomsForUnit, studioCount, officeCount, spaceCount } from '@/lib/rooms'
import { news, formatDateShort } from '@/lib/news'
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
              <span className="text-primary">people matter</span>
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
        Single column at every width: copy first, then the photograph as a wide
        band beneath it. Side by side, the two never balanced — the copy runs long
        enough that the image column had to be either a thin strip or taller than
        the text beside it.
      */}
      <Section label="Why we exist">
        {/* Full measure, so the heading gets the same scale as the hero. */}
        <h2 className="type-display max-w-[20rem] text-[30px] leading-[1.06] text-balance sm:max-w-[34rem] sm:text-[42px] lg:text-[48px]">
          To collaborate <span className="text-primary">and create</span>
        </h2>
        <div className="mt-6 flex max-w-[46rem] flex-col gap-4 text-[17px] leading-relaxed">
          <p>
            Brockley Fields is based in the heart of Southeast London, with five carefully designed
            studios and two commercial spaces which are full of natural light in which you want to
            creatively spend your day. All are sound proofed, treated and with communal spaces.
          </p>
          <p>
            What&apos;s happened since has been the best part &ndash; songwriters, producers, mixers,
            arrangers and managers who work side by side. We collaborate, spark ideas and create.
            That&apos;s not accidental, it&apos;s the whole point.
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
        {/*
          Contained rather than `bleed`, since it sits inside the Section's
          container — the panorama still gets the full text measure to run across.
        */}
        <TerraceBand variant="elevation" className="mt-10" />
      </Section>

      {/* ── The two units ─────────────────────────────────────────────────── */}
      <Section>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
          {units.map((unit) => {
            const unitRooms = roomsForUnit(unit.id)
            return (
              <article key={unit.id} className="flex flex-col">
                {/*
                  Title above the photograph, as on the Studios page: the unit
                  number alone as the eyebrow, so the heading can carry the
                  unit's full name rather than the abbreviated shortName.
                */}
                <p className="type-label">{unit.unitNumber}</p>
                {/*
                  The heading and the photograph both lead to the unit. The
                  photo link is hidden from assistive tech and taken out of the
                  tab order so it does not repeat the heading link beside it.
                */}
                <h3 className="type-display mt-2 text-[22px]">
                  <Link
                    href={`/studios/unit/${unit.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {unit.name}
                  </Link>
                </h3>
                <Link
                  href={`/studios/unit/${unit.id}`}
                  aria-hidden
                  tabIndex={-1}
                  className="group mt-4 block"
                >
                  <Photo
                    src={unit.hero.src}
                    alt={unit.hero.alt}
                    className="aspect-3/2"
                    imageClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(min-width: 768px) 45vw, 100vw"
                  />
                </Link>
                <p className="mt-4 text-[16px] leading-relaxed">{unit.intro}</p>
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

      {/* ── Latest news ───────────────────────────────────────────────────── */}
      {/*
        Events are on hold, so this is a single news column with the heading on
        the left rather than the old "next event + lately" two-column split.
      */}
      <Section label="News">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="lg:w-[38%] lg:shrink-0">
            <h2 className="type-display max-w-[20rem] text-[26px] text-balance sm:text-[30px]">
              What the residents have been up to.
            </h2>
            <div className="mt-6">
              <ActionLink href="/news" variant="outline">
                All news
              </ActionLink>
            </div>
          </div>

          <div className="lg:flex-1">
            <ul className="border-foreground/20 flex flex-col border-t">
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
