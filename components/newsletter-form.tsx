'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { subscribeToNewsletter, type NewsletterState } from '@/app/actions/newsletter'
import { waitingListHref } from '@/lib/site'

const initialState: NewsletterState = { status: 'idle' }

const fieldClasses =
  'w-full border border-foreground/25 bg-background px-3 py-2.5 text-[16px] leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="type-label-ink bg-foreground text-background hover:bg-primary inline-flex items-center justify-center px-6 py-3.5 transition-colors disabled:opacity-60"
    >
      {pending ? 'Sending…' : 'Subscribe'}
    </button>
  )
}

export function NewsletterForm() {
  const [state, formAction] = useActionState(subscribeToNewsletter, initialState)

  if (state.status === 'success') {
    return (
      <div className="border-foreground/25 max-w-[34rem] border p-6 sm:p-8">
        <p className="type-label">Thank you</p>
        <h2 className="type-display mt-3 text-[26px] sm:text-[30px]">{state.message}</h2>
        <p className="mt-4 text-[16px] leading-relaxed">
          Looking for a room too?{' '}
          <Link
            href={waitingListHref}
            className="text-primary decoration-primary/40 hover:decoration-primary underline underline-offset-4"
          >
            Join the waiting list
          </Link>
          .
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex max-w-[34rem] flex-col gap-6" noValidate>
      {state.status === 'error' && state.message && (
        <p
          role="alert"
          className="border-primary/40 text-primary border-l-2 pl-4 text-[15px] leading-relaxed"
        >
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="nl-email" className="type-label-ink">
          Email
        </label>
        <input
          id="nl-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={200}
          defaultValue={state.values?.email}
          className={fieldClasses}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="nl-name" className="type-label-ink">
          First name <span className="text-muted-foreground normal-case">(optional)</span>
        </label>
        <input
          id="nl-name"
          name="name"
          type="text"
          autoComplete="given-name"
          maxLength={120}
          defaultValue={state.values?.name}
          className={fieldClasses}
        />
      </div>

      <div className="flex flex-col gap-4 pt-1">
        <SubmitButton />
        <p className="text-muted-foreground text-[14px] leading-relaxed">
          Unsubscribe from any email.{' '}
          <Link
            href="/privacy"
            className="hover:text-primary underline decoration-current/40 underline-offset-4 transition-colors"
          >
            Privacy policy
          </Link>
        </p>
      </div>
    </form>
  )
}
