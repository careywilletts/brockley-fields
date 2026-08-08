import type { Metadata } from 'next'
import { Container, InlineLink, PageHeader, Rule, Section } from '@/components/primitives'
import { playlistEmbedUrl, playlistUrl } from '@/lib/music'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Music',
  description:
    'A playlist of records written, produced, mixed and finished inside Brockley Fields Studios by the people who work here.',
}

export default function MusicPage() {
  return (
    <>
      <PageHeader
        label="Music"
        title="Everything on this playlist was made in the building."
        intro={
          <p>
            Not booked into it for an afternoon — made in it, by people who have keys. Some of these
            records were written, produced and mixed within thirty feet of each other.
          </p>
        }
      />

      <section className="border-foreground/20 border-t py-12 sm:py-16" aria-labelledby="playlist">
        <Container>
          <div className="flex flex-col gap-10 md:flex-row md:gap-12">
            <div className="md:w-[13rem] md:shrink-0">
              <h2 id="playlist" className="type-label">
                The playlist
              </h2>
            </div>

            <div className="max-w-[46rem] flex-1">
              {playlistEmbedUrl ? (
                <div className="border-foreground/20 overflow-hidden border">
                  <iframe
                    src={playlistEmbedUrl}
                    title="Music made at Brockley Fields Studios"
                    height={480}
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    className="block w-full"
                  />
                </div>
              ) : (
                /* No invented tracklist stands in for the real playlist — the
                   page says plainly that it is coming instead. */
                <div className="border-foreground/20 bg-secondary border px-6 py-14 text-center sm:px-10">
                  <p className="type-display text-[20px] text-balance sm:text-[24px]">
                    The playlist is being put together.
                  </p>
                  <p className="text-muted-foreground mx-auto mt-4 max-w-[28rem] text-[16px] leading-relaxed">
                    Rather than list records here by hand, this will be a single playlist of
                    everything made in the building, updated as things come out.
                  </p>
                  <p className="mt-6">
                    <InlineLink href={site.instagramUrl} external className="type-label-ink">
                      {`Follow along on Instagram \u2192`}
                    </InlineLink>
                  </p>
                </div>
              )}

              {playlistUrl && (
                <p className="mt-5">
                  <InlineLink href={playlistUrl} external className="type-label-ink">
                    {`Open in Spotify \u2192`}
                  </InlineLink>
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>

      <Section
        label="Credits"
        title="If you hear something you like, the person who made it is three doors away."
        intro={
          <>
            <p>
              That is the whole point of the building: the writer, the producer and the mixer are
              three doors apart, and the publisher is at the kitchen table.
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
