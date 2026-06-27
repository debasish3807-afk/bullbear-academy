import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-btn bg-gradient-to-r from-bg-elevated via-bg-muted to-bg-elevated bg-[length:200%_100%]',
        className
      )}
    />
  )
}
