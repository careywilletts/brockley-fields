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
 * Set by popstate, cleared once the resulting route change has been recorded.
 * Tells the tracker that the next change is a step through the history rather
 * than a new page.
 */
let traversalPending = false

/**
 * Anything showing a back destination, notified after the record changes.
 *
 * The tracker lives in the layout and the controls are its children, and React
 * runs a child's effects before its parent's. Without this the controls would
 * read the record a beat before the tracker had updated it, and show the page
 * they were already on.
 */
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function notify() {
  for (const listener of listeners) listener()
}

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

  // popstate fires for history traversals — the browser's back and forward
  // buttons, and our own history.back() — and never for a new navigation. That
  // makes it the one dependable signal for telling a step through the history
  // apart from a fresh page, which guessing from paths alone cannot do when the
  // same page appears twice in the record.
  // BISECT3: popstate listener disabled.

  // Still runs on every route change, so the record keeps up even on pages with
  // no Back control on screen to read it.
  // BISECT4: record() disabled too. Tracker now does nothing but read pathname.
  console.log('[v0] BISECT4 tracker render', pathname)

  return null
}

/**
 * Brings the record up to date for the page now showing.
 *
 * Called only from the tracker's effect, never during render: it consumes the
 * popstate flag, and doing that mid-render mistook a step backwards for a new
 * page. Idempotent, so a repeat run for the same page changes nothing.
 */
function record(pathname: string): void {
  if (typeof window === 'undefined') return

  const stack = readStack()

  // A fresh document, or a reload, starts the record again. Without this a
  // reload would keep the old record and leave Back pointing at this same page.
  const [navEntry] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
  if (stack.length === 0 || (!documentSeen && navEntry?.type !== 'back_forward')) {
    documentSeen = true
    writeStack([pathname])
    currentIndex = 0
    return
  }
  documentSeen = true

  // Already recorded as where we are: nothing to do. This guard is what makes the
  // function safe to call more than once for the same page — a repeat used to be
  // mistaken for a new visit and append a duplicate, which corrupted the record
  // and left Back pointing at the current page.
  if (stack[currentIndex] === pathname) return

  const traversed = traversalPending
  traversalPending = false

  // Check the neighbours before anything else, and without consulting the
  // popstate flag. A single step is overwhelmingly the common case, and it is
  // recognisable on its own: if the page either side of us in the record is the
  // one now showing, that is where we have moved to.
  //
  // This used to be reached only when the flag was set, which made a missed
  // popstate destructive rather than merely unhelpful — the step was filed as a
  // new page, and appending it truncated everything ahead. That is what left the
  // record holding the same page twice and Back pointing at the page it was on.
  if (stack[currentIndex - 1] === pathname) {
    currentIndex -= 1
    return
  }

  if (stack[currentIndex + 1] === pathname) {
    currentIndex += 1
    return
  }

  // Not adjacent. Only a traversal can be somewhere else in the record, and it
  // never adds to it, so the flag is worth trusting for that alone.
  if (traversed) {
    const found = stack.lastIndexOf(pathname)
    if (found >= 0) currentIndex = found
    return
  }

  // A genuinely new page. It follows the current position, so any entries ahead
  // of it are no longer reachable and get dropped.
  const index = currentIndex + 1
  writeStack([...stack.slice(0, index), pathname])
  currentIndex = index
}

/**
 * Where the given page sits in the record, and what lies behind it.
 *
 * Takes the tracked position only when the record agrees that it is the page we
 * are on, and otherwise locates the page in the record directly. That makes the
 * answer depend on the page being rendered rather than on which effect happened
 * to run first — the ordering that previously left Back labelled with the page it
 * was already on.
 */
function navPosition(pathname: string): { index: number; previous?: string } {
  // Strictly read-only. This runs during render, and an earlier version brought
  // the record up to date here too — which consumed the popstate flag before the
  // route change had finished, so a step backwards was filed as a new page and
  // overwrote the entries ahead of it. Recording belongs to the tracker's effect
  // alone; it notifies afterwards, and this is read again.
  if (typeof window === 'undefined') return { index: 0 }

  const stack = readStack()

  // Prefer the tracked position, but only when the record agrees it is this page.
  // Mid-route-change it still points at the page being left, and the fallback
  // finds where we actually are.
  const index = stack[currentIndex] === pathname ? currentIndex : stack.lastIndexOf(pathname)

  if (index < 0) return { index: 0 }

  const previous = index > 0 ? stack[index - 1] : undefined
  // A repeat of the current page is not somewhere to go back to.
  return { index, previous: previous === pathname ? undefined : previous }
}

/** True when `history.back()` is known to land on a previous page of ours. */
function canPopHistory(pathname: string) {
  return navPosition(pathname).index > 0
}

/**
 * Re-checked on every route change so the control appears the moment there is
 * somewhere to go back to, and disappears when there is not. Starts undefined so
 * the server and client agree on the first render.
 */
export function usePreviousPath() {
  const pathname = usePathname()

  // The answer is kept together with the page it was worked out for. That pairing
  // is what makes a stale value unusable rather than merely unlikely: one carried
  // over from the previous page is recognisably not for this one and is ignored,
  // instead of being shown as a destination that points at the page just arrived
  // at.
  const [resolved, setResolved] = useState<{ for: string; previous?: string }>({ for: '' })

  useIsomorphicLayoutEffect(() => {
    // Read once now, then again whenever the tracker reports a change. The
    // tracker records in a layout effect and always notifies, so the corrected
    // value lands before the browser paints.
    const read = () => setResolved({ for: pathname, previous: navPosition(pathname).previous })
    read()
    return subscribe(read)
  }, [pathname])

  // A destination worked out for a different page tells us nothing about this one.
  if (resolved.for !== pathname) return undefined

  // Never point at the page we are already on: that is the "button does
  // nothing" symptom, and a reload is exactly what it would look like.
  return resolved.previous === pathname ? undefined : resolved.previous
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
  const pathname = usePathname()
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
        if (!canPopHistory(pathname)) return

        event.preventDefault()
        window.history.back()
      }}
    >
      <span aria-hidden>&larr;</span>
      Back
    </Link>
  )
}
