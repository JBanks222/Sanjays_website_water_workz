import {useEffect} from 'react'
import {useLocation} from '@remix-run/react'
import {scrollToSection, takeQueuedSectionScroll} from '~/utils/scroll'

/** Keeps fresh page loads at the hero; in-app section links scroll via sessionStorage. */
export default function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/detailing') {
      if (location.hash) {
        const sectionId = decodeURIComponent(location.hash.slice(1))
        const timer = window.setTimeout(() => scrollToSection(sectionId), 100)
        return () => window.clearTimeout(timer)
      }

      window.scrollTo({top: 0, left: 0, behavior: 'auto'})
      return
    }

    if (location.pathname !== '/') {
      window.scrollTo({top: 0, left: 0, behavior: 'auto'})
      return
    }

    const queuedSection = takeQueuedSectionScroll()
    if (queuedSection) {
      const timer = window.setTimeout(() => scrollToSection(queuedSection), 150)
      return () => window.clearTimeout(timer)
    }

    if (location.hash) {
      window.history.replaceState(null, '', location.pathname + location.search)
    }

    window.scrollTo({top: 0, left: 0, behavior: 'auto'})
  }, [location.pathname, location.key])

  return null
}
