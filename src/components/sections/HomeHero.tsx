import { ArrowRight } from 'lucide-react'
import { Button, Eyebrow, HighlightTag, PillStats } from '@/components/ui'
import { Globe } from '@/components/visuals/Globe'
import { WaveDivider } from '@/components/visuals/WaveDivider'
import { home } from '@/data/site'

export function HomeHero() {
  const { hero } = home
  return (
    <section className="relative overflow-hidden bg-mist pb-28 pt-12 sm:pb-32 lg:pb-36 lg:pt-16">
      <div className="container-site relative grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6 lg:pr-4">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="h1">
            {hero.titleBefore} <HighlightTag>{hero.titleHighlight}</HighlightTag> {hero.titleAfter}
          </h1>
          <p className="lead mt-6 max-w-[34rem]">{hero.subcopy}</p>
          <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row">
            <Button to={hero.primaryCta.to} size="lg" iconRight={<ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />}>
              {hero.primaryCta.label}
            </Button>
            <Button to={hero.secondaryCta.to} size="lg" variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>
          <PillStats items={hero.stats} className="mt-10 w-full sm:w-auto lg:mt-12" />
        </div>
        <div className="mx-auto w-full max-w-[520px] lg:col-span-6 lg:max-w-none">
          <Globe className="h-auto w-full" />
        </div>
      </div>
      <WaveDivider />
    </section>
  )
}
