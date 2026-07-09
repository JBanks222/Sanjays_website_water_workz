import {useEffect} from 'react'
import {useLocation} from '@remix-run/react'

/** Ensures fresh page loads start at the top; hash links scroll to the correct section. */
export default function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const sectionId = decodeURIComponent(location.hash.slice(1))
      const timer = window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({behavior: 'smooth', block: 'start'})
      }, 100)
      return () => window.clearTimeout(timer)
    }

    window.scrollTo({top: 0, left: 0, behavior: 'auto'})
  }, [location.pathname, location.hash, location.key])

  return null
}
