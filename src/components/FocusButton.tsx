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
    >
      {isFull ? '✕ Quitter le focus' : "🎯 Let's Focus"}
    </button>
  )
}