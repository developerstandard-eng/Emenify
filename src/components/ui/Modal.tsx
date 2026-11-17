import { AnimatePresence, m } from 'framer-motion'
import { X } from 'lucide-react'
import { useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useFocusTrap } from '@/lib/useFocusTrap'

interface Props {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
}

export function Modal({ open, onClose, title, description, children }: Props) {
  return createPortal(
    <AnimatePresence>{open && <ModalPanel onClose={onClose} title={title} description={description}>{children}</ModalPanel>}</AnimatePresence>,
    document.body,
  )
}

function ModalPanel({ onClose, title, description, children }: Omit<Props, 'open'>) {
  const ref = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const descId = useId()
  useFocusTrap(ref, true, onClose)

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <m.div
        className="absolute inset-0 bg-navy-deep/55"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-hidden
      />
      <m.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-lift sm:max-w-[640px] sm:rounded-card"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div className="flex items-start justify-between gap-6 border-b border-line px-6 py-5 sm:px-8">
          <div>
            <h2 id={titleId} className="text-[1.25rem] font-bold leading-tight">
              {title}
            </h2>
            {description && (
              <p id={descId} className="mt-1 text-[0.875rem] text-body">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 grid h-10 w-10 shrink-0 place-items-center rounded-full text-body transition-colors hover:bg-mist hover:text-navy"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" strokeWidth={1.5} aria-hidden />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-7">{children}</div>
      </m.div>
    </div>
  )
}
