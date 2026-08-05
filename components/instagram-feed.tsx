import { getAggregatedFeed, getFeed, type InstagramPost } from '@/lib/instagram'
import { cn } from '@/lib/utils'
import Image from 'next/image'

/**
 * A single post. Squared off, no rounding, caption sits under the image in the
 * same municipal-print voice as the rest of the site.
 */
function Post({ post, showHandle = true }: { post: InstagramPost; showHandle?: boolean }) {
  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noreferrer"
      className="group border-foreground/20 focus-visible:ring-primary flex flex-col border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <div className="bg-secondary relative aspect-square overflow-hidden">
        <Image
          src={post.image || '/placeholder.svg'}
          alt={post.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div
          aria-hidden
          className="bg-background pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 px-3 py-3">
        {showHandle && <p className="type-label group-hover:text-primary">{post.handle}</p>}
        <p className="text-[14px] leading-snug">{post.caption}</p>
      </div>
    </a>
  )
}

/** Aggregated wall — the building account plus every resident. */
export function InstagramWall({
  handles,
  count = 12,
  className,
}: {
  handles: string[]
  count?: number
  className?: string
}) {
  const posts = getAggregatedFeed(handles, count)
  return (
    <ul
      className={cn(
        'grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-4',
        className,
      )}
    >
      {posts.map((post) => (
        <li key={post.id} className="flex">
          <Post post={post} />
        </li>
      ))}
    </ul>
  )
}

/** One person's feed, used on their profile. */
export function InstagramStrip({
  handle,
  count = 4,
  className,
}: {
  handle: string
  count?: number
  className?: string
}) {
  const posts = getFeed(handle, count)
  return (
    <ul className={cn('grid grid-cols-2 gap-4 sm:grid-cols-4', className)}>
      {posts.map((post) => (
        <li key={post.id} className="flex">
          <Post post={post} showHandle={false} />
        </li>
      ))}
    </ul>
  )
}
