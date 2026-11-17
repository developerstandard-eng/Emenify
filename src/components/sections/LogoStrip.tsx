import { PartnerLogo } from '@/components/visuals/PartnerLogo'
import { partners } from '@/data/partners'
import { home } from '@/data/site'
import { cn } from '@/lib/cn'

/**
 * Partner logos, greyscale until hovered.
 * `marquee` scrolls them slowly (off by default; always off for reduced motion).
 */
export function LogoStrip({ marquee = false }: { marquee?: boolean }) {
  const list = partners.slice(0, 6)
  return (
    <section className="border-y border-line bg-white py-10 lg:py-12" aria-labelledby="logo-strip-label">
      <div className="container-site grid items-center gap-8 lg:grid-cols-12">
        <h2 id="logo-strip-label" className="max-w-[20ch] font-heading text-[0.9375rem] font-semibold leading-snug tracking-normal text-navy lg:col-span-3">
          {home.partners.label}
        </h2>
        <div className={cn('lg:col-span-9', marquee && 'overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]')}>
          <ul
            className={cn(
              'grid grid-cols-2 items-center gap-x-8 gap-y-7 sm:grid-cols-3 lg:flex lg:justify-between lg:gap-6',
              marquee && 'motion-safe:flex motion-safe:w-max motion-safe:animate-marquee motion-safe:gap-14',
            )}
          >
            {(marquee ? [...list, ...list] : list).map((p, i) => (
              <li key={`${p.id}-${i}`} aria-hidden={i >= list.length || undefined}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group block rounded opacity-70 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0 focus-visible:opacity-100 focus-visible:grayscale-0"
                  tabIndex={i >= list.length ? -1 : undefined}
                >
                  <PartnerLogo partner={p} className="h-7 lg:h-[26px]" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
