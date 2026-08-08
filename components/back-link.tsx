'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const STACK_KEY = 'bf:nav-stack'

/**
 * Where we are in our own record of this tab's history.
 *
 * Module scope, not state: it has to survive re-renders and be readable from a
 * click handler without going through React.
 */
let currentIndex = 0

/**
 * Whether this document has been accounted for yet. Module scope, so React's
 * double-invoked effects in development cannot reset it the way a ref would.
 */
let documentSeen = false

/**
 * useLayoutEffect warns when it runs during server rendering. These components
 * are client-only in practice, but the guard keeps the console clean.
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

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
    window.sessionStorage.setItem(STACK_KEY, JSON.stringify(stack))
  } catch {
    // Ignore — the fallback href still works.
  }
}

/**
 * Records the pages visited in this tab, and where in that list we currently are.
 *
 * The browser will not tell us whether the entry behind us belongs to this site,
 * so we keep our own list and a position within it. Each navigation is
 * classified by comparing the new page against the entries either side of that
 * position: the one behind means a step back, the one ahead a step forward, the
 * same one a repeat to ignore, and anything else a new page.
 *
 * Deliberately not stored on `history.state`: the router writes there too and
 * can drop our value, which previously left the position unknown on some entries.
 *
 * Mounted once in the root layout.
 */
export function NavDepthTracker() {
  const pathname = usePathname()

  // A layout effect so the record is current before anything paints, keeping
  // the Back control's destination right on a page's very first render.
  useIsomorphicLayoutEffect(() => {
    const stack = readStack()

    // A fresh document, or a reload, starts the record again. Without this a
    // reload would keep the old record and leave Back pointing at this same
    // page.
    const [navEntry] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
    if (stack.length === 0 || (!documentSeen && navEntry?.type !== 'back_forward')) {
      documentSeen = true
      writeStack([pathname])
      currentIndex = 0
      return
    }
    documentSeen = true

    // Already recorded as where we are: nothing to do. This guard is what makes
    // the effect safe to run more than once for the same page — a repeat used to
    // be mistaken for a new visit and append a duplicate, which corrupted the
    // record and left Back pointing at the current page.
    if (stack[currentIndex] === pathname) return

    if (stack[currentIndex - 1] === pathname) {
      // A step backwards, from either this control or the browser's own button.
      currentIndex -= 1
      return
    }

    if (stack[currentIndex + 1] === pathname) {
      // A step forwards, via the browser's forward button.
      currentIndex += 1
      return
    }

    // A genuinely new page. It follows the current position, so any entries
    // ahead of it are no longer reachable and get dropped.
    const index = currentIndex + 1
    writeStack([...stack.slice(0, index), pathname])
    currentIndex = index
  }, [pathname])

  return null
}

/** True when `history.back()` is known to land on a previous page of ours. */
function canPopHistory() {
  return currentIndex > 0
}

/**
 * Re-checked on every route change so the control appears the moment there is
 * somewhere to go back to, and disappears when there is not. Starts undefined so
 * the server and client agree on the first render.
 */
export function usePreviousPath() {
  const pathname = usePathname()
  const [previous, setPrevious] = useState<string | undefined>(undefined)

  useIsomorphicLayoutEffect(() => {
    // Runs after the tracker's effect above — child effects fire before a
    // parent's, and the tracker sits in the layout — so read on a microtask to
    // be sure the record and index are settled first.
    let cancelled = false
    Promise.resolve().then(() => {
      if (cancelled) return
      const stack = readStack()
      const candidate = currentIndex > 0 ? stack[currentIndex - 1] : undefined
      setPrevious(candidate)
    })
    return () => {
      cancelled = true
    }
  }, [pathname])

  // Never point at the page we are already on: that is the "button does
  // nothing" symptom, and a reload is exactly what it would look like.
  return previous === pathname ? undefined : previous
}

/**
 * A named step up the hierarchy — "Back to The Yard" and the like.
 *
 * Deliberately a fixed destination: the label names where it goes, so it must
 * always go there. Returning to the previous page regardless of what the label
 * says is the header's Back button, below.
 */
export function BackLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'text-primary decoration-primary/40 hover:decoration-primary inline-flex items-center gap-2 underline decoration-1 underline-offset-4 transition-colors',
        className,
      )}
    >
      <span aria-hidden>&larr;</span>
      {children}
    </Link>
  )
}

/**
 * The site's own back button, in the header on every page.
 *
 * Steps the browser's history whenever we know the entry behind us is one of
 * ours, so this and the browser's own back button stay in agreement. Pressing
 * this used to push a new entry instead, which left the browser's back button
 * pointing forwards — at the page just left — so it appeared to do nothing or
 * simply reload.
 *
 * It stays a real link: the destination shows in the status bar, cmd-click opens
 * a new tab, and it works before the JavaScript has run. The click handler only
 * takes over to turn the push into a genuine step backwards.
 */
export function HeaderBackButton({ className }: { className?: string }) {
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
        // Let modified clicks (new tab, middle click) behave normally.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        // No entry of ours to pop — follow the href and push instead.
        if (!canPopHistory()) return

        event.preventDefault()
        window.history.back()
      }}
    >
      <span aria-hidden>&larr;</span>
      Back
    </Link>
  )
}
