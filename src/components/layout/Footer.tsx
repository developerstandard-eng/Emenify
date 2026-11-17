import { ArrowRight, ArrowUp, Clock, Facebook, Linkedin, Mail, MapPin, Phone, Twitter, Youtube, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import { WaveDivider } from '@/components/visuals/WaveDivider'
import { Wordmark } from '@/components/visuals/Wordmark'
import { services } from '@/data/services'
import { company, ctaBand } from '@/data/site'

const socialIcons: Record<string, LucideIcon> = { LinkedIn: Linkedin, X: Twitter, Facebook, YouTube: Youtube }

const companyLinks = [
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Partners', to: '/partners' },
  { label: 'Business Partnership', to: '/business-partnership' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
]

const serviceLinks = [
  ...services.map((s) => ({ label: s.name, to: `/services#${s.id}` })),
  { label: 'Training Calendar', to: '/training-calendar' },
]

function FooterHeading({ children }: { children: string }) {
  return <h2 className="mb-5 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-white">{children}</h2>
}

const footerLink = 'text-[0.9375rem] text-white/70 transition-colors hover:text-white'

export function Footer({ showCta = true }: { showCta?: boolean }) {
  return (
    <footer className="relative">
      {showCta && <CtaBand />}
      <div className={showCta ? 'bg-navy pt-12 lg:pt-16' : 'bg-navy pt-16 lg:pt-20'}>
        <div className="container-site grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Wordmark dark />
            <p className="mt-5 max-w-[32ch] text-[0.9375rem] leading-body text-white/70">{company.tagline}</p>
            <ul className="mt-7 flex gap-2.5">
              {company.socials.map((s) => {
                const Icon = socialIcons[s.label]
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-accent hover:text-white"
                      aria-label={`${company.name} on ${s.label} (opens in a new tab)`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <nav aria-label="Company" className="lg:col-span-2">
            <FooterHeading>Company</FooterHeading>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={footerLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="lg:col-span-3">
            <FooterHeading>Services</FooterHeading>
            <ul className="space-y-3">
              {serviceLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={footerLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <FooterHeading>Contact</FooterHeading>
            <address className="space-y-4 not-italic">
              <p className="flex gap-3 text-[0.9375rem] text-white/70">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                <span>
                  {company.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
              <a href={`tel:${company.phoneHref}`} className={`flex items-center gap-3 ${footerLink}`}>
                <Phone className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className={`flex items-center gap-3 ${footerLink}`}>
                <Mail className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                {company.email}
              </a>
              <p className="flex items-center gap-3 text-[0.9375rem] text-white/70">
                <Clock className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                {company.hours}
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10 bg-navy-deep">
          <div className="container-site flex flex-col gap-4 py-6 text-[0.8125rem] text-white/60 sm:flex-row sm:items-center sm:justify-between">
            {/* TODO(client): add legal entity name / trade licence number if required */}
            <p>
              © {new Date().getFullYear()} {company.name}. All rights reserved.
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 self-start rounded text-white/70 transition-colors hover:text-white sm:self-auto"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

/** White card that overlaps the top edge of the navy footer. */
function CtaBand() {
  return (
    <div className="relative">
      <div aria-hidden className="absolute inset-x-0 bottom-0 top-1/2 bg-navy" />
      <div className="container-site relative">
        <div className="relative overflow-hidden rounded-card border border-line bg-white px-6 pb-20 pt-10 shadow-lift sm:px-10 sm:pb-24 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-14 lg:pb-[104px] lg:pt-12">
          <div className="max-w-[40rem]">
            <h2 className="text-[1.5rem] leading-[1.25] sm:text-[1.875rem]">{ctaBand.title}</h2>
            <p className="mt-3 text-body">{ctaBand.body}</p>
          </div>
          <Button
            to={ctaBand.cta.to}
            size="lg"
            className="mt-7 lg:mt-0 lg:shrink-0"
            iconRight={<ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />}
          >
            {ctaBand.cta.label}
          </Button>
          <WaveDivider fill="#F5F9FE" className="h-[48px] sm:h-[64px] lg:h-[72px]" />
        </div>
      </div>
    </div>
  )
}
