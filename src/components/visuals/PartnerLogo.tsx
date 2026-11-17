import type { Partner } from '@/data/partners'
import { cn } from '@/lib/cn'

/** Neutral placeholder logo: a simple geometric mark + wordmark. TODO(client): swap for real SVG logos. */
function Mark({ kind, color }: { kind: Partner['mark']; color: string }) {
  switch (kind) {
    case 'ring':
      return (
        <g fill="none" stroke={color} strokeWidth="3.5">
          <circle cx="16" cy="16" r="11" />
          <circle cx="16" cy="16" r="4.5" fill={color} stroke="none" />
        </g>
      )
    case 'square':
      return (
        <g fill={color}>
          <rect x="5" y="5" width="10" height="10" rx="2" />
          <rect x="17" y="5" width="10" height="10" rx="2" fillOpacity="0.55" />
          <rect x="5" y="17" width="10" height="10" rx="2" fillOpacity="0.55" />
          <rect x="17" y="17" width="10" height="10" rx="2" />
        </g>
      )
    case 'bars':
      return (
        <g fill={color}>
          <rect x="5" y="16" width="5" height="11" rx="1.5" />
          <rect x="13.5" y="10" width="5" height="17" rx="1.5" />
          <rect x="22" y="4" width="5" height="23" rx="1.5" />
        </g>
      )
    case 'diamond':
      return (
        <g fill={color}>
          <path d="M16 3 29 16 16 29 3 16Z" fillOpacity="0.3" />
          <path d="M16 9 23 16 16 23 9 16Z" />
        </g>
      )
    case 'arc':
      return (
        <g fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round">
          <path d="M5 24a11 11 0 0 1 22 0" />
          <path d="M11 24a5 5 0 0 1 10 0" />
        </g>
      )
    case 'grid':
      return (
        <g fill={color}>
          {[6, 16, 26].flatMap((x) => [6, 16, 26].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r={(x + y) % 20 === 12 ? 3.5 : 2.5} />))}
        </g>
      )
  }
}

export function PartnerLogo({ partner, className, mono }: { partner: Partner; className?: string; mono?: boolean }) {
  if (partner.logo) {
    return <img src={partner.logo} alt={partner.name} className={className} loading="lazy" decoding="async" />
  }
  const color = mono ? '#64748B' : partner.hue
  return (
    <svg viewBox="0 0 180 32" className={cn('h-8 w-auto', className)} role="img" aria-label={partner.name}>
      <Mark kind={partner.mark} color={color} />
      <text
        x="38"
        y="21.5"
        fontFamily="Montserrat, sans-serif"
        fontWeight="700"
        fontSize="14.5"
        letterSpacing="-0.3"
        fill={mono ? '#64748B' : '#0A1F4D'}
        className="transition-[fill] duration-300"
      >
        {partner.name}
      </text>
    </svg>
  )
}
