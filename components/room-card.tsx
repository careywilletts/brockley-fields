import Link from 'next/link'
import type { Room } from '@/lib/rooms'
import { StatusBadge } from '@/components/status-badge'
import { Photo } from '@/components/primitives'
import { peopleForRoom } from '@/lib/people'

/**
 * The listing card leads with a photograph. The scale drawing is useful but not
 * the first thing you want, so it lives on the room's own page.
 */
export function RoomCard({ room, priority = false }: { room: Room; priority?: boolean }) {
  const occupants = peopleForRoom(room.occupants)

  return (
    <article className="flex flex-col">
      <Link
        href={`/studios/${room.slug}`}
        className="focus-visible:ring-primary group block focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
      >
        <div className="transition-opacity group-hover:opacity-90">
          <Photo
            src={room.photos[0].src}
            alt={room.photos[0].alt}
            className="aspect-4/3"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            priority={priority}
          />
        </div>

        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="type-display group-hover:text-primary text-[20px] transition-colors">
            {room.name}
          </h3>
          <StatusBadge status={room.status} />
        </div>
      </Link>

      <p className="type-label mt-2">
        {room.kind === 'office' ? 'Office' : 'Studio'} · {room.area}
      </p>

      <p className="mt-3 text-[15px] leading-relaxed">{room.blurb}</p>

      <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
        {room.features.map((feature) => (
          <li
            key={feature}
            className="type-label-ink border-foreground/25 border px-2 py-1 leading-none"
          >
            {feature}
          </li>
        ))}
      </ul>

      {occupants.length > 0 && (
        <p className="text-muted-foreground mt-4 text-[14px] leading-relaxed">
          Currently{' '}
          {occupants.map((person, i) => (
            <span key={person.slug}>
              {i > 0 && (i === occupants.length - 1 ? ' and ' : ', ')}
              <Link
                href={`/community/${person.slug}`}
                className="text-foreground decoration-foreground/30 hover:decoration-primary hover:text-primary underline underline-offset-4"
              >
                {person.name}
              </Link>
            </span>
          ))}
          .
        </p>
      )}
    </article>
  )
}
