import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Playfair_Display, Hanken_Grotesk } from 'next/font/google'
import CookieBanner from '@/components/CookieBanner'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const hanken = Hanken_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '600'],
  variable: '--font-hanken',
  display: 'swap',
})

const SITE_URL = 'https://private-travel-club.com'
const SITE_TITLE = 'PRIVATE TRAVEL CLUB ❖ Worldwide Travel & Concierge Services'
const SITE_DESCRIPTION =
  'Planning of exclusive and luxurious trips ❖ Villas, chalets, castles, apartments & hotels ❖ Yacht charter and private jets ❖ Premium car and helicopter transfers ❖ Concierge services'
const OG_IMAGE = '/images/tild6439-3935-4165-b833-643364353265__bage.webp'

const GOOGLE_VERIFICATION  = process.env.GOOGLE_VERIFICATION ?? ''
const YANDEX_VERIFICATION  = process.env.YANDEX_VERIFICATION ?? ''
const YM_ID                = process.env.YANDEX_METRIKA_ID ?? ''
const GTM_ID             = 'GTM-P98B23LC'
const GA_ID              = 'G-7L449TL3SM'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Private Travel Club',
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/icon.svg` },
  image: `${SITE_URL}${OG_IMAGE}`,
  description:
    'Planning of exclusive and luxurious trips. Villas, chalets, castles, apartments & hotels. Yacht charter and private jets. Premium car and helicopter transfers. Concierge services.',
  priceRange: '$$$',
  telephone: '+4915140365107',
  email: 'contact@private-travel-club.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sudetenstraße 12',
    addressLocality: 'Ebensfeld',
    postalCode: '96250',
    addressCountry: 'DE',
  },
  availableLanguage: [
    { '@type': 'Language', name: 'English' },
    { '@type': 'Language', name: 'Russian' },
    { '@type': 'Language', name: 'German' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | Private Travel Club` },
  description: SITE_DESCRIPTION,
  keywords: [
    'luxury travel', 'private travel club', 'concierge services',
    'villa rental', 'yacht charter', 'private jet', 'exclusive trips',
    'luxury vacation', 'bespoke travel', 'private concierge', 'luxury tour operator',
  ],
  authors: [{ name: 'Private Travel Club' }],
  creator: 'Private Travel Club',
  publisher: 'Private Travel Club',
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'x-default': SITE_URL,
      en: SITE_URL,
      ru: `${SITE_URL}/ru`,
      de: `${SITE_URL}/de`,
    },
  },
  openGraph: {
    type: 'website', locale: 'en_US', alternateLocale: ['ru_RU', 'de_DE'],
    url: SITE_URL, siteName: 'Private Travel Club',
    title: SITE_TITLE, description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Private Travel Club' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE, description: SITE_DESCRIPTION, images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: '/images/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/images/icon.svg',
  },
verification: GOOGLE_VERIFICATION.length > 0 ? { google: GOOGLE_VERIFICATION } : {},
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = (await headers()).get('x-locale') ?? 'en'
  return (
    <html lang={locale} className={`${playfair.variable} ${hanken.variable}`}>
      <head>
        {YM_ID.length > 0 && (
          <script dangerouslySetInnerHTML={{
            __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${YM_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`,
          }} />
        )}
        <link rel="preload" href="/fonts/ptc-sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#0d0d0d" />
        {YANDEX_VERIFICATION.length > 0 && <meta name="yandex-verification" content={YANDEX_VERIFICATION} />}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');` }} />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var p=new URLSearchParams(location.search),k=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','yclid'],o={},h=false;for(var i=0;i<k.length;i++){var v=p.get(k[i]);if(v){o[k[i]]=v;h=true}}if(h){o._landing=location.pathname;sessionStorage.setItem('ptc_utm',JSON.stringify(o))}}catch(e){}})();` }} />
      </head>
      <body>
        <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} /></noscript>
        {YM_ID.length > 0 && (
          <noscript>
            <div><img src={`https://mc.yandex.ru/watch/${YM_ID}`} style={{ position: 'absolute', left: '-9999px' }} alt="" /></div>
          </noscript>
        )}
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
