import type {ReactNode} from 'react'
import {useNavigate, useLocation} from '@remix-run/react'
import {scrollToSection} from '~/utils/scroll'

type SectionLinkProps = {
  sectionId: string
  children: ReactNode
  className?: string
  onNavigate?: () => void
}

/** Scrolls to a homepage section without hash URLs or persisted scroll queues. */
export default function SectionLink({
  sectionId,
  children,
  className,
  onNavigate,
}: SectionLinkProps) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <a
      href={`/#${sectionId}`}
      className={className}
      onClick={(event) => {
        event.preventDefault()
        onNavigate?.()

        if (location.pathname === '/') {
          scrollToSection(sectionId)
          return
        }

        navigate('/', {state: {scrollTo: sectionId}})
      }}
    >
      {children}
    </a>
  )
}
