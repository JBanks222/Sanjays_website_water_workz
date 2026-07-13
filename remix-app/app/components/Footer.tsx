import {Link} from '@remix-run/react'
import SectionLink from '~/components/SectionLink'
import type {SiteSettings} from '~/sanity/types'

type FooterProps = {
  settings: SiteSettings | null
}

export default function Footer({settings}: FooterProps) {
  const phone = settings?.phone ?? '516-666-5947'
  const email = settings?.email ?? 'waterwerkzli@gmail.com'
  const address = settings?.address ?? '51 Sunrise Hwy, Lynbrook, NY 11563'
  const businessName = settings?.businessName ?? 'WaterWerkz LI'

  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__brand">
          <img src="/images/logo-dark.png" alt={businessName} />
          <p>{settings?.contactIntro}</p>
          {settings?.instagramUrl ? (
            <a
              className="btn btn--primary btn--small"
              href={settings.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              Follow on Instagram
            </a>
          ) : null}
        </div>

        <div className="site-footer__column">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                Home
              </Link>
            </li>
            <li>
              <SectionLink sectionId="services">Services</SectionLink>
            </li>
            <li>
              <Link to="/detailing">Detailing</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <SectionLink sectionId="mission">About</SectionLink>
            </li>
            <li>
              <SectionLink sectionId="contact">Contact</SectionLink>
            </li>
          </ul>
        </div>

        <div className="site-footer__column">
          <h3>Contact Us</h3>
          <ul className="site-footer__contact">
            <li>
              <a href={`tel:${phone.replace(/\D/g, '')}`}>{phone}</a>
            </li>
            <li>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            <li>{address}</li>
          </ul>
        </div>

        <div className="site-footer__column">
          <h3>Hours</h3>
          <ul className="site-footer__hours">
            {settings?.hours?.length ? (
              settings.hours.map((entry) => (
                <li key={entry.day}>
                  <span>{entry.day}</span>
                  <span>
                    {entry.closed ? 'Closed' : `${entry.open} – ${entry.close}`}
                  </span>
                </li>
              ))
            ) : (
              <>
                <li>
                  <span>Mon – Sat</span>
                  <span>9:30 am – 5:00 pm</span>
                </li>
                <li>
                  <span>Sun</span>
                  <span>Closed</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <p className="site-footer__copy">
        © {new Date().getFullYear()} {businessName}. All rights reserved.
      </p>
    </footer>
  )
}
