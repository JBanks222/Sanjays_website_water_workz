import type {Image} from '@sanity/types'

export type BusinessHours = {
  day: string
  open?: string
  close?: string
  closed?: boolean
}

export type SiteSettings = {
  businessName: string
  heroHeadline?: string
  heroImage?: Image
  missionTitle?: string
  missionStatement?: string
  contactIntro?: string
  phone?: string
  email?: string
  address?: string
  instagramUrl?: string
  hours?: BusinessHours[]
}

export type Service = {
  _id: string
  title: string
  slug: {current: string}
  description?: string
  image?: Image
  order?: number
}

export type DetailingPackage = {
  _id: string
  title: string
  slug: {current: string}
  trackKey: string
  priceLabel: string
  serviceLevel?: string
  packageSummary?: string
  exteriorServices?: string[]
  interiorServices?: string[]
  order?: number
}

export type DetailingPage = {
  title?: string
  intro?: string
}

export type DetailingPageData = {
  page: DetailingPage | null
  packages: DetailingPackage[]
  settings: SiteSettings | null
}

export type HomepageData = {
  settings: SiteSettings | null
  services: Service[]
}

export type Post = {
  _id: string
  title: string
  slug: {current: string}
  excerpt?: string
  mainImage?: Image
  body?: unknown
}

export type GalleryPage = {
  title?: string
  intro?: string
}

export type GalleryImage = {
  _id: string
  title: string
  image?: Image
  caption?: string
  category?: string
  order?: number
}

export type GalleryPageData = {
  page: GalleryPage | null
  images: GalleryImage[]
  settings: SiteSettings | null
}
