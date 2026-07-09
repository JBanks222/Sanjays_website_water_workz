export function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({behavior: 'smooth', block: 'start'})
}

export const SCROLL_TO_SECTION_KEY = 'scrollToSection'

export function queueSectionScroll(sectionId: string) {
  sessionStorage.setItem(SCROLL_TO_SECTION_KEY, sectionId)
}

export function takeQueuedSectionScroll(): string | null {
  const sectionId = sessionStorage.getItem(SCROLL_TO_SECTION_KEY)
  if (sectionId) {
    sessionStorage.removeItem(SCROLL_TO_SECTION_KEY)
  }
  return sectionId
}
