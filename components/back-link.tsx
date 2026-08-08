'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const STACK_KEY = 'bf:nav-stack'

/**
 * Module scope is re-evaluated once per document load and is NOT reset by React
 * Strict Mode's double-invoked effects, which a ref or state would be. That is
 * what lets us tell a genuine new document apart from a repeated effect run.
 */
let initialised = false

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

  // A layout effect so the record is updated before anything paints, keeping
  // the Back control's destination correct on the very first render of a page.
  useIsomorphicLayoutEffect(() => {
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
    if (stack[stack.length - 1] === pathname) return

    if (stack[stack.length - 2] === pathname) {
      // Landing on the entry behind the current one is a step backwards —
      // whether that came from our own control or the browser's back button.
      // It has to shorten the record, not extend it: appending here would make
      // the page just left look like the previous page, and "back" would then
      // bounce between two pages or point at nothing.
      writeStack(stack.slice(0, -1))
      return
    }

    writeStack([...stack, pathname])
  }, [pathname])

  return null
}

/**
 * The page a back step would land on, or undefined if there is not one.
 *
 * Derived from where we actually are rather than from the end of the record,
 * because this can run before the tracker's effect has updated it — after a
 * browser back, for instance. Finding the current page in the record and taking
 * the entry before it is correct whether or not the trim has happened yet;
 * reading the last entry blindly can return the page we are already on, which
 * gives a button that appears to do nothing.
 */
function previousPath(currentPath: string): string | undefined {
  const stack = readStack()
  const index = stack.lastIndexOf(currentPath)

  if (index > 0) return stack[index - 1]
  // Not in the record yet: the last entry is the page we came from, unless it
  // is this same page.
  if (index === -1) {
    const last = stack[stack.length - 1]
    return last && last !== currentPath ? last : undefined
  }
  return undefined
}

/**
 * Re-checked on every route change so the control appears the moment there is
 * somewhere to go back to, and disappears when there is not. Starts false so
 * the server and client agree on the first render.
 */
export function usePreviousPath() {
  const pathname = usePathname()
  const [previous, setPrevious] = useState<string | undefined>(undefined)

  // Runs after the tracker's layout effect above, so the record is already
  // current by the time we read it.
  useIsomorphicLayoutEffect(() => {
    setPrevious(previousPath(pathname))
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
 * A plain link to the previous page, for the reasons given on BackLink above.
 * Being a real link also means the destination shows in the status bar and
 * cmd-click opens it in a new tab.
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
    >
      <span aria-hidden>&larr;</span>
      Back
    </Link>
  )
}
