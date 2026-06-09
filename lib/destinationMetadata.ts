import type { Metadata } from 'next'
import type { DestinationData } from './types'
import { buildAlternates } from './i18n'

export function destinationMetadata(data: DestinationData, locale: string): Metadata {
  const alternates = buildAlternates(locale, `/destinations/${data.slug}`)
  return {
    title: data.seoTitle,
    description: data.seoDescription,
    alternates,
    openGraph: {
      title: data.seoTitle,
      description: data.seoDescription,
      url: alternates.canonical,
      siteName: 'Private Travel Club',
      images: [
        {
          url: data.heroImage,
          width: 1200,
          height: 630,
          alt: data.heroImageAlt,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.seoTitle,
      description: data.seoDescription,
      images: [data.heroImage],
    },
  }
}
