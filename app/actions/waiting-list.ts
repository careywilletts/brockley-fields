'use server'

import { db } from '@/lib/db'
import { waitingList } from '@/lib/db/schema'
import { rooms } from '@/lib/rooms'

export type FieldErrors = {
  name?: string
  email?: string
  discipline?: string
  roomSlug?: string
}

export type WaitingListState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: FieldErrors
  /** Echoed back so a failed submit doesn't wipe what they typed. */
  values?: Record<string, string>
}

const MAX = { name: 120, email: 200, discipline: 300, heardFrom: 200, message: 2000 }

/** Deliberately permissive — just enough to catch typos, not to police addresses. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Drizzle wraps driver errors, so the Postgres `code` lives on `error.cause`
 * rather than on the error itself. Walk the chain to find it.
 */
function hasPostgresCode(error: unknown, code: string): boolean {
  let current = error
  for (let depth = 0; depth < 5 && current !== null && typeof current === 'object'; depth++) {
    if ('code' in current && current.code === code) return true
    current = 'cause' in current ? current.cause : null
  }
  return false
}

export async function joinWaitingList(
  _prev: WaitingListState,
  formData: FormData,
): Promise<WaitingListState> {
  const raw = (key: string) => (formData.get(key) as string | null)?.trim() ?? ''

  const name = raw('name')
  const email = raw('email')
  const discipline = raw('discipline')
  const roomSlug = raw('roomSlug')
  const heardFrom = raw('heardFrom')
  const message = raw('message')
  const newsletter = formData.get('newsletter') === 'on'

  // Echoed back on failure so the form repopulates.
  const values = { name, email, discipline, roomSlug, heardFrom, message }

  const errors: FieldErrors = {}
  if (!name) errors.name = 'Please tell us your name.'
  else if (name.length > MAX.name) errors.name = 'That name is too long.'

  if (!email) errors.email = 'We need an email address to reply to.'
  else if (!EMAIL.test(email) || email.length > MAX.email)
    errors.email = 'That does not look like an email address.'

  if (!discipline) errors.discipline = 'Tell us what you make — a few words is plenty.'
  else if (discipline.length > MAX.discipline) errors.discipline = 'Please keep this shorter.'

  // Only accept a slug we actually publish; anything else is a tampered payload.
  if (roomSlug && !rooms.some((room) => room.slug === roomSlug))
    errors.roomSlug = 'That is not a room we have.'

  if (heardFrom.length > MAX.heardFrom || message.length > MAX.message)
    return {
      status: 'error',
      message: 'That submission was longer than we can accept.',
      values,
    }

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, values }
  }

  try {
    await db.insert(waitingList).values({
      name,
      email,
      discipline,
      roomSlug: roomSlug || null,
      heardFrom: heardFrom || null,
      message: message || null,
      newsletter,
    })
  } catch (error) {
    // 23505 is Postgres' unique violation — the email is already on the list.
    if (hasPostgresCode(error, '23505')) {
      return {
        status: 'success',
        message: 'You are already on the list — we have your details and we will be in touch.',
      }
    }
    console.log('[v0] waiting list insert failed:', error)
    return {
      status: 'error',
      message: 'Something went wrong at our end. Try again, or email us directly.',
      values,
    }
  }

  return {
    status: 'success',
    message: 'You are on the list.',
  }
}
