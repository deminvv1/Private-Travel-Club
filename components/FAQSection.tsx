'use client'

import { useState } from 'react'
import type { FAQ } from '@/lib/types'

interface FAQSectionProps {
  heading: string
  faqs: FAQ[]
}

export function FAQSection({ heading, faqs }: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section style={{ background: '#fafaf9', padding: 'clamp(64px,8vw,120px) 0' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 clamp(24px,5vw,60px)' }}>

        <div style={{ marginBottom: 64 }}>
          <span style={{
            display: 'block',
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#a8a29e',
            marginBottom: 16,
          }}>
            FAQ
          </span>
          <h2 style={{
            fontFamily: 'PTCSans, Arial, sans-serif',
            fontSize: 'clamp(22px,2.6vw,36px)',
            fontWeight: 300,
            color: '#1c1917',
            lineHeight: 1.2,
            margin: 0,
          }}>
            {heading}
          </h2>
        </div>

        <div>
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                style={{
                  borderTop: i === 0 ? '1px solid #e7e5e4' : 'none',
                  borderBottom: '1px solid #e7e5e4',
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 24,
                    padding: '28px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: 'PTCSans, Arial, sans-serif',
                    fontSize: 'clamp(14px,1.2vw,17px)',
                    fontWeight: 400,
                    color: '#1c1917',
                    lineHeight: 1.4,
                    flex: 1,
                  }}>
                    {faq.question}
                  </span>

                  <span style={{
                    flexShrink: 0,
                    width: 32,
                    height: 32,
                    border: '1px solid #d6d3d1',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border-color 0.2s, background 0.2s',
                    background: isOpen ? '#1c1917' : 'transparent',
                    borderColor: isOpen ? '#1c1917' : '#d6d3d1',
                  }}>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      style={{
                        transition: 'transform 0.3s',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      <line x1="6" y1="0" x2="6" y2="12" stroke={isOpen ? '#fff' : '#78716c'} strokeWidth="1.2"/>
                      <line x1="0" y1="6" x2="12" y2="6" stroke={isOpen ? '#fff' : '#78716c'} strokeWidth="1.2"/>
                    </svg>
                  </span>
                </button>

                <div style={{
                  overflow: 'hidden',
                  maxHeight: isOpen ? 600 : 0,
                  transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
                }}>
                  <p style={{
                    fontFamily: 'PTCSans, Arial, sans-serif',
                    fontSize: 'clamp(13px,1.1vw,16px)',
                    fontWeight: 300,
                    color: '#78716c',
                    lineHeight: 1.75,
                    margin: 0,
                    paddingBottom: 28,
                    paddingRight: 56,
                    maxWidth: 680,
                  }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
