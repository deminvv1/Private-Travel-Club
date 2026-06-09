import { NextResponse } from 'next/server'

const SITE_URL = 'https://private-travel-club.com'

const pages = [
  { path: '',                             changeFreq: 'monthly' },
  { path: '/villas',                      changeFreq: 'monthly' },
  { path: '/yachts',                      changeFreq: 'monthly' },
  { path: '/jets',                        changeFreq: 'monthly' },
  { path: '/concierge',                   changeFreq: 'monthly' },
  { path: '/destinations/maldives',       changeFreq: 'monthly' },
  { path: '/destinations/seychelles',     changeFreq: 'monthly' },
  { path: '/destinations/greece',         changeFreq: 'monthly' },
  { path: '/destinations/italy',          changeFreq: 'monthly' },
  { path: '/destinations/french-riviera', changeFreq: 'monthly' },
  { path: '/destinations/switzerland',    changeFreq: 'monthly' },
  { path: '/destinations/dubai',          changeFreq: 'monthly' },
  { path: '/destinations/cappadocia',     changeFreq: 'monthly' },
]

export const revalidate = 0

export async function GET() {
  const lastmod = new Date().toISOString().split('T')[0]

  const urls = pages.flatMap(({ path, changeFreq }) => {
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
    <changefreq>${changeFreq}</changefreq>${alternates}
  </url>`,
      `
  <url>
    <loc>${ruUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changeFreq}</changefreq>${alternates}
  </url>`,
      `
  <url>
    <loc>${deUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changeFreq}</changefreq>${alternates}
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
