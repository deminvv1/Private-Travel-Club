'use client'

import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed', bottom: 80, right: 28,
        zIndex: 8000, width: 46, height: 46,
        background: '#fff', border: 'none',
        borderRadius: '50%', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        transition: 'background 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#1f4b85'
        e.currentTarget.style.transform = 'translateY(-2px)'
        const arrow = e.currentTarget.querySelector('svg') as SVGElement
        if (arrow) arrow.style.stroke = '#fff'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = '#fff'
        e.currentTarget.style.transform = 'translateY(0)'
        const arrow = e.currentTarget.querySelector('svg') as SVGElement
        if (arrow) arrow.style.stroke = '#1f4b85'
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
        style={{ stroke: '#1f4b85', transition: 'stroke 0.2s' }}>
        <path d="M9 14V4M4 9l5-5 5 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
