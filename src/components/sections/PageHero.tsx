import type { ReactNode } from 'react'
import { Eyebrow } from '@/components/ui'
import { WaveDivider } from '@/components/visuals/WaveDivider'
import { cn } from '@/lib/cn'

interface Props {
  eyebrow: string
  title: ReactNode
  body?: ReactNode
  /** Optional right-hand column (facts, visual). Without it the hero is single-column. */
  aside?: ReactNode
  children?: ReactNode
  /** Background of the section that follows, so the wave blends in. */
  nextFill?: string
}

/** Inner-page hero: mist background, H1 with eyebrow, wave at the bottom. */
export function PageHero({ eyebrow, title, body, aside, children, nextFill = '#FFFFFF' }: Props) {
  return (
    <section className="relative overflow-hidden bg-mist pb-24 pt-14 sm:pb-32 lg:pb-40 lg:pt-20">
      <div className={cn('container-site relative', aside ? 'grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8' : undefined)}>
        <div className={cn(aside ? 'lg:col-span-7' : 'max-w-[48rem]')}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="h1">{title}</h1>
          {body && <p className="lead mt-6">{body}</p>}
          {children}
        </div>
        {aside && <div className="lg:col-span-4 lg:col-start-9">{aside}</div>}
      </div>
      <WaveDivider fill={nextFill} />
    </section>
  )
}
