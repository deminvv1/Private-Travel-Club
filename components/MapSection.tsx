export default function MapSection({ src }: { src: string }) {
  return (
    <div style={{ width: '100%', background: '#1f4b85', lineHeight: 0 }}>
      <iframe
        src={src}
        width="100%"
        height="420"
        style={{ border: 0, display: 'block' }}
        loading="lazy"
        allowFullScreen
      />
    </div>
  )
}
