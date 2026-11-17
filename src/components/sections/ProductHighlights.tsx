import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, IconTile, Reveal, SectionHeader } from '@/components/ui'
import { products } from '@/data/products'
import { home } from '@/data/site'
import { icons } from '@/lib/icons'
import { ProductEnquiry } from './ProductEnquiry'

const enquireLink = 'link-arrow'

/** One featured product (large, navy panel) beside two compact ones. */
export function ProductHighlights() {
  const [featured, ...rest] = products.slice(0, 3)
  const FeaturedIcon = icons[featured.icon]

  return (
    <section className="section" aria-labelledby="products-title">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader id="products-title" eyebrow={home.products.eyebrow} title={home.products.title} intro={home.products.intro} />
          <Link to="/products" className="link-arrow shrink-0">
            All products
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Card as="article" className="grid h-full overflow-hidden sm:grid-cols-[1fr_1.05fr]">
              <div className="relative flex min-h-[220px] items-center justify-center bg-tint">
                {/* TODO: replace with a product screenshot */}
                <svg viewBox="0 0 240 180" className="w-[78%]" aria-hidden>
                  <rect x="10" y="10" width="220" height="160" rx="10" fill="#fff" stroke="#D6E5F8" />
                  <rect x="10" y="10" width="220" height="26" rx="10" fill="#0A1F4D" />
                  <rect x="10" y="26" width="220" height="10" fill="#0A1F4D" />
                  <circle cx="26" cy="23" r="3.5" fill="#F28C1B" />
                  <rect x="24" y="50" width="70" height="8" rx="4" fill="#0A1F4D" fillOpacity=".8" />
                  <rect x="24" y="66" width="110" height="6" rx="3" fill="#94A3B8" fillOpacity=".5" />
                  {[0, 1, 2, 3].map((i) => (
                    <g key={i} transform={`translate(24 ${86 + i * 18})`}>
                      <rect width="192" height="12" rx="3" fill={i === 1 ? '#EAF2FC' : '#F5F9FE'} />
                      <circle cx="8" cy="6" r="3" fill={i === 1 ? '#F28C1B' : '#1E5BB8'} fillOpacity={i === 1 ? 1 : 0.5} />
                      <rect x="18" y="4" width={60 + i * 14} height="4" rx="2" fill="#0A1F4D" fillOpacity=".55" />
                      <rect x="160" y="3" width="24" height="6" rx="3" fill="#1E5BB8" fillOpacity=".25" />
                    </g>
                  ))}
                </svg>
              </div>
              <div className="flex flex-col p-7 lg:p-9">
                <span className="inline-flex items-center gap-2 font-heading text-[0.8125rem] font-semibold text-body">
                  <FeaturedIcon className="h-4 w-4 text-cobalt" strokeWidth={1.5} aria-hidden />
                  {featured.category}
                </span>
                <h3 className="h3 mt-3">{featured.name}</h3>
                <p className="mt-3 text-[0.9375rem]">{featured.description}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {featured.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[0.9375rem]">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-accent" strokeWidth={2} aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <ProductEnquiry product={featured}>
                  {(open) => (
                    <button type="button" onClick={open} className={`${enquireLink} mt-7 self-start`}>
                      Enquire about {featured.name}
                      <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    </button>
                  )}
                </ProductEnquiry>
              </div>
            </Card>
          </Reveal>

          <div className="grid gap-6 lg:col-span-5">
            {rest.map((p, i) => (
              <Reveal key={p.id} delay={(i + 1) * 0.06}>
                <Card as="article" className="flex h-full gap-5 p-7">
                  <IconTile icon={p.icon} />
                  <div className="flex flex-col">
                    <span className="font-heading text-[0.8125rem] font-semibold text-body">{p.category}</span>
                    <h3 className="mt-1 font-heading text-[1.125rem] font-semibold">{p.name}</h3>
                    <p className="mt-2 text-[0.9375rem]">{p.description}</p>
                    <ProductEnquiry product={p}>
                      {(open) => (
                        <button type="button" onClick={open} className={`${enquireLink} mt-5 self-start`}>
                          Enquire<span className="sr-only"> about {p.name}</span>
                          <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                        </button>
                      )}
                    </ProductEnquiry>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
