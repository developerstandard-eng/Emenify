import { cn } from '@/lib/cn'
import { icons, type IconName } from '@/lib/icons'

// Flat-top hexagon in a 64×64 box. Rounded corners come from a round stroke join in the fill colour.
const HEX = '17,6 47,6 61,32 47,58 17,58 3,32'

/** Hexagon icon tile. Used for services and value tiles only (DESIGN.md §4). */
export function HexIcon({ icon, size = 56, tone = 'light', className }: { icon: IconName; size?: number; tone?: 'light' | 'dark'; className?: string }) {
  const Icon = icons[icon]
  const fill = tone === 'light' ? '#EAF2FC' : '#13306B'
  return (
    <span className={cn('relative inline-grid shrink-0 place-items-center', className)} style={{ width: size, height: size }}>
      <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <polygon points={HEX} transform="translate(3 3)" fill="none" stroke="#F28C1B" strokeOpacity={0.55} strokeWidth={1.25} strokeLinejoin="round" />
        <polygon points={HEX} fill={fill} stroke={fill} strokeWidth={5} strokeLinejoin="round" />
      </svg>
      <Icon
        className={cn('relative', tone === 'light' ? 'text-navy' : 'text-white')}
        style={{ width: size * 0.4, height: size * 0.4 }}
        strokeWidth={1.5}
        aria-hidden
      />
    </span>
  )
}

/** Rounded-square icon tile for everything that is not a hexagon use. */
export function IconTile({ icon, className }: { icon: IconName; className?: string }) {
  const Icon = icons[icon]
  return (
    <span className={cn('grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-tint text-navy', className)}>
      <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
    </span>
  )
}
