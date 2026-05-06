import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ✅ Renommé BgOption pour éviter le conflit avec le type global Background
type BgOption = {
  id: string
  src: string
  label: string
  color?: string
}

const BACKGROUNDS = [
  { id: 'ensab1', src: '/backgrounds/background1.jfif', label: 'Nature', color: '' },
  { id: 'ensab2', src: '/backgrounds/téléchargement(1).jfif', label: 'Pets', color: '' },
  { id: 'ensab3', src: '/backgrounds/téléchargement(2).jfif', label: 'Anime', color: '' },
] as const satisfies readonly { id: string; src: string; label: string; color: string }[]

const SOLID_COLORS: BgOption[] = [
  { id: 'color1', src: '', label: 'Noir',   color: '#0a0a0a' },
  { id: 'color2', src: '', label: 'Forêt',  color: '#0D1F0F' },
  { id: 'color3', src: '', label: 'Océan',  color: '#0C1A2E' },
  { id: 'color4', src: '', label: 'Sunset', color: '#1C0A00' },
]

export function Background() {
  const [selected, setSelected] = useState<BgOption>(BACKGROUNDS[0])
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
            backgroundImage: selected.src ? `url(${selected.src})` : 'none',
            backgroundColor: selected.color ?? '#0a0a0a',
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
              minWidth: 200
            }}
          >
            {/* Photos */}
            <span style={{
              color: '#fff', fontSize: 11, fontWeight: 600,
              opacity: 0.5, letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              Photos
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
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: 10,
                  border: selected.id === bg.id
                    ? '2px solid #EF4444'
                    : '1px solid rgba(255,255,255,0.1)',
                  background: selected.id === bg.id
                    ? 'rgba(239,68,68,0.2)'
                    : 'rgba(255,255,255,0.05)',
                  cursor: 'pointer', width: '100%',
                  transition: 'all 0.15s'
                }}
              >
                <div style={{
                  width: 48, height: 32, borderRadius: 6,
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

            {/* Couleurs unies */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: 8,
              display: 'flex', flexDirection: 'column', gap: 8
            }}>
              <span style={{
                color: '#fff', fontSize: 11, opacity: 0.5,
                letterSpacing: '0.06em', textTransform: 'uppercase'
              }}>
                Couleur unie
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                {SOLID_COLORS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelected(c)  // ✅ même type Background
                      setShowPicker(false)
                    }}
                    title={c.label}
                    style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: c.color,
                      border: selected.id === c.id
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