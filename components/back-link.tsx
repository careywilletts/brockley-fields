'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const STACK_KEY = 'bf:nav-stack'

/**
 * Module scope is re-evaluated once per document load and is NOT reset by React
 * Strict Mode's double-invoked effects, which a ref or state would be. That is
 * what lets us tell a genuine new document apart from a repeated effect run.
 */
let initialised = false

function readStack(): string[] {
  try {
    const raw = window.sessionStorage.getItem(STACK_KEY)
    const parsed = raw ? JSON.parse(raw) : null
    return Array.isArray(parsed) ? parsed : []
  } catch {
    // Private modes can throw, and a corrupt value should not break navigation.
    return []
  }
}

function writeStack(stack: string[]) {
  try {
    // Cap it — this only ever needs to answer "is there a previous page".
    window.sessionStorage.setItem(STACK_KEY, JSON.stringify(stack.slice(-25)))
  } catch {
    // Ignore — the fallback href still works.
  }
}

/**
 * Records the pages visited within this tab.
 *
 * The browser cannot tell us whether the previous history entry belongs to this
 * site, and `history.length` counts entries from before the visitor arrived, so
 * we keep our own record. Mounted once in the root layout.
 */
export function NavDepthTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!initialised) {
      initialised = true

      // A reload or a fresh arrival starts the record again. Without this, a
      // reload would leave the previous record in place and going back would
      // return to the same page — the loop this is meant to prevent.
      const [entry] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
      if (entry?.type !== 'back_forward') {
        writeStack([pathname])
        return
      }
    }

    const stack = readStack()
    // Ignore repeats so a re-render can never look like a new page.
    if (stack[stack.length - 1] !== pathname) {
      writeStack([...stack, pathname])
    }
  }, [pathname])

  return null
}

/** True when a previous page inside the site exists to go back to. */
function canGoBack() {
  return readStack().length > 1
}

/** The page a back step would land on, or undefined if there is not one. */
function previousPath(): string | undefined {
  const stack = readStack()
  return stack.length > 1 ? stack[stack.length - 2] : undefined
}

/**
 * Re-checked on every route change so the control appears the moment there is
 * somewhere to go back to, and disappears when there is not. Starts false so
 * the server and client agree on the first render.
 */
export function usePreviousPath() {
  const pathname = usePathname()
  const [previous, setPrevious] = useState<string | undefined>(undefined)

  useEffect(() => {
    setPrevious(previousPath())
  }, [pathname])

  return previous
}

/**
 * Back control that steps through the site's own history.
 *
 * The browser's own back button is unreliable when the site is embedded in an
 * iframe (a preview pane, for instance) because it acts on the embedding page
 * instead, which reads as the current page simply reloading. This steps the
 * site's own history, so it behaves the same either way, and falls back to a
 * plain link to the parent page when there is nothing to go back to.
 */
export function BackLink({
  fallbackHref,
  children,
  className,
}: {
  fallbackHref: string
  children: React.ReactNode
  className?: string
}) {
  const router = useRouter()

  return (
    <Link
      href={fallbackHref}
      className={cn(
        'text-primary decoration-primary/40 hover:decoration-primary inline-flex items-center gap-2 underline decoration-1 underline-offset-4 transition-colors',
        className,
      )}
      onClick={(event) => {
        // Let modified clicks (new tab, middle click) behave normally.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        if (!canGoBack()) return

        event.preventDefault()
        // Drop the page being left so repeated presses keep walking backwards.
        writeStack(readStack().slice(0, -1))
        router.back()
      }}
    >
      <span aria-hidden>&larr;</span>
      {children}
    </Link>
  )
}

/**
 * The site's own back button, in the header on every page.
 *
 * The browser's back button acts on the embedding page when the site is shown
 * inside an iframe, which reads as the current page reloading. This one always
 * steps the site's own history, so "back" means the previous page everywhere.
 */
export function HeaderBackButton({ className }: { className?: string }) {
  const router = useRouter()
  const previous = usePreviousPath()

  // Nothing to go back to on a first arrival, so the control stays out of the
  // way rather than sitting there dead.
  if (!previous) return null

  return (
    <Link
      href={previous}
      className={cn(
        'type-label-ink hover:text-primary inline-flex shrink-0 items-center gap-1.5 transition-colors',
        className,
      )}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

        event.preventDefault()
        writeStack(readStack().slice(0, -1))
        router.back()
      }}
    >
      <span aria-hidden>&larr;</span>
      Back
    </Link>
  )
}
