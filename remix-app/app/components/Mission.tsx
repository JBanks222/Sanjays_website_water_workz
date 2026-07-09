import type {SiteSettings} from '~/sanity/types'

type MissionProps = {
  settings: SiteSettings | null
}

export default function Mission({settings}: MissionProps) {
  return (
    <section className="mission" id="mission">
      <div className="mission__inner">
        <h2>{settings?.missionTitle ?? 'About Us'}</h2>
        <p className="mission__tagline">Protection. Perfection. Passion.</p>
        <p>
          Trusted by owners, from meticulous detailing and paint correction to premium tint,
          vehicle wraps and paint protection film, we treat every vehicle as if it were our own.
        </p>
        <p>
          Our mission is simple: deliver exceptional automotive care through craftsmanship,
          precision, and genuine passion for cars. Every vehicle that enters our shop receives the
          same attention to detail we would give our own. We believe protection is an investment,
          appearance reflects pride, and quality should never be compromised.
        </p>
      </div>
    </section>
  )
}
