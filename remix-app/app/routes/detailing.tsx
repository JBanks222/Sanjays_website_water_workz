import {useLoaderData, type MetaFunction} from '@remix-run/react'
import {useQuery} from '@sanity/react-loader'
import {Link} from '@remix-run/react'
import DetailingPackageCard from '~/components/DetailingPackageCard'
import Footer from '~/components/Footer'
import {loadQuery} from '~/sanity/loader.server'
import {DETAILING_PAGE_QUERY} from '~/sanity/queries'
import type {DetailingPageData} from '~/sanity/types'

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
        <p className="detailing-hero__eyebrow">Performance-Inspired Packages</p>
        <h1>{page?.title ?? 'Auto Detailing Package Options'}</h1>
        {page?.intro ? <p className="detailing-hero__intro">{page.intro}</p> : null}
      </header>

      {packages.length > 1 ? (
        <nav className="detailing-jump" aria-label="Package navigation">
          <ul>
            {packages.map((pkg) => (
              <li key={pkg._id}>
                <a href={`#${pkg.slug?.current ?? pkg._id}`}>{pkg.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      <div className="detailing-packages">
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
          <a className="btn btn--primary" href={`tel:${phone.replace(/\D/g, '')}`}>
            Call {phone}
          </a>
          <Link className="btn btn--secondary" to="/#contact">
            Visit the Shop
          </Link>
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  )
}
