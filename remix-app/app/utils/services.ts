import {stegaClean} from '@sanity/client/stega'

export const FEATURED_SERVICE_SLUGS = [
  'detailing-packages',
  'paint-protection-film',
  'ceramic-coating',
  'window-tint',
] as const

const SERVICE_DISPLAY_TITLES: Record<string, string> = {
  'detailing-packages': 'Detailing',
}

export function serviceDisplayTitle(slug?: string | null, fallback?: string): string {
  const key = stegaClean(slug)
  if (key && SERVICE_DISPLAY_TITLES[key]) {
    return SERVICE_DISPLAY_TITLES[key]
  }
  return fallback ?? 'Service'
}

export function serviceHref(slug?: string | null): string | undefined {
  const key = stegaClean(slug)
  if (!key) return undefined

  switch (key) {
    case 'detailing-packages':
      return '/detailing'
    case 'paint-protection-film':
      return '/services/paint-protection-film'
    case 'ceramic-coating':
      return '/services/ceramic-coating'
    case 'window-tint':
      return '/services/window-tint'
    default:
      return undefined
  }
}

export function isFeaturedService(slug?: string | null): boolean {
  const key = stegaClean(slug)
  return key !== null && FEATURED_SERVICE_SLUGS.includes(key as (typeof FEATURED_SERVICE_SLUGS)[number])
}
