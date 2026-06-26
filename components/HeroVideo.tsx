'use client'

import { useEffect, useRef } from 'react'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const src = window.innerWidth < 768
      ? '/video/hero-mobile.mp4'
      : '/video/hero.mp4'
    video.src = src
    video.load()
    video.play().catch(() => {})
  }, [])

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      poster="/images/first-cadr.webp"
      style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        objectFit: 'cover', zIndex: 0,
      }}
    />
  )
}
