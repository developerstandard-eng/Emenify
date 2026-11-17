import { cn } from '@/lib/cn'

/** Text wordmark placeholder. TODO(client): replace with the supplied SVG logo. */
export function Wordmark({ dark, className }: { dark?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline font-heading text-[1.625rem] font-extrabold leading-none tracking-[-0.04em]',
        dark ? 'text-white' : 'text-navy',
        className,
      )}
    >
      emenify
      <span aria-hidden className="ml-[2px] inline-block h-[0.24em] w-[0.24em] rounded-full bg-accent" />
    </span>
  )
}
