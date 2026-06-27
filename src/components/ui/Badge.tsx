import { cn } from '@/lib/utils'

type BadgeVariant = 'gold' | 'green' | 'red' | 'blue' | 'violet'

const variantStyles: Record<BadgeVariant, string> = {
  gold: 'bg-gold-dim text-gold',
  green: 'bg-emerald-dim text-emerald',
  red: 'bg-danger-dim text-danger',
  blue: 'bg-info-dim text-info',
  violet: 'bg-purple-500/10 text-purple-400',
}

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'gold', children, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.72rem] font-bold', variantStyles[variant], className)}>
      {children}
    </span>
  )
}
