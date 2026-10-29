import 'server-only'
import { sendConfirmationEmail } from '@/lib/confirmation-email'

const AIRTABLE_BASE_ID = 'app9volcox6zYTFMZ'
const AIRTABLE_TABLE_ID = 'tbl0wg4DfnkA2IMGx'
const MAILERLITE_BROCKLEY_GROUP_ID = '202653487638512852'
const MAILERLITE_CAREY_GROUP_ID = '201490161441178693'
const REQUEST_TIMEOUT_MS = 10_000

export type Signup = {
  name: string
  email: string
  discipline: string
  room: string | null
  heardFrom: string | null
  message: string | null
  newsletter: boolean
  careyNewsletter: boolean
}

function mailerLiteGroups(signup: Signup) {
  const groups: string[] = []
  if (signup.newsletter) groups.push(MAILERLITE_BROCKLEY_GROUP_ID)
  if (signup.careyNewsletter) groups.push(MAILERLITE_CAREY_GROUP_ID)
  return groups
}

async function readError(response: Response) {
  const body = await response.text().catch(() => '')
  return `${response.status} ${response.statusText} ${body.slice(0, 500)}`
}

export async function sendToAirtable(signup: Signup) {
  const token = process.env.AIRTABLE_TOKEN
  if (!token) throw new Error('AIRTABLE_TOKEN is not set')

  const fields: Record<string, string | boolean> = {
    Name: signup.name,
    Email: signup.email,
    'What they make': signup.discipline,
    'Newsletter opt-in': signup.newsletter,
    'Carey newsletter opt-in': signup.careyNewsletter,
    'Came from': 'Brockley Fields website',
    Status: 'Waiting',
  }
  if (signup.room) fields.Room = signup.room
  if (signup.heardFrom) fields['Heard about us'] = signup.heardFrom
  if (signup.message) fields.Notes = signup.message

  const response = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ records: [{ fields }], typecast: true }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    },
  )
  if (!response.ok) throw new Error(`Airtable: ${await readError(response)}`)
}

export async function addToMailerLite(signup: Signup) {
  const apiKey = process.env.MAILERLITE_API_KEY
  if (!apiKey) throw new Error('MAILERLITE_API_KEY is not set')

  const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email: signup.email,
      fields: { name: signup.name },
      groups: mailerLiteGroups(signup),
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })
  if (!response.ok) throw new Error(`MailerLite: ${await readError(response)}`)
}

/** Never throws: Neon is the source of truth, so these are best-effort copies. */
export async function syncSignup(signup: Signup) {
  const tasks: Array<[string, Promise<void>]> = [
    ['Airtable', sendToAirtable(signup)],
    ['Confirmation email', sendConfirmationEmail(signup)],
  ]
  if (mailerLiteGroups(signup).length > 0) tasks.push(['MailerLite', addToMailerLite(signup)])

  const results = await Promise.allSettled(tasks.map(([, task]) => task))
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`[signup-sync] ${tasks[index][0]} failed:`, result.reason)
    }
  })
}
