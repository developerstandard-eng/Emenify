import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, HexIcon, Reveal, SectionHeader } from '@/components/ui'
import { services } from '@/data/services'
import { home } from '@/data/site'

export function ServiceHighlights() {
  return (
    <section className="section bg-mist" aria-labelledby="services-title">
      <div className="container-site">
        <SectionHeader id="services-title" eyebrow={home.services.eyebrow} title={home.services.title} intro={home.services.intro} align="split" />
        <ol className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-16">
          {services.map((s, i) => (
            <li key={s.id}>
            <Reveal delay={i * 0.06} className="h-full">
              <Card as="article" interactive className="group relative flex h-full flex-col p-7 lg:p-8">
                <div className="flex items-start justify-between">
                  <HexIcon icon={s.icon} />
                  <span className="font-heading text-[0.8125rem] font-semibold tabular-nums text-body" aria-hidden>
                    0{i + 1}
                  </span>
                </div>
                <h3 className="h3 mt-7">{s.name}</h3>
                <p className="mt-3 flex-1 text-[0.9375rem]">{s.summary}</p>
                <Link to={`/services#${s.id}`} className="link-arrow mt-7 after:absolute after:inset-0 after:rounded-card after:content-['']">
                  Learn more<span className="sr-only"> about {s.name}</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </Link>
              </Card>
            </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
