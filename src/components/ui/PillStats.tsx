import type { Stat } from '@/data/site'
import { cn } from '@/lib/cn'
import { icons } from '@/lib/icons'

/**
 * Rounded pill with three icon + label items split by hairlines.
 * On narrow screens the items stack into three equal columns (icon above label).
 */
export function PillStats({ items, compact, className }: { items: Stat[]; compact?: boolean; className?: string }) {
  return (
    <ul
      className={cn(
        'grid grid-cols-3 divide-x divide-line border border-line bg-white shadow-soft',
        'rounded-2xl sm:inline-flex sm:rounded-full',
        compact ? 'sm:py-1.5' : 'sm:py-2',
        className,
      )}
    >
      {items.map(({ icon, label }) => {
        const Icon = icons[icon]
        return (
          <li
            key={label}
            className={cn(
              'flex flex-col items-center gap-2 px-2 py-3 text-center sm:flex-row sm:gap-2.5 sm:py-1.5 sm:text-left',
              compact ? 'sm:px-4' : 'sm:px-5',
            )}
          >
            <span
              className={cn(
                'grid shrink-0 place-items-center rounded-full bg-tint text-cobalt',
                compact ? 'h-7 w-7' : 'h-8 w-8',
              )}
            >
              <Icon className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} strokeWidth={1.75} aria-hidden />
            </span>
            <span
              className={cn(
                'font-heading font-semibold leading-tight text-navy sm:whitespace-nowrap',
                compact ? 'text-[0.75rem] sm:text-[0.8125rem]' : 'text-[0.75rem] sm:text-[0.875rem]',
              )}
            >
              {label}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
