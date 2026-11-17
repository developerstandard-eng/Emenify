import { Menu } from 'lucide-react'
import { useCallback, useEffect, useId, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui'
import { Wordmark } from '@/components/visuals/Wordmark'
import { navigation } from '@/data/site'
import { cn } from '@/lib/cn'
import { MobileDrawer } from './MobileDrawer'
import { ServicesDropdown } from './ServicesDropdown'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerId = useId()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setDrawerOpen(false), [location.pathname])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 h-[72px] border-b bg-white/95 backdrop-blur-[6px] transition-[border-color,box-shadow] duration-200',
        scrolled ? 'border-line shadow-[0_1px_2px_rgba(10,31,77,.04)]' : 'border-transparent',
      )}
    >
      <div className="container-site flex h-full items-center justify-between gap-8">
        <Link to="/" className="-m-1 rounded p-1" aria-label="Emenify, home">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {navigation.map((item) => (
              <li key={item.to}>
                {item.children ? (
                  <ServicesDropdown item={item} />
                ) : (
                  <NavLink to={item.to} end={item.to === '/'} className={({ isActive }) => cn('nav-link', isActive && 'nav-link-active')}>
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button to="/contact" size="sm" className="hidden sm:inline-flex">
            Contact Us
          </Button>
          <button
            type="button"
            className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-navy transition-colors hover:bg-mist xl:hidden"
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            aria-controls={drawerId}
            onClick={() => setDrawerOpen(true)}
          >
            <Menu className="h-6 w-6" strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      </div>
      <MobileDrawer open={drawerOpen} onClose={closeDrawer} id={drawerId} />
    </header>
  )
}
