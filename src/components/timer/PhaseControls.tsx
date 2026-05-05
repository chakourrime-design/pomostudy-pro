import { motion } from 'framer-motion'
import type { TimerAction, TimerPhase } from '../types'

type Props = {
  phase: TimerPhase
  dispatch: (action: TimerAction) => void
}

export function PhaseControls({ phase, dispatch }: Props) {
  const isRunning = phase === 'WORK' || phase === 'SHORT_BREAK' || phase === 'LONG_BREAK'
  const isPaused  = phase === 'PAUSED'
  const isIdle    = phase === 'IDLE'

  const label = isIdle ? '▶  Démarrer' : isRunning ? '⏸  Pause' : '▶  Reprendre'

  return (
    <div style={{
      display: 'flex', gap: 12, alignItems: 'center',
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(16px)',
      padding: '10px 20px',
      borderRadius: 999,
      border: '1px solid rgba(255,255,255,0.12)'
    }}>
      {/* Bouton principal */}
      <motion.button
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          if (isIdle)    dispatch({ type: 'START' })
          if (isRunning) dispatch({ type: 'PAUSE' })
          if (isPaused)  dispatch({ type: 'RESUME' })
        }}
        style={{
          padding: '12px 32px',
          borderRadius: 999,
          border: 'none',
          background: isRunning
            ? 'rgba(239,68,68,0.85)'
            : 'rgba(239,68,68,0.9)',
          color: '#fff',
          cursor: 'pointer',
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: '0.02em',
          boxShadow: '0 0 24px rgba(239,68,68,0.5)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {label}
      </motion.button>

      {/* Séparateur */}
      <div style={{
        width: 1, height: 28,
        background: 'rgba(255,255,255,0.15)'
      }} />

      {/* Bouton Reset */}
      <motion.button
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => dispatch({ type: 'RESET' })}
        style={{
          padding: '10px 20px',
          borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(255,255,255,0.08)',
          color: '#fff',
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 500,
          backdropFilter: 'blur(8px)',
        }}
      >
        ↺ Reset
      </motion.button>
    </div>
  )
}