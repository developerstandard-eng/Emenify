import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion'
import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'

// Every route is its own chunk.
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))
const Products = lazy(() => import('@/pages/Products'))
const BusinessPartnership = lazy(() => import('@/pages/BusinessPartnership'))
const TrainingCalendar = lazy(() => import('@/pages/TrainingCalendar'))
const Partners = lazy(() => import('@/pages/Partners'))
const Careers = lazy(() => import('@/pages/Careers'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="products" element={<Products />} />
            <Route path="business-partnership" element={<BusinessPartnership />} />
            <Route path="training-calendar" element={<TrainingCalendar />} />
            <Route path="partners" element={<Partners />} />
            <Route path="careers" element={<Careers />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </MotionConfig>
    </LazyMotion>
  )
}
