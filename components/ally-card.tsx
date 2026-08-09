import type { Ally } from '@/lib/extended-family'
import { Photo } from '@/components/primitives'

/**
 * A member of the extended family. Built to degrade cleanly, like PlaceCard: an
 * entry with no logo and no links still renders as a name and a line.
 */
export function AllyCard({ ally, priority = false }: { ally: Ally; priority?: boolean }) {
  // The handle already links to Instagram, so a website link pointing at the
  // same profile would be a second route to one place. Label the site with its
  // bare domain rather than the word "Website" — it says more for no extra room.
  const domain = ally.website?.replace(/^https?:\/\//, '').replace(/\/$/, '')

  // A logo sits contained on the page background; a face fills its square.
  const image = ally.logo ?? ally.portrait
  const paragraphs = Array.isArray(ally.blurb) ? ally.blurb : [ally.blurb]

  return (
    <article className="flex gap-5">
      {image && (
        <Photo
          src={image.src}
          alt={image.alt}
          className="border-foreground/20 size-20 shrink-0 border"
          imageClassName={ally.logo ? 'object-contain' : 'object-cover'}
          imageStyle={ally.portrait?.focus ? { objectPosition: ally.portrait.focus } : undefined}
          sizes="80px"
          priority={priority}
        />
      )}

      <div className="min-w-0">
        <h3 className="type-display text-[20px]">{ally.name}</h3>

        {paragraphs.map((paragraph, i) => (
          <p key={i} className="mt-2 text-[15px] leading-relaxed">
            {paragraph}
          </p>
        ))}

        {(ally.handle || domain || ally.management) && (
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
            {ally.handle && (
              <li>
                <a
                  href={`https://instagram.com/${ally.handle}`}
                  target="_blank"
                  rel="noreferrer"
                  className="type-label-ink text-primary decoration-primary/40 hover:decoration-primary underline decoration-1 underline-offset-4 transition-colors"
                >
                  {`@${ally.handle}`}
                </a>
              </li>
            )}
            {ally.website && domain && (
              <li>
                <a
                  href={ally.website}
                  target="_blank"
                  rel="noreferrer"
                  className="type-label-ink text-primary decoration-primary/40 hover:decoration-primary underline decoration-1 underline-offset-4 transition-colors"
                >
                  {domain}
                </a>
              </li>
            )}
            {ally.management && (
              <li>
                <a
                  href={ally.management.href}
                  target="_blank"
                  rel="noreferrer"
                  className="type-label-ink text-primary decoration-primary/40 hover:decoration-primary underline decoration-1 underline-offset-4 transition-colors"
                >
                  {ally.management.company}
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
    </article>
  )
}
