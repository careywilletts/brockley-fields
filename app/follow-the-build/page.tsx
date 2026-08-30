import type { Metadata } from 'next'
import { ActionLink, Container, PageHeader, Photo, Rule } from '@/components/primitives'
import { buildTracks } from '@/lib/build'
import { waitingListHref } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Follow the build',
  description:
    'How the Brockley Fields units were taken back to the shell and rebuilt into soundproofed, acoustically treated studios — the strip-out, the framing, the fabric walls and the finish, unit by unit.',
}

export default function FollowTheBuildPage() {
  return (
    <>
      <PageHeader
        label="Follow the build"
        title={
          <>
            From empty offices to{' '}
            <span className="text-primary">rooms you&apos;d want to work in</span>
          </>
        }
        intro={
          <>
            <p>
              None of this arrived finished. Each unit came as a tired open-plan office, and every
              studio was built from the shell up &mdash; stripped back, framed in timber, floated on
              rubber and wrapped, by hand, in fabric until the room went quiet.
            </p>
            <p>
              Here&apos;s the honest version, unit by unit: the mess, the framing and the moment it
              all starts to look like somewhere you&apos;d want to be.
            </p>
          </>
        }
      />

      {buildTracks.map((track) => (
        <section
          key={track.slug}
          className="border-foreground/20 border-t py-14 sm:py-20"
          aria-labelledby={`build-${track.slug}`}
        >
          <Container>
            <div className="max-w-[46rem]">
              <p className="type-label type-eyebrow">The build</p>
              <h2
                id={`build-${track.slug}`}
                className="type-display mt-3 text-[28px] sm:text-[36px]"
              >
                {track.title}
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-pretty">{track.blurb}</p>
            </div>

            {track.phases.length === 0 ? (
              <p className="text-muted-foreground mt-10 max-w-[34rem] text-[17px] leading-relaxed">
                The photographs are being edited &mdash; check back shortly.
              </p>
            ) : (
              <div className="mt-6 flex flex-col">
                {track.phases.map((phase, i) => (
                  <div
                    key={phase.step}
                    className={cn(
                      'flex flex-col gap-6 py-10 md:flex-row md:gap-12',
                      i > 0 && 'border-foreground/20 border-t',
                    )}
                  >
                    <div className="md:w-[13rem] md:shrink-0">
                      <p className="type-label type-eyebrow">{phase.step}</p>
                      <h3 className="type-display mt-2 text-[20px]">{phase.title}</h3>
                      <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">
                        {phase.note}
                      </p>
                    </div>
                    <div className="md:flex-1">
                      <div className={phase.gridClass}>
                        {phase.photos.map((photo) => (
                          <Photo
                            key={photo.src}
                            src={photo.src}
                            alt={photo.alt}
                            className={photo.className ?? 'aspect-3/2'}
                            imageClassName={photo.imageClassName}
                            sizes="(min-width: 1024px) 28vw, (min-width: 768px) 30vw, 50vw"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Container>
        </section>
      ))}

      <section className="border-foreground/20 border-t py-14 sm:py-20">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[34rem] text-[17px] leading-relaxed">
              That&apos;s the build. The rooms are best understood standing in them &mdash; see the
              finished spaces, or put your name down to come and visit.
            </p>
            <div className="flex flex-wrap gap-3">
              <ActionLink href="/studios" variant="fill">
                See the finished spaces
              </ActionLink>
              <ActionLink href={waitingListHref}>Join the waiting list</ActionLink>
            </div>
          </div>
        </Container>
      </section>
      <Rule />
    </>
  )
}
