import en from '@/messages/en.json'
import ru from '@/messages/ru.json'
import de from '@/messages/de.json'

export const LOCALES = ['en', 'ru', 'de'] as const
export type Locale = typeof LOCALES[number]
export const DEFAULT_LOCALE: Locale = 'en'

const SITE_URL = 'https://private-travel-club.com'

const messages = { en, ru, de }

export function getT(locale: string) {
  const lang = (LOCALES.includes(locale as Locale) ? locale : DEFAULT_LOCALE) as Locale
  return messages[lang]
}

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale)
}

/**
 * Builds canonical URL and hreflang alternates for a given locale and path.
 * English uses the root URL (no /en/ prefix) per the middleware redirect setup.
 *
 * @param locale - current page locale ('en', 'ru', 'de')
 * @param path   - page path starting with '/' e.g. '/jets', or '' for homepage
 */
export function buildAlternates(locale: string, path: string = '') {
  const enUrl = path ? `${SITE_URL}${path}` : SITE_URL
  const ruUrl = `${SITE_URL}/ru${path}`
  const deUrl = `${SITE_URL}/de${path}`

  const canonical =
    locale === 'ru' ? ruUrl :
    locale === 'de' ? deUrl :
    enUrl

  return {
    canonical,
    languages: {
      'x-default': enUrl,
      en: enUrl,
      ru: ruUrl,
      de: deUrl,
    },
  }
}
