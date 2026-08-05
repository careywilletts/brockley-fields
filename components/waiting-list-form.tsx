'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { joinWaitingList, type WaitingListState } from '@/app/actions/waiting-list'
import { Rule } from '@/components/primitives'
import { rooms, roomLabel } from '@/lib/rooms'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

const initialState: WaitingListState = { status: 'idle' }

/** Shared input styling — squared off, ruled underneath rather than boxed in. */
const fieldClasses =
  'w-full border border-foreground/25 bg-background px-3 py-2.5 text-[16px] leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary'

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="type-label-ink">
        {label}
      </label>
      {hint && <p className="text-muted-foreground text-[14px] leading-relaxed">{hint}</p>}
      {children}
      {error && (
        <p role="alert" className="text-primary text-[14px] leading-relaxed">
          {error}
        </p>
      )}
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="type-label-ink bg-foreground text-background hover:bg-primary inline-flex items-center justify-center px-6 py-3.5 transition-colors disabled:opacity-60"
    >
      {pending ? 'Sending…' : 'Join the waiting list'}
    </button>
  )
}

export function WaitingListForm({ defaultRoomSlug }: { defaultRoomSlug?: string }) {
  const [state, formAction] = useActionState(joinWaitingList, initialState)

  if (state.status === 'success') {
    return (
      <div className="border-foreground/25 max-w-[34rem] border p-6 sm:p-8">
        <p className="type-label">Thank you</p>
        <h2 className="type-display mt-3 text-[26px] sm:text-[30px]">{state.message}</h2>
        <Rule />
        <p className="mt-4 text-[16px] leading-relaxed">
          We read every application ourselves, so a reply may take a little while. When a room comes
          free you will hear from us before it is advertised anywhere.
        </p>
        <p className="mt-4 text-[16px] leading-relaxed">
          Anything to add in the meantime, write to{' '}
          <a
            href={`mailto:${site.email}`}
            className="text-primary decoration-primary/40 hover:decoration-primary underline underline-offset-4"
          >
            {site.email}
          </a>
          .
        </p>
      </div>
    )
  }

  const v = state.values ?? {}

  return (
    <form action={formAction} className="max-w-[34rem]" noValidate>
      {/* Errors that aren't tied to one field (database trouble, oversized payload). */}
      {state.status === 'error' && state.message && (
        <p
          role="alert"
          className="border-primary/40 text-primary mb-7 border-l-2 pl-4 text-[15px] leading-relaxed"
        >
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-6">
        <Field label="Your name" htmlFor="name" error={state.errors?.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            defaultValue={v.name}
            aria-invalid={Boolean(state.errors?.name)}
            className={fieldClasses}
          />
        </Field>

        <Field label="Email" htmlFor="email" error={state.errors?.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            defaultValue={v.email}
            aria-invalid={Boolean(state.errors?.email)}
            className={fieldClasses}
          />
        </Field>

        <Field
          label="What do you make?"
          htmlFor="discipline"
          hint="Producer, songwriter, mixer, manager, something we have not thought of."
          error={state.errors?.discipline}
        >
          <input
            id="discipline"
            name="discipline"
            type="text"
            required
            maxLength={300}
            defaultValue={v.discipline}
            aria-invalid={Boolean(state.errors?.discipline)}
            className={fieldClasses}
          />
        </Field>

        <Field
          label="Room you have your eye on"
          htmlFor="roomSlug"
          hint="Everything is occupied right now, so this is about what to call you for."
          error={state.errors?.roomSlug}
        >
          <select
            id="roomSlug"
            name="roomSlug"
            defaultValue={v.roomSlug ?? defaultRoomSlug ?? ''}
            className={cn(fieldClasses, 'cursor-pointer pr-2')}
          >
            <option value="">Whatever comes up first</option>
            {rooms.map((room) => (
              <option key={room.slug} value={room.slug}>
                {roomLabel(room)}
              </option>
            ))}
          </select>
        </Field>

        <Field label="How did you hear about us?" htmlFor="heardFrom">
          <input
            id="heardFrom"
            name="heardFrom"
            type="text"
            maxLength={200}
            defaultValue={v.heardFrom}
            className={fieldClasses}
          />
        </Field>

        <Field
          label="Anything else"
          htmlFor="message"
          hint="Optional. Links to your work are welcome here."
        >
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={2000}
            defaultValue={v.message}
            className={cn(fieldClasses, 'resize-y')}
          />
        </Field>

        <div className="border-foreground/20 border-t pt-6">
          <label htmlFor="newsletter" className="flex cursor-pointer items-start gap-3">
            <input
              id="newsletter"
              name="newsletter"
              type="checkbox"
              defaultChecked
              className="border-foreground/40 accent-primary mt-0.5 size-4 shrink-0 border"
            />
            <span className="text-[16px] leading-relaxed">
              Send me the newsletter — occasional notes on what is happening in the building. No more
              than once a month.
            </span>
          </label>
        </div>

        <div className="flex flex-col gap-4 pt-1">
          <SubmitButton />
          <p className="text-muted-foreground text-[14px] leading-relaxed">
            We share the address privately with applicants. Your details stay with us and go nowhere
            else.
          </p>
        </div>
      </div>
    </form>
  )
}
