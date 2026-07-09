export type ServicePageSection = {
  heading: string
  intro?: string
  bullets?: string[]
  body?: string[]
}

export type ServicePageContent = {
  slug: string
  title: string
  metaDescription: string
  imageSlug: string
  intro: string[]
  sections: ServicePageSection[]
}

export const DETAILING_INTRO =
  "Detailing is more than just cleaning a vehicle—it's about preserving the pride that comes with ownership. Whether you need a quick refresh or a complete transformation, our detailing packages are designed to meet the needs of every vehicle. From thorough interior and exterior washes to comprehensive full-detail services, we provide the care and attention your vehicle deserves."

const SERVICE_PAGES: Record<string, ServicePageContent> = {
  'paint-protection-film': {
    slug: 'paint-protection-film',
    title: 'Paint Protection Film',
    metaDescription:
      'Professional paint protection film (PPF) in Lynbrook, NY. Protect your vehicle from rock chips, scratches, and road debris with virtually invisible coverage.',
    imageSlug: 'paint-protection-film',
    intro: [
      'Paint Protection Film (PPF) acts as a durable, nearly invisible barrier that helps protect your vehicle from rock chips, scratches, and environmental damage. From partial front-end coverage to full vehicle protection, we offer solutions designed to keep your vehicle looking its best for years to come.',
    ],
    sections: [
      {
        heading: 'Why Choose PPF?',
        bullets: [
          'Protects against rock chips and road debris',
          'Helps prevent scratches and swirl marks',
          'Preserves factory paint',
          'Maintains resale value',
          'Virtually invisible protection',
        ],
      },
    ],
  },
  'ceramic-coating': {
    slug: 'ceramic-coating',
    title: 'Ceramic Coating',
    metaDescription:
      'Premium ceramic coating services on Long Island. Deep gloss, hydrophobic protection, and easier maintenance for daily drivers and weekend vehicles.',
    imageSlug: 'ceramic-coating',
    intro: [
      "Ceramic coating is one of the best ways to protect and enhance your vehicle's finish. Applied to the exterior surfaces, it creates a durable, hydrophobic layer that repels water, dirt, and contaminants while adding incredible gloss and depth to the paint. Whether it's a daily driver or a prized weekend vehicle, ceramic coating helps keep your investment looking its best with less maintenance.",
    ],
    sections: [
      {
        heading: 'Benefits of Ceramic Coating',
        bullets: [
          'Deep, showroom-quality gloss and shine',
          'Enhanced paint protection',
          'Superior water beading and hydrophobic properties',
          'Easier cleaning and maintenance',
          'Protection against UV damage and fading',
          'Long-lasting results compared to waxes and sealants',
        ],
      },
      {
        heading: 'Important to Know',
        body: [
          'Ceramic coatings provide excellent protection, but they are not bulletproof. They do not prevent rock chips, deep scratches, or collision damage.',
          'Proper paint preparation—which includes a paint correction process and professional installation—are critical to achieving the best appearance and longevity.',
        ],
      },
    ],
  },
  'window-tint': {
    slug: 'window-tint',
    title: 'Window Tinting',
    metaDescription:
      'Professional automotive window tint in Lynbrook, NY. Reduce heat, block UV rays, minimize glare, and enhance privacy with premium tint films.',
    imageSlug: 'window-tint',
    intro: [
      'Enhance the appearance, comfort, and protection of your vehicle with professional window tint installation.',
      "Window tint does more than improve your vehicle's look—it helps reduce heat, block harmful UV rays, minimize glare, and increase privacy for both you and your passengers. Whether you're looking for a subtle factory appearance or maximum heat rejection, we offer premium films designed for long-lasting performance and clarity.",
    ],
    sections: [
      {
        heading: 'Benefits of Window Tint',
        bullets: [
          'Reduces interior heat and improves comfort',
          'Blocks up to 99% of harmful UV rays',
          'Protects interior surfaces from fading and cracking',
          'Reduces glare for a more comfortable driving experience',
          'Enhances privacy and security',
          'Gives your vehicle a clean, refined appearance',
        ],
      },
    ],
  },
}

export function getServicePageContent(slug: string): ServicePageContent | null {
  return SERVICE_PAGES[slug] ?? null
}

export function getServicePageSlugs(): string[] {
  return Object.keys(SERVICE_PAGES)
}
