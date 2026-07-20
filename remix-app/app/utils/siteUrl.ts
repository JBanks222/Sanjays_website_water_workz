/**
 * Canonical site origin for sitemaps, robots.txt, and future canonical URLs.
 * Set SITE_URL in production (e.g. https://waterwerkslab.com).
 */
export function getSiteUrl(request?: Request): string {
  const fromEnv = process.env.SITE_URL?.trim().replace(/\/$/, '')
  if (fromEnv) return fromEnv

  const vercel = process.env.VERCEL_URL?.trim().replace(/\/$/, '')
  if (vercel) return `https://${vercel}`

  if (request) {
    return new URL(request.url).origin
  }

  return 'http://localhost:3000'
}
