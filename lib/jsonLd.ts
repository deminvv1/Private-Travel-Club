import type { FAQ } from './types'

export function faqSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function breadcrumbSchema(
  destinationName: string,
  lang: 'en' | 'ru' | 'de',
  slug: string
) {
  const base = 'https://private-travel-club.com'
  const prefix = lang === 'en' ? '' : `/${lang}`
  const destinationsLabel = lang === 'ru' ? 'Направления' : lang === 'de' ? 'Reiseziele' : 'Destinations'

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${base}${prefix}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: destinationsLabel,
        item: `${base}${prefix}/destinations`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: destinationName,
        item: `${base}${prefix}/destinations/${slug}`,
      },
    ],
  }
}
