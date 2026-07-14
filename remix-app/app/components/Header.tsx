import {Link} from '@remix-run/react'
import {useState} from 'react'
import BookNowButton from '~/components/BookNowButton'
import SectionLink from '~/components/SectionLink'

const PAGE_LINKS = [
  {label: 'Home', href: '/'},
  {label: 'Detailing', href: '/detailing'},
  {label: 'Gallery', href: '/gallery'},
] as const

const SECTION_LINKS = [
  {label: 'Services', sectionId: 'services'},
  {label: 'About', sectionId: 'mission'},
  {label: 'Contact', sectionId: 'contact'},
] as const

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <Link
        className="site-header__logo"
        to="/"
        onClick={() => {
          closeMenu()
          window.scrollTo({top: 0, behavior: 'smooth'})
        }}
      >
        <img src="/images/logo-dark.png" alt="Water Werks Lab" />
      </Link>
      <button
        className="site-header__menu-btn"
        type="button"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`site-header__nav${menuOpen ? ' site-header__nav--open' : ''}`}>
        {PAGE_LINKS.map((link) => (
          <Link key={link.href} to={link.href} onClick={closeMenu}>
            {link.label}
          </Link>
        ))}
        {SECTION_LINKS.map((link) => (
          <SectionLink
            key={link.sectionId}
            sectionId={link.sectionId}
            className="site-header__section-link"
            onNavigate={closeMenu}
          >
            {link.label}
          </SectionLink>
        ))}
        <BookNowButton variant="header" />
      </nav>
    </header>
  )
}
