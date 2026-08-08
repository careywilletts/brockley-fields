import type { Metadata } from 'next'
import Image from 'next/image'
import { Container, InlineLink, PageHeader, Rule, Section } from '@/components/primitives'
import { releases } from '@/lib/music'
import { getPerson } from '@/lib/people'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Music',
  description:
    'Records written, produced, mixed and finished inside Brockley Fields Studios by the people who work here.',
}

const formatOrder = { Album: 0, EP: 1, Single: 2 } as const

export default function MusicPage() {
  const sorted = [...releases].sort(
    (a, b) => b.year - a.year || formatOrder[a.format] - formatOrder[b.format],
  )
  const years = Array.from(new Set(sorted.map((r) => r.year))).sort((a, b) => b - a)

  return (
    <>
      <PageHeader
        label="Music"
        title="Everything on this page was made in the building."
        intro={
          <>
            <p>
              Not booked into it for an afternoon — made in it, by people who have keys. Some of
              these records were written, produced and mixed within thirty feet of each other.
            </p>
            <p className="text-muted-foreground">
              {sorted.length} releases · {years[years.length - 1]}&ndash;{years[0]}
            </p>
          </>
        }
      />

      {years.map((year, yearIndex) => {
        const yearReleases = sorted.filter((release) => release.year === year)
        return (
          <section
            key={year}
            className="border-foreground/20 border-t py-12 sm:py-16"
            aria-labelledby={`year-${year}`}
          >
            <Container>
              <div className="flex flex-col gap-10 md:flex-row md:gap-12">
                <div className="md:w-[13rem] md:shrink-0">
                  <h2 id={`year-${year}`} className="type-display text-[26px] sm:text-[32px]">
                    {year}
                  </h2>
                  <p className="type-label mt-2">
                    {yearReleases.length} {yearReleases.length === 1 ? 'release' : 'releases'}
                  </p>
                </div>

                <ul className="grid flex-1 grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {yearReleases.map((release, index) => (
                    <li key={release.slug} className="flex flex-col">
                      {/* The risograph sleeves are the loudest thing on the page,
                          so everything around them stays quiet. */}
                      <div className="border-foreground/20 bg-secondary relative aspect-square overflow-hidden border">
                        <Image
                          src={release.artwork || '/placeholder.svg'}
                          alt={`Sleeve artwork for ${release.title} by ${release.artist}`}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                          priority={yearIndex === 0 && index < 3}
                          className="object-cover"
                        />
                      </div>

                      <div className="mt-4 flex items-baseline justify-between gap-3">
                        <p className="type-label">{release.format}</p>
                        <p className="type-label text-muted-foreground">{release.year}</p>
                      </div>

                      <h3 className="type-display mt-2 text-[20px] leading-tight">
                        {release.title}
                      </h3>
                      <p className="mt-1 text-[15px]">{release.artist}</p>

                      {release.credits.length > 0 && (
                        <p className="text-muted-foreground mt-3 text-[14px] leading-relaxed">
                          <span className="type-label mr-1">In the room</span>
                          {release.credits.map((slug, i) => {
                            const person = getPerson(slug)
                            if (!person) return null
                            return (
                              <span key={slug}>
                                {i > 0 && ', '}
                                <InlineLink href={`/community/${person.slug}`}>
                                  {person.name}
                                </InlineLink>
                              </span>
                            )
                          })}
                        </p>
                      )}

                      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                        {release.links.map((link) => (
                          <li key={link.label}>
                            <InlineLink href={link.href} external className="type-label-ink">
                              {link.label}
                            </InlineLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </Container>
          </section>
        )
      })}

      <Section
        label="Credits"
        title="If you hear something you like, the person who made it is three doors away."
        intro={
          <>
            <p>
              Every name above links to the person behind it. That is the whole point of the
              building: the writer, the producer and the mixer are three doors apart, and the
              publisher is at the kitchen table.
            </p>
            <p>
              <InlineLink href="/community">Meet the residents</InlineLink> or{' '}
              <InlineLink href={site.instagramUrl} external>
                follow along on Instagram
              </InlineLink>
              .
            </p>
          </>
        }
      />
      <Rule />
    </>
  )
}
