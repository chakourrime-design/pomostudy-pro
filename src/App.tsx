import { useEffect, useState } from 'react'
import { PomoTimer } from './components/timer/PomoTimer'
import { PhaseControls } from './components/timer/PhaseControls'
import { useTimer } from './components/timer/useTimer'
import { SubjectSelector } from './components/subjects/SubjectSelector'
import { requestNotificationPermission, sendNotification } from './services/NotificationAPI'
import { Background } from './components/layout/Background'
import { Logo } from './components/ui/Logo'
import { BottomBar } from './components/layout/BottomBar'
import { DateTimeClock } from './components/DateTimeClock'
import SoundPicker from './components/SoundPicker'
import { FocusModeOverlay } from './components/FocusModeOverlay'
import { FocusButton } from './components/FocusButton'

export default function App() {
  const [filiere, setFiliere] = useState('')
  const [subject, setSubject] = useState('')
  const { state, dispatch, progress, timeDisplay } = useTimer(subject)

  useEffect(() => {
    requestNotificationPermission()
  }, [])

  useEffect(() => {
    if (state.phase === 'SHORT_BREAK' || state.phase === 'LONG_BREAK') {
      sendNotification('Pomodoro terminé !', 'Temps de pause 🎉')
    }
  }, [state.phase])

  return (
    <FocusModeOverlay>
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <Background />

        <div style={{
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center',
          padding: '32px 16px 120px',
          gap: 24,
          minHeight: '100vh',
        }}>

          {/* Header : Logo à gauche, Clock centrée */}
          <div style={{
            width: '100%', maxWidth: 480,
            display: 'flex', justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', left: 0 }}>
              <Logo />
            </div>
            <DateTimeClock />
          </div>

          <SubjectSelector
            filiere={filiere}
            selected={subject}
            onSelect={(s: string) => setSubject(s)}
            onFiliereChange={(f: string) => {
              setFiliere(f)
              setSubject('')
            }}
          />

          <PomoTimer progress={progress} timeDisplay={timeDisplay} phase={state.phase} />
          <PhaseControls phase={state.phase} dispatch={dispatch} />
          <SoundPicker />
          <FocusButton />
        </div>

        <BottomBar />
      </div>
    </FocusModeOverlay>
  )
}