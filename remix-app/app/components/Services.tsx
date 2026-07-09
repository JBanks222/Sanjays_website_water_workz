import {Link} from '@remix-run/react'
import type {EncodeDataAttributeCallback} from '@sanity/react-loader'
import {getServiceImageForSlug} from '~/data/carImages'
import type {Service} from '~/sanity/types'
import {urlFor} from '~/sanity/image'
import {isFeaturedService, serviceDisplayTitle, serviceHref} from '~/utils/services'

type ServicesProps = {
  services: Service[]
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export default function Services({services, encodeDataAttribute}: ServicesProps) {
  const featuredServices = services.filter((service) => isFeaturedService(service.slug?.current))

  return (
    <section className="services" id="services">
      <div className="section-heading">
        <h2>Our Services</h2>
        <p className="section-heading__lead">
          Where automotive passion meets meticulous craftsmanship
        </p>
        <p>
          Transforming vehicles through meticulous care, lasting protection, and unmatched
          attention to detail.
        </p>
      </div>
      <div className="services__grid services__grid--featured">
        {featuredServices.map((service, i) => {
          const slug = service.slug?.current
          const imageUrl =
            (service.image
              ? urlFor(service.image).width(800).height(500).url()
              : null) ?? getServiceImageForSlug(slug)
          const href = serviceHref(slug)
          const title = serviceDisplayTitle(slug, service.title)
          const inner = (
            <>
              <div
                className="service-card__image"
                style={imageUrl ? {backgroundImage: `url(${imageUrl})`} : undefined}
              >
                <div className="service-card__overlay" />
                <h3>{title}</h3>
              </div>
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
