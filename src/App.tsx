import { useEffect } from 'react'
import { PomoTimer } from './components/timer/PomoTimer'
import { PhaseControls } from './components/timer/PhaseControls'
import { useTimer } from './components/timer/useTimer'
import { SubjectSelector } from './subjects/SubjectSelector'
import { requestNotificationPermission } from './services/NotificationAPI'

export default function App() {
  const { state, dispatch, progress, timeDisplay } = useTimer()

  useEffect(() => {
    requestNotificationPermission()
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 32, padding: 48 }}>
      <PomoTimer
        progress={progress}
        timeDisplay={timeDisplay}
        phase={state.phase}
      />
      <PhaseControls phase={state.phase} dispatch={dispatch} />
      <SubjectSelector />
    </div>
  )
}