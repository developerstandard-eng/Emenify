import { Check, Eye, Target } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Eyebrow, Reveal, SectionHeader } from '@/components/ui'
import { Placeholder } from '@/components/visuals/Placeholder'
import { about, pageMeta } from '@/data/site'
import { useDocumentTitle } from '@/lib/useDocumentTitle'

export default function About() {
  useDocumentTitle(pageMeta.about)
  const { hero, overview, mission, vision, approach, leadership } = about

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} body={hero.body} />

      {/* Overview: image left, text right */}
      <section className="section" aria-labelledby="overview-title">
        <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            {/* TODO: replace with client photo (team or office) */}
            <Placeholder icon="building" label="Emenify office" className="aspect-[4/3] w-full lg:aspect-[5/6]" />
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
            <Eyebrow>{overview.eyebrow}</Eyebrow>
            <h2 id="overview-title" className="h2">
              {overview.title}
            </h2>
            <div className="mt-6 space-y-4">
              {overview.body.map((p) => (
                <p key={p} className="max-w-prose">
                  {p}
                </p>
              ))}
            </div>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {overview.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 py-3.5 font-heading text-[0.9375rem] font-semibold text-navy">
                  <Check className="h-4 w-4 text-accent" strokeWidth={2.25} aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision: two contrasting panels */}
      <section className="pb-16 lg:pb-28" aria-label="Mission and vision">
        <div className="container-site grid gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-card bg-navy p-8 text-white sm:p-10 lg:p-12">
              <svg aria-hidden className="absolute -right-16 -top-16 h-56 w-56 text-white/[0.06]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-accent">
                <Target className="h-6 w-6" strokeWidth={1.5} aria-hidden />
              </span>
              <h2 className="mt-8 font-heading text-[0.875rem] font-semibold uppercase tracking-[0.1em] text-white/70">{mission.label}</h2>
              <p className="mt-3 font-heading text-[1.375rem] font-semibold leading-[1.4] tracking-heading text-white lg:text-[1.625rem]">{mission.text}</p>
            </div>
          </Reveal>
          <Reveal className="h-full" delay={0.08}>
            <div className="flex h-full flex-col rounded-card border border-line bg-tint p-8 sm:p-10 lg:p-12">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-cobalt shadow-soft">
                <Eye className="h-6 w-6" strokeWidth={1.5} aria-hidden />
              </span>
              <h2 className="mt-8 font-heading text-[0.875rem] font-semibold uppercase tracking-[0.1em] text-body">{vision.label}</h2>
              <p className="mt-3 font-heading text-[1.375rem] font-semibold leading-[1.4] tracking-heading text-navy lg:text-[1.625rem]">{vision.text}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Approach: numbered horizontal process */}
      <section className="section bg-mist" aria-labelledby="approach-title">
        <div className="container-site">
          <SectionHeader id="approach-title" eyebrow={approach.eyebrow} title={approach.title} />
          <ol className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
            <span aria-hidden className="absolute left-6 right-6 top-6 hidden h-px bg-line lg:block" />
            {approach.steps.map((step, i) => (
              <li key={step.title} className="relative">
                <Reveal delay={i * 0.06}>
                  <span className="relative grid h-12 w-12 place-items-center rounded-full border border-line bg-white font-heading text-[0.9375rem] font-bold text-navy shadow-soft">
                    {String(i + 1).padStart(2, '0')}
                    {i === 0 && <span aria-hidden className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-mist bg-accent" />}
                  </span>
                  <h3 className="h3 mt-6">{step.title}</h3>
                  <p className="mt-2 max-w-[32ch] text-[0.9375rem]">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Leadership: hidden when the array is empty */}
      {leadership.people.length > 0 && (
        <section className="section" aria-labelledby="leadership-title">
          <div className="container-site">
            <SectionHeader id="leadership-title" eyebrow={leadership.eyebrow} title={leadership.title} />
            <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
              {leadership.people.map((p, i) => (
                <li key={`${p.name}-${i}`}>
                  <Reveal delay={i * 0.05}>
                    {p.photo ? (
                      <img src={p.photo} alt={p.name} loading="lazy" className="aspect-[4/5] w-full rounded-card object-cover" />
                    ) : (
                      // TODO: replace with client photo
                      <Placeholder icon="users" tone={i % 2 ? 'tint' : 'navy'} label={`Portrait of ${p.role}`} className="aspect-[4/5] w-full" />
                    )}
                    <h3 className="mt-5 font-heading text-[1.0625rem] font-semibold">{p.name}</h3>
                    <p className="mt-1 text-[0.9375rem]">{p.role}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
