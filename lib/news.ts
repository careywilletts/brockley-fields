/**
 * PLACEHOLDER CONTENT — events and news.
 * Dates are ISO so they sort and format reliably.
 */

export type Event = {
  slug: string
  date: string
  title: string
  description: string
  cta?: { label: string; href: string }
}

export type NewsItem = {
  slug: string
  date: string
  title: string
  description: string
}

export const events: Event[] = [
  {
    slug: 'open-day-spring',
    date: '2026-09-12',
    title: 'Open Day',
    description:
      'Both units open from midday. Come and see the rooms, meet the people in them, and stay for as long as you like. No appointment, no pitch.',
    cta: { label: 'Let us know you’re coming', href: '/waiting-list' },
  },
  {
    slug: 'listening-session-autumn',
    date: '2026-08-28',
    title: 'Listening Session',
    description:
      'Residents play works in progress on the big monitors at the Studios. Honest feedback, no phones out. Sixteen people maximum.',
    cta: { label: 'Ask for a place', href: '/waiting-list' },
  },
  {
    slug: 'collaborator-evening',
    date: '2026-08-14',
    title: 'Collaborator Evening',
    description:
      'An evening for writers, producers and players who do not have a room here but should know the people who do. Bring somebody with you.',
    cta: { label: 'Get on the list', href: '/waiting-list' },
  },
]

export const news: NewsItem[] = [
  {
    slug: 'yard-treated',
    date: '2026-04-01',
    title: 'The Yard rooms finish acoustic treatment',
    description:
      'Both Yard studios are now treated to the same standard as the Studios rooms. You can hear the difference from the corridor.',
  },
]

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function formatDateShort(iso: string): { day: string; month: string; year: string } {
  const d = new Date(`${iso}T00:00:00Z`)
  return {
    day: d.toLocaleDateString('en-GB', { day: '2-digit', timeZone: 'UTC' }),
    month: d.toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' }),
    year: String(d.getUTCFullYear()),
  }
}
