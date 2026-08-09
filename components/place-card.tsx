import type { Place } from '@/lib/places'
import { Photo } from '@/components/primitives'

/**
 * A neighbouring place. Built to degrade cleanly: a place with no photograph and
 * no handle still renders as a name and a line, so entries can go up as soon as
 * we have the words for them.
 */
export function PlaceCard({ place, priority = false }: { place: Place; priority?: boolean }) {
  return (
    <article className="flex flex-col">
      {place.photo && (
        <Photo
          src={place.photo.src}
          alt={place.photo.alt}
          className="border-foreground/20 aspect-4/3 border"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
        />
      )}

      <h3 className="type-display mt-5 text-[20px]">{place.name}</h3>

      <p className="mt-2 text-[15px] leading-relaxed">{place.blurb}</p>

      {place.handle && (
        <p className="mt-3">
          <a
            href={`https://instagram.com/${place.handle}`}
            target="_blank"
            rel="noreferrer"
            className="type-label-ink text-primary decoration-primary/40 hover:decoration-primary underline decoration-1 underline-offset-4 transition-colors"
          >
            {`@${place.handle}`}
          </a>
        </p>
      )}
    </article>
  )
}
