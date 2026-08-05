import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

/**
 * Applications to join the studio waiting list.
 *
 * This is a public form — there are no user accounts on the site, so rows are
 * not scoped to a signed-in user. Nothing here is ever read back into the
 * public site; it exists so Rob can work through the list when a room frees up.
 */
export const waitingList = pgTable('waiting_list', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  /** What they make, in their own words. */
  discipline: text('discipline').notNull(),
  /** Slug of the room they have their eye on, or null for "whatever comes up". */
  roomSlug: text('room_slug'),
  heardFrom: text('heard_from'),
  newsletter: boolean('newsletter').notNull().default(false),
  message: text('message'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export type WaitingListRow = typeof waitingList.$inferSelect
