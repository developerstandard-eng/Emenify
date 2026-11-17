import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '@/components/sections/PageHero'
import { Reveal } from '@/components/ui'
import { PartnerLogo } from '@/components/visuals/PartnerLogo'
import { partners } from '@/data/partners'
import { pageMeta } from '@/data/site'
import { useDocumentTitle } from '@/lib/useDocumentTitle'

export default function Partners() {
  useDocumentTitle(pageMeta.partners)
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="The technology vendors behind our services"
        body="We hold partner status and certified engineers with each vendor below. That means direct escalation paths and licensing at partner rates for our clients."
      >
        <Link to="/business-partnership" className="link-arrow mt-8">
          Become a business partner
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </Link>
      </PageHero>

      <section className="pb-16 lg:pb-28" aria-label="Partner list">
        <div className="container-site">
          <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p, i) => (
              <li key={p.id} className="bg-white">
                <Reveal delay={(i % 4) * 0.04} className="h-full">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group relative flex h-full flex-col p-7 transition-colors hover:bg-mist focus-visible:bg-mist lg:p-8"
                  >
                    <span className="flex h-16 items-center">
                      <PartnerLogo partner={p} className="h-8" />
                    </span>
                    <span className="mt-6 font-heading text-[1rem] font-semibold text-navy">{p.name}</span>
                    <span className="mt-1 text-[0.875rem] text-body">{p.description}</span>
                    <span className="sr-only"> (opens partner website in a new tab)</span>
                    <ArrowUpRight
                      className="absolute right-6 top-6 h-4 w-4 text-muted transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
