import Link from 'next/link'
import Image from 'next/image'
import type { Person } from '@/lib/people'
import { getRoom, getUnit } from '@/lib/rooms'

export function PersonCard({ person, priority = false }: { person: Person; priority?: boolean }) {
  const room = person.roomSlug ? getRoom(person.roomSlug) : undefined
  const unit = room ? getUnit(room.unit) : undefined

  return (
    <article className="flex flex-col">
      <Link
        href={`/community/${person.slug}`}
        className="focus-visible:ring-primary group flex flex-col focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
      >
        <div className="bg-secondary border-foreground/20 relative aspect-[4/5] overflow-hidden border">
          <Image
            src={person.portrait || '/placeholder.svg'}
            alt={`Portrait of ${person.name}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div
            aria-hidden
            className="bg-background pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply"
          />
        </div>

        <h3 className="type-display group-hover:text-primary mt-4 text-[18px] transition-colors">
          {person.name}
        </h3>
      </Link>

      <p className="type-label mt-1.5">{person.disciplines.join(' · ')}</p>

      <p className="mt-3 text-[15px] leading-relaxed">{person.oneLiner}</p>

      <p className="text-muted-foreground mt-3 text-[13px]">
        {room && unit ? `${room.name} · ${unit.shortName}` : person.relationship}
      </p>
    </article>
  )
}
