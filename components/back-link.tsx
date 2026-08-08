'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useSyncExternalStore } from 'react'
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
  useIsomorphicLayoutEffect(() => {
    const onPopState = () => {
      traversalPending = true
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  // Still runs on every route change, so the record keeps up even on pages with
  // no Back control on screen to read it.
  useIsomorphicLayoutEffect(() => {
    if (record(pathname)) notify()
  }, [pathname])

  return null
}

/**
 * Brings the record up to date for the page now showing.
 *
 * Idempotent: calling it repeatedly for the same page changes nothing, which is
 * what lets both the tracker and the controls call it freely. Returns whether
 * anything actually moved, so only real changes trigger a re-render.
 */
function record(pathname: string): boolean {
  if (typeof window === 'undefined') return false

  const stack = readStack()

  // A fresh document, or a reload, starts the record again. Without this a
  // reload would keep the old record and leave Back pointing at this same page.
  const [navEntry] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
  if (stack.length === 0 || (!documentSeen && navEntry?.type !== 'back_forward')) {
    documentSeen = true
    writeStack([pathname])
    currentIndex = 0
    return true
  }
  documentSeen = true

  // Already recorded as where we are: nothing to do. This guard is what makes the
  // function safe to call more than once for the same page — a repeat used to be
  // mistaken for a new visit and append a duplicate, which corrupted the record
  // and left Back pointing at the current page.
  if (stack[currentIndex] === pathname) return false

  const traversed = traversalPending
  traversalPending = false

  if (traversed) {
    // A step through the history. Move to whichever neighbour this is, and if it
    // is neither, find the page in the record — a traversal never adds to it.
    if (stack[currentIndex - 1] === pathname) currentIndex -= 1
    else if (stack[currentIndex + 1] === pathname) currentIndex += 1
    else {
      const found = stack.lastIndexOf(pathname)
      if (found >= 0) currentIndex = found
    }
    return true
  }

  // A genuinely new page. It follows the current position, so any entries ahead
  // of it are no longer reachable and get dropped.
  const index = currentIndex + 1
  writeStack([...stack.slice(0, index), pathname])
  currentIndex = index
  return true
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
  // Bring the record up to date first. Recording used to live in an effect while
  // reading happened during render, so a control could read a position the
  // tracker had not moved yet and show a destination one step out of date — on
  // the way back, the page just arrived at. Doing both here means there is only
  // one order of events, whoever asks first.
  record(pathname)

  const stack = readStack()
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

  // useSyncExternalStore reads the record during render and re-reads whenever the
  // tracker reports a change. Holding the answer in state instead meant it was
  // written by an effect, and effects run child-first — so a control could paint
  // using the record as it stood before the tracker had updated it, labelled with
  // the page it was already on. Reading at render time removes that ordering
  // question altogether.
  const previous = useSyncExternalStore(
    subscribe,
    () => navPosition(pathname).previous,
    // Nothing to go back to until the browser is involved.
    () => undefined,
  )

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
