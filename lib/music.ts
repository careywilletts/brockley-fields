/**
 * The building's playlist.
 *
 * Deliberately NOT a per-person discography: nothing here is attributed to an
 * individual resident. It is simply a record of what has been made in the
 * building, so no one is credited with something they did not do.
 *
 * `playlistEmbedUrl` is the single source of truth for the player. Paste the
 * Spotify playlist's embed URL here and the page picks it up.
 */

/** Spotify playlist embed URL, or undefined until one is created. */
export const playlistEmbedUrl: string | undefined = undefined

/** The playlist's public page, for people who would rather open the app. */
export const playlistUrl: string | undefined = undefined
