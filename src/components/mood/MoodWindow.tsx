import { motion } from 'framer-motion'
import { useMoodStore } from '../../stores/moodStore'

type Mood = 'great' | 'good' | 'meh' | 'bad'

interface Props {
  onSelect: (mood: Mood) => void
  onClose: () => void
}

const MOODS = [
  { value: 'great' as Mood, emoji: '😄', label: 'Super' },
  { value: 'good'  as Mood, emoji: '🙂', label: 'Bien'  },
  { value: 'meh'   as Mood, emoji: '😐', label: 'Moyen' },
  { value: 'bad'   as Mood, emoji: '😞', label: 'Difficile' },
]

export default function MoodWindow({ onSelect, onClose }: Props) {
  const setMood = useMoodStore((s) => s.setMood)

  function handleSelect(mood: Mood) {
    setMood(mood)
    onSelect(mood)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.3, ease: 'backOut' }}
        style={{
          width: 320,
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 28,
          padding: '32px 28px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* Icône */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ fontSize: 36 }}
        >
          🌿
        </motion.div>

        {/* Titre */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            margin: 0, color: '#fff',
            fontSize: 18, fontWeight: 700,
            letterSpacing: '-0.01em'
          }}>
            Comment tu te sens ?
          </h2>
          <p style={{
            margin: '6px 0 0',
            color: 'rgba(255,255,255,0.4)',
            fontSize: 12
          }}>
            Avant de commencer ta session
          </p>
        </div>

        {/* Boutons mood */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 10, width: '100%'
        }}>
          {MOODS.map(({ value, emoji, label }) => (
            <motion.button
              key={value}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.08 }}
              onClick={() => handleSelect(value)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                padding: '14px 8px',
                borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 24 }}>{emoji}</span>
              <span style={{
                fontSize: 10,
                color: 'rgba(255,255,255,0.5)',
                fontWeight: 500
              }}>
                {label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Bouton passer */}
<motion.button
  whileTap={{ scale: 0.96 }}
  onClick={onClose}  // ✅ onClose déclenche START dans DraggableTimer
  style={{
    background: 'none',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 999,
    padding: '8px 24px',
    color: 'rgba(255,255,255,0.35)',
    cursor: 'pointer',
    fontSize: 12,
    transition: 'all 0.2s'
  }}
>
  Passer →
</motion.button>
      </motion.div>
    </motion.div>
  )
}