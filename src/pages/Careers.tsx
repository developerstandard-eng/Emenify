import { Briefcase, Clock, MapPin } from 'lucide-react'
import { useRef, useState } from 'react'
import { CareersForm } from '@/components/forms/CareersForm'
import { PageHero } from '@/components/sections/PageHero'
import { Button, Card, HexIcon, Reveal, SectionHeader } from '@/components/ui'
import { jobs } from '@/data/jobs'
import { careers, company, pageMeta } from '@/data/site'
import { useDocumentTitle } from '@/lib/useDocumentTitle'

export default function Careers() {
  useDocumentTitle(pageMeta.careers)
  const [position, setPosition] = useState('')
  const formRef = useRef<HTMLDivElement>(null)

  const apply = (title: string) => {
    setPosition(title)
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    formRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
    formRef.current?.focus({ preventScroll: true })
  }

  return (
    <>
      <PageHero eyebrow={careers.hero.eyebrow} title={careers.hero.title} body={careers.hero.body} />

      <section className="pb-16 lg:pb-28" aria-labelledby="values-title">
        <div className="container-site">
          <SectionHeader id="values-title" eyebrow="Why work with us" title="What you can expect" />
          <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {careers.values.map((v, i) => (
              <li key={v.title}>
                <Reveal delay={i * 0.05}>
                  <HexIcon icon={v.icon} size={52} />
                  <h3 className="mt-5 font-heading text-[1.0625rem] font-semibold">{v.title}</h3>
                  <p className="mt-2 text-[0.9375rem]">{v.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-mist" aria-labelledby="openings-title">
        <div className="container-site">
          <SectionHeader id="openings-title" eyebrow="Open positions" title={`${jobs.length} roles open now`} />
          {jobs.length ? (
            <ul className="mt-10 overflow-hidden rounded-card border border-line bg-white shadow-soft">
              {jobs.map((j) => (
                <li key={j.id} className="grid gap-5 border-b border-line p-6 last:border-b-0 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-8">
                  <div className="lg:col-span-5">
                    <p className="font-heading text-[0.8125rem] font-semibold text-body">{j.team}</p>
                    <h3 className="mt-1 font-heading text-[1.1875rem] font-semibold">{j.title}</h3>
                    <p className="mt-2 text-[0.9375rem]">{j.description}</p>
                  </div>
                  <dl className="flex flex-wrap gap-x-6 gap-y-2 text-[0.875rem] text-navy lg:col-span-5 lg:flex-col lg:gap-2.5 xl:flex-row xl:gap-x-6">
                    <div className="flex items-center gap-2">
                      <dt className="sr-only">Location</dt>
                      <MapPin className="h-4 w-4 text-cobalt" strokeWidth={1.5} aria-hidden />
                      <dd>{j.location}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <dt className="sr-only">Experience</dt>
                      <Clock className="h-4 w-4 text-cobalt" strokeWidth={1.5} aria-hidden />
                      <dd>{j.experience}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <dt className="sr-only">Contract</dt>
                      <Briefcase className="h-4 w-4 text-cobalt" strokeWidth={1.5} aria-hidden />
                      <dd>{j.type}</dd>
                    </div>
                  </dl>
                  <div className="lg:col-span-2 lg:text-right">
                    <Button size="sm" variant="secondary" onClick={() => apply(j.title)}>
                      Apply<span className="sr-only"> for {j.title}</span>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 max-w-prose">There are no open positions right now. You are welcome to send an open application below.</p>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="apply-title">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeader id="apply-title" eyebrow="Apply" title="Send your application" />
            <p className="mt-5 max-w-prose">
              Choose a role, attach your CV and tell us briefly why it interests you. We read every application.
            </p>
            <p className="mt-4 text-[0.9375rem]">
              Questions? Email{' '}
              <a href={`mailto:${company.email}`} className="font-medium text-navy underline decoration-accent decoration-2 underline-offset-4 hover:text-cobalt">
                {company.email}
              </a>
              .
            </p>
          </div>
          <div ref={formRef} tabIndex={-1} className="scroll-mt-28 focus:outline-none lg:col-span-7 lg:col-start-6">
            <Card className="p-6 sm:p-9 lg:p-10">
              <CareersForm position={position} />
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
