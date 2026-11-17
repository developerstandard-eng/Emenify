import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Eyebrow } from './Eyebrow'

interface Props {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  /** left: stacked. split: title left, intro right on desktop. */
  align?: 'left' | 'split'
  as?: 'h1' | 'h2'
  dark?: boolean
  id?: string
  className?: string
}

export function SectionHeader({ eyebrow, title, intro, align = 'left', as: Tag = 'h2', dark, id, className }: Props) {
  const heading = (
    <Tag id={id} className={cn(Tag === 'h1' ? 'h1' : 'h2', dark && 'text-white')}>
      {title}
    </Tag>
  )

  if (align === 'split') {
    return (
      <div className={cn('grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8', className)}>
        <div className="lg:col-span-6">
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
          {heading}
        </div>
        {intro && <p className={cn('lead lg:col-span-5 lg:col-start-8', dark && 'text-white/75')}>{intro}</p>}
      </div>
    )
  }

  return (
    <div className={cn('max-w-[46rem]', className)}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      {heading}
      {intro && <p className={cn('lead mt-5', dark && 'text-white/75')}>{intro}</p>}
    </div>
  )
}
