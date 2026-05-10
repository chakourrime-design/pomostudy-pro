import { motion, AnimatePresence } from 'framer-motion'
import type { TimerPhase } from '../types'

type Props = {
  phase: TimerPhase
  children: React.ReactNode
}

const PHASE_GRADIENTS: Record<TimerPhase, string> = {
  IDLE:        'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
  WORK:        'radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)',
  SHORT_BREAK: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
  LONG_BREAK:  'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
  PAUSED:      'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
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
    <div style={{ position: 'relative' }}>

      {/* Fond animé selon la phase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'fixed', inset: 0,
            background: PHASE_GRADIENTS[phase],
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
      </AnimatePresence>

      {/* Notification de changement de phase */}
      <AnimatePresence>
        {phase !== 'IDLE' && (
          <motion.div
            key={`msg-${phase}`}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'backOut' }}
            style={{
              position: 'fixed',
              top: 80, left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 200,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 999,
              padding: '8px 20px',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              pointerEvents: 'none',
              whiteSpace: 'nowrap'
            }}
          >
            {PHASE_MESSAGES[phase]}
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </div>
  )
}