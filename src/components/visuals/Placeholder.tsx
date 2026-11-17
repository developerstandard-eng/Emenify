import { cn } from '@/lib/cn'
import { icons, type IconName } from '@/lib/icons'

/**
 * Duotone navy placeholder for photography.
 * TODO: replace with client photo. Keep the same aspect ratio and rounded corners.
 */
export function Placeholder({
  icon = 'building',
  label,
  tone = 'navy',
  className,
}: {
  icon?: IconName
  label: string
  tone?: 'navy' | 'tint'
  className?: string
}) {
  const Icon = icons[icon]
  const dark = tone === 'navy'
  return (
    <div
      role="img"
      aria-label={`${label} (placeholder image)`}
      className={cn('relative isolate overflow-hidden rounded-card', dark ? 'bg-navy' : 'bg-tint', className)}
    >
      <svg className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300">
        <g fill="none" stroke={dark ? '#FFFFFF' : '#1E5BB8'} strokeOpacity={dark ? 0.07 : 0.12}>
          {Array.from({ length: 12 }, (_, i) => (
            <line key={`v${i}`} x1={i * 36} y1="0" x2={i * 36} y2="300" />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 36} x2="400" y2={i * 36} />
          ))}
        </g>
        <circle cx="300" cy="230" r="150" fill={dark ? '#13306B' : '#FFFFFF'} fillOpacity={dark ? 1 : 0.6} />
        <circle cx="300" cy="230" r="96" fill="none" stroke="#F28C1B" strokeOpacity="0.6" />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span
          className={cn(
            'grid h-16 w-16 place-items-center rounded-2xl border',
            dark ? 'border-white/15 bg-white/5 text-white' : 'border-cobalt/15 bg-white text-navy',
          )}
        >
          <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden />
        </span>
      </div>
    </div>
  )
}
