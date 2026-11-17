import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to top on route change, or to the hash target if there is one.
 * Routes are lazy-loaded, so the target may not exist yet; poll briefly for it.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let tries = 0
    const tick = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
        // Move keyboard focus to the target section without scrolling again.
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
        el.focus({ preventScroll: true })
        return
      }
      if (tries++ < 120) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  return null
}
