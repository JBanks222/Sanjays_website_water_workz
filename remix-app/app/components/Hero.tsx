import {HERO_IMAGE} from '~/data/carImages'
import type {SiteSettings} from '~/sanity/types'
import {urlFor} from '~/sanity/image'

type HeroProps = {
  settings: SiteSettings | null
}

export default function Hero({settings}: HeroProps) {
  const headline =
    settings?.heroHeadline ??
    'Transform your vehicle with premium auto detailing services and expert vehicle protection solutions.'
  const phone = settings?.phone ?? '516-666-5947'
  const heroBackground = settings?.heroImage
    ? urlFor(settings.heroImage).width(1600).height(900).url()
    : HERO_IMAGE
  const heroStyle = {backgroundImage: `url(${heroBackground})`}

  return (
    <section className="hero" style={heroStyle}>
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="hero__eyebrow">Premium Auto Detailing & Vehicle Protection</p>
        <h1>{headline}</h1>
        <div className="hero__actions">
          <a className="btn btn--primary" href={`tel:${phone.replace(/\D/g, '')}`}>
            Call {phone}
          </a>
          <a className="btn btn--secondary" href="#contact">
            Visit Us Today
          </a>
        </div>
      </div>
    </section>
  )
}
