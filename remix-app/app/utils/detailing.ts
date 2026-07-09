import {stegaClean} from '@sanity/client/stega'

export function packageSectionId(slug?: string | null, fallback?: string): string {
  return stegaClean(slug) ?? fallback ?? 'package'
}

export function scrollToPackageSection(sectionId: string): boolean {
  const el = document.getElementById(sectionId)
  if (!el) return false

  el.scrollIntoView({behavior: 'smooth', block: 'start'})
  window.history.replaceState(null, '', `#${sectionId}`)
  return true
}
