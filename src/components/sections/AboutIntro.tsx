import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Eyebrow, Reveal } from '@/components/ui'
import { home } from '@/data/site'

export function AboutIntro() {
  const { about } = home
  return (
    <section className="section" aria-labelledby="about-intro-title">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-6">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2 id="about-intro-title" className="h2">
            {about.title}
          </h2>
          <div className="mt-6 space-y-4">
            {about.body.map((p) => (
              <p key={p} className="max-w-prose">
                {p}
              </p>
            ))}
          </div>
          <Link to="/about" className="link-arrow mt-8">
            More about Emenify
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </Link>
        </Reveal>

        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
          <dl className="divide-y divide-line border-y border-line">
            {about.facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[6.5rem_1fr] gap-x-6 py-6 sm:grid-cols-[8rem_1fr]">
                <dt className="col-start-2 row-start-1 self-end font-heading text-[0.9375rem] font-semibold text-navy">{f.label}</dt>
                <dd className="col-start-1 row-span-2 row-start-1 self-center font-heading text-[2.25rem] font-bold leading-none tracking-heading text-navy sm:text-[2.75rem]">
                  {f.value}
                </dd>
                <dd className="col-start-2 mt-1 text-[0.9375rem] text-body">{f.detail}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
