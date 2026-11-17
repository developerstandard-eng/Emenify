import { cn } from '@/lib/cn'

/**
 * Soft light-blue wave with a thin orange stroke. Sits at the bottom of a section.
 * `fill` should match the background of the section that follows.
 */
export function WaveDivider({ fill = '#FFFFFF', className }: { fill?: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={cn('pointer-events-none absolute inset-x-0 bottom-0 h-[56px] w-full sm:h-[88px] lg:h-[112px]', className)}
      aria-hidden
    >
      <path d="M0 70C240 112 480 120 760 96C1040 72 1240 30 1440 22V120H0Z" fill="#EAF2FC" />
      <path d="M0 96C260 124 540 122 820 102C1080 82 1260 58 1440 56V120H0Z" fill={fill} />
      <path d="M0 62C250 104 500 112 770 88C1040 64 1250 24 1440 14" fill="none" stroke="#F28C1B" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}
