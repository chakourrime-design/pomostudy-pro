import { useEffect, useState, useRef } from 'react'
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

// ─── COMPOSANT FENÊTRE FLOTTANTE ────────────────────────────────
function FloatingWindow({
  filiere, setFiliere, subject, setSubject
}: {
  filiere: string
  setFiliere: (f: string) => void
  subject: string
  setSubject: (s: string) => void
}) {
  const { state, dispatch, progress, timeDisplay } = useTimer(subject)

  // Position par défaut
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 190,
    y: window.innerHeight / 2 - 260
  })

  // State pour le curseur et l'animation (évite l'erreur isDragging en rouge)
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

          // Aesthetic WonderSpace : Fond semi-transparent pour voir le Background
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
          gap: 20,
          transition: activeDrag ? 'none' : 'transform 0.2s ease',
          transform: activeDrag ? 'scale(1.02)' : 'scale(1)'
        }}
      >
        <div style={{
          width: 40, height: 4, borderRadius: 10,
          background: 'rgba(255,255,255,0.2)', marginBottom: 4
        }} />

        <div onMouseDown={e => e.stopPropagation()} style={{ width: '100%' }}>
          <SubjectSelector
            filiere={filiere}
            selected={subject}
            onSelect={(s: string) => setSubject(s)}
            onFiliereChange={(f: string) => {
              setFiliere(f)
              setSubject('')
            }}
          />
        </div>

        <PomoTimer
          progress={progress}
          timeDisplay={timeDisplay}
          phase={state.phase}
          size={230}
        />

        <div style={{ display: 'flex', gap: 8 }}>
          {Array.from({ length: state.config.pomosBeforeLongBreak }).map((_, i) => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: '50%',
              background: i < state.pomosCompleted % state.config.pomosBeforeLongBreak
                ? '#FF5F5F' : 'rgba(255,255,255,0.2)',
              transition: 'background 0.3s'
            }} />
          ))}
        </div>

        <div onMouseDown={e => e.stopPropagation()}>
          <PhaseControls phase={state.phase} dispatch={dispatch} />
        </div>

        <div onMouseDown={e => e.stopPropagation()} style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <SoundPicker />
          <FocusButton />
        </div>
      </div>
    </div>
  )
}

// ─── COMPOSANT APP PRINCIPAL ────────────────────────────────────
export default function App() {
  const [filiere, setFiliere] = useState('')
  const [subject, setSubject] = useState('')
  
  // Utilisation du hook pour les notifications globales
  const { state } = useTimer(subject)

  useEffect(() => {
    requestNotificationPermission()
  }, [])

  useEffect(() => {
    if (state.phase === 'SHORT_BREAK' || state.phase === 'LONG_BREAK') {
      sendNotification('Pomodoro terminé !', 'C\'est l\'heure de la pause 🎉')
    }
  }, [state.phase])

  return (
    <FocusModeOverlay>
      <div style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: "'Inter', sans-serif"
      }}>
        {/* Le fond est placé ici pour être derrière tout le reste */}
        <Background />

        {/* Interface Fixe (Header) */}
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 32px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)',
          pointerEvents: 'none'
        }}>
          <div style={{ pointerEvents: 'all' }}><Logo /></div>
          <div style={{ pointerEvents: 'all' }}><DateTimeClock /></div>
        </div>

        {/* Fenêtre de travail Draggable */}
        <FloatingWindow
          filiere={filiere}
          setFiliere={setFiliere}
          subject={subject}
          setSubject={setSubject}
        />

        {/* Barre d'outils basse */}
        <BottomBar />
      </div>
    </FocusModeOverlay>
  )
}