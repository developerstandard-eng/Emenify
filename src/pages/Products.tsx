import { Check, Minus } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { ProductEnquiry } from '@/components/sections/ProductEnquiry'
import { Button, Card, Reveal, SectionHeader } from '@/components/ui'
import { products, productsIntro, type Product } from '@/data/products'
import { pageMeta } from '@/data/site'
import { icons } from '@/lib/icons'
import { useDocumentTitle } from '@/lib/useDocumentTitle'

// TODO(client): confirm which capabilities each product includes
const comparison: { label: string; includes: string[] }[] = [
  { label: 'Managed by Emenify engineers', includes: ['service-desk', 'monitor', 'learn', 'backup'] },
  { label: 'Cloud or on-premise deployment', includes: ['service-desk', 'monitor', 'learn'] },
  { label: 'SLA and compliance reporting', includes: ['service-desk', 'monitor', 'backup'] },
  { label: 'Single sign-on (Microsoft Entra ID)', includes: ['service-desk', 'learn'] },
  { label: 'Arabic interface', includes: ['service-desk', 'learn'] },
]

function ProductVisual({ product, index }: { product: Product; index: number }) {
  const Icon = icons[product.icon]
  // TODO: replace with product screenshot
  return (
    <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-t-card bg-tint">
      <svg aria-hidden className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 180">
        <g stroke="#1E5BB8" strokeOpacity=".1" fill="none">
          {Array.from({ length: 6 }, (_, i) => (
            <circle key={i} cx={index % 2 ? 330 : 70} cy="150" r={30 + i * 34} />
          ))}
        </g>
      </svg>
      <span className="relative grid h-[72px] w-[72px] place-items-center rounded-2xl bg-white text-navy shadow-soft">
        <Icon className="h-8 w-8" strokeWidth={1.5} aria-hidden />
        <span aria-hidden className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-[3px] border-tint bg-accent" />
      </span>
    </div>
  )
}

export default function Products() {
  useDocumentTitle(pageMeta.products)
  return (
    <>
      <PageHero eyebrow={productsIntro.eyebrow} title={productsIntro.title} body={productsIntro.body} nextFill="#F5F9FE" />

      <section className="bg-mist pb-16 pt-4 lg:pb-28" aria-label="Product list">
        <div className="container-site">
          <ul className="grid gap-6 md:grid-cols-2">
            {products.map((p, i) => (
              <li key={p.id} id={p.id}>
                <Reveal delay={(i % 2) * 0.06} className="h-full">
                  <Card as="article" className="flex h-full flex-col">
                    <ProductVisual product={p} index={i} />
                    <div className="flex flex-1 flex-col p-7 lg:p-9">
                      <p className="font-heading text-[0.8125rem] font-semibold text-body">{p.category}</p>
                      <h2 className="mt-1.5 text-[1.5rem] font-bold">{p.name}</h2>
                      <p className="mt-3">{p.description}</p>
                      <h3 className="sr-only">Key features</h3>
                      <ul className="mt-6 flex-1 divide-y divide-line border-t border-line">
                        {p.features.map((f) => (
                          <li key={f} className="flex gap-3 py-3 text-[0.9375rem] text-navy/90">
                            <Check className="mt-1 h-4 w-4 shrink-0 text-accent" strokeWidth={2} aria-hidden />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <ProductEnquiry product={p}>
                        {(open) => (
                          <Button onClick={open} size="sm" className="mt-7 self-start">
                            Enquire<span className="sr-only"> about {p.name}</span>
                          </Button>
                        )}
                      </ProductEnquiry>
                    </div>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="compare-title">
        <div className="container-site">
          <SectionHeader id="compare-title" eyebrow="Compare" title="Which product fits your team" />
          <div className="mt-10 overflow-x-auto rounded-card border border-line lg:mt-12">
            <table className="w-full min-w-[640px] border-collapse text-left text-[0.9375rem]">
              <caption className="sr-only">Capabilities included in each product</caption>
              <thead>
                <tr className="bg-mist">
                  <th scope="col" className="w-[34%] px-6 py-4 font-heading text-[0.8125rem] font-semibold text-body">
                    Capability
                  </th>
                  {products.map((p) => (
                    <th key={p.id} scope="col" className="px-4 py-4 text-center font-heading text-[0.875rem] font-semibold text-navy">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-t border-line">
                    <th scope="row" className="px-6 py-4 font-normal text-navy">
                      {row.label}
                    </th>
                    {products.map((p) => {
                      const yes = row.includes.includes(p.id)
                      return (
                        <td key={p.id} className="px-4 py-4 text-center">
                          {yes ? (
                            <Check className="mx-auto h-5 w-5 text-cobalt" strokeWidth={2} aria-hidden />
                          ) : (
                            <Minus className="mx-auto h-4 w-4 text-muted" strokeWidth={1.5} aria-hidden />
                          )}
                          <span className="sr-only">{yes ? 'Included' : 'Not included'}</span>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
