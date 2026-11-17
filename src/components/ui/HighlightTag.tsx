import type { ReactNode } from 'react'

/**
 * Slanted orange highlight behind one phrase of a headline.
 * Rule: at most once per page (DESIGN.md §4).
 */
export function HighlightTag({ children }: { children: ReactNode }) {
  return (
    <span className="relative mx-[0.08em] inline-block whitespace-nowrap px-[0.22em]">
      <span aria-hidden className="absolute inset-x-0 bottom-[0.06em] top-[0.12em] -skew-x-[12deg] rounded-[4px] bg-accent" />
      <span className="relative text-navy-deep">{children}</span>
    </span>
  )
}
