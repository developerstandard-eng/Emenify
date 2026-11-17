import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { GeneralEnquiryForm } from '@/components/forms/GeneralEnquiryForm'
import { enquiryTopics } from '@/lib/enquiryTopics'
import { PageHero } from '@/components/sections/PageHero'
import { Card } from '@/components/ui'
import { company, pageMeta } from '@/data/site'
import { useDocumentTitle } from '@/lib/useDocumentTitle'

export default function Contact() {
  useDocumentTitle(pageMeta.contact)
  const [params] = useSearchParams()
  const requested = params.get('topic') ?? ''
  const topic = enquiryTopics.some((t) => t.value === requested) ? requested : ''

  const details = [
    { icon: Phone, label: 'Phone', value: company.phone, href: `tel:${company.phoneHref}` },
    { icon: Mail, label: 'Email', value: company.email, href: `mailto:${company.email}` },
    { icon: MapPin, label: 'Office', value: company.address.join(', ') },
    { icon: Clock, label: 'Hours', value: company.hours },
  ]

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to a specialist"
        body="Questions about support contracts, consulting projects, training or products. We reply within one business day."
      />
      <section className="pb-16 lg:pb-28" aria-label="Contact details and enquiry form">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <dl className="divide-y divide-line border-y border-line">
              {details.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-4 py-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-tint text-navy">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <div>
                    <dt className="font-heading text-[0.8125rem] font-semibold text-body">{label}</dt>
                    <dd className="mt-0.5 text-navy">
                      {href ? (
                        <a href={href} className="hover:text-cobalt hover:underline">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[0.9375rem]">Existing clients with an urgent incident should call the service desk rather than use this form.</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Card className="p-6 sm:p-9 lg:p-10">
              <h2 className="text-[1.375rem] font-bold">Send an enquiry</h2>
              <p className="mb-8 mt-2 text-[0.9375rem]">All fields are reviewed by a person, not a bot.</p>
              <GeneralEnquiryForm key={topic} defaultTopic={topic} />
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
