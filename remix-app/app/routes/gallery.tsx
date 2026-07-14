import {useLoaderData, type MetaFunction} from '@remix-run/react'
import {useQuery} from '@sanity/react-loader'
import Footer from '~/components/Footer'
import GalleryGrid from '~/components/GalleryGrid'
import {loadQuery} from '~/sanity/loader.server'
import {GALLERY_PAGE_QUERY} from '~/sanity/queries'
import type {GalleryPageData} from '~/sanity/types'

const DEFAULT_INTRO =
  'Browse completed detailing, protection, and wrap projects from Water Werks Lab.'

export const meta: MetaFunction = () => {
  return [
    {title: 'Gallery | Water Werks Lab'},
    {
      name: 'description',
      content:
        'See completed auto detailing, paint protection, ceramic coating, tint, and wrap work from Water Werks Lab in Lynbrook, NY.',
    },
  ]
}

export const loader = async () => {
  const initial = await loadQuery<GalleryPageData>(GALLERY_PAGE_QUERY)
  return {initial, query: GALLERY_PAGE_QUERY, params: {}}
}

export default function GalleryPage() {
  const {initial, query, params} = useLoaderData<typeof loader>()
  const {data, loading, error} = useQuery<GalleryPageData>(query, params, {
    // @ts-expect-error -- initial typing from loader
    initial,
  })

  if (error) throw error
  if (loading && !data) return <div className="loading">Loading...</div>

  const page = data?.page
  const images = data?.images ?? []
  const settings = data?.settings ?? null

  return (
    <div className="gallery-page">
      <header className="gallery-hero">
        <p className="gallery-hero__eyebrow">Portfolio</p>
        <h1>{page?.title ?? 'Our Work'}</h1>
        <p className="gallery-hero__intro">{page?.intro ?? DEFAULT_INTRO}</p>
      </header>

      <section className="gallery-section" aria-label="Project gallery">
        <GalleryGrid images={images} />
      </section>

      <Footer settings={settings} />
    </div>
  )
}
