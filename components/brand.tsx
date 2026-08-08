import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Container } from '@/components/primitives'

/**
 * The brand artwork arrived as screenshots with their own paper grounds. Those
 * grounds have been keyed out to real transparency, so each asset is now just
 * ink with an alpha channel and picks up whatever is behind it — no ground of
 * its own that could mismatch the page. This replaces an earlier
 * `mix-blend-multiply` approach, which still tinted the artwork ~4 levels
 * darker than the page because the paper carried faint grain.
 */

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
      className={cn('h-auto w-auto', className)}
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
  crop = false,
  priority = false,
  className,
}: {
  variant: Terrace
  caption?: string
  bleed?: boolean
  /**
   * Renders the drawing inside a taller window, scaled up and anchored right
   * where the buildings are grouped. Use in narrow columns, where the natural
   * panorama would otherwise flatten to an unreadable strip.
   */
  crop?: boolean
  priority?: boolean
  className?: string
}) {
  const art = terraces[variant]

  /**
   * At full width these panoramas collapse to a ~120px strip on a phone, where
   * the linework stops being readable. Below `sm` the drawing is scaled up and
   * anchored to the right (where the buildings sit) inside a fixed-height
   * window, so the terrace stays legible; from `sm` up it sits at natural width.
   */
  const image = crop ? (
    /**
     * `object-contain` rather than `cover` so the terrace is never sliced
     * mid-building: the drawing scales to fit the window and keeps its full
     * width, anchored right where the buildings are grouped.
     */
    <div className="h-40 overflow-hidden sm:h-52">
      <Image
        src={art.src}
        alt={art.alt}
        width={art.width}
        height={art.height}
        sizes="(min-width: 1024px) 40vw, 100vw"
        priority={priority}
        className="h-full w-full object-contain object-right"
      />
    </div>
  ) : (
    <div className="h-32 overflow-hidden sm:h-auto sm:overflow-visible">
      <Image
        src={art.src}
        alt={art.alt}
        width={art.width}
        height={art.height}
        sizes="100vw"
        priority={priority}
        className={cn(
          'h-full w-auto max-w-none object-cover object-right',
          'sm:h-auto sm:w-full sm:max-w-full sm:object-contain',
        )}
      />
    </div>
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
