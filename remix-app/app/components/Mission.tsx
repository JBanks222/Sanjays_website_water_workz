import type {SiteSettings} from '~/sanity/types'

type MissionProps = {
  settings: SiteSettings | null
}

export default function Mission({settings}: MissionProps) {
  return (
    <section className="mission" id="mission">
      <div className="mission__inner">
        <h2>{settings?.missionTitle ?? 'Our Mission'}</h2>
        <p>
          {settings?.missionStatement ??
            'Our mission is to provide premium auto detailing services that enhance the beauty and longevity of your vehicle. We believe in using only the best products and techniques in our car detailing to ensure your car looks its absolute best while benefiting from our vehicle protection service.'}
        </p>
      </div>
    </section>
  )
}
