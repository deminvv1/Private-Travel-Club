export interface ExperienceCard {
  title: string
  body: string
  image: string
  imageAlt: string
}

export interface RegionCard {
  name: string
  body: string
  image: string
  imageAlt: string
}

export interface ServiceCard {
  title: string
  body: string
  icon: 'villa' | 'yacht' | 'jet' | 'helicopter' | 'concierge' | 'car'
}

export interface FAQ {
  question: string
  answer: string
}

export interface DestinationData {
  slug: string
  lang: 'en' | 'ru'
  name: string
  nameLocative?: string

  seoTitle: string
  seoDescription: string
  canonicalPath: string

  heroHeading: string
  heroSubheading: string
  heroImage: string
  heroImageAlt: string

  whyUsHeading: string
  whyUsBody: string

  experiencesHeading: string
  experiences: ExperienceCard[]

  regionsHeading: string
  regions: RegionCard[]

  servicesHeading: string
  services: ServiceCard[]

  faqsHeading: string
  faqs: FAQ[]

  ctaHeading: string
  ctaSubtext: string
}
