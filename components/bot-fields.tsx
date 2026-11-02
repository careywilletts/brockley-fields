'use client'

import { useState } from 'react'
import { HONEYPOT_FIELD, STARTED_FIELD } from '@/lib/bot-check'

/** Hidden spam-trap fields. See lib/bot-check.ts. */
export function BotFields() {
  const [startedAt] = useState(() => Date.now())
  return (
    <>
      <input type="hidden" name={STARTED_FIELD} value={startedAt} />
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label>
          Company (leave this empty)
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
    </>
  )
}
