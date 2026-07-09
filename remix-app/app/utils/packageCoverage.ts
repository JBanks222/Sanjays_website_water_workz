import {stegaClean} from '@sanity/client/stega'

export type ServiceLevel = 'exterior-only' | 'exterior-interior' | 'full-detail'

export type PackageCoverage = {
  level: ServiceLevel
  label: string
  shortLabel: string
  description: string
  includesExterior: boolean
  includesInterior: boolean
}

const COVERAGE_BY_LEVEL: Record<ServiceLevel, Omit<PackageCoverage, 'level'>> = {
  'exterior-only': {
    label: 'Exterior Services Only',
    shortLabel: 'Exterior Only',
    description: 'Exterior wash, protection, and finishing — no interior work included.',
    includesExterior: true,
    includesInterior: false,
  },
  'exterior-interior': {
    label: 'Exterior & Interior Services',
    shortLabel: 'Exterior + Interior',
    description: 'Complete inside-and-out care with thorough exterior and interior cleaning.',
    includesExterior: true,
    includesInterior: true,
  },
  'full-detail': {
    label: 'Full Detailing Services',
    shortLabel: 'Full Detail',
    description: 'Our most comprehensive package — deep interior restoration and advanced exterior correction.',
    includesExterior: true,
    includesInterior: true,
  },
}

/** Fallback mapping by package slug when serviceLevel is not yet set in Sanity. */
const SLUG_SERVICE_LEVEL: Record<string, ServiceLevel> = {
  silverstone: 'exterior-only',
  'laguna-seca': 'exterior-interior',
  monza: 'exterior-interior',
  nurburgring: 'full-detail',
  'circuit-de-spa-francorchamps': 'full-detail',
}

const SLUG_SUMMARIES: Record<string, string> = {
  silverstone:
    'A quick exterior refresh — ideal for regular upkeep and keeping your paint, wheels, and glass looking sharp.',
  'laguna-seca':
    'Balanced inside-and-out care — great when you want a clean cabin and a protected, glossy exterior.',
  monza:
    'Stepped-up exterior correction plus thorough interior cleaning for a noticeably refreshed vehicle.',
  nurburgring:
    'Full interior detail with deep exterior decontamination — built for a comprehensive transformation.',
  'circuit-de-spa-francorchamps':
    'Our top-tier package with paint refinement and full interior restoration for showroom-level results.',
}

export function resolveServiceLevel(
  serviceLevel?: string | null,
  slug?: string | null,
): ServiceLevel {
  const level = stegaClean(serviceLevel)
  if (level && level in COVERAGE_BY_LEVEL) {
    return level as ServiceLevel
  }

  const slugKey = stegaClean(slug)
  if (slugKey && slugKey in SLUG_SERVICE_LEVEL) {
    return SLUG_SERVICE_LEVEL[slugKey]
  }

  return 'exterior-interior'
}

export function getPackageCoverage(
  serviceLevel?: string | null,
  slug?: string | null,
  packageSummary?: string | null,
): PackageCoverage & {summary: string} {
  const level = resolveServiceLevel(serviceLevel, slug)
  const slugKey = stegaClean(slug)
  const summary =
    stegaClean(packageSummary) ??
    (slugKey && SLUG_SUMMARIES[slugKey]) ??
    COVERAGE_BY_LEVEL[level].description

  return {
    level,
    summary,
    ...COVERAGE_BY_LEVEL[level],
  }
}
