import {Link} from '@remix-run/react'
import type {EncodeDataAttributeCallback} from '@sanity/react-loader'
import {getServiceImageForSlug} from '~/data/carImages'
import type {Service} from '~/sanity/types'
import {urlFor} from '~/sanity/image'

type ServicesProps = {
  services: Service[]
  encodeDataAttribute?: EncodeDataAttributeCallback
}

function serviceHref(slug?: string) {
  if (slug === 'detailing-packages') return '/detailing'
  return undefined
}

export default function Services({services, encodeDataAttribute}: ServicesProps) {
  return (
    <section className="services" id="services">
      <div className="section-heading">
        <h2>Our Services</h2>
        <p>Your source for expert detailing and vehicle protection on Long Island</p>
      </div>
      <div className="services__grid">
        {services.map((service, i) => {
          const imageUrl =
            (service.image
              ? urlFor(service.image).width(800).height(500).url()
              : null) ?? getServiceImageForSlug(service.slug?.current)
          const href = serviceHref(service.slug?.current)
          const inner = (
            <>
              <div
                className="service-card__image"
                style={imageUrl ? {backgroundImage: `url(${imageUrl})`} : undefined}
              >
                <div className="service-card__overlay" />
                <h3>{service.title}</h3>
              </div>
              {service.description ? <p>{service.description}</p> : null}
            </>
          )

          return href ? (
            <Link
              key={service._id}
              to={href}
              className="service-card service-card--link"
              data-sanity={encodeDataAttribute?.([i])}
            >
              {inner}
            </Link>
          ) : (
            <article
              key={service._id}
              className="service-card"
              data-sanity={encodeDataAttribute?.([i])}
            >
              {inner}
            </article>
          )
        })}
      </div>
    </section>
  )
}
