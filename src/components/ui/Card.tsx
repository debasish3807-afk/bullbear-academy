import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export function Card({ className, hover = true, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card border border-line bg-bg-card p-6 transition-colors duration-200',
        hover && 'hover:border-line-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
