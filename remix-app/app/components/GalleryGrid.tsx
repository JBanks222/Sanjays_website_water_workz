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

        return (
          <figure key={item._id} className="gallery-grid__item">
            <div className="gallery-grid__media">
              <img src={src} alt={galleryImageAlt(item)} loading="lazy" decoding="async" />
            </div>
            <figcaption className="sr-only">{galleryImageAlt(item)}</figcaption>
          </figure>
        )
      })}
    </div>
  )
}
