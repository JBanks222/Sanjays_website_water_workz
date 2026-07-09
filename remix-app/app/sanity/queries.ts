import groq from 'groq'

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
  businessName,
  heroHeadline,
  heroImage,
  missionTitle,
  missionStatement,
  contactIntro,
  phone,
  email,
  address,
  instagramUrl,
  hours
}`

export const SERVICES_QUERY = groq`*[_type == "service"] | order(order asc){
  _id,
  title,
  slug,
  description,
  image,
  order
}`

export const DETAILING_PAGE_QUERY = groq`{
  "page": *[_type == "detailingPage"][0]{
    title,
    intro
  },
  "packages": *[_type == "detailingPackage"] | order(order asc){
    _id,
    title,
    slug,
    trackKey,
    priceLabel,
    exteriorServices,
    interiorServices,
    order
  },
  "settings": ${SITE_SETTINGS_QUERY}
}`

export const HOMEPAGE_QUERY = groq`{
  "settings": ${SITE_SETTINGS_QUERY},
  "services": ${SERVICES_QUERY}
}`

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)`
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`
