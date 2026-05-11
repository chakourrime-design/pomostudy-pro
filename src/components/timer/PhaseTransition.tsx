import { motion, AnimatePresence } from 'framer-motion'
import type { TimerPhase } from '../types'

type Props = {
  phase: TimerPhase
  children: React.ReactNode
}

const PHASE_GRADIENTS: Record<TimerPhase, string> = {
  IDLE:        'transparent',
  WORK:        'radial-gradient(circle at 50% 50%, rgba(239,68,68,0.06) 0%, transparent 70%)',
  SHORT_BREAK: 'radial-gradient(circle at 50% 50%, rgba(34,197,94,0.06) 0%, transparent 70%)',
  LONG_BREAK:  'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)',
  PAUSED:      'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.06) 0%, transparent 70%)',
}

const PHASE_MESSAGES: Record<TimerPhase, string> = {
  IDLE:        '',
  WORK:        '💪 Focus !',
  SHORT_BREAK: '☕ Pause courte',
  LONG_BREAK:  '🌿 Longue pause',
  PAUSED:      '⏸ En pause',
}

export function PhaseTransition({ phase, children }: Props) {
  return (
    <>
      {/* Fond coloré subtil selon phase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${phase}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed', inset: 0,
            background: PHASE_GRADIENTS[phase],
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      </AnimatePresence>

      {/* Message changement de phase */}
      <AnimatePresence>
        {phase !== 'IDLE' && phase !== 'PAUSED' && (
          <motion.div
            key={`msg-${phase}`}
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'backOut' }}
            style={{
              position: 'fixed',
              top: 76, left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 200,
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 999,
              padding: '6px 18px',
              color: '#fff',
              fontSize: 12,
              fontWeight: 600,
              pointerEvents: 'none',
              whiteSpace: 'nowrap'
            }}
          >
            {PHASE_MESSAGES[phase]}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Contenu — zIndex 2 pour être au dessus du fond */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </>
  )
}