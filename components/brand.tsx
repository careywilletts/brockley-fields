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
 * The perspective plate used as a full-bleed backdrop rather than a framed
 * band: the road runs the entire width of the page and the copy sits over it.
 *
 * Drawn at its natural aspect and never cropped, so the road keeps running off
 * the left-hand edge of the plate. The caller sizes and positions it: anchoring
 * it to the right of the page puts the terrace itself clear of the text measure
 * and leaves the road to carry on leftwards underneath the copy.
 */
export function TerraceBackdrop({ className }: { className?: string }) {
  const art = terraces.perspective
  return (
    // Decorative here: the surrounding copy already describes the building.
    <div aria-hidden="true" className={cn('pointer-events-none', className)}>
      <Image
        src={art.src}
        alt=""
        width={art.width}
        height={art.height}
        sizes="80vw"
        className="h-auto w-full"
      />
    </div>
  )
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
     * `object-cover` anchored right crops away the empty road on the left of
     * the plate, so the terrace itself fills the frame and reads large. The
     * road runs along the bottom edge of the box, which lets a parent using
     * `items-end` line the road up with the foot of the adjacent column.
     */
    <div className="h-44 overflow-hidden sm:h-56 md:h-60">
      <Image
        src={art.src}
        alt={art.alt}
        width={art.width}
        height={art.height}
        sizes="(min-width: 768px) 42vw, 100vw"
        priority={priority}
        className="h-full w-full object-cover object-right"
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
      {/*
        The cropped variant already reads as a full-bleed scene, so it skips the
        hairline rules and padding the documented plates use — those would add
        height below the road and break alignment with the adjacent column.
      */}
      {crop ? image : <div className="border-foreground/20 border-t border-b py-2">{image}</div>}
      {caption && <p className="type-label mt-3">{caption}</p>}
    </div>
  )
}
