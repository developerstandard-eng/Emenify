import { m, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/** Fade up 12px, 300ms ease-out, once, when scrolled into view. Disabled for reduced motion. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.3, ease: 'easeOut', delay }}
    >
      {children}
    </m.div>
  )
}
