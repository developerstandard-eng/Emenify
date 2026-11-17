import { products } from '@/data/products'
import { services } from '@/data/services'

/** Options for the General Enquiry "topic" select. Product enquiries use `Product: <name>`. */
export const enquiryTopics = [
  ...services.map((s) => s.name),
  ...products.map((p) => `Product: ${p.name}`),
  'Partnership',
  'Something else',
].map((t) => ({ value: t, label: t }))
