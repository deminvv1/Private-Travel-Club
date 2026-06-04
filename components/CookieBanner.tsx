'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const translations = {
  ru: { titleStart: 'Мы используем ', cookieWord: 'cookie', text: 'Для улучшения вашего опыта и анализа трафика. Ваши данные остаются конфиденциальными.', accept: 'Принять', decline: 'Отклонить' },
  de: { titleStart: 'Wir verwenden ', cookieWord: 'Cookies', text: 'Um Ihre Erfahrung zu verbessern und unseren Traffic zu analysieren. Ihre Daten bleiben privat.', accept: 'Akzeptieren', decline: 'Ablehnen' },
  en: { titleStart: 'We use ', cookieWord: 'cookies', text: 'To enhance your experience and analyze our traffic. Your data stays private.', accept: 'Accept', decline: 'Decline' },
}

export default function CookieBanner() {
  const pathname = usePathname()
  const locale = pathname.startsWith('/ru') ? 'ru' : pathname.startsWith('/de') ? 'de' : 'en'
  const t = translations[locale]
  const [visible, setVisible] = useState(false)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('ptc-cookie-consent')) setVisible(true)
  }, [])

  const dismiss = (choice: 'accepted' | 'declined') => {
    setHiding(true)
    setTimeout(() => {
      localStorage.setItem('ptc-cookie-consent', choice)
      setVisible(false)
    }, 380)
  }

  if (!visible) return null

  return (
    <>
      <style>{`
        @keyframes ptc-cookie-in {
          from { opacity: 0; bottom: -80px; }
          to   { opacity: 1; bottom: 24px; }
        }
        @keyframes ptc-cookie-out {
          from { opacity: 1; bottom: 24px; }
          to   { opacity: 0; bottom: -80px; }
        }
        @keyframes ptc-cookie-in-mobile {
          from { opacity: 0; bottom: -120px; }
          to   { opacity: 1; bottom: 0; }
        }
        @keyframes ptc-cookie-out-mobile {
          from { opacity: 1; bottom: 0; }
          to   { opacity: 0; bottom: -120px; }
        }

        .ptc-cookie {
          position: fixed;
          bottom: 24px;
          left: 24px;
          right: 24px;
          margin: 0 auto;
          max-width: 920px;
          z-index: 99999;
          background: rgba(10, 22, 55, 0.05);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
          padding: 18px 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          animation: ptc-cookie-in 0.4s ease-out forwards;
          font-family: 'PTCSans', Arial, sans-serif;
          box-sizing: border-box;
          border-radius: 10px;
        }
        .ptc-cookie.ptc-cookie--out {
          animation: ptc-cookie-out 0.35s ease-in forwards;
        }

        .ptc-cookie__icon {
          font-size: 26px;
          line-height: 1;
          flex-shrink: 0;
        }
        .ptc-cookie__body {
          flex: 1;
          min-width: 0;
        }
        .ptc-cookie__title {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.3px;
          margin: 0 0 3px 0;
        }
        .ptc-cookie__text {
          color: rgba(255, 255, 255, 0.55);
          font-size: 13px;
          line-height: 1.5;
          margin: 0;
        }
        .ptc-cookie__btns {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
          align-items: center;
        }
        .ptc-cookie__accept {
          background: #ffffff;
          color: #0a1637;
          border: none;
          padding: 9px 22px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'PTCSans', Arial, sans-serif;
          letter-spacing: 0.5px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s;
          border-radius: 10px;
        }
        .ptc-cookie__accept:hover { background: #dce4f5; }

        .ptc-cookie__decline {
          background: transparent;
          color: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.18);
          padding: 9px 18px;
          font-size: 13px;
          font-family: 'PTCSans', Arial, sans-serif;
          letter-spacing: 0.3px;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
          border-radius: 10px;
        }
        .ptc-cookie__decline:hover {
          border-color: rgba(255, 255, 255, 0.45);
          color: rgba(255, 255, 255, 0.75);
        }

        @media (max-width: 640px) {
          .ptc-cookie {
            left: 0;
            right: 0;
            bottom: 0;
            max-width: 100%;
            border-left: none;
            border-right: none;
            border-bottom: none;
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            padding: 16px 20px 28px;
            animation: ptc-cookie-in-mobile 0.4s ease-out forwards;
          }
          .ptc-cookie.ptc-cookie--out {
            animation: ptc-cookie-out-mobile 0.35s ease-in forwards;
          }
          .ptc-cookie__icon { display: none; }
          .ptc-cookie__btns {
            gap: 8px;
          }
          .ptc-cookie__accept,
          .ptc-cookie__decline {
            flex: 1;
            text-align: center;
            padding: 12px 8px;
          }
        }
      `}</style>

      <div className={`ptc-cookie${hiding ? ' ptc-cookie--out' : ''}`}>
        <div className="ptc-cookie__icon">
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <mask id="cookie-bite">
                <rect width="32" height="32" fill="white"/>
                <circle cx="26" cy="26" r="8" fill="black"/>
              </mask>
            </defs>
            <circle cx="14" cy="14" r="13" fill="#D4924E" mask="url(#cookie-bite)"/>
            <circle cx="14" cy="14" r="13" fill="none" stroke="#B5733A" strokeWidth="1.2" mask="url(#cookie-bite)"/>
            <g mask="url(#cookie-bite)">
              <circle cx="10"   cy="11"   r="2.2" fill="#5C2D0A"/>
              <circle cx="17"   cy="8.5"  r="2"   fill="#5C2D0A"/>
              <circle cx="12.5" cy="18"   r="2.2" fill="#5C2D0A"/>
              <circle cx="19.5" cy="15.5" r="2"   fill="#5C2D0A"/>
              <circle cx="8"    cy="18.5" r="1.8" fill="#5C2D0A"/>
              <circle cx="16"   cy="21"   r="1.6" fill="#5C2D0A"/>
            </g>
            {/* crumbs near the bite */}
            <circle cx="23.5" cy="19.5" r="1.4" fill="#D4924E"/>
            <circle cx="20.5" cy="23"   r="1.2" fill="#D4924E"/>
            <circle cx="25"   cy="22.5" r="1"   fill="#C07A35"/>
            <circle cx="19.5" cy="21"   r="0.8" fill="#D4924E"/>
          </svg>
        </div>
        <div className="ptc-cookie__body">
          <p className="ptc-cookie__title">
            {t.titleStart}
            <Link href={`/${locale}/cookies`} style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              {t.cookieWord}
            </Link>
          </p>
          <p className="ptc-cookie__text">{t.text}</p>
        </div>
        <div className="ptc-cookie__btns">
          <button className="ptc-cookie__accept" onClick={() => dismiss('accepted')}>
            {t.accept}
          </button>
          <button className="ptc-cookie__decline" onClick={() => dismiss('declined')}>
            {t.decline}
          </button>
        </div>
      </div>
    </>
  )
}