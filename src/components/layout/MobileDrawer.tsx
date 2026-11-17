import { AnimatePresence, m } from 'framer-motion'
import { ChevronDown, Mail, Phone, X } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui'
import { Wordmark } from '@/components/visuals/Wordmark'
import { company, navigation } from '@/data/site'
import { cn } from '@/lib/cn'
import { useFocusTrap } from '@/lib/useFocusTrap'

export function MobileDrawer({ open, onClose, id }: { open: boolean; onClose: () => void; id: string }) {
  return <AnimatePresence>{open && <DrawerPanel onClose={onClose} id={id} />}</AnimatePresence>
}

function DrawerPanel({ onClose, id }: { onClose: () => void; id: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const [expanded, setExpanded] = useState(location.pathname.startsWith('/services'))
  const subId = useId()
  useFocusTrap(ref, true, onClose)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex min-h-[52px] items-center border-b border-line font-heading text-[1rem] font-semibold',
      isActive ? 'text-navy' : 'text-navy/80',
    )

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      <m.div
        className="absolute inset-0 bg-navy-deep/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-hidden
      />
      <m.div
        ref={ref}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="absolute inset-y-0 right-0 flex w-[min(380px,88vw)] flex-col bg-white shadow-lift"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-line px-6">
          <Wordmark className="text-[1.375rem]" />
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-navy hover:bg-mist"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" strokeWidth={1.5} aria-hidden />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-2">
          <ul>
            {navigation.map((item) =>
              item.children ? (
                <li key={item.to}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={subId}
                    onClick={() => setExpanded((v) => !v)}
                    className="flex min-h-[52px] w-full items-center justify-between border-b border-line font-heading text-[1rem] font-semibold text-navy"
                  >
                    {item.label}
                    <ChevronDown className={cn('h-4 w-4 transition-transform', expanded && 'rotate-180')} strokeWidth={1.75} aria-hidden />
                  </button>
                  <ul id={subId} hidden={!expanded} className="border-b border-line bg-mist py-1.5 pl-4">
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <NavLink to={child.to} onClick={onClose} className="flex min-h-[44px] items-center text-[0.9375rem] text-body hover:text-navy">
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                    <li>
                      <NavLink to={item.to} end onClick={onClose} className="flex min-h-[44px] items-center text-[0.9375rem] font-medium text-navy">
                        All services
                      </NavLink>
                    </li>
                  </ul>
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === '/'} onClick={onClose} className={linkClass}>
                    {({ isActive }) => (
                      <>
                        {isActive && <span aria-hidden className="mr-3 h-4 w-0.5 rounded-full bg-accent" />}
                        {item.label}
                      </>
                    )}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="space-y-4 border-t border-line bg-mist px-6 py-6">
          <Button to="/contact" onClick={onClose} className="w-full">
            Contact Us
          </Button>
          <div className="space-y-2 text-[0.875rem]">
            <a href={`tel:${company.phoneHref}`} className="flex items-center gap-2.5 text-navy">
              <Phone className="h-4 w-4 text-cobalt" strokeWidth={1.5} aria-hidden />
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-2.5 text-navy">
              <Mail className="h-4 w-4 text-cobalt" strokeWidth={1.5} aria-hidden />
              {company.email}
            </a>
          </div>
        </div>
      </m.div>
    </div>
  )
}
