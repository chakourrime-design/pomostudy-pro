<<<<<<< HEAD
import { PomoTimer } from './components/timer/PomoTimer'
import { PhaseControls } from './components/timer/PhaseControls'
import { useTimer } from './components/timer/useTimer'

export default function App() {
  const { state, dispatch, progress, timeDisplay } = useTimer()
=======
import { useEffect } from 'react'                                          // ← AJOUTER
import { PomoTimer } from './components/timer/PomoTimer'
import { PhaseControls } from './components/timer/PhaseControls'
import { useTimer } from './components/timer/useTimer'
import { requestNotificationPermission } from './services/NotificationAPI' // ← AJOUTER

export default function App() {
  const { state, dispatch, progress, timeDisplay } = useTimer()

  // ← AJOUTER : demande permission au démarrage
  useEffect(() => {
    requestNotificationPermission()
  }, [])
>>>>>>> b086c478466bd972ce0a29254e2b3fd79e2d214c

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