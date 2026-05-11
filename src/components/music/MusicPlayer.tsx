import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AudioEngine } from './AudioEngine'

type Track = {
  id: string
  name: string
  src: string
  emoji: string
  category: 'ambient' | 'playlist'
}

type SpotifyStatus = 'disconnected' | 'connecting' | 'connected'

// ── Sons d'ambiance inclus ──────────────────────────────────────
const AMBIENT_TRACKS: Track[] = [
  { id: 'rain',     name: 'Pluie',      src: '/sounds/rainAndThunder.mp3',       emoji: '🌧️', category: 'ambient' },
  { id: 'cafe',     name: 'Cheminée',   src: '/sounds/CampfireWoods.mp3',        emoji: '🔥', category: 'ambient' },
  { id: 'forest',   name: 'Forêt',      src: '/sounds/forestBirds.mp3',          emoji: '🌿', category: 'ambient' },
  { id: 'focus',    name: 'Focus',      src: '/sounds/BackgroundMusicFocus.mp3', emoji: '🎯', category: 'ambient' },
  { id: 'waves',    name: 'Vagues',     src: '/sounds/waves.mp3',                emoji: '🌊', category: 'ambient' },
]

// ── Playlist intégrée (lofi libres de droits) ──────────────────
const PLAYLIST_TRACKS: Track[] = [
  {
    id: 'lofi1', name: 'Lofi Study', emoji: '🎵', category: 'playlist',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 'lofi2', name: 'Chill Beats', emoji: '🎶', category: 'playlist',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: 'lofi3', name: 'Deep Focus', emoji: '🧠', category: 'playlist',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: 'lofi4', name: 'Night Study', emoji: '🌙', category: 'playlist',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
]

export function MusicPlayer() {
  const [playing, setPlaying] = useState<string | null>(null)
  const [volume, setVolume] = useState(0.7)
  const [activeTab, setActiveTab] = useState<'ambient' | 'playlist' | 'spotify'>('ambient')
  const [spotifyStatus, setSpotifyStatus] = useState<SpotifyStatus>('disconnected')
  const [spotifyUrl, setSpotifyUrl] = useState('')
  const [customTracks, setCustomTracks] = useState<Track[]>([])
  const [newTrackName, setNewTrackName] = useState('')
  const [newTrackUrl, setNewTrackUrl] = useState('')

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

  function handleSpotifyConnect() {
    if (!spotifyUrl.trim()) return
    setSpotifyStatus('connecting')
    setTimeout(() => {
      setSpotifyStatus('connected')
    }, 1500)
  }

  function handleAddTrack() {
    if (!newTrackName.trim() || !newTrackUrl.trim()) return
    const track: Track = {
      id: `custom-${Date.now()}`,
      name: newTrackName.trim(),
      src: newTrackUrl.trim(),
      emoji: '🎵',
      category: 'playlist'
    }
    setCustomTracks(prev => [...prev, track])
    setNewTrackName('')
    setNewTrackUrl('')
  }

  function handleRemoveTrack(id: string) {
    if (playing === id) {
      AudioEngine.pause()
      setPlaying(null)
    }
    setCustomTracks(prev => prev.filter(t => t.id !== id))
  }

  const inputStyle: React.CSSProperties = {
    flex: 1,
    padding: '8px 12px',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.12)',
    background: 'rgba(255,255,255,0.06)',
    color: '#fff',
    fontSize: 12,
    outline: 'none',
  }

  // ── Composant bouton track ──────────────────────────────────────
  function TrackButton({ track }: { track: Track }) {
    const isPlaying = playing === track.id
    return (
      <motion.button
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.04 }}
        onClick={() => toggleTrack(track)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '9px 16px',
          borderRadius: 999,
          border: isPlaying
            ? '2px solid #EF4444'
            : '1px solid rgba(255,255,255,0.12)',
          background: isPlaying
            ? 'rgba(239,68,68,0.2)'
            : 'rgba(255,255,255,0.05)',
          color: '#fff',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: isPlaying ? 600 : 400,
          transition: 'all 0.2s',
          boxShadow: isPlaying ? '0 0 12px rgba(239,68,68,0.25)' : 'none'
        }}
      >
        <motion.span
          animate={isPlaying ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ repeat: isPlaying ? Infinity : 0, duration: 1.2 }}
        >
          {isPlaying ? '▶️' : track.emoji}
        </motion.span>
        <span>{track.name}</span>
        {isPlaying && (
          <motion.div
            style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}
          >
            {[1, 2, 3].map(i => (
              <motion.div
                key={i}
                animate={{ height: ['4px', '12px', '4px'] }}
                transition={{
                  repeat: Infinity, duration: 0.8,
                  delay: i * 0.15, ease: 'easeInOut'
                }}
                style={{
                  width: 3, background: '#EF4444',
                  borderRadius: 2, minHeight: 4
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.button>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* ── Tabs ─────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', gap: 4,
        background: 'rgba(255,255,255,0.05)',
        borderRadius: 12, padding: 4
      }}>
        {([
          { id: 'ambient',  label: '🌿 Ambiance' },
          { id: 'playlist', label: '🎵 Playlist'  },
          { id: 'spotify',  label: '🎧 Spotify'   },
        ] as { id: typeof activeTab; label: string }[]).map(tab => (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1, padding: '7px 0',
              borderRadius: 8, border: 'none',
              background: activeTab === tab.id
                ? 'rgba(255,255,255,0.12)'
                : 'transparent',
              color: activeTab === tab.id
                ? '#fff'
                : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: activeTab === tab.id ? 700 : 400,
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* ── Contenu selon tab ─────────────────────────────────── */}
      <AnimatePresence mode="wait">

        {/* Sons d'ambiance */}
        {activeTab === 'ambient' && (
          <motion.div
            key="ambient"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
          >
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {AMBIENT_TRACKS.map(track => (
                <TrackButton key={track.id} track={track} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Playlist */}
        {activeTab === 'playlist' && (
          <motion.div
            key="playlist"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            {/* Tracks intégrés */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <p style={{
                margin: 0, fontSize: 10,
                color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                Inclus
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {PLAYLIST_TRACKS.map(track => (
                  <TrackButton key={track.id} track={track} />
                ))}
              </div>
            </div>

            {/* Tracks personnalisés */}
            {customTracks.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <p style={{
                  margin: 0, fontSize: 10,
                  color: 'rgba(255,255,255,0.35)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}>
                  Mes ajouts
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {customTracks.map(track => (
                    <div key={track.id} style={{
                      display: 'flex', alignItems: 'center', gap: 8
                    }}>
                      <TrackButton track={track} />
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemoveTrack(track.id)}
                        style={{
                          background: 'rgba(239,68,68,0.1)',
                          border: '1px solid rgba(239,68,68,0.2)',
                          borderRadius: 8,
                          padding: '6px 10px',
                          color: '#FCA5A5',
                          cursor: 'pointer',
                          fontSize: 12
                        }}
                      >
                        ✕
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ajouter un lien MP3 */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: 12,
              display: 'flex', flexDirection: 'column', gap: 8
            }}>
              <p style={{
                margin: 0, fontSize: 10,
                color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                Ajouter un lien MP3
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  placeholder="Nom"
                  value={newTrackName}
                  onChange={e => setNewTrackName(e.target.value)}
                  style={{ ...inputStyle, maxWidth: 100 }}
                />
                <input
                  placeholder="URL du fichier .mp3"
                  value={newTrackUrl}
                  onChange={e => setNewTrackUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddTrack()}
                  style={inputStyle}
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAddTrack}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 10, border: 'none',
                    background: '#EF4444',
                    color: '#fff', cursor: 'pointer',
                    fontSize: 16, fontWeight: 700,
                    boxShadow: '0 0 12px rgba(239,68,68,0.3)'
                  }}
                >
                  +
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Spotify */}
        {activeTab === 'spotify' && (
          <motion.div
            key="spotify"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {spotifyStatus === 'disconnected' && (
              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 16, padding: '8px 0'
              }}>
                <div style={{ fontSize: 40 }}>🎧</div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{
                    margin: 0, color: '#fff',
                    fontSize: 14, fontWeight: 600
                  }}>
                    Connecter Spotify
                  </p>
                  <p style={{
                    margin: '4px 0 0',
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: 11
                  }}>
                    Collez l'URL d'une playlist Spotify
                  </p>
                </div>

                <input
                  placeholder="https://open.spotify.com/playlist/..."
                  value={spotifyUrl}
                  onChange={e => setSpotifyUrl(e.target.value)}
                  style={{ ...inputStyle, width: '100%', textAlign: 'center' }}
                />

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={handleSpotifyConnect}
                  style={{
                    padding: '12px 32px',
                    borderRadius: 999, border: 'none',
                    background: 'linear-gradient(135deg, #1DB954, #17a348)',
                    color: '#fff', cursor: 'pointer',
                    fontSize: 14, fontWeight: 700,
                    boxShadow: '0 0 24px rgba(29,185,84,0.35)',
                    width: '100%'
                  }}
                >
                  🎵 Connecter
                </motion.button>
              </div>
            )}

            {spotifyStatus === 'connecting' && (
              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 12, padding: '16px 0'
              }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  style={{ fontSize: 32 }}
                >
                  🔄
                </motion.div>
                <p style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: 13, margin: 0
                }}>
                  Connexion en cours...
                </p>
              </div>
            )}

            {spotifyStatus === 'connected' && (
              <div style={{
                display: 'flex', flexDirection: 'column', gap: 12
              }}>
                {/* Badge connecté */}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  gap: 10, padding: '10px 14px',
                  background: 'rgba(29,185,84,0.1)',
                  border: '1px solid rgba(29,185,84,0.25)',
                  borderRadius: 12
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: '#1DB954',
                    boxShadow: '0 0 8px rgba(29,185,84,0.8)'
                  }} />
                  <span style={{
                    color: '#fff', fontSize: 13, fontWeight: 600
                  }}>
                    Spotify connecté
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setSpotifyStatus('disconnected')
                      setSpotifyUrl('')
                    }}
                    style={{
                      marginLeft: 'auto',
                      background: 'none', border: 'none',
                      color: 'rgba(255,255,255,0.3)',
                      cursor: 'pointer', fontSize: 12
                    }}
                  >
                    Déconnecter
                  </motion.button>
                </div>

                {/* Iframe Spotify */}
                {spotifyUrl && (
                  <iframe
                    src={spotifyUrl.replace('open.spotify.com', 'open.spotify.com/embed')}
                    width="100%"
                    height="200"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{
                      borderRadius: 16,
                      border: 'none',
                    }}
                  />
                )}
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>

      {/* ── Volume (toujours visible) ─────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        borderTop: '1px solid rgba(255,255,255,0.07)',
        paddingTop: 12
      }}>
        <span style={{ color: '#fff', fontSize: 14, opacity: 0.5 }}>🔈</span>
        <input
          type="range"
          min={0} max={1} step={0.05}
          value={volume}
          onChange={handleVolume}
          style={{ flex: 1, accentColor: '#EF4444' }}
        />
        <span style={{ color: '#fff', fontSize: 14, opacity: 0.5 }}>🔊</span>
        <span style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: 11, minWidth: 28,
          textAlign: 'right'
        }}>
          {Math.round(volume * 100)}%
        </span>
      </div>

    </div>
  )
}