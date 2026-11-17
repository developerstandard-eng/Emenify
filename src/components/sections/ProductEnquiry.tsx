import { lazy, Suspense, useState, type ReactNode } from 'react'
import { Modal } from '@/components/ui'
import type { Product } from '@/data/products'

// The form chunk (react-hook-form + zod) loads only when someone opens an enquiry.
const GeneralEnquiryForm = lazy(() => import('@/components/forms/GeneralEnquiryForm').then((m) => ({ default: m.GeneralEnquiryForm })))

/** Renders a trigger and the product enquiry modal with the General Enquiry form prefilled. */
export function ProductEnquiry({ product, children }: { product: Product; children: (open: () => void) => ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      {children(() => setOpen(true))}
      <Modal open={open} onClose={() => setOpen(false)} title={`Enquire about ${product.name}`} description={product.category}>
        <Suspense fallback={<div className="h-[420px]" aria-busy="true" />}>
          <GeneralEnquiryForm defaultTopic={`Product: ${product.name}`} />
        </Suspense>
      </Modal>
    </>
  )
}
