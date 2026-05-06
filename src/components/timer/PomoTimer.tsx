import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { TimerPhase } from '../types'
import { requestNotificationPermission } from '../../services/notificationService'

type Props = {
  progress: number
  timeDisplay: string
  phase: TimerPhase
  size?: number
}

const PHASE_COLORS: Record<TimerPhase, string> = {
  IDLE:        '#ffffff',
  WORK:        '#EF4444',
  SHORT_BREAK: '#22C55E',
  LONG_BREAK:  '#3B82F6',
  PAUSED:      '#F59E0B'
}

const PHASE_LABELS: Record<TimerPhase, string> = {
  IDLE:        'Prêt',
  WORK:        'Focus',
  SHORT_BREAK: 'Pause courte',
  LONG_BREAK:  'Pause longue',
  PAUSED:      'En pause'
}

export function PomoTimer({ progress, timeDisplay, phase, size = 280 }: Props) {
  const center = size / 2
  const strokeWidth = 10
  const radius = center - strokeWidth - 4
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - progress)
  const color = PHASE_COLORS[phase]

  useEffect(() => {
    requestNotificationPermission()
  }, [])

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Cercle de fond */}
        <circle
          cx={center} cy={center} r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={strokeWidth}
        />
        {/* Arc de progression */}
        <motion.circle
          cx={center} cy={center} r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 0.5, ease: 'linear' }}
          initial={false}
        />
      </svg>

      {/* Contenu centré */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 6
      }}>
        {/* Fond flouté derrière le texte */}
        <div style={{
          position: 'absolute',
          width: size * 0.7,
          height: size * 0.4,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(12px)',
          borderRadius: 20,
        }} />

        {/* Temps */}
        <motion.span
          key={timeDisplay}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          style={{
            position: 'relative',
            fontSize: size * 0.2,
            fontWeight: 800,
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-0.02em',
            color: '#ffffff',
            textShadow: `0 0 30px ${color}, 0 2px 8px rgba(0,0,0,0.8)`,
            zIndex: 1
          }}
        >
          {timeDisplay}
        </motion.span>

        {/* Label phase */}
        <span style={{
          position: 'relative',
          fontSize: size * 0.062,
          fontWeight: 600,
          color,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textShadow: '0 1px 4px rgba(0,0,0,0.9)',
          zIndex: 1
        }}>
          {PHASE_LABELS[phase]}
        </span>
      </div>
    </div>
  )
}