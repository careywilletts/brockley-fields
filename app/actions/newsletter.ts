'use server'

import { after } from 'next/server'
import { db } from '@/lib/db'
import { newsletterSignups } from '@/lib/db/schema'
import { subscribeViaCarey } from '@/lib/signup-sync'
import { isProbablyBot } from '@/lib/bot-check'

export type NewsletterState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  values?: { name: string; email: string }
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function subscribeToNewsletter(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  if (isProbablyBot(formData, ['name'])) return { status: 'success', message: 'Nearly there. Check your inbox to confirm.' }

  const name = ((formData.get('name') as string | null) ?? '').trim()
  const email = ((formData.get('email') as string | null) ?? '').trim()
  const values = { name, email }

  if (!email || !EMAIL.test(email) || email.length > 200)
    return { status: 'error', message: 'That does not look like an email address.', values }
  if (name.length > 120) return { status: 'error', message: 'That name is too long.', values }

  try {
    await db
      .insert(newsletterSignups)
      .values({ email, name: name || null })
      .onConflictDoNothing({ target: newsletterSignups.email })
  } catch (error) {
    console.error('[newsletter] insert failed:', error)
    return {
      status: 'error',
      message: 'Something went wrong at our end. Please try again.',
      values,
    }
  }

  // MailerLite upserts, so a repeat signup is harmless. Never blocks the response.
  after(() =>
    subscribeViaCarey(email).catch((error) =>
      console.error('[newsletter] MailerLite failed:', error),
    ),
  )

  return { status: 'success', message: 'Nearly there. Check your inbox to confirm.' }
}
