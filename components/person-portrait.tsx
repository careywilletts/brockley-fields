import { Photo } from '@/components/primitives'
import { cn } from '@/lib/utils'
import type { Person } from '@/lib/people'

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
}

/**
 * A resident's portrait, or a neutral stand-in when we do not have a real
 * photograph of them yet.
 *
 * The stand-in is deliberately plain — initials on the secondary tone. We do
 * not generate likenesses of real, named people, so nothing here should ever
 * be mistaken for a photograph of them.
 */
export function PersonPortrait({
  person,
  className,
  imageClassName,
  sizes,
  priority = false,
}: {
  person: Person
  className?: string
  /** Only applies when there is a real photograph to apply it to. */
  imageClassName?: string
  sizes?: string
  priority?: boolean
}) {
  if (person.portrait) {
    return (
      <Photo
        src={person.portrait}
        alt={`Portrait of ${person.name}`}
        className={className}
        imageClassName={imageClassName}
        sizes={sizes}
        priority={priority}
      />
    )
  }

  return (
    <div
      className={cn(
        'bg-secondary border-foreground/20 flex items-center justify-center border',
        className,
      )}
    >
      {/* Decorative: the name is always adjacent in the markup, so screen
          readers would only hear it twice. */}
      <span aria-hidden className="type-display text-muted-foreground text-[22px]">
        {initials(person.name)}
      </span>
      <span className="sr-only">No photograph of {person.name} yet</span>
    </div>
  )
}
