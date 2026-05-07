import { useEffect, useState, useRef } from 'react'
import { PomoTimer } from './components/timer/PomoTimer'
import { PhaseControls } from './components/timer/PhaseControls'
import { useTimer } from './components/timer/useTimer'
import { SubjectSelector } from './components/subjects/SubjectSelector'
import { TaskManager } from './components/tasks/TasksManager'
import { Background } from './components/layout/Background'
import { Logo } from './components/ui/Logo'
import { DateTimeClock } from './components/DateTimeClock'
import { FocusButton } from './components/FocusButton'
import SoundPicker from './components/SoundPicker'
import { FocusModeOverlay } from './components/FocusModeOverlay'
import { BottomBar } from './components/layout/BottomBar'
import { StreakBadge } from './components/StreakBadge' // Import du nouveau badge

function FloatingWindow({ subject, setSubject }: { subject: string, setSubject: (s: string) => void }) {
  // Récupération du streak depuis notre hook personnalisé
  const { state, dispatch, progress, timeDisplay, streak } = useTimer(subject)
  
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 190, y: 120 })
  const [activeDrag, setActiveDrag] = useState(false)
  const isDragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      setPosition({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y })
    }
    const onMouseUp = () => {
      isDragging.current = false
      setActiveDrag(false)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return (
    <div
      onMouseDown={(e) => {
        isDragging.current = true
        setActiveDrag(true)
        offset.current = { x: e.clientX - position.x, y: e.clientY - position.y }
      }}
      style={{
        position: 'absolute',
        left: position.x, top: position.y,
        width: 380, zIndex: 50,
        background: 'rgba(15, 15, 15, 0.4)', // Légèrement plus sombre pour le contraste
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        borderRadius: 40,
        border: '1px solid rgba(255, 255, 255, 0.12)',
        padding: '20px 24px 32px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        cursor: activeDrag ? 'grabbing' : 'grab',
        boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
        pointerEvents: 'all'
      }}
    >
      {/* Barre de drag + Badge de Streak */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: '100%',
        marginBottom: 4 
      }}>
        <div style={{ width: 40, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 10 }} />
        <StreakBadge count={streak} />
      </div>
      
      {/* Sélecteur de matière */}
      <div onMouseDown={e => e.stopPropagation()} style={{ width: '100%' }}>
        <SubjectSelector onSelectSubject={setSubject} />
      </div>

      {/* Gestionnaire de tâches (le Pomo-25) */}
      <div onMouseDown={e => e.stopPropagation()} style={{ width: '100%' }}>
        <TaskManager currentSubject={subject} />
      </div>

      {/* Cercle de progression Pomodoro */}
      <PomoTimer progress={progress} timeDisplay={timeDisplay} phase={state.phase} size={200} />

      {/* Contrôles Play/Pause/Reset */}
      <div onMouseDown={e => e.stopPropagation()}>
        <PhaseControls phase={state.phase} dispatch={dispatch} />
      </div>

      {/* Sélecteur de son + Bouton Focus */}
      <div onMouseDown={e => e.stopPropagation()} style={{ display: 'flex', gap: 15, marginTop: 10 }}>
        <SoundPicker />
        <FocusButton />
      </div>
    </div>
  )
}

export default function App() {
  const [subject, setSubject] = useState('')

  return (
    <FocusModeOverlay>
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'relative', 
        overflow: 'hidden',
        backgroundColor: 'transparent' 
      }}>
        {/* Composant de fond global */}
        <Background />

        {/* Barre d'en-tête fixe (Logo + Horloge) */}
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, 
          padding: '30px 50px', display: 'flex', justifyContent: 'space-between', 
          zIndex: 100, pointerEvents: 'none' 
        }}>
          <div style={{ pointerEvents: 'all' }}><Logo /></div>
          <div style={{ pointerEvents: 'all' }}><DateTimeClock /></div>
        </div>

        {/* Fenêtre interactive */}
        <FloatingWindow subject={subject} setSubject={setSubject} />

        {/* Barre de navigation basse (Thèmes, Musique, Stats) */}
        <BottomBar />
      </div>
    </FocusModeOverlay>
  )
}