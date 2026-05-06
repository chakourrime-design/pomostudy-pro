import { useState, useEffect } from 'react'
import { fullscreenManager } from '../utils/fullscreenManager'

export function FocusButton() {
  const [isFull, setIsFull] = useState(false)

  useEffect(() => {
    const handler = () => setIsFull(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  return (
    <button
      className="focus-btn"
      onClick={() => fullscreenManager.toggle()}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 22px',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        // Dégradé inspiré de WonderSpace (un peu corail/rouge doux)
        background: isFull 
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'linear-gradient(135deg, rgba(255, 107, 107, 0.8), rgba(238, 82, 83, 0.8))',
        backdropFilter: 'blur(10px)',
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isFull 
          ? 'none' 
          : '0 4px 15px rgba(238, 82, 83, 0.3)',
        outline: 'none',
        userSelect: 'none'
      }}
      // Effet de scale au survol via JS pour rester dans le style inline
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <span style={{ fontSize: '18px' }}>
        {isFull ? '✕' : '🎯'}
      </span>
      <span style={{ letterSpacing: '0.02em' }}>
        {isFull ? 'Quitter le focus' : "Let's Focus"}
      </span>
    </button>
  )
}