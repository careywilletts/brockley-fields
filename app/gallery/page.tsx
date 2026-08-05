import type { Metadata } from 'next'
import {
  ActionLink,
  Container,
  InlineLink,
  PageHeader,
  Photo,
  Rule,
} from '@/components/primitives'
import { studiosGallery, yardGallery, type GalleryImage } from '@/lib/gallery'
import { units, spaceCount } from '@/lib/rooms'
import { waitingListHref } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photographs of both units at Brockley Fields Studios — the upstairs studios and the Yard, the kitchens, the corridors and the courtyard.',
}

/**
 * Captionless mosaic. Wide images take two columns, tall images take two rows,
 * so the grid stays irregular the way a contact sheet does. Alt text carries
 * the description for screen readers instead.
 */
function Mosaic({ images, priority = false }: { images: GalleryImage[]; priority?: boolean }) {
  return (
    <ul className="grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:grid-cols-3 lg:auto-rows-[15rem] lg:grid-cols-4">
      {images.map((image, index) => (
        <li
          key={`${image.src}-${index}`}
          className={
            image.span === 'wide'
              ? 'col-span-2 row-span-1'
              : image.span === 'tall'
                ? 'col-span-1 row-span-2'
                : 'col-span-1 row-span-1'
          }
        >
          <Photo
            src={image.src}
            alt={image.alt}
            priority={priority && index < 2}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 40vw, 50vw"
            className="border-foreground/20 h-full w-full border"
          />
        </li>
      ))}
    </ul>
  )
}

export default function GalleryPage() {
  const [studiosUnit, yardUnit] = units

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

      <section
        className="border-foreground/20 border-t py-12 sm:py-16"
        aria-labelledby="gallery-studios"
      >
        <Container>
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h2 id="gallery-studios" className="type-display text-[26px] sm:text-[32px]">
              {studiosUnit.name}
            </h2>
            <p className="type-label text-muted-foreground">
              {studiosUnit.unitNumber} · {studiosGallery.length} photographs
            </p>
          </div>
          <Mosaic images={studiosGallery} priority />
        </Container>
      </section>

      <section
        className="border-foreground/20 border-t py-12 sm:py-16"
        aria-labelledby="gallery-yard"
      >
        <Container>
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h2 id="gallery-yard" className="type-display text-[26px] sm:text-[32px]">
              {yardUnit.name}
            </h2>
            <p className="type-label text-muted-foreground">
              {yardUnit.unitNumber} · {yardGallery.length} photographs
            </p>
          </div>
          <Mosaic images={yardGallery} />
        </Container>
      </section>

      <section className="border-foreground/20 border-t py-12 sm:py-16">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[34rem] text-[17px] leading-relaxed">
              Photographs only get you so far. The rooms are best understood by standing in them —
              come to an <InlineLink href="/events-and-news">open day</InlineLink>.
            </p>
            <ActionLink href={waitingListHref}>Join the waiting list</ActionLink>
          </div>
        </Container>
      </section>
      <Rule />
    </>
  )
}
