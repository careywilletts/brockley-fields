import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Container } from '@/components/primitives'

/**
 * The three brand assets ship as PNGs with their own near-white grounds
 * (#fbfbfb for the logo, #f8f7f4 for the elevation) which do not match the
 * page cream (#f8efde). `mix-blend-multiply` drops those grounds into the page
 * instead of leaving a pale rectangle floating on the background — so the
 * artwork reads as ink printed on the paper, which suits the screen-print
 * style of the drawings.
 */
const BLEND = 'mix-blend-multiply'

export function Logo({
  className,
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <Image
      src="/brand/brockley-fields-logo.png"
      alt=""
      width={870}
      height={401}
      priority={priority}
      className={cn('h-auto w-auto', BLEND, className)}
    />
  )
}

type Terrace = 'elevation' | 'perspective'

const terraces: Record<Terrace, { src: string; width: number; height: number; alt: string }> = {
  elevation: {
    src: '/brand/terrace-elevation.png',
    width: 2060,
    height: 472,
    alt: 'Screen-print elevation of the Brockley Fields terrace — seven gabled units with yellow, blue, green and terracotta cladding above dark shopfronts',
  },
  perspective: {
    src: '/brand/terrace-perspective.png',
    width: 2087,
    height: 655,
    alt: 'Screen-print drawing of the Brockley Fields terrace seen along the street, gabled roofs receding into the distance',
  },
}

/**
 * The terrace drawings are wide panoramas (roughly 4.3:1 and 3.2:1), so they
 * only work as horizontal bands. `bleed` runs the drawing edge to edge for the
 * one signature moment on the homepage; the contained variant sits inside the
 * grid with a hairline rule like the photographs do.
 */
export function TerraceBand({
  variant,
  caption,
  bleed = false,
  priority = false,
  className,
}: {
  variant: Terrace
  caption?: string
  bleed?: boolean
  priority?: boolean
  className?: string
}) {
  const art = terraces[variant]

  const image = (
    <Image
      src={art.src}
      alt={art.alt}
      width={art.width}
      height={art.height}
      sizes="100vw"
      priority={priority}
      className={cn('h-auto w-full', BLEND)}
    />
  )

  if (bleed) {
    return (
      <div className={className}>
        {image}
        {caption && (
          <Container>
            <p className="type-label mt-3">{caption}</p>
          </Container>
        )}
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="border-foreground/20 border-t border-b py-2">{image}</div>
      {caption && <p className="type-label mt-3">{caption}</p>}
    </div>
  )
}
