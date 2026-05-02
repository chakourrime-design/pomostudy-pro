import type { TimerState, TimerAction, TimerConfig } from '@/components/types'

export const DEFAULT_CONFIG: TimerConfig = {
  workDuration: 1500,         // 25 min
  shortBreak: 300,            // 5 min
  longBreak: 900,             // 15 min
  pomosBeforeLongBreak: 4,
  dailyGoal: 8
}

export const INITIAL_STATE: TimerState = {
  phase: 'IDLE',
  elapsed: 0,
  pomosCompleted: 0,
  config: DEFAULT_CONFIG
}

// Calcule la durée totale de la phase courante
export function phaseDuration(state: TimerState): number {
  switch (state.phase) {
    case 'WORK':        return state.config.workDuration
    case 'SHORT_BREAK': return state.config.shortBreak
    case 'LONG_BREAK':  return state.config.longBreak
    default:            return state.config.workDuration
  }
}

// Détermine la prochaine phase
function nextPhase(pomosCompleted: number, pomosBeforeLongBreak: number): TimerState['phase'] {
  // pomosCompleted est déjà le NOUVEAU total (après incrément)
  return pomosCompleted % pomosBeforeLongBreak === 0
    ? 'LONG_BREAK'
    : 'SHORT_BREAK'
}

export function timerReducer(
  state: TimerState,
  action: TimerAction
): TimerState {
  switch (action.type) {

    case 'START':
      if (state.phase !== 'IDLE') return state
      return { ...state, phase: 'WORK', elapsed: 0 }

    case 'PAUSE':
      if (state.phase !== 'WORK' &&
          state.phase !== 'SHORT_BREAK' &&
          state.phase !== 'LONG_BREAK') return state
      return { ...state, phase: 'PAUSED' }

    case 'RESUME':
      if (state.phase !== 'PAUSED') return state
      // On reprend en WORK par défaut
      // (amélioration future : mémoriser la phase avant pause)
      return { ...state, phase: 'WORK' }

    case 'RESET':
      return { ...INITIAL_STATE, config: state.config }

    case 'TICK': {
      if (
        state.phase !== 'WORK' &&
        state.phase !== 'SHORT_BREAK' &&
        state.phase !== 'LONG_BREAK'
      ) return state

      const newElapsed = state.elapsed + action.payload.elapsed
      const total = phaseDuration(state)

      // Phase terminée
      if (newElapsed >= total) {
        return timerReducer(state, { type: 'PHASE_COMPLETE' })
      }
      return { ...state, elapsed: newElapsed }
    }

    // Dans le switch :
case 'PHASE_COMPLETE': {
  if (state.phase !== 'WORK' && 
      state.phase !== 'SHORT_BREAK' && 
      state.phase !== 'LONG_BREAK') return state

  const isWork = state.phase === 'WORK'
  const newPomos = isWork ? state.pomosCompleted + 1 : state.pomosCompleted

  // Déterminer la prochaine phase
  let nextPh: TimerState['phase']
  if (isWork) {
    nextPh = nextPhase(newPomos, state.config.pomosBeforeLongBreak)
  } else {
    nextPh = 'IDLE'
  }

  return {
    ...state,
    phase: nextPh,
    elapsed: 0,
    pomosCompleted: newPomos
  }
}

    case 'SET_CONFIG':
      return { ...state, config: action.payload }

    default:
      return state
  }
}