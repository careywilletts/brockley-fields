import type { Metadata } from 'next'
import { ActionLink, Container, InlineLink, PageHeader, Rule } from '@/components/primitives'
import { events, news, formatDate, formatDateShort } from '@/lib/news'
import { waitingListHref } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Events & News',
  description:
    'Open days, listening sessions and collaborator evenings at Brockley Fields Studios, plus what the residents have been putting out.',
}

/** Ticket-stub date block. Used for events only — news gets a plain date. */
function DateStub({ iso }: { iso: string }) {
  const { day, month, year } = formatDateShort(iso)
  return (
    <div className="border-foreground/25 flex w-[4.5rem] shrink-0 self-start flex-col items-center border">
      <span className="type-display border-foreground/25 w-full border-b py-1 text-center text-[24px] leading-none">
        {day}
      </span>
      <span className="type-label w-full py-1 text-center">{month}</span>
      <span className="type-label text-muted-foreground border-foreground/15 w-full border-t py-1 text-center">
        {year}
      </span>
    </div>
  )
}

export default function EventsAndNewsPage() {
  const now = Date.now()
  const dated = [...events].sort((a, b) => a.date.localeCompare(b.date))
  const upcoming = dated.filter((e) => new Date(`${e.date}T00:00:00Z`).getTime() >= now)
  const past = dated.filter((e) => new Date(`${e.date}T00:00:00Z`).getTime() < now).reverse()
  const sortedNews = [...news].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      <PageHeader
        label="Events & News"
        title="Things worth turning up for, and things worth knowing."
        intro={
          <p>
            We open the doors a few times a year. Nothing is ticketed, nothing is a pitch, and the
            rooms are usually still working while you walk around them.
          </p>
        }
      />

      <section className="border-foreground/20 border-t py-12 sm:py-16" aria-labelledby="upcoming">
        <Container>
          <div className="flex flex-col gap-10 md:flex-row md:gap-12">
            <div className="md:w-[13rem] md:shrink-0">
              <h2 id="upcoming" className="type-display text-[26px] sm:text-[32px]">
                Coming up
              </h2>
              <p className="type-label mt-2">
                {upcoming.length} {upcoming.length === 1 ? 'date' : 'dates'}
              </p>
            </div>

            <div className="flex-1">
              {upcoming.length === 0 ? (
                <p className="text-muted-foreground max-w-[40rem] text-[17px] leading-relaxed">
                  Nothing in the diary at the moment. Put your name down and we will tell you when
                  the next open day is set.
                </p>
              ) : (
                <ul className="flex flex-col">
                  {upcoming.map((event, index) => (
                    <li
                      key={event.slug}
                      className={
                        index > 0 ? 'border-foreground/20 border-t pt-8 mt-8' : undefined
                      }
                    >
                      <div className="flex gap-5 sm:gap-7">
                        <DateStub iso={event.date} />
                        <div className="max-w-[42rem]">
                          <h3 className="type-display text-[22px] leading-tight sm:text-[26px]">
                            {event.title}
                          </h3>
                          <p className="mt-3 text-[17px] leading-relaxed">{event.description}</p>
                          {event.cta && (
                            <ActionLink href={event.cta.href} variant="outline" className="mt-5">
                              {event.cta.label}
                            </ActionLink>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Container>
      </section>

      {past.length > 0 && (
        <section className="border-foreground/20 border-t py-12 sm:py-16" aria-labelledby="past">
          <Container>
            <div className="flex flex-col gap-10 md:flex-row md:gap-12">
              <div className="md:w-[13rem] md:shrink-0">
                <h2 id="past" className="type-display text-[26px] sm:text-[32px]">
                  Been and gone
                </h2>
              </div>
              <ul className="flex-1">
                {past.map((event, index) => (
                  <li
                    key={event.slug}
                    className={
                      index > 0
                        ? 'border-foreground/20 mt-5 flex flex-col gap-1 border-t pt-5 sm:flex-row sm:gap-8'
                        : 'flex flex-col gap-1 sm:flex-row sm:gap-8'
                    }
                  >
                    <p className="type-label text-muted-foreground sm:w-[11rem] sm:shrink-0">
                      {formatDate(event.date)}
                    </p>
                    <p className="text-[17px] leading-relaxed">{event.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      <section className="border-foreground/20 border-t py-12 sm:py-16" aria-labelledby="news">
        <Container>
          <div className="flex flex-col gap-10 md:flex-row md:gap-12">
            <div className="md:w-[13rem] md:shrink-0">
              <h2 id="news" className="type-display text-[26px] sm:text-[32px]">
                News
              </h2>
              <p className="type-label mt-2">What the residents have been up to</p>
            </div>

            <ul className="flex-1">
              {sortedNews.map((item, index) => (
                <li
                  key={item.slug}
                  className={
                    index > 0
                      ? 'border-foreground/20 mt-7 flex flex-col gap-1 border-t pt-7 sm:flex-row sm:gap-8'
                      : 'flex flex-col gap-1 sm:flex-row sm:gap-8'
                  }
                >
                  <p className="type-label text-muted-foreground sm:w-[9rem] sm:shrink-0 sm:pt-1">
                    {formatDate(item.date)}
                  </p>
                  <div className="max-w-[42rem]">
                    <h3 className="text-[19px] leading-snug font-medium">{item.title}</h3>
                    <p className="mt-2 text-[16px] leading-relaxed">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-foreground/20 border-t py-12 sm:py-16">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[34rem] text-[17px] leading-relaxed">
              Open days fill up by word of mouth. If you would rather not rely on that, put your
              name on the <InlineLink href={waitingListHref}>waiting list</InlineLink> and we will
              write to you directly.
            </p>
            <ActionLink href={waitingListHref}>Join the waiting list</ActionLink>
          </div>
        </Container>
      </section>
      <Rule />
    </>
  )
}
