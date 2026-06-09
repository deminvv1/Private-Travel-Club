/** @type {import('next').NextConfig} */
const nextConfig = {
  // Убирает заголовок X-Powered-By: Next.js — не раскрываем стек
  poweredByHeader: false,
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async headers() {
    return [
      // Кэш для статики Next.js
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // Кэш для шрифтов и изображений
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // Безопасность для всех страниц
      {
        source: '/(.*)',
        headers: [
          // Запрет встраивания в iframe — защита от clickjacking
          { key: 'X-Frame-Options', value: 'DENY' },
          // Браузер не угадывает MIME-тип — защита от content sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Только HTTPS, 2 года, с preload
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // Referrer: только origin при переходе на другой домен
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Отключаем доступ к камере, микрофону, геолокации, платежам
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
          // Защита от cross-origin атак через window.opener
          // allow-popups нужен для WhatsApp/Instagram ссылок target="_blank"
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          // Наши ресурсы нельзя загрузить с чужих сайтов
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
          // DNS prefetch для ускорения загрузки
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ]
  },
}

export default nextConfig