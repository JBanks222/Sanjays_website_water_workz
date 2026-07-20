import groq from 'groq'
import {getServicePageSlugs} from '~/data/servicePages'
import {client} from '~/sanity/client'

export type SitemapEntry = {
  path: string
  priority?: number
  lastmod?: string
}

type SitemapPost = {
  slug: string
  _updatedAt?: string
}

const SITEMAP_POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}`

function toLastmod(iso?: string): string | undefined {
  if (!iso) return undefined
  const date = iso.slice(0, 10)
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : undefined
}

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const posts = await client.fetch<SitemapPost[]>(SITEMAP_POSTS_QUERY)

  const entries: SitemapEntry[] = [
    {path: '/', priority: 1},
    {path: '/detailing', priority: 0.9},
    {path: '/gallery', priority: 0.8},
    ...getServicePageSlugs().map((slug) => ({
      path: `/services/${slug}`,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      path: `/post/${post.slug}`,
      priority: 0.6,
      lastmod: toLastmod(post._updatedAt),
    })),
  ]

  return entries
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function buildSitemapXml(siteUrl: string, entries: SitemapEntry[]): string {
  const urls = entries
    .map((entry) => {
      const loc = `${siteUrl}${entry.path}`
      const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''
      const priority =
        entry.priority !== undefined ? `\n    <priority>${entry.priority.toFixed(1)}</priority>` : ''

      return `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmod}${priority}\n  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}
