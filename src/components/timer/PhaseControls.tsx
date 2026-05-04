import type { Dispatch } from 'react'
import type { TimerAction } from './timerReducer'

interface Props {
  dispatch: Dispatch<TimerAction>
  isRunning: boolean
}

export function PhaseControls({ dispatch, isRunning }: Props) {
  return (
    <div className="flex gap-4 mt-6 justify-center">
      <button
        onClick={() => dispatch({ type: isRunning ? 'PAUSE' : 'START' })}
        className="px-8 py-3 rounded-xl bg-red-500 text-white font-bold text-lg hover:bg-red-600 transition"
      >
        {isRunning ? '⏸ Pause' : '▶ Démarrer'}
      </button>
      <button
        onClick={() => dispatch({ type: 'RESET' })}
        className="px-8 py-3 rounded-xl bg-gray-600 text-white font-bold text-lg hover:bg-gray-700 transition"
      >
        🔄 Reset
      </button>
    </div>
  )
}