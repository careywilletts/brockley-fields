import type { Metadata } from 'next'
import {
  ActionLink,
  Container,
  InlineLink,
  PageHeader,
  Photo,
  Rule,
} from '@/components/primitives'
import { getGallery, type GallerySection } from '@/lib/gallery'
import { spaceCount } from '@/lib/rooms'
import { waitingListHref } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photographs of Brockley Fields — the studios, the communal kitchens, the corridors and the courtyard.',
}

/**
 * Captionless masonry. Each column flows independently and every photo keeps
 * its own proportions, so portrait and landscape shots sit together without
 * cropping and the wall reads like a contact sheet. Alt text carries the
 * description for screen readers instead of on-page captions.
 */
function Masonry({ section, priority = false }: { section: GallerySection; priority?: boolean }) {
  return (
    <ul className="columns-1 gap-3 sm:columns-2 lg:columns-3 [column-fill:_balance]">
      {section.images.map((image, index) => (
        <li key={image.src} className="mb-3 break-inside-avoid">
          <div
            className="relative w-full"
            style={{ aspectRatio: `${image.width} / ${image.height}` }}
          >
            <Photo
              src={image.src}
              alt={image.alt}
              priority={priority && index < 2}
              sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
              className="border-foreground/20 h-full w-full border"
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default async function GalleryPage() {
  const sections = await getGallery()

  return (
    <>
      <PageHeader
        label="Gallery"
        title="The building, without anybody tidying up first."
        intro={
          <p>
            Two units, {spaceCount} spaces, two kitchens and a courtyard. No captions — if you want
            to know what a room measures, the{' '}
            <InlineLink href="/studios">plans are on the Studios page</InlineLink>.
          </p>
        }
      />

      {sections.length === 0 ? (
        <section className="border-foreground/20 border-t py-12 sm:py-16">
          <Container>
            <p className="max-w-[34rem] text-[17px] leading-relaxed">
              The photographs are being shot. Check back shortly.
            </p>
          </Container>
        </section>
      ) : (
        sections.map((section, sectionIndex) => (
          <section
            key={section.slug}
            className="border-foreground/20 border-t py-12 sm:py-16"
            aria-labelledby={`gallery-${section.slug}`}
          >
            <Container>
              <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h2
                  id={`gallery-${section.slug}`}
                  className="type-display text-[26px] sm:text-[32px]"
                >
                  {section.title}
                </h2>
                <p className="type-label text-muted-foreground">
                  {section.images.length} photographs
                </p>
              </div>
              <Masonry section={section} priority={sectionIndex === 0} />
            </Container>
          </section>
        ))
      )}

      <section className="border-foreground/20 border-t py-12 sm:py-16">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[34rem] text-[17px] leading-relaxed">
              Photographs only get you so far. The rooms are best understood by standing in them —
              put your name on the <InlineLink href={waitingListHref}>waiting list</InlineLink> and
              we will let you know when you can visit.
            </p>
            <ActionLink href={waitingListHref}>Join the waiting list</ActionLink>
          </div>
        </Container>
      </section>
      <Rule />
    </>
  )
}
