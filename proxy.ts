import { NextRequest, NextResponse } from 'next/server'
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n'

function detectLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) return locale
  }
  return DEFAULT_LOCALE
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname === '/sitemap.xml') {
    return NextResponse.rewrite(new URL('/api/sitemap', request.url))
  }

  if (pathname === '/robots.txt') {
    return NextResponse.next()
  }

  const locale = detectLocale(pathname)

  const hasNonDefaultLocale = LOCALES.filter(l => l !== DEFAULT_LOCALE).some(
    l => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  )

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', locale)

  if (hasNonDefaultLocale) {
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const cleanPath = pathname.replace(`/${DEFAULT_LOCALE}`, '') || '/'
    return NextResponse.redirect(new URL(cleanPath, request.url))
  }

  const rewriteResponse = NextResponse.rewrite(
    new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url),
    { request: { headers: requestHeaders } }
  )
  return rewriteResponse
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|video|fonts|css|js|manifest|favicon).*)'],
}
