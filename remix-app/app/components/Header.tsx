import {Link} from '@remix-run/react'
import {useState} from 'react'

const NAV_LINKS = [
  {label: 'Home', href: '/'},
  {label: 'Services', href: '/#services'},
  {label: 'About', href: '/#mission'},
  {label: 'Contact', href: '/#contact'},
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <Link className="site-header__logo" to="/" onClick={() => setMenuOpen(false)}>
        <img src="/images/logo-dark.png" alt="Water Werkz LI" />
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
        {NAV_LINKS.map((link) => (
          <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
