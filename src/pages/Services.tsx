import { ArrowRight, Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '@/components/sections/PageHero'
import { Button, Eyebrow, HexIcon, PillStats, Reveal } from '@/components/ui'
import { Placeholder } from '@/components/visuals/Placeholder'
import { services, servicesIntro, type Service } from '@/data/services'
import { pageMeta } from '@/data/site'
import { cn } from '@/lib/cn'
import { icons } from '@/lib/icons'
import { useDocumentTitle } from '@/lib/useDocumentTitle'

/** Tracks which service section is in view, for the sticky sub-nav. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-140px 0px -55% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

const ids = services.map((s) => s.id)

export default function Services() {
  useDocumentTitle(pageMeta.services)
  const active = useActiveSection(ids)

  return (
    <>
      <PageHero
        eyebrow={servicesIntro.eyebrow}
        title={servicesIntro.title}
        body={servicesIntro.body}
        aside={
          <nav aria-label="Service lines" className="rounded-card border border-line bg-white p-2 shadow-soft">
            <ul>
              {services.map((s) => {
                const Icon = icons[s.icon]
                return (
                  <li key={s.id}>
                    <Link to={`#${s.id}`} className="group flex items-center gap-4 rounded-lg p-3.5 transition-colors hover:bg-mist">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-tint text-navy">
                        <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                      </span>
                      <span className="flex-1 font-heading text-[0.9375rem] font-semibold text-navy">{s.name}</span>
                      <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        }
      />

      {/* Sticky in-page sub-nav, desktop only */}
      <div className="sticky top-[72px] z-30 hidden border-b border-line bg-white/95 backdrop-blur-[6px] lg:block">
        <nav aria-label="On this page" className="container-site">
          <ul className="flex gap-10">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  to={`#${s.id}`}
                  aria-current={active === s.id ? 'true' : undefined}
                  className={cn(
                    'relative flex h-14 items-center font-heading text-[0.875rem] font-semibold transition-colors',
                    active === s.id
                      ? 'text-navy after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-accent after:content-[""]'
                      : 'text-body hover:text-navy',
                  )}
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {services.map((s, i) => (
        <ServiceSection key={s.id} service={s} index={i} />
      ))}
    </>
  )
}

const visuals = [
  { icon: 'headset', tone: 'navy', label: 'Service desk engineers at work', note: { value: '< 15 min', label: 'Critical response' } },
  { icon: 'compass', tone: 'tint', label: 'Consultants in a client workshop', note: { value: '3–6 wks', label: 'Typical assessment' } },
  { icon: 'graduation', tone: 'navy', label: 'Classroom training session', note: { value: '92%', label: 'First-time pass rate' } },
] as const // TODO(client): confirm the figures in these notes

function ServiceSection({ service: s, index }: { service: Service; index: number }) {
  const reversed = index % 2 === 1
  const v = visuals[index % visuals.length]
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className={cn('section scroll-mt-14 focus:outline-none', reversed ? 'bg-mist' : 'bg-white')}>
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className={cn('lg:col-span-6', reversed ? 'lg:order-2 lg:col-start-7' : 'lg:pr-8')}>
          <div className="flex items-center gap-4">
            <HexIcon icon={s.icon} size={48} />
            <Eyebrow className="mb-0">{s.eyebrow}</Eyebrow>
          </div>
          <h2 id={`${s.id}-title`} className="h2 mt-6">
            {s.heading}
          </h2>
          <p className="mt-5 max-w-prose">{s.body}</p>
          <ul className="mt-8 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {s.capabilities.map((c) => (
              <li key={c} className="flex gap-3 text-[0.9375rem] leading-[1.55]">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-tint text-cobalt">
                  <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                </span>
                <span className="text-navy/90">{c}</span>
              </li>
            ))}
          </ul>
          <PillStats items={s.stats} compact className="mt-9" />
          <div className="mt-9">
            <Button to={`/contact?topic=${encodeURIComponent(s.name)}`} iconRight={<ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />}>
              Enquire about {s.name.replace(' Services', '').replace(' Solutions', '')}
            </Button>
          </div>
        </Reveal>

        <Reveal className={cn('relative lg:col-span-5', reversed ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8')} delay={0.08}>
          {/* TODO: replace with client photo */}
          <Placeholder icon={v.icon} tone={v.tone} label={v.label} className="aspect-[4/5] w-full sm:aspect-[4/3] lg:aspect-[4/5]" />
          <div
            className={cn(
              'absolute -bottom-6 rounded-card border border-line bg-white px-5 py-4 shadow-lift',
              reversed ? 'right-4 sm:-right-6' : 'left-4 sm:-left-6',
            )}
          >
            <p className="font-heading text-[1.5rem] font-bold leading-none tracking-heading text-navy">{v.note.value}</p>
            <p className="mt-1.5 text-meta text-body">{v.note.label}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
