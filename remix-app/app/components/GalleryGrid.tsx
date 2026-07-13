import type {Image} from '@sanity/types'
import {urlFor} from '~/sanity/image'
import type {GalleryImage} from '~/sanity/types'

const CATEGORY_LABELS: Record<string, string> = {
  detailing: 'Detailing',
  ppf: 'Paint Protection Film',
  'ceramic-coating': 'Ceramic Coating',
  'window-tint': 'Window Tint',
  'vinyl-wrap': 'Vinyl Wrap',
  other: 'Other',
}

type GalleryGridProps = {
  images: GalleryImage[]
}

export default function GalleryGrid({images}: GalleryGridProps) {
  if (images.length === 0) {
    return (
      <div className="gallery-empty">
        <p>New project photos are on the way. Check back soon or follow us on Instagram.</p>
      </div>
    )
  }

  return (
    <div className="gallery-grid">
      {images.map((item) => {
        const src = item.image
          ? urlFor(item.image as Image).width(800).height(800).fit('crop').auto('format').url()
          : null

        if (!src) return null

        const categoryLabel = item.category ? CATEGORY_LABELS[item.category] : null

        return (
          <figure key={item._id} className="gallery-grid__item">
            <div className="gallery-grid__media">
              <img src={src} alt={item.title} loading="lazy" decoding="async" />
              <div className="gallery-grid__overlay">
                <h3>{item.title}</h3>
                {categoryLabel ? <span className="gallery-grid__category">{categoryLabel}</span> : null}
                {item.caption ? <p>{item.caption}</p> : null}
              </div>
            </div>
          </figure>
        )
      })}
    </div>
  )
}
