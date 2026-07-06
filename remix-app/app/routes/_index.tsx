import {useLoaderData, type MetaFunction} from '@remix-run/react'
import {useQuery} from '@sanity/react-loader'
import ContactCTA from '~/components/ContactCTA'
import Footer from '~/components/Footer'
import Hero from '~/components/Hero'
import Mission from '~/components/Mission'
import Services from '~/components/Services'
import {loadQuery} from '~/sanity/loader.server'
import {HOMEPAGE_QUERY} from '~/sanity/queries'
import type {HomepageData} from '~/sanity/types'

export const meta: MetaFunction = () => {
  return [
    {title: 'Water Werkz LI | Premium Auto Detailing & Vehicle Protection'},
    {
      name: 'description',
      content:
        'Premium auto detailing and vehicle protection services in Lynbrook, NY. Detailing packages, paint protection film, ceramic coating, window tint, and more.',
    },
  ]
}

export const loader = async () => {
  const initial = await loadQuery<HomepageData>(HOMEPAGE_QUERY)

  return {initial, query: HOMEPAGE_QUERY, params: {}}
}

export default function Index() {
  const {initial, query, params} = useLoaderData<typeof loader>()
  const {data, loading, error, encodeDataAttribute} = useQuery<HomepageData>(query, params, {
    // @ts-expect-error -- initial typing from loader
    initial,
  })

  if (error) {
    throw error
  }

  if (loading && !data) {
    return <div className="loading">Loading...</div>
  }

  const settings = data?.settings ?? null
  const services = data?.services ?? []

  return (
    <>
      <Hero settings={settings} />
      <Services
        services={services}
        encodeDataAttribute={encodeDataAttribute.scope(['services'])}
      />
      <Mission settings={settings} />
      <ContactCTA settings={settings} />
      <Footer settings={settings} />
    </>
  )
}
