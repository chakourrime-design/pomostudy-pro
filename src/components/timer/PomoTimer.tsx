import { motion } from 'framer-motion'
import type { TimerPhase } from '@/components/types'

type Props = {
  progress: number        // 0 → 1
  timeDisplay: string     // "24:59"
  phase: TimerPhase
  size?: number           // px, défaut 280
}

// Couleur selon la phase
const PHASE_COLORS: Record<TimerPhase, string> = {
  IDLE:        '#6B7280',   // gris
  WORK:        '#EF4444',   // rouge tomate
  SHORT_BREAK: '#10B981',   // vert
  LONG_BREAK:  '#3B82F6',   // bleu
  PAUSED:      '#F59E0B'    // ambre
}

const PHASE_LABELS: Record<TimerPhase, string> = {
  IDLE:        'Prêt',
  WORK:        'Focus',
  SHORT_BREAK: 'Pause courte',
  LONG_BREAK:  'Pause longue',
  PAUSED:      'Pause'
}

export function PomoTimer({ progress, timeDisplay, phase, size = 280 }: Props) {
  const center = size / 2
  const strokeWidth = 10
  const radius = center - strokeWidth - 4
  const circumference = 2 * Math.PI * radius

  // L'arc part du haut (-90°) et avance dans le sens horaire
  const dashOffset = circumference * (1 - progress)
  const color = PHASE_COLORS[phase]

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
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          opacity={0.1}
        />

        {/* Arc de progression */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
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

      {/* Texte centré sur le SVG */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4
      }}>
        {/* Temps */}
        <motion.span
          key={timeDisplay}
          initial={{ opacity: 0.6, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            fontSize: size * 0.18,
            fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-0.02em',
            color
          }}
        >
          {timeDisplay}
        </motion.span>

        {/* Label de phase */}
        <span style={{
          fontSize: size * 0.06,
          fontWeight: 500,
          opacity: 0.5,
          letterSpacing: '0.08em',
          textTransform: 'uppercase'
        }}>
          {PHASE_LABELS[phase]}
        </span>
      </div>
    </div>
  )
}