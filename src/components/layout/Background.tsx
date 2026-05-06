import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BACKGROUNDS = [
  { id: 'ensab1', src: '/backgrounds/background1.jfif', label: 'Nature' },
  { id: 'ensab2', src: '/backgrounds/téléchargement(1).jfif', label: 'Pets' },
  { id: 'ensab3', src: '/backgrounds/téléchargement(2).jfif', label: 'Anime' },
]

export function Background() {
  const [selected, setSelected] = useState(BACKGROUNDS[0])
  const [showPicker, setShowPicker] = useState(false)

  return (
    <>
      {/* Background actif */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed', inset: 0, zIndex: -1,
            backgroundImage: `url(${selected.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>

      {/* Overlay sombre */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -1,
        background: 'rgba(0,0,0,0.45)'
      }} />

      {/* Bouton pour ouvrir le sélecteur */}
      <motion.button
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setShowPicker(!showPicker)}
        style={{
          position: 'fixed',
          top: 20, right: 24,
          zIndex: 200,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 999,
          padding: '8px 16px',
          color: '#fff',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}
      >
        🖼️ Background
      </motion.button>

      {/* Sélecteur de photos */}
      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 60, right: 24,
              zIndex: 200,
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 16,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              minWidth: 180
            }}
          >
            <span style={{
              color: '#fff', fontSize: 12,
              fontWeight: 600, opacity: 0.6,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              Choisir un fond
            </span>

            {BACKGROUNDS.map(bg => (
              <motion.button
                key={bg.id}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setSelected(bg)
                  setShowPicker(false)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 10px',
                  borderRadius: 10,
                  border: selected.id === bg.id
                    ? '2px solid #EF4444'
                    : '1px solid rgba(255,255,255,0.1)',
                  background: selected.id === bg.id
                    ? 'rgba(239,68,68,0.2)'
                    : 'rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'all 0.15s'
                }}
              >
                {/* Miniature */}
                <div style={{
                  width: 48, height: 32,
                  borderRadius: 6,
                  backgroundImage: `url(${bg.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  flexShrink: 0,
                  border: '1px solid rgba(255,255,255,0.1)'
                }} />
                <span style={{
                  color: '#fff', fontSize: 13,
                  fontWeight: selected.id === bg.id ? 700 : 400
                }}>
                  {bg.label}
                </span>
                {selected.id === bg.id && (
                  <span style={{ marginLeft: 'auto', color: '#EF4444' }}>✓</span>
                )}
              </motion.button>
            ))}

            {/* Option couleur unie */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 6
            }}>
              <span style={{
                color: '#fff', fontSize: 11,
                opacity: 0.5, letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}>
                Couleur unie
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                {['#0a0a0a', '#0D1F0F', '#0C1A2E', '#1C0A00'].map(color => (
                  <button
                    key={color}
                    onClick={() => {
                      setSelected({ id: color, src: '', label: color })
                      setShowPicker(false)
                    }}
                    style={{
                      width: 28, height: 28,
                      borderRadius: 8,
                      background: color,
                      border: selected.id === color
                        ? '2px solid #EF4444'
                        : '1px solid rgba(255,255,255,0.2)',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}