import ContactQuote from '~/components/ContactQuote'
import Footer from '~/components/Footer'
import SectionLink from '~/components/SectionLink'
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
          <p className="service-page__eyebrow">{content.heroEyebrow ?? 'Our Services'}</p>
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

        {content.pricing?.length ? (
          <section className="service-page__pricing" aria-label="Pricing">
            <h2>{content.pricingHeading ?? 'Pricing'}</h2>
            <div className="service-page__pricing-grid">
              {content.pricing.map((item) => (
                <article key={item.name} className="service-page__price-card">
                  <h3>{item.name}</h3>
                  {item.price ? <p className="service-page__price">{item.price}</p> : null}
                  {item.variants?.length ? (
                    <ul className="service-page__price-variants">
                      {item.variants.map((variant) => (
                        <li key={variant.label}>
                          <span>{variant.label}</span>
                          <span>{variant.price}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {item.note ? <p className="service-page__price-note">{item.note}</p> : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {children}

        <ContactQuote
          settings={settings}
          showBookNow={!content.contactOnly}
          note={content.contactNote}
        />

        <p className="service-page__back">
          <SectionLink sectionId="services">← Back to all services</SectionLink>
        </p>
      </div>

      <Footer settings={settings} />
    </div>
  )
}
