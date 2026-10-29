'use client'

import { Play } from 'lucide-react'
import { useRef, useState } from 'react'

import type { RoomVideo } from '@/lib/rooms'

/**
 * A room walkthrough, held behind a click.
 *
 * The clip is several megabytes and the photographs above it already carry the
 * page, so nothing but the poster is fetched until someone asks: `preload` stays
 * at "none" and the <video> keeps its own poster attribute, which costs one
 * small image rather than the whole file. That also means no work is wasted on
 * the many visitors who never press play.
 *
 * The element is mounted from the start and only the overlay is swapped out, so
 * playback begins on the same element the visitor clicked and the browser's own
 * controls take over from there — no second render, no custom scrubber to get
 * wrong, and keyboard and screen-reader behaviour comes free.
 *
 * Clips are silent, so there is no captions track to supply; the accessible
 * name has to carry what is on screen instead.
 */
export function RoomVideoPlayer({ video }: { video: RoomVideo }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  function start() {
    // Controls go up first, so a refused play() leaves the visitor somewhere
    // rather than nowhere: the browser's own play button is already there.
    setStarted(true)
    ref.current?.play().catch(() => {
      /* Blocked by an autoplay policy — the native controls take it from here. */
    })
  }

  return (
    <figure className="m-0">
      {/* Portrait phone footage, capped narrow so a 9:16 clip stays a clip
          rather than running the height of the page. Left-aligned rather than
          centred: the section label sits in the left gutter, and a centred
          panel would leave it pointing at nothing. */}
      <div className="bg-secondary relative aspect-9/16 w-full max-w-[19rem] overflow-hidden sm:max-w-[21rem]">
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          aria-label={video.description}
          controls={started}
          preload="none"
          playsInline
          /* The clip carries no audio track at all, so muting costs nothing and
             buys certainty: browsers refuse play() on unmuted media in cases
             they consider unprompted, and there is no sound here to lose. */
          muted
          className="h-full w-full object-cover"
          /* Back to the poster rather than resting on the last frame, so a
             second visitor to the control sees the same thing as the first. */
          onEnded={() => {
            setStarted(false)
            ref.current?.load()
          }}
        />
        {!started && (
          <button
            type="button"
            onClick={start}
            className="group focus-visible:ring-foreground absolute inset-0 flex cursor-pointer items-center justify-center focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {/* The poster is a still of the room, so the control needs its own
                ground to stay legible against whatever is behind it. */}
            <span className="bg-background/85 text-foreground group-hover:bg-background flex h-16 w-16 items-center justify-center rounded-full transition-colors">
              <Play className="ml-0.5 h-6 w-6" aria-hidden />
            </span>
            <span className="sr-only">Play walkthrough: {video.description}</span>
          </button>
        )}
      </div>
      {video.caption && (
        <figcaption className="type-label mt-3 max-w-[19rem] sm:max-w-[21rem]">
          {video.caption}
        </figcaption>
      )}
    </figure>
  )
}
