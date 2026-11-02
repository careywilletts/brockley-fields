/**
 * Spam protection for the site's forms. Bots have been filling the waiting list with
 * random-letter names ("QBPpheWildXyYoXvNyTq"). Three cheap checks, all silent: a bot
 * gets the normal success message, but nothing is saved, emailed or added to any list.
 *
 * 1. Honeypot: a hidden "company" field people never see or fill in.
 * 2. Timing: real people take more than a few seconds to fill in a form.
 * 3. Gibberish: a long run of letters with no spaces and lots of upper/lower case flips.
 */
export const HONEYPOT_FIELD = 'company'
export const STARTED_FIELD = 'started_at'
const MIN_FILL_MS = 3000

function caseFlips(v: string) {
  let flips = 0
  for (let i = 1; i < v.length; i++) {
    const a = v[i - 1], b = v[i]
    if ((a === a.toUpperCase()) !== (b === b.toUpperCase())) flips++
  }
  return flips
}

export function looksLikeGibberish(value: string, strong = false) {
  const v = value.trim()
  if (v.length < (strong ? 15 : 10) || /\s/.test(v) || !/^[A-Za-z]+$/.test(v)) return false
  return caseFlips(v) >= (strong ? 7 : 4)
}

export function isProbablyBot(formData: FormData, textFields: string[]) {
  if (((formData.get(HONEYPOT_FIELD) as string | null) ?? '').trim()) return true
  const started = Number(formData.get(STARTED_FIELD))
  if (started && Date.now() - started < MIN_FILL_MS) return true
  const texts = textFields.map((key) => ((formData.get(key) as string | null) ?? '').trim()).filter(Boolean)
  // Two fields of random letters is a bot. One field only counts if it's long and very
  // jumbled (e.g. "zeViQzawQwwaYWolQevq"), so unusual real names still get through.
  return texts.filter((t) => looksLikeGibberish(t)).length >= 2 || texts.some((t) => looksLikeGibberish(t, true))
}
