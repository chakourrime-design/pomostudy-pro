import { motion } from 'framer-motion'
import type { TimerAction, TimerPhase } from '@/components/types'

type Props = {
  phase: TimerPhase
  dispatch: (action: TimerAction) => void
}

export function PhaseControls({ phase, dispatch }: Props) {
  const isRunning = phase === 'WORK' || phase === 'SHORT_BREAK' || phase === 'LONG_BREAK'
  const isPaused  = phase === 'PAUSED'
  const isIdle    = phase === 'IDLE'

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>

      {/* Reset */}
      <motion.button
        whileTap={{ scale: 0.93 }}
        onClick={() => dispatch({ type: 'RESET' })}
        style={{
          padding: '10px 20px',
          borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'transparent',
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 500
        }}
      >
        Reset
      </motion.button>

      {/* Start / Pause / Resume */}
      <motion.button
        whileTap={{ scale: 0.93 }}
        onClick={() => {
          if (isIdle)    dispatch({ type: 'START' })
          if (isRunning) dispatch({ type: 'PAUSE' })
          if (isPaused)  dispatch({ type: 'RESUME' })
        }}
        style={{
          padding: '12px 32px',
          borderRadius: 999,
          border: 'none',
          background: '#EF4444',
          color: '#fff',
          cursor: 'pointer',
          fontSize: 16,
          fontWeight: 700,
          boxShadow: '0 0 20px rgba(239,68,68,0.4)'
        }}
      >
        {isIdle ? 'Démarrer' : isRunning ? 'Pause' : 'Reprendre'}
      </motion.button>

    </div>
  )
}