export function scrollToTop() {
  window.scrollTo({top: 0, left: 0, behavior: 'auto'})
}

export function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({behavior: 'smooth', block: 'start'})
}

/** @deprecated Legacy queue — cleared on every navigation */
export const SCROLL_TO_SECTION_KEY = 'scrollToSection'

export function clearQueuedSectionScroll() {
  sessionStorage.removeItem(SCROLL_TO_SECTION_KEY)
}

export type HomeScrollState = {
  scrollTo?: string
}

export function isHomeScrollState(state: unknown): state is HomeScrollState {
  return (
    typeof state === 'object' &&
    state !== null &&
    ('scrollTo' in state ? typeof (state as HomeScrollState).scrollTo === 'string' : true)
  )
}
