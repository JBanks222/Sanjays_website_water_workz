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

function galleryImageAlt(item: GalleryImage): string {
  const parts = [item.title]
  if (item.caption) parts.push(item.caption)
  const categoryLabel = item.category ? CATEGORY_LABELS[item.category] : null
  if (categoryLabel) parts.push(categoryLabel)
  return parts.join(' — ')
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
        const showOverlay = Boolean(categoryLabel || item.caption)

        return (
          <figure key={item._id} className="gallery-grid__item">
            <div className="gallery-grid__media">
              <img src={src} alt={galleryImageAlt(item)} loading="lazy" decoding="async" />
              {showOverlay ? (
                <div className="gallery-grid__overlay">
                  {categoryLabel ? (
                    <span className="gallery-grid__category">{categoryLabel}</span>
                  ) : null}
                  {item.caption ? <p>{item.caption}</p> : null}
                </div>
              ) : null}
            </div>
            <figcaption className="sr-only">{galleryImageAlt(item)}</figcaption>
          </figure>
        )
      })}
    </div>
  )
}
