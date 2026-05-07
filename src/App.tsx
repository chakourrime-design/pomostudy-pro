import { useEffect, useState, useRef } from 'react'
import { PomoTimer } from './components/timer/PomoTimer'
import { PhaseControls } from './components/timer/PhaseControls'
import { useTimer } from './components/timer/useTimer'
import { SubjectSelector } from './components/subjects/SubjectSelector'
import { TaskManager } from './components/tasks/TasksManager' // Importation de la tâche 23
import { requestNotificationPermission, sendNotification } from './services/NotificationAPI'
import { Background } from './components/layout/Background'
import { Logo } from './components/ui/Logo'
import { BottomBar } from './components/layout/BottomBar'
import { DateTimeClock } from './components/DateTimeClock'
import SoundPicker from './components/SoundPicker'
import { FocusModeOverlay } from './components/FocusModeOverlay'
import { FocusButton } from './components/FocusButton'

// ─── COMPOSANT FENÊTRE FLOTTANTE ────────────────────────────────
function FloatingWindow({
  subject, setSubject
}: {
  subject: string
  setSubject: (s: string) => void
}) {
  const { state, dispatch, progress, timeDisplay } = useTimer(subject)

  // Position par défaut centrée
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 190,
    y: window.innerHeight / 2 - 300
  })

  const [activeDrag, setActiveDrag] = useState(false)
  const isDragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  function onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    isDragging.current = true
    setActiveDrag(true)
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }
  }

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isDragging.current) return
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y
    })
  }

  function onMouseUp() {
    isDragging.current = false
    setActiveDrag(false)
  }

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}
    >
      <div
        onMouseDown={onMouseDown}
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          pointerEvents: 'all',
          cursor: activeDrag ? 'grabbing' : 'grab',
          userSelect: 'none',
          width: 380,
          background: 'rgba(15, 15, 15, 0.4)', 
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          borderRadius: 40,
          border: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '24px 24px 32px',
          boxShadow: activeDrag 
            ? '0 30px 80px rgba(0,0,0,0.5)' 
            : '0 15px 50px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          transition: activeDrag ? 'none' : 'transform 0.2s ease',
          transform: activeDrag ? 'scale(1.01)' : 'scale(1)'
        }}
      >
        {/* Handle de drag */}
        <div style={{
          width: 40, height: 4, borderRadius: 10,
          background: 'rgba(255,255,255,0.2)', marginBottom: 2
        }} />

        {/* POMO-22: SubjectSelector */}
        <div onMouseDown={e => e.stopPropagation()} style={{ width: '100%' }}>
          <SubjectSelector onSelectSubject={(s: string) => setSubject(s)} />
        </div>

        {/* POMO-23: TaskManager (Juste sous le sélecteur) */}
        <div onMouseDown={e => e.stopPropagation()} style={{ width: '100%' }}>
          <TaskManager currentSubject={subject} />
        </div>

        <PomoTimer
          progress={progress}
          timeDisplay={timeDisplay}
          phase={state.phase}
          size={210}
        />

        {/* Indicateurs de progression (Pomodoros) */}
        <div style={{ display: 'flex', gap: 8 }}>
          {Array.from({ length: state.config.pomosBeforeLongBreak }).map((_, i) => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: '50%',
              background: i < state.pomosCompleted % state.config.pomosBeforeLongBreak
                ? '#FF5F5F' : 'rgba(255,255,255,0.2)',
              transition: 'background 0.3s'
            }} />
          ))}
        </div>

        {/* Contrôles du Timer */}
        <div onMouseDown={e => e.stopPropagation()}>
          <PhaseControls phase={state.phase} dispatch={dispatch} />
        </div>

        {/* Actions secondaires */}
        <div onMouseDown={e => e.stopPropagation()} style={{ display: 'flex', gap: 12, marginTop: 4 }}>
          <SoundPicker />
          <FocusButton />
        </div>
      </div>
    </div>
  )
}

// ─── COMPOSANT APP PRINCIPAL ────────────────────────────────────
export default function App() {
  const [subject, setSubject] = useState('')
  const { state } = useTimer(subject)

  useEffect(() => {
    requestNotificationPermission()
  }, [])

  useEffect(() => {
    if (state.phase === 'SHORT_BREAK' || state.phase === 'LONG_BREAK') {
      sendNotification('Pomodoro terminé !', `C'est l'heure de la pause après votre session de ${subject || 'travail'} 🎉`)
    }
  }, [state.phase, subject])

  return (
    <FocusModeOverlay>
      <div style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: "'Inter', sans-serif",
        backgroundColor: '#000'
      }}>
        <Background />

        {/* Header */}
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 40px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)',
          pointerEvents: 'none'
        }}>
          <div style={{ pointerEvents: 'all' }}><Logo /></div>
          <div style={{ pointerEvents: 'all' }}><DateTimeClock /></div>
        </div>

        <FloatingWindow
          subject={subject}
          setSubject={setSubject}
        />

        <BottomBar />
      </div>
    </FocusModeOverlay>
  )
}