import {stegaClean} from '@sanity/client/stega'

/** Bump when car image files change to bust browser/CDN cache */
const CAR_IMAGES_VERSION = '20260709'

function carSrc(filename: string) {
  return `/images/car/${filename}?v=${CAR_IMAGES_VERSION}`
}

export const HERO_IMAGE = carSrc('hero_image.jpeg')

/** Service slug → image filename mapping from car_images/ */
export const SERVICE_IMAGES: Record<string, string> = {
  'detailing-packages': carSrc('detailing.jpeg'),
  'paint-protection-film': carSrc('paint_protection_film_ppf.jpeg'),
  'ceramic-coating': carSrc('ceramic_coating.jpeg'),
  'window-tint': carSrc('window_tinting.jpeg'),
  'additional-services': carSrc('additional_services.jpeg'),
  'vinyl-wrap': carSrc('additional_services.jpeg'),
}

export function getServiceImageForSlug(slug?: string | null): string | null {
  const key = stegaClean(slug)
  if (!key) return null
  return SERVICE_IMAGES[key] ?? null
}
