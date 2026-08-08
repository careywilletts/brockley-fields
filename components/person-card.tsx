import Link from 'next/link'
import { PersonPortrait } from '@/components/person-portrait'
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
        <PersonPortrait
          person={person}
          className="aspect-[4/5]"
          imageClassName="transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
        />

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
