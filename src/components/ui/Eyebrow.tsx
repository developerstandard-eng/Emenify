import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Short orange rule + italic label above every H1/H2. Text is navy for contrast; the rule carries the colour. */
export function Eyebrow({ children, dark, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <p
      className={cn(
        'mb-4 flex items-center gap-3 font-heading text-[0.875rem] font-semibold italic tracking-[0.01em]',
        dark ? 'text-white/80' : 'text-navy',
        className,
      )}
    >
      <span aria-hidden className="h-0.5 w-6 shrink-0 rounded-full bg-accent" />
      {children}
    </p>
  )
}
