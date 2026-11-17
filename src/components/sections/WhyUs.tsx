import { animate, useInView, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Eyebrow, Reveal } from '@/components/ui'
import { home, type Counter } from '@/data/site'

function formatValue(value: number, decimals: number) {
  return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

/** Counts up once when first visible. Screen readers get the final value only. */
function CountUp({ value, prefix = '', suffix = '' }: Counter) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const decimals = Number.isInteger(value) ? 0 : 1
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: setDisplay })
    return () => controls.stop()
  }, [inView, reduce, value])

  return (
    <span ref={ref}>
      <span aria-hidden>
        {prefix}
        {formatValue(display, decimals)}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {formatValue(value, decimals)}
        {suffix}
      </span>
    </span>
  )
}

/** The page's one dark section. */
export function WhyUs() {
  const { why } = home
  return (
    <section className="section bg-navy-deep text-white" aria-labelledby="why-title">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <Eyebrow dark>{why.eyebrow}</Eyebrow>
          <h2 id="why-title" className="h2 text-white">
            {why.title}
          </h2>
          <ul className="mt-8 space-y-4">
            {why.reasons.map((r) => (
              <li key={r} className="flex gap-3.5 text-white/80">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-navy-deep">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                </span>
                {r}
              </li>
            ))}
          </ul>
        </Reveal>

        <dl className="grid grid-cols-2 gap-px self-center overflow-hidden rounded-card bg-white/10 lg:col-span-6 lg:col-start-7">
          {why.counters.map((c) => (
            <div key={c.label} className="flex flex-col-reverse bg-navy-deep p-6 sm:p-8">
              <dt className="mt-2 text-[0.875rem] text-white/70 sm:text-[0.9375rem]">{c.label}</dt>
              <dd className="font-heading text-[2rem] font-bold leading-none tracking-heading text-white sm:text-[2.75rem]">
                <CountUp {...c} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
