import { Check } from 'lucide-react'
import { PartnershipForm } from '@/components/forms/PartnershipForm'
import { PageHero } from '@/components/sections/PageHero'
import { Card, Eyebrow, IconTile, Reveal, SectionHeader } from '@/components/ui'
import { pageMeta, partnership } from '@/data/site'
import { useDocumentTitle } from '@/lib/useDocumentTitle'

export default function BusinessPartnership() {
  useDocumentTitle(pageMeta.partnership)
  const { hero, models, steps } = partnership

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} body={hero.body} nextFill="#F5F9FE" />

      <section className="bg-mist pb-16 pt-4 lg:pb-28" aria-labelledby="models-title">
        <div className="container-site">
          <SectionHeader id="models-title" eyebrow="Partnership models" title="Choose how you work with us" />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {models.map((m, i) => (
              <li key={m.name}>
                <Reveal delay={i * 0.06} className="h-full">
                  <Card as="article" className="flex h-full flex-col p-7 lg:p-8">
                    <IconTile icon={m.icon} />
                    <h3 className="h3 mt-6">{m.name}</h3>
                    <p className="mt-2 text-[0.9375rem]">{m.summary}</p>
                    <ul className="mt-6 space-y-3 border-t border-line pt-6">
                      {m.benefits.map((b) => (
                        <li key={b} className="flex gap-3 text-[0.9375rem] text-navy/90">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-accent" strokeWidth={2} aria-hidden />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="apply-title">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>How it works</Eyebrow>
              <h2 id="apply-title" className="h2">
                From first call to joint pipeline
              </h2>
              <ol className="mt-10 space-y-0">
                {steps.map((s, i) => (
                  <li key={s.title} className="relative grid grid-cols-[2.5rem_1fr] gap-x-5 pb-8 last:pb-0">
                    {i < steps.length - 1 && <span aria-hidden className="absolute bottom-0 left-5 top-10 w-px bg-line" />}
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white font-heading text-[0.875rem] font-bold text-navy shadow-soft">
                      {i + 1}
                    </span>
                    <div className="pt-2">
                      <h3 className="font-heading text-[1.0625rem] font-semibold">{s.title}</h3>
                      <p className="mt-1 text-[0.9375rem]">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Card className="p-6 sm:p-9 lg:p-10">
              <h2 className="text-[1.375rem] font-bold">Apply to become a partner</h2>
              <p className="mb-8 mt-2 text-[0.9375rem]">We reply to every application within two business days.</p>
              <PartnershipForm />
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
