import {useLayoutEffect} from 'react'
import {useLocation} from '@remix-run/react'
import {
  clearQueuedSectionScroll,
  isHomeScrollState,
  scrollToSection,
  scrollToTop,
} from '~/utils/scroll'

/** Controls scroll on navigation — prevents jumps to footer/contact on load. */
export default function ScrollManager() {
  const location = useLocation()

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useLayoutEffect(() => {
    clearQueuedSectionScroll()

    if (location.pathname === '/detailing') {
      if (location.hash) {
        const sectionId = decodeURIComponent(location.hash.slice(1))
        requestAnimationFrame(() => scrollToSection(sectionId))
        return
      }

      scrollToTop()
      return
    }

    if (location.pathname === '/') {
      const scrollTarget = isHomeScrollState(location.state) ? location.state.scrollTo : undefined

      if (scrollTarget) {
        requestAnimationFrame(() => scrollToSection(scrollTarget))
        return
      }

      if (location.hash) {
        window.history.replaceState(location.state, '', location.pathname + location.search)
      }

      scrollToTop()
      return
    }

    scrollToTop()
  }, [location.pathname, location.hash, location.key, location.state])

  return null
}
