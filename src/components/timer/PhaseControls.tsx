import { motion } from 'framer-motion'
import type { TimerAction, TimerPhase } from '../types'

type Props = {
  phase: TimerPhase
  dispatch: (action: TimerAction) => void
  onStart?: () => void
  workDuration: number  // ✅ en secondes pour afficher la durée active
}

const DURATIONS = [20, 25, 30, 45, 50]  // minutes

export function PhaseControls({ phase, dispatch, onStart, workDuration }: Props) {
  const isRunning = phase === 'WORK' || phase === 'SHORT_BREAK' || phase === 'LONG_BREAK'
  const isPaused  = phase === 'PAUSED'
  const isIdle    = phase === 'IDLE'
  const activeMins = Math.round(workDuration / 60)

  const label = isIdle ? '▶  Démarrer' : isRunning ? '⏸  Pause' : '▶  Reprendre'

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 12
    }}>

      {/* ✅ Boutons de durée */}
      <div style={{ display: 'flex', gap: 8 }}>
        {DURATIONS.map(min => (
          <motion.button
            key={min}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.08 }}
            onClick={() => dispatch({ type: 'SET_WORK_DURATION', payload: min })}
            style={{
              padding: '5px 12px',
              borderRadius: 999,
              border: activeMins === min
                ? '2px solid #EF4444'
                : '1px solid rgba(255,255,255,0.15)',
              background: activeMins === min
                ? 'rgba(239,68,68,0.25)'
                : 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(8px)',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: activeMins === min ? 700 : 400,
              fontFamily: 'monospace',
              transition: 'all 0.2s',
              boxShadow: activeMins === min
                ? '0 0 12px rgba(239,68,68,0.3)'
                : 'none'
            }}
          >
            {min}:00
          </motion.button>
        ))}
      </div>

      {/* Boutons Start/Pause + Reset */}
      <div style={{
        display: 'flex', gap: 12, alignItems: 'center',
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(16px)',
        padding: '10px 20px',
        borderRadius: 999,
        border: '1px solid rgba(255,255,255,0.12)'
      }}>
        <motion.button
          data-action="start"
          whileTap={{ scale: 0.93 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            if (isIdle) {
              if (onStart) onStart()
              else dispatch({ type: 'START' })
            }
            if (isRunning) dispatch({ type: 'PAUSE' })
            if (isPaused)  dispatch({ type: 'RESUME' })
          }}
          style={{
            padding: '12px 32px',
            borderRadius: 999,
            border: 'none',
            background: 'rgba(239,68,68,0.9)',
            color: '#fff',
            cursor: 'pointer',
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '0.02em',
            boxShadow: '0 0 24px rgba(239,68,68,0.5)',
          }}
        >
          {label}
        </motion.button>

        <div style={{
          width: 1, height: 28,
          background: 'rgba(255,255,255,0.15)'
        }} />

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
          }}
        >
          ↺ Reset
        </motion.button>
      </div>
    </div>
  )
}