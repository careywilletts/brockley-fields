import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto w-full max-w-[1180px] px-5 sm:px-8', className)}>{children}</div>
  )
}

/** Thin municipal-print rule. Sections are separated by these, never by boxes. */
export function Rule({ weight = 'hair' }: { weight?: 'hair' | 'heavy' }) {
  return (
    <hr
      className={cn('border-0 border-t', weight === 'heavy' ? 'border-foreground/85' : 'border-foreground/20')}
    />
  )
}

export function Section({
  label,
  title,
  intro,
  children,
  className,
  id,
}: {
  label?: string
  title?: string
  intro?: React.ReactNode
  children?: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={cn('border-foreground/20 border-t py-14 sm:py-20', className)}>
      <Container>
        {(label || title || intro) && (
          <div className="flex flex-col gap-4 md:flex-row md:gap-12">
            <div className="md:w-[13rem] md:shrink-0">
              {label && <p className="type-label">{label}</p>}
            </div>
            <div className="max-w-[46rem]">
              {title && <h2 className="type-display text-[26px] sm:text-[32px]">{title}</h2>}
              {intro && (
                <div className="mt-5 flex flex-col gap-4 text-[17px] leading-relaxed">{intro}</div>
              )}
            </div>
          </div>
        )}
        {children}
      </Container>
    </section>
  )
}

/** Page title block used at the top of every inner page. */
export function PageHeader({
  label,
  title,
  titleClassName,
  intro,
}: {
  label: string
  /** ReactNode rather than string so a page can highlight part of its title. */
  title: React.ReactNode
  /** Escape hatch for titles that need a wider measure than the default. */
  titleClassName?: string
  intro?: React.ReactNode
}) {
  return (
    <Container className="pt-12 pb-12 sm:pt-16 sm:pb-16">
      <p className="type-label">{label}</p>
      <h1
        className={cn(
          'type-display mt-3 max-w-[34rem] text-[34px] text-balance sm:text-[52px]',
          titleClassName,
        )}
      >
        {title}
      </h1>
      {intro && (
        <div className="mt-7 flex max-w-[46rem] flex-col gap-4 text-[17px] leading-relaxed">
          {intro}
        </div>
      )}
    </Container>
  )
}

/**
 * Photograph with a very light cream wash so images sit in the page rather than
 * on top of it.
 */
export function Photo({
  src,
  alt,
  className,
  imageClassName,
  sizes = '(min-width: 1024px) 33vw, 100vw',
  priority = false,
  fill = true,
}: {
  src: string
  alt: string
  className?: string
  imageClassName?: string
  sizes?: string
  priority?: boolean
  fill?: boolean
}) {
  return (
    <div className={cn('bg-secondary relative overflow-hidden', className)}>
      <Image
        src={src || '/placeholder.svg'}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={cn('object-cover', imageClassName)}
      />
      <div
        aria-hidden
        className="bg-background pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply"
      />
    </div>
  )
}

export function InlineLink({
  href,
  children,
  external = false,
  className,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  className?: string
}) {
  const classes = cn(
    'text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary',
    className,
  )
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}

/**
 * Squared-off signage button.
 *
 * - `solid`   — charcoal fill, greens on hover. The primary call to action.
 * - `outline` — outlined, border and text green on hover.
 * - `fill`    — outlined at rest, floods with the green accent on hover. Used
 *               where several equal-weight choices sit together, so none of
 *               them reads as the primary action until pointed at.
 */
export function ActionLink({
  href,
  children,
  variant = 'solid',
  className,
}: {
  href: string
  children: React.ReactNode
  variant?: 'solid' | 'outline' | 'fill'
  className?: string
}) {
  const variants = {
    solid: 'bg-foreground text-background hover:bg-primary',
    outline: 'border-foreground/60 hover:border-primary hover:text-primary border',
    fill: 'border-foreground/60 hover:bg-primary hover:text-primary-foreground hover:border-primary border',
  }
  return (
    <Link
      href={href}
      className={cn(
        'type-label-ink inline-flex items-center justify-center px-5 py-3 transition-colors',
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  )
}
