import BookNowButton from '~/components/BookNowButton'
import {HERO_IMAGE} from '~/data/carImages'
import type {SiteSettings} from '~/sanity/types'
import {urlFor} from '~/sanity/image'

type HeroProps = {
  settings: SiteSettings | null
}

export default function Hero({settings}: HeroProps) {
  const headline =
    settings?.heroHeadline ??
    "Long Island's destination for automotive protection and refinement."
  const phone = settings?.phone ?? '516-666-5947'
  const heroBackground = settings?.heroImage
    ? urlFor(settings.heroImage).width(1600).height(900).url()
    : HERO_IMAGE
  const heroStyle = {backgroundImage: `url(${heroBackground})`}

  return (
    <section className="hero" style={heroStyle}>
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="hero__eyebrow">Call and Book Now</p>
        <h1>{headline}</h1>
        <p className="hero__tagline">Built by enthusiasts. Driven by perfection.</p>
        <div className="hero__cta-grid">
          <BookNowButton variant="hero" />
          <a className="hero__cta-box" href={`tel:${phone.replace(/\D/g, '')}`}>
            <span className="hero__cta-label">Call Us</span>
            <span className="hero__cta-value">{phone}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
