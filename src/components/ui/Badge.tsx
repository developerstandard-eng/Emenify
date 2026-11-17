import { MapPin, Video } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'online' | 'offline' | 'neutral'

const tones: Record<Tone, string> = {
  online: 'bg-tint text-[#174A96]',
  offline: 'bg-accent-soft text-[#8A4A08]',
  neutral: 'bg-mist text-navy border border-line',
}

export function Badge({ tone = 'neutral', children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  const Icon = tone === 'online' ? Video : tone === 'offline' ? MapPin : null
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 font-heading text-[0.75rem] font-semibold leading-none',
        tones[tone],
        className,
      )}
    >
      {Icon && <Icon className="h-3 w-3" strokeWidth={2} aria-hidden />}
      {children}
    </span>
  )
}
