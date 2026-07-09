import {useLoaderData, type MetaFunction} from '@remix-run/react'
import {useQuery} from '@sanity/react-loader'
import SectionLink from '~/components/SectionLink'
import BookNowButton from '~/components/BookNowButton'
import DetailingPackageCard from '~/components/DetailingPackageCard'
import Footer from '~/components/Footer'
import {loadQuery} from '~/sanity/loader.server'
import {DETAILING_PAGE_QUERY} from '~/sanity/queries'
import type {DetailingPageData} from '~/sanity/types'
import {DETAILING_INTRO} from '~/data/servicePages'
import {packageSectionId, scrollToPackageSection} from '~/utils/detailing'

export const meta: MetaFunction = () => {
  return [
    {title: 'Detailing Packages | Water Werkz LI'},
    {
      name: 'description',
      content:
        'Choose your race-inspired detailing package — from Silverstone to The Werkz. Premium auto detailing in Lynbrook, NY.',
    },
  ]
}

export const loader = async () => {
  const initial = await loadQuery<DetailingPageData>(DETAILING_PAGE_QUERY)
  return {initial, query: DETAILING_PAGE_QUERY, params: {}}
}

export default function DetailingPage() {
  const {initial, query, params} = useLoaderData<typeof loader>()
  const {data, loading, error} = useQuery<DetailingPageData>(query, params, {
    // @ts-expect-error -- initial typing from loader
    initial,
  })

  if (error) throw error
  if (loading && !data) return <div className="loading">Loading...</div>

  const page = data?.page
  const packages = data?.packages ?? []
  const settings = data?.settings ?? null
  const phone = settings?.phone ?? '516-666-5947'

  return (
    <div className="detailing-page">
      <header className="detailing-hero">
        <p className="detailing-hero__eyebrow">Our Services</p>
        <h1>Detailing</h1>
        <p className="detailing-hero__intro">{page?.intro ?? DETAILING_INTRO}</p>
      </header>

      {packages.length > 1 ? (
        <nav className="detailing-jump" aria-label="Package navigation">
          <ul>
            {packages.map((pkg) => {
              const sectionId = packageSectionId(pkg.slug?.current, pkg._id)
              return (
                <li key={pkg._id}>
                  <a
                    href={`#${sectionId}`}
                    onClick={(event) => {
                      event.preventDefault()
                      scrollToPackageSection(sectionId)
                    }}
                  >
                    {pkg.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      ) : null}

      <div className="detailing-packages">
        <h2 className="detailing-packages__heading">Our Packages</h2>
        {packages.map((pkg, i) => (
          <DetailingPackageCard
            key={pkg._id}
            pkg={pkg}
            index={i}
            total={packages.length}
          />
        ))}
      </div>

      <section className="detailing-cta">
        <h2>Ready to Hit the Track?</h2>
        <p>Call us to book your package or ask which circuit fits your vehicle best.</p>
        <div className="detailing-cta__actions">
          <BookNowButton variant="inline" />
          <a className="btn btn--secondary" href={`tel:${phone.replace(/\D/g, '')}`}>
            Call {phone}
          </a>
          <SectionLink sectionId="contact" className="btn btn--secondary">
            Visit the Shop
          </SectionLink>
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  )
}
