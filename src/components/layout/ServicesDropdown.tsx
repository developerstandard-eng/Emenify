import { ArrowRight, ChevronDown } from 'lucide-react'
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { NavItem } from '@/data/site'
import { services } from '@/data/services'
import { cn } from '@/lib/cn'
import { icons } from '@/lib/icons'

/**
 * Disclosure-style dropdown (button + list of links), per the WAI-ARIA disclosure navigation pattern.
 * Opens on click, hover or ArrowDown; Arrow keys move between links; Escape closes and returns focus.
 */
export function ServicesDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const menuId = useId()
  const wrapRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<number>()
  const active = location.pathname.startsWith(item.to)

  useEffect(() => setOpen(false), [location.key])

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const links = () => Array.from(wrapRef.current?.querySelectorAll<HTMLAnchorElement>('[data-menu-link]') ?? [])

  const onButtonKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      requestAnimationFrame(() => links()[0]?.focus())
    }
  }

  const onMenuKey = (e: KeyboardEvent) => {
    const items = links()
    const i = items.indexOf(document.activeElement as HTMLAnchorElement)
    if (e.key === 'Escape') {
      setOpen(false)
      buttonRef.current?.focus()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      items[(i + 1) % items.length]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      items[(i - 1 + items.length) % items.length]?.focus()
    } else if (e.key === 'Home') {
      e.preventDefault()
      items[0]?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      items[items.length - 1]?.focus()
    }
  }

  return (
    // Mouse and key handlers here only coordinate the native button and links inside; the wrapper itself is not a control.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        window.clearTimeout(closeTimer.current)
        setOpen(true)
      }}
      onMouseLeave={() => {
        closeTimer.current = window.setTimeout(() => setOpen(false), 150)
      }}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          setOpen(false)
          buttonRef.current?.focus()
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onButtonKey}
        className={cn('nav-link inline-flex items-center gap-1', active && 'nav-link-active')}
      >
        {item.label}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')} strokeWidth={2} aria-hidden />
      </button>

      {/* Arrow-key navigation between the native links inside. */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        id={menuId}
        hidden={!open}
        onKeyDown={onMenuKey}
        className="absolute left-1/2 top-full z-50 w-[420px] -translate-x-1/2 pt-5"
      >
        <div className="overflow-hidden rounded-card border border-line bg-white shadow-lift">
          <ul className="p-2">
            {item.children?.map((child, i) => {
              const Icon = icons[services[i]?.icon ?? 'layers']
              return (
                <li key={child.to}>
                  <Link
                    to={child.to}
                    data-menu-link
                    className="group flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-mist focus-visible:bg-mist"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-tint text-navy">
                      <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                    </span>
                    <span>
                      <span className="block font-heading text-[0.9375rem] font-semibold text-navy">{child.label}</span>
                      <span className="mt-0.5 block text-meta text-body">{child.description}</span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <Link
            to={item.to}
            data-menu-link
            className="flex items-center justify-between border-t border-line bg-mist px-5 py-3.5 font-heading text-[0.875rem] font-semibold text-navy transition-colors hover:text-cobalt"
          >
            All services
            <ArrowRight className="h-4 w-4 text-accent" strokeWidth={1.75} aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  )
}
