import {stegaClean} from '@sanity/client/stega'
import {useState} from 'react'
import type {DetailingPackage} from '~/sanity/types'
import BrandVisual from '~/components/BrandVisual'
import TrackMap from '~/components/TrackMap'
import {getTrackImageForPackage} from '~/data/tracks'
import {packageSectionId} from '~/utils/detailing'
import {getPackageCoverage} from '~/utils/packageCoverage'

type DetailingPackageCardProps = {
  pkg: DetailingPackage
  index: number
  total: number
}

export default function DetailingPackageCard({pkg, index, total}: DetailingPackageCardProps) {
  const [expanded, setExpanded] = useState(false)
  const trackKey = stegaClean(pkg.trackKey) ?? ''
  const isBrand = trackKey === 'brand'
  const hasTrackMap = Boolean(getTrackImageForPackage(pkg))
  const brandVariant = pkg.slug?.current?.includes('jr') ? 'werkz-jr' : 'werkz'
  const sectionId = packageSectionId(pkg.slug?.current, `package-${index}`)
  const coverage = getPackageCoverage(pkg.serviceLevel, pkg.slug?.current, pkg.packageSummary)

  const exteriorCount = pkg.exteriorServices?.length ?? 0
  const interiorCount = pkg.interiorServices?.length ?? 0
  const totalServices = exteriorCount + interiorCount

  return (
    <article
      className="detailing-card"
      id={sectionId}
      aria-labelledby={`${sectionId}-title`}
    >
      <div className="detailing-card__visual" aria-hidden={false}>
        {isBrand ? (
          <BrandVisual variant={brandVariant} />
        ) : hasTrackMap ? (
          <TrackMap pkg={pkg} />
        ) : null}
      </div>

      <div className="detailing-card__body">
        <div className="detailing-card__meta">
          <span className="detailing-card__tier">
            Package {index + 1} of {total}
          </span>
        </div>

        <h2 className="detailing-card__title" id={`${sectionId}-title`}>
          {pkg.title}
        </h2>
        <p className="detailing-card__price">{pkg.priceLabel}</p>

        <div
          className={`detailing-card__coverage detailing-card__coverage--${coverage.level}`}
          aria-label={`Service coverage: ${coverage.label}`}
        >
          <span className="detailing-card__coverage-badge">{coverage.label}</span>
          <div className="detailing-card__coverage-tags" aria-hidden>
            <span
              className={`detailing-card__coverage-tag${
                coverage.includesExterior ? ' detailing-card__coverage-tag--active' : ''
              }`}
            >
              Exterior
            </span>
            <span
              className={`detailing-card__coverage-tag${
                coverage.includesInterior ? ' detailing-card__coverage-tag--active' : ''
              }`}
            >
              Interior
            </span>
            {coverage.level === 'full-detail' ? (
              <span className="detailing-card__coverage-tag detailing-card__coverage-tag--active detailing-card__coverage-tag--premium">
                Full Detail
              </span>
            ) : null}
          </div>
          <p className="detailing-card__summary">{coverage.summary}</p>
        </div>

        <button
          type="button"
          className="detailing-card__toggle"
          aria-expanded={expanded}
          aria-controls={`${sectionId}-services`}
          onClick={() => setExpanded((open) => !open)}
        >
          {expanded ? 'Hide service list' : `View all ${totalServices} services`}
          <span className="detailing-card__chevron" aria-hidden />
        </button>

        <div
          id={`${sectionId}-services`}
          className={`detailing-card__services${expanded ? ' detailing-card__services--open' : ''}`}
        >
          {pkg.exteriorServices?.length ? (
            <div className="detailing-card__group">
              <h3>Exterior Services</h3>
              <ul>
                {pkg.exteriorServices.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {pkg.interiorServices?.length ? (
            <div className="detailing-card__group">
              <h3>Interior Services</h3>
              <ul>
                {pkg.interiorServices.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {!pkg.exteriorServices?.length && !pkg.interiorServices?.length ? (
            <p className="detailing-card__empty">Service list coming soon.</p>
          ) : null}
        </div>
      </div>
    </article>
  )
}
