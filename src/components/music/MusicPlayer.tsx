import { useState } from 'react'
import { AudioEngine } from './AudioEngine'

type Track = {
  id: string
  name: string
  src: string
  emoji: string
}

const AMBIENT_TRACKS: Track[] = [
  { id: 'rain',   name: 'Pluie',        src: '/sounds/rain.mp3',   emoji: '🌧️' },
  { id: 'cafe',   name: 'Café',         src: '/sounds/cafe.mp3',   emoji: '☕' },
  { id: 'forest', name: 'Forêt',        src: '/sounds/forest.mp3', emoji: '🌿' },
  { id: 'focus',  name: 'Focus',        src: '/sounds/focus.mp3',  emoji: '🎯' },
]

export function MusicPlayer() {
  const [playing, setPlaying] = useState<string | null>(null)
  const [volume, setVolume] = useState(0.7)

  function toggleTrack(track: Track) {
    if (playing === track.id) {
      AudioEngine.pause()
      setPlaying(null)
    } else {
      AudioEngine.play(track.src)
      setPlaying(track.id)
    }
  }

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const v = parseFloat(e.target.value)
    setVolume(v)
    AudioEngine.setVolume(v)
  }

  return (
    <div style={{ padding: 16 }}>
      {/* Tracks */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
        {AMBIENT_TRACKS.map(track => (
          <button
            key={track.id}
            onClick={() => toggleTrack(track)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: 999,
              border: playing === track.id
                ? '2px solid #EF4444'
                : '1px solid rgba(255,255,255,0.15)',
              background: playing === track.id
                ? 'rgba(239,68,68,0.2)'
                : 'transparent',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 13,
              transition: 'all 0.2s'
            }}
          >
            <span>{track.emoji}</span>
            <span>{track.name}</span>
          </button>
        ))}
      </div>

      {/* Volume */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: '#fff', fontSize: 12, opacity: 0.6 }}>🔈</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={handleVolume}
          style={{ flex: 1, accentColor: '#EF4444' }}
        />
        <span style={{ color: '#fff', fontSize: 12, opacity: 0.6 }}>🔊</span>
      </div>
    </div>
  )
}