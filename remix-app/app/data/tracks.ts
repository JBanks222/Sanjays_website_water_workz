import {stegaClean} from '@sanity/client/stega'

export type TrackKey =
  | 'silverstone'
  | 'laguna-seca'
  | 'monza'
  | 'le-mans'
  | 'spa'
  | 'brand'

export type TrackImage = {
  label: string
  src: string
}

/** Bump when track map files change to bust browser/CDN cache */
const TRACK_MAPS_VERSION = '20260709'

function trackSrc(filename: string) {
  return `/images/track_maps/${filename}?v=${TRACK_MAPS_VERSION}`
}

/** Resolve images by package slug first — avoids stega issues on trackKey. */
export const SLUG_TRACK_IMAGES: Record<string, TrackImage> = {
  silverstone: {
    label: 'Silverstone',
    src: trackSrc('silver_stone.png'),
  },
  'laguna-seca': {
    label: 'Laguna Seca',
    src: trackSrc('laguna_seca.png'),
  },
  monza: {
    label: 'Monza',
    src: trackSrc('Monza.png'),
  },
  'le-mans': {
    label: 'Le Mans',
    src: trackSrc('le_mans.png'),
  },
  'circuit-de-spa-francorchamps': {
    label: 'Circuit de Spa-Francorchamps',
    src: trackSrc('circuit_de_spa.png'),
  },
}

export const TRACK_IMAGES: Record<Exclude<TrackKey, 'brand'>, TrackImage> = {
  silverstone: SLUG_TRACK_IMAGES.silverstone,
  'laguna-seca': SLUG_TRACK_IMAGES['laguna-seca'],
  monza: SLUG_TRACK_IMAGES.monza,
  'le-mans': SLUG_TRACK_IMAGES['le-mans'],
  spa: SLUG_TRACK_IMAGES['circuit-de-spa-francorchamps'],
}

type PackageRef = {
  title?: string
  trackKey?: string
  slug?: {current?: string}
}

export function getTrackImageForPackage(pkg: PackageRef): TrackImage | null {
  const slug = stegaClean(pkg.slug?.current)
  if (slug && SLUG_TRACK_IMAGES[slug]) {
    return SLUG_TRACK_IMAGES[slug]
  }

  const trackKey = stegaClean(pkg.trackKey)
  if (trackKey && trackKey in TRACK_IMAGES) {
    return TRACK_IMAGES[trackKey as Exclude<TrackKey, 'brand'>]
  }

  return null
}

export function isTrackKey(value: string): value is TrackKey {
  const key = stegaClean(value)
  return (key !== null && key in TRACK_IMAGES) || key === 'brand'
}

export function getTrackImage(trackKey: string): TrackImage | null {
  const key = stegaClean(trackKey)
  if (key && key in TRACK_IMAGES) {
    return TRACK_IMAGES[key as Exclude<TrackKey, 'brand'>]
  }
  return null
}
