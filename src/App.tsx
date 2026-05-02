import { PomoTimer } from './components/timer/PomoTimer'
import { PhaseControls } from './components/timer/PhaseControls'
import { useTimer } from './components/timer/useTimer'

export default function App() {
  const { state, dispatch, progress, timeDisplay } = useTimer()

  return (
    <div style={{ display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 32, padding: 48 }}>
      <PomoTimer
        progress={progress}
        timeDisplay={timeDisplay}
        phase={state.phase}
      />
      <PhaseControls phase={state.phase} dispatch={dispatch} />
    </div>
  )
}