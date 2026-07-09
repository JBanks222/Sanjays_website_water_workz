import type {DetailingPackage} from '~/sanity/types'
import {getTrackImageForPackage} from '~/data/tracks'

type TrackMapProps = {
  pkg: DetailingPackage
  className?: string
}

export default function TrackMap({pkg, className}: TrackMapProps) {
  const track = getTrackImageForPackage(pkg)

  if (!track) {
    return null
  }

  return (
    <figure className={`track-map ${className ?? ''}`}>
      <img key={track.src} src={track.src} alt={`${track.label} circuit map`} loading="lazy" />
    </figure>
  )
}
