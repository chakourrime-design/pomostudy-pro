import type { TimerState, TimerConfig } from '../types'
import { TimerAction } from '../types'
export type { TimerAction }

export const DEFAULT_CONFIG: TimerConfig = {
  workDuration: 1500,
  shortBreak: 300,
  longBreak: 900,
  pomosBeforeLongBreak: 4,
  dailyGoal: 8
}

export const INITIAL_STATE: TimerState = {
  phase: 'IDLE',
  elapsed: 0,
  pomosCompleted: 0,
  config: DEFAULT_CONFIG
}

export function phaseDuration(state: TimerState): number {
  switch (state.phase) {
    case 'WORK':        return state.config.workDuration
    case 'SHORT_BREAK': return state.config.shortBreak
    case 'LONG_BREAK':  return state.config.longBreak
    default:            return state.config.workDuration
  }
}

function nextPhase(pomosCompleted: number, pomosBeforeLongBreak: number): TimerState['phase'] {
  return pomosCompleted % pomosBeforeLongBreak === 0
    ? 'LONG_BREAK'
    : 'SHORT_BREAK'
}

export function timerReducer(state: TimerState, action: TimerAction): TimerState {
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
      return { ...state, phase: 'WORK' }

    case 'RESET':
      return { ...INITIAL_STATE, config: state.config }

    // ✅ NOUVEAU : changer la durée de travail
    case 'SET_WORK_DURATION':
      return {
        ...state,
        phase: 'IDLE',
        elapsed: 0,
        config: {
          ...state.config,
          workDuration: action.payload * 60  // minutes → secondes
        }
      }

    case 'TICK': {
      if (state.phase !== 'WORK' &&
          state.phase !== 'SHORT_BREAK' &&
          state.phase !== 'LONG_BREAK') return state

      const newElapsed = state.elapsed + action.payload.elapsed
      const total = phaseDuration(state)
      if (newElapsed >= total) {
        return timerReducer(state, { type: 'PHASE_COMPLETE' })
      }
      return { ...state, elapsed: newElapsed }
    }

    case 'PHASE_COMPLETE': {
      if (state.phase !== 'WORK' &&
          state.phase !== 'SHORT_BREAK' &&
          state.phase !== 'LONG_BREAK') return state

      const isWork = state.phase === 'WORK'
      const newPomos = isWork ? state.pomosCompleted + 1 : state.pomosCompleted
      const nextPh: TimerState['phase'] = isWork
        ? nextPhase(newPomos, state.config.pomosBeforeLongBreak)
        : 'IDLE'

      return { ...state, phase: nextPh, elapsed: 0, pomosCompleted: newPomos }
    }

    case 'SET_CONFIG':
      return { ...state, config: action.payload }

    default:
      return state
  }
}