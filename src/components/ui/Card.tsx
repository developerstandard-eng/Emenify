import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface Props extends HTMLAttributes<HTMLElement> {
  /** Lifts 2px and deepens the shadow on hover. */
  interactive?: boolean
  as?: 'div' | 'article'
}

export function Card({ interactive, as: Tag = 'div', className, ...rest }: Props) {
  return (
    <Tag
      className={cn(
        'rounded-card border border-line bg-white shadow-soft',
        interactive && 'transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift',
        className,
      )}
      {...rest}
    />
  )
}
