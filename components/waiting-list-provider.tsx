'use client'

import { createContext, useActionState, useContext, useState } from 'react'
import { joinWaitingList, type WaitingListState } from '@/app/actions/waiting-list'

export const WAITING_LIST_FORM_ID = 'waiting-list-form'

const initialState: WaitingListState = { status: 'idle' }

type WaitingListContextValue = {
  state: WaitingListState
  formAction: (payload: FormData) => void
  newsletter: boolean
  setNewsletter: (value: boolean) => void
}

const WaitingListContext = createContext<WaitingListContextValue | null>(null)

/**
 * Holds the waiting list form state so the newsletter opt-in can sit in the page
 * header, away from the rest of the form, while still submitting with it.
 */
export function WaitingListProvider({ children }: { children: React.ReactNode }) {
  const [state, formAction] = useActionState(joinWaitingList, initialState)
  const [newsletter, setNewsletter] = useState(false)

  return (
    <WaitingListContext.Provider value={{ state, formAction, newsletter, setNewsletter }}>
      {children}
    </WaitingListContext.Provider>
  )
}

export function useWaitingList() {
  const context = useContext(WaitingListContext)
  if (!context) throw new Error('useWaitingList must be used inside WaitingListProvider')
  return context
}

export function NewsletterOptIn() {
  const { state, newsletter, setNewsletter } = useWaitingList()

  if (state.status === 'success') return null

  return (
    <label
      htmlFor="carey_newsletter_opt_in"
      className="border-primary bg-primary/5 has-[:checked]:bg-primary/10 flex cursor-pointer items-start gap-4 border-2 p-5 transition-colors"
    >
      <input
        id="carey_newsletter_opt_in"
        name="carey_newsletter_opt_in"
        type="checkbox"
        value="true"
        form={WAITING_LIST_FORM_ID}
        checked={newsletter}
        onChange={(event) => setNewsletter(event.target.checked)}
        className="accent-primary mt-1 size-5 shrink-0"
      />
      <span className="flex flex-col gap-1">
        <span className="type-label text-primary">Newsletter</span>
        <span className="text-[17px] leading-relaxed">
          Send me Carey&apos;s newsletter, including all things Brockley Fields Studios.
        </span>
      </span>
    </label>
  )
}
