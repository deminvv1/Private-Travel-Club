import { NextRequest, NextResponse } from 'next/server'
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n'

const COOKIE_NAME = 'ptc-locale'

function detectLocaleFromHeader(acceptLanguage: string | null): string {
  if (!acceptLanguage) return DEFAULT_LOCALE
  const langs = acceptLanguage
    .split(',')
    .map(s => s.split(';')[0].trim().toLowerCase().slice(0, 2))
  for (const lang of langs) {
    if (LOCALES.includes(lang as typeof LOCALES[number])) return lang
  }
  return DEFAULT_LOCALE
}

function getPathLocale(pathname: string): string | null {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) return locale
  }
  return null
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname === '/sitemap.xml') {
    return NextResponse.rewrite(new URL('/api/sitemap', request.url))
  }

  if (pathname === '/robots.txt') {
    return NextResponse.next()
  }

  const pathLocale = getPathLocale(pathname)

  // Path already has a locale prefix
  if (pathLocale) {
    // Redirect /en/... → clean URL (English uses root), update cookie
    if (pathLocale === DEFAULT_LOCALE) {
      const cleanPath = pathname.replace(`/${DEFAULT_LOCALE}`, '') || '/'
      const response = NextResponse.redirect(new URL(cleanPath, request.url))
      response.cookies.set(COOKIE_NAME, DEFAULT_LOCALE, { maxAge: 60 * 60 * 24 * 365, path: '/', sameSite: 'lax' })
      return response
    }
    // Non-English locale: update cookie and pass through
    const response = NextResponse.next({
      request: { headers: new Headers({ ...Object.fromEntries(request.headers), 'x-locale': pathLocale }) },
    })
    response.cookies.set(COOKIE_NAME, pathLocale, { maxAge: 60 * 60 * 24 * 365, path: '/', sameSite: 'lax' })
    return response
  }

  // No locale prefix — detect from cookie or Accept-Language
  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value
  const detectedLocale =
    cookieLocale && LOCALES.includes(cookieLocale as typeof LOCALES[number])
      ? cookieLocale
      : detectLocaleFromHeader(request.headers.get('accept-language'))

  // Non-English detected → redirect so URL reflects the locale
  if (detectedLocale !== DEFAULT_LOCALE) {
    const response = NextResponse.redirect(new URL(`/${detectedLocale}${pathname}`, request.url))
    if (!cookieLocale) {
      response.cookies.set(COOKIE_NAME, detectedLocale, { maxAge: 60 * 60 * 24 * 365, path: '/', sameSite: 'lax' })
    }
    return response
  }

  // English: rewrite internally to /en/... (URL stays clean)
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', DEFAULT_LOCALE)
  const response = NextResponse.rewrite(new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url), {
    request: { headers: requestHeaders },
  })
  if (!cookieLocale) {
    response.cookies.set(COOKIE_NAME, DEFAULT_LOCALE, { maxAge: 60 * 60 * 24 * 365, path: '/', sameSite: 'lax' })
  }
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|video|fonts|css|js|manifest|favicon).*)'],
}
