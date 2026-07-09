import type {ReactNode} from 'react'
import {useNavigate, useLocation} from '@remix-run/react'
import {queueSectionScroll, scrollToSection} from '~/utils/scroll'

type SectionLinkProps = {
  sectionId: string
  children: ReactNode
  className?: string
  onNavigate?: () => void
}

/** Scrolls to a homepage section without leaving a hash in the URL. */
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

        queueSectionScroll(sectionId)
        navigate('/')
      }}
    >
      {children}
    </a>
  )
}
