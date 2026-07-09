import BookNowButton from '~/components/BookNowButton'
import type {SiteSettings} from '~/sanity/types'

type ContactQuoteProps = {
  settings: SiteSettings | null
  heading?: string
}

export default function ContactQuote({
  settings,
  heading = 'Contact Us for a Personalized Quote',
}: ContactQuoteProps) {
  const phone = settings?.phone ?? '516-666-5947'
  const email = settings?.email ?? 'waterwerkzli@gmail.com'

  return (
    <section className="contact-quote">
      <h2>{heading}</h2>
      <BookNowButton variant="inline" label="Book Online" />
      <div className="contact-quote__actions">
        <a className="contact-quote__box" href={`tel:${phone.replace(/\D/g, '')}`}>
          <span className="contact-quote__label">Call Us</span>
          <span className="contact-quote__value">{phone}</span>
        </a>
        <a className="contact-quote__box" href={`mailto:${email}`}>
          <span className="contact-quote__label">Email Us</span>
          <span className="contact-quote__value">{email}</span>
        </a>
      </div>
    </section>
  )
}
