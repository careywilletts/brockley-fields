import type { Room } from '@/lib/rooms'
import { getUnit } from '@/lib/rooms'
import { cn } from '@/lib/utils'

/**
 * The drawings are the signature element of this site, so they are shown as
 * drawings: on the raw cream ground, framed only by a hairline, never cropped.
 *
 * SVG is used on screen (it scales without loss). The PNG in `room.floorPlanPng`
 * is kept in the data for print and as a backup.
 */
export function FloorPlan({
  room,
  className,
  priority = false,
}: {
  room: Room
  className?: string
  priority?: boolean
}) {
  const unit = getUnit(room.unit)
  return (
    <figure className={cn('flex flex-col', className)}>
      {/* Every plan is placed in an identically proportioned box so a row of
          drawings lines up, whatever the shape of the room. */}
      <div className="border-foreground/20 relative aspect-3/4 border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={room.floorPlan || '/placeholder.svg'}
          alt={`Scale floor plan of ${room.name} at ${unit.name}: ${room.area}, ${room.dimensions}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
      <figcaption className="type-label border-foreground/20 mt-0 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-x border-b px-3 py-2">
        <span>Plan · {room.dimensions}</span>
        <span>{room.area}</span>
      </figcaption>
    </figure>
  )
}
