import type { MetadataRoute } from 'next'

const SITE_URL = 'https://private-travel-club.com'

const pages = [
  { path: '',          priority: 1,   changeFrequency: 'monthly' as const },
  { path: '/villas',   priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/yachts',   priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/jets',     priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/concierge',priority: 0.8, changeFrequency: 'monthly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority, changeFrequency }) => {
    // English lives at the root (no /en/ prefix) — middleware redirects /en/* → /*
    const enUrl = path ? `${SITE_URL}${path}` : SITE_URL
    return {
      url: enUrl,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          'x-default': enUrl,
          en: enUrl,
          ru: `${SITE_URL}/ru${path}`,
          de: `${SITE_URL}/de${path}`,
        },
      },
    }
  })
}
