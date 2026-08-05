import type { RoomStatus } from '@/lib/rooms'
import { cn } from '@/lib/utils'

const styles: Record<RoomStatus, string> = {
  Occupied: 'border-rule/60 text-muted-foreground',
  Available: 'border-primary bg-primary text-primary-foreground',
  'Coming Soon': 'border-terracotta text-terracotta',
}

export function StatusBadge({
  status,
  className,
}: {
  status: RoomStatus
  className?: string
}) {
  return (
    <span
      className={cn(
        'type-label inline-flex items-center border px-2 py-1 leading-none',
        styles[status],
        className,
      )}
    >
      <span className="sr-only">Status: </span>
      {status}
    </span>
  )
}
