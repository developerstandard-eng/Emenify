import { AboutIntro } from '@/components/sections/AboutIntro'
import { HomeHero } from '@/components/sections/HomeHero'
import { LogoStrip } from '@/components/sections/LogoStrip'
import { ProductHighlights } from '@/components/sections/ProductHighlights'
import { ServiceHighlights } from '@/components/sections/ServiceHighlights'
import { WhyUs } from '@/components/sections/WhyUs'
import { pageMeta } from '@/data/site'
import { useDocumentTitle } from '@/lib/useDocumentTitle'

export default function Home() {
  useDocumentTitle(pageMeta.home)
  return (
    <>
      <HomeHero />
      <AboutIntro />
      <ServiceHighlights />
      <ProductHighlights />
      <WhyUs />
      <LogoStrip />
      <div className="h-16 lg:h-24" aria-hidden />
    </>
  )
}
