'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { nav, site, waitingListHref } from '@/lib/site'
import { Logo } from '@/components/brand'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="bg-background sticky top-0 z-40">
      <div className="border-foreground/85 mx-auto flex max-w-[1180px] items-center justify-between gap-4 border-b px-5 py-3 sm:px-8">
        <Link
          href="/"
          className="focus-visible:ring-primary shrink-0 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
          aria-label={`${site.fullName} — home`}
        >
          <Logo priority className="h-11 sm:h-14" />
        </Link>

        <div className="hidden items-baseline gap-6 lg:flex">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="type-label hover:text-primary transition-colors"
          >
            {site.instagram}
          </a>
          <Link
            href={waitingListHref}
            className={cn(
              'type-label-ink border-b pb-0.5 transition-colors',
              isActive(waitingListHref)
                ? 'border-primary text-primary'
                : 'border-foreground/40 hover:border-primary hover:text-primary',
            )}
          >
            Waiting List
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="type-label-ink flex items-center gap-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span aria-hidden>Menu</span>
        </button>
      </div>

      {/* Desktop nav row */}
      <nav
        aria-label="Primary"
        className="border-foreground/20 hidden border-b lg:block"
      >
        <ul className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-7 gap-y-1 px-8 py-2.5">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  'type-label-ink transition-colors',
                  isActive(item.href) ? 'text-primary' : 'hover:text-primary',
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="bg-background border-foreground/20 fixed inset-x-0 top-[69px] bottom-0 z-40 overflow-y-auto border-t lg:hidden"
        >
          <ul className="flex flex-col px-5 pb-16 sm:px-8">
            {[...nav, { label: 'Waiting List', href: waitingListHref }].map((item) => (
              <li key={item.href} className="border-foreground/15 border-b">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'type-display block py-4 text-[22px]',
                    isActive(item.href) ? 'text-primary' : '',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-6">
              <a
                href={`mailto:${site.email}`}
                className="type-label hover:text-primary block transition-colors"
              >
                {site.email}
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="type-label hover:text-primary mt-2 block transition-colors"
              >
                {site.instagram}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
