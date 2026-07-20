import type {LoaderFunctionArgs} from '@remix-run/node'
import {buildSitemapXml, getSitemapEntries} from '~/utils/sitemap'
import {getSiteUrl} from '~/utils/siteUrl'

export const loader = async ({request}: LoaderFunctionArgs) => {
  const siteUrl = getSiteUrl(request)
  const entries = await getSitemapEntries()
  const body = buildSitemapXml(siteUrl, entries)

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
