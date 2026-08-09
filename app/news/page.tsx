import type { Metadata } from 'next'
import { ActionLink, Container, InlineLink, PageHeader, Rule } from '@/components/primitives'
import { news, formatDate } from '@/lib/news'
import { waitingListHref } from '@/lib/site'

export const metadata: Metadata = {
  title: 'News',
  description: 'What the residents of Brockley Fields Studios have been putting out.',
}

export default function NewsPage() {
  const sortedNews = [...news].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      <PageHeader
        label="News"
        title="Things worth knowing."
        intro={<p>What the residents have been up to, and what has been changing in the rooms.</p>}
      />

      <section className="border-foreground/20 border-t py-12 sm:py-16" aria-labelledby="news">
        <Container>
          <h2 id="news" className="sr-only">
            News
          </h2>
          {sortedNews.length === 0 ? (
            <p className="text-muted-foreground max-w-[40rem] text-[17px] leading-relaxed">
              Nothing to report just yet.
            </p>
          ) : (
            <ul className="flex flex-col">
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
          )}
        </Container>
      </section>

      <section className="border-foreground/20 border-t py-12 sm:py-16">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[34rem] text-[17px] leading-relaxed">
              Rooms come up rarely and by word of mouth. If you would rather not rely on that, put
              your name on the <InlineLink href={waitingListHref}>waiting list</InlineLink> and we
              will write to you directly.
            </p>
            <ActionLink href={waitingListHref}>Join the waiting list</ActionLink>
          </div>
        </Container>
      </section>
      <Rule />
    </>
  )
}
