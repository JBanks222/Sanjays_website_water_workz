import {Link} from '@remix-run/react'
import ContactQuote from '~/components/ContactQuote'
import Footer from '~/components/Footer'
import {getServiceImageForSlug} from '~/data/carImages'
import type {ServicePageContent} from '~/data/servicePages'
import type {SiteSettings} from '~/sanity/types'

type ServicePageLayoutProps = {
  content: ServicePageContent
  settings: SiteSettings | null
  children?: React.ReactNode
}

export default function ServicePageLayout({content, settings, children}: ServicePageLayoutProps) {
  const imageUrl = getServiceImageForSlug(content.imageSlug)

  return (
    <div className="service-page">
      <header
        className="service-page__hero"
        style={imageUrl ? {backgroundImage: `url(${imageUrl})`} : undefined}
      >
        <div className="service-page__hero-overlay" />
        <div className="service-page__hero-content">
          <p className="service-page__eyebrow">Our Services</p>
          <h1>{content.title}</h1>
        </div>
      </header>

      <div className="service-page__body">
        {content.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="service-page__intro">
            {paragraph}
          </p>
        ))}

        {content.sections.map((section) => (
          <section key={section.heading} className="service-page__section">
            <h2>{section.heading}</h2>
            {section.intro ? <p>{section.intro}</p> : null}
            {section.bullets?.length ? (
              <ul className="service-page__list">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.body?.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </section>
        ))}

        {children}

        <ContactQuote settings={settings} />

        <p className="service-page__back">
          <Link to="/#services">← Back to all services</Link>
        </p>
      </div>

      <Footer settings={settings} />
    </div>
  )
}
