/**
 * PLACEHOLDER CONTENT — news.
 * Dates are ISO so they sort and format reliably.
 *
 * Events were removed for now and can come back alongside an events page when
 * there are dates worth publishing.
 */

export type NewsItem = {
  slug: string
  date: string
  title: string
  description: string
}

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
