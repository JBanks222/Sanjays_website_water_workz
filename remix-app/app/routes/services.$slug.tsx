import {json, type LoaderFunctionArgs} from '@remix-run/node'
import {useLoaderData, type MetaFunction} from '@remix-run/react'
import {useQuery} from '@sanity/react-loader'
import ServicePageLayout from '~/components/ServicePageLayout'
import {getServicePageContent} from '~/data/servicePages'
import {loadQuery} from '~/sanity/loader.server'
import {SITE_SETTINGS_QUERY} from '~/sanity/queries'
import type {SiteSettings} from '~/sanity/types'

export const meta: MetaFunction<typeof loader> = ({data}) => {
  if (!data?.content) {
    return [{title: 'Service | Water Werkz LI'}]
  }

  return [
    {title: `${data.content.title} | Water Werkz LI`},
    {name: 'description', content: data.content.metaDescription},
  ]
}

export const loader = async ({params}: LoaderFunctionArgs) => {
  const content = getServicePageContent(params.slug ?? '')
  if (!content) {
    throw new Response('Not Found', {status: 404})
  }

  const initial = await loadQuery<SiteSettings>(SITE_SETTINGS_QUERY)
  return json({content, initial, query: SITE_SETTINGS_QUERY, params: {}})
}

export default function ServicePage() {
  const {content, initial, query, params} = useLoaderData<typeof loader>()
  const {data, loading, error} = useQuery<SiteSettings>(query, params, {
    // @ts-expect-error -- initial typing from loader
    initial,
  })

  if (error) throw error
  if (loading && !data) return <div className="loading">Loading...</div>

  return <ServicePageLayout content={content} settings={data ?? null} />
}
