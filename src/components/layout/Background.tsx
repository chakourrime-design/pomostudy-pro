import { useState, useEffect } from 'react'

const BACKGROUNDS = [
  '/backgrounds/téléchargement.jfif',
  '/backgrounds/téléchargement.png',
  './Club-Logo.png',
]

export function Background() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % BACKGROUNDS.length)
    }, 8000) // change toutes les 8 secondes
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
      {BACKGROUNDS.map((bg, i) => (
        <div
          key={bg}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
          }}
        />
      ))}
      {/* Overlay sombre pour lisibilité */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.45)'
      }} />
    </div>
  )
}