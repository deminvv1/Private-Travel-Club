import { NextResponse } from 'next/server'

const SITE_URL = 'https://private-travel-club.com'

const pages = [
  { path: '',           priority: '1.0', changeFreq: 'monthly' },
  { path: '/villas',    priority: '0.8', changeFreq: 'monthly' },
  { path: '/yachts',    priority: '0.8', changeFreq: 'monthly' },
  { path: '/jets',      priority: '0.8', changeFreq: 'monthly' },
  { path: '/concierge', priority: '0.8', changeFreq: 'monthly' },
  ...['maldives','seychelles','greece','italy','french-riviera','switzerland','dubai','cappadocia']
    .map(slug => ({ path: `/destinations/${slug}`, priority: '0.8', changeFreq: 'monthly' })),
]

export const revalidate = 0

export async function GET() {
  const lastmod = new Date().toISOString().split('T')[0]

  const urls = pages.flatMap(({ path, priority, changeFreq }) => {
    const enUrl = path ? `${SITE_URL}${path}` : SITE_URL
    const ruUrl = `${SITE_URL}/ru${path}`
    const deUrl = `${SITE_URL}/de${path}`

    const alternates = `
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${ruUrl}"/>
    <xhtml:link rel="alternate" hreflang="de" href="${deUrl}"/>`

    return [
      `
  <url>
    <loc>${enUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>${alternates}
  </url>`,
      `
  <url>
    <loc>${ruUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>${alternates}
  </url>`,
      `
  <url>
    <loc>${deUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>${alternates}
  </url>`,
    ]
  }).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  })
}
