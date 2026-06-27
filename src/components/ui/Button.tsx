import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'gold' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variants: Record<Variant, string> = {
  gold: 'bg-gold text-bg hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(212,175,55,0.28)]',
  outline: 'border-[1.5px] border-gold text-gold hover:bg-gold hover:text-bg',
  ghost: 'border border-line text-text-secondary hover:border-line-hover hover:text-text-primary',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-[18px] py-2.5 text-[0.86rem]',
  lg: 'px-7 py-3.5 text-[0.95rem]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'gold', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-btn font-semibold transition-all duration-200',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
