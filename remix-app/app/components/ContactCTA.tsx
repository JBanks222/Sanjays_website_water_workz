import BookNowButton from '~/components/BookNowButton'
import type {SiteSettings} from '~/sanity/types'

type ContactCTAProps = {
  settings: SiteSettings | null
}

export default function ContactCTA({settings}: ContactCTAProps) {
  const phone = settings?.phone ?? '516-666-5947'

  return (
    <section className="contact-cta" id="contact">
      <div className="contact-cta__inner">
        <h2>Get Started Today</h2>
        <p>
          We love our customers and invite you to visit us during normal business hours for
          premium auto detailing and vehicle protection services that will keep your car looking
          its best.
        </p>
        <div className="contact-cta__actions">
          <BookNowButton variant="inline" />
          <a className="btn btn--secondary" href={`tel:${phone.replace(/\D/g, '')}`}>
            Call {phone}
          </a>
        </div>
      </div>
    </section>
  )
}
