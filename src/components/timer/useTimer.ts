import { useReducer, useEffect, useRef } from 'react'
import { timerReducer, INITIAL_STATE, phaseDuration } from './timerReducer'

export function useTimer() {
  const [state, dispatch] = useReducer(timerReducer, INITIAL_STATE)
  const rafRef = useRef<number | null>(null)
  const lastTickRef = useRef<number | null>(null)
  const dispatchRef = useRef(dispatch)

  useEffect(() => {
    const isRunning =
      state.phase === 'WORK' ||
      state.phase === 'SHORT_BREAK' ||
      state.phase === 'LONG_BREAK'

    if (!isRunning) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastTickRef.current = null
      return
    }

    function tick(now: number) {
      if (lastTickRef.current !== null) {
        const elapsed = (now - lastTickRef.current) / 1000
        dispatchRef.current({ type: 'TICK', payload: { elapsed } })
      }
      lastTickRef.current = now
      rafRef.current = requestAnimationFrame(tick)
    }

    lastTickRef.current = null
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [state.phase])

  const total = phaseDuration(state)
  const remaining = Math.max(0, total - state.elapsed)
  const progress = total > 0 ? state.elapsed / total : 0

  const minutes = Math.floor(remaining / 60).toString().padStart(2, '0')
  const seconds = Math.floor(remaining % 60).toString().padStart(2, '0')

  return {
    state,
    dispatch,
    remaining,
    progress,
    timeDisplay: `${minutes}:${seconds}`
  }
}