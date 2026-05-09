import { useState, useRef } from 'react'
import { PomoTimer } from './PomoTimer'
import { PhaseControls } from './PhaseControls'
import { useTimer } from './useTimer'
import MoodWindow from '../mood/MoodWindow'       // ← POMO-29
import { useMoodStore } from '../../stores/moodStore' // ← POMO-29
 type Mood = 'great' | 'good' | 'meh' | 'bad'            // ← POMO-29

interface DraggableTimerProps {
  selectedSubject: string;
}

export function DraggableTimer({ selectedSubject }: DraggableTimerProps) {
  const { state, dispatch, progress, timeDisplay } = useTimer(selectedSubject)

  // ── POMO-29 : Mood ──────────────────────────────────────────────
  const { currentMood, setMood, clearMood } = useMoodStore()
  const [showMoodWindow, setShowMoodWindow] = useState(false)
  // ────────────────────────────────────────────────────────────────

  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 150, y: 80 })
  const [isHovered, setIsHovered] = useState(false)
  const [activeDrag, setActiveDrag] = useState(false)

  const isDragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  function onMouseDown(e: React.MouseEvent) {
    isDragging.current = true
    setActiveDrag(true)
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }
  }

  function onMouseMove(e: React.MouseEvent) {
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

  // ── POMO-29 : intercepte le START pour demander le mood ─────────
  function handleStart() {
    if (!currentMood) {
      // Pas encore de mood → ouvre la modal avant de démarrer
      setShowMoodWindow(true)
      return
    }
    // Mood déjà défini → démarre directement
    dispatch({ type: 'START' })
  }

  function handleMoodSelect(mood: Mood) {
    setMood(mood)
    setShowMoodWindow(false)
    dispatch({ type: 'START' })
  }

  // Appeler clearMood() quand la session se termine
  // (à brancher sur ton event de fin de session dans useTimer si besoin)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleSessionEnd() {
    clearMood()
  }
  // ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── POMO-29 : Modal mood — rendue EN DEHORS du drag wrapper ── */}
      {showMoodWindow && (
        <MoodWindow
          onSelect={handleMoodSelect}
          onClose={() => setShowMoodWindow(false)}
        />
      )}

      <div
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 50
        }}
      >
        <div
          onMouseDown={onMouseDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            pointerEvents: 'all',
            cursor: activeDrag ? 'grabbing' : 'grab',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            userSelect: 'none',
            padding: '32px 24px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            borderRadius: '48px',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: activeDrag
              ? '0 20px 40px rgba(0,0,0,0.2)'
              : '0 10px 25px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease',
            transform: activeDrag ? 'scale(1.03)' : (isHovered ? 'scale(1.01)' : 'scale(1)'),
          }}
        >
          {/* Cercle + temps */}
          <PomoTimer
            progress={progress}
            timeDisplay={timeDisplay}
            phase={state.phase}
            size={220}
          />

          {/* ── POMO-29 : on passe handleStart à PhaseControls ─────── */}
          {/* Si PhaseControls accepte un prop onStart, utilise-le.     */}
          {/* Sinon, voir option B ci-dessous.                           */}
          <div
            onMouseDown={e => e.stopPropagation()}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '4px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {/*
              OPTION A — si PhaseControls accepte un prop onStart :
              <PhaseControls phase={state.phase} dispatch={dispatch} onStart={handleStart} />

              OPTION B — si PhaseControls n'a pas de prop onStart,
              enveloppe le bouton Démarrer dans un intercepteur :
            */}
            <div onClick={(e) => {
              // Intercepte le clic sur le bouton Démarrer uniquement
              const target = e.target as HTMLElement
              const isStartBtn = target.closest('[data-action="start"]')
              if (isStartBtn) {
                e.stopPropagation()
                handleStart()
              }
            }}>
              <PhaseControls phase={state.phase} dispatch={dispatch} />
            </div>
          </div>

          {/* Matière active + mood actuel */}
          <div style={{ fontSize: '12px', opacity: 0.5, marginTop: -10, textAlign: 'center' }}>
            Focus : {selectedSubject}
            {/* ── POMO-29 : affiche le mood sélectionné ── */}
            {currentMood && (
              <span style={{ marginLeft: 8 }}>
                {currentMood === 'great' ? '😄'
                  : currentMood === 'good' ? '🙂'
                  : currentMood === 'meh' ? '😐'
                  : '😞'}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}