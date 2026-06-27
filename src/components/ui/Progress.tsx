import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number
  className?: string
  color?: string
}

export function Progress({ value, className, color = 'bg-gold' }: ProgressProps) {
  return (
    <div className={cn('h-[6px] overflow-hidden rounded-full bg-bg-muted', className)}>
      <div
        className={cn('h-full rounded-full transition-all duration-500', color)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}
