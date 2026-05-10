import { useState, useRef } from 'react'
import { PomoTimer } from './PomoTimer'
import { PhaseControls } from './PhaseControls'
import { useTimer } from './useTimer'
import MoodWindow from '../mood/MoodWindow'
import { useMoodStore } from '../../stores/moodStore'

type Mood = 'great' | 'good' | 'meh' | 'bad'

interface DraggableTimerProps {
  selectedSubject: string
}

export function DraggableTimer({ selectedSubject }: DraggableTimerProps) {
  const { state, dispatch, progress, timeDisplay } = useTimer(selectedSubject)
  const { currentMood, setMood } = useMoodStore()
  const [showMoodWindow, setShowMoodWindow] = useState(false)

  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 160,
    y: window.innerHeight / 2 - 200
  })
  const [activeDrag, setActiveDrag] = useState(false)
  const isDragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  function onMouseDown(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest('button')) return
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

  function handleStart() {
    if (!currentMood) {
      setShowMoodWindow(true)
      return
    }
    dispatch({ type: 'START' })
  }

  function handleMoodSelect(mood: Mood) {
    setMood(mood)
    setShowMoodWindow(false)
    dispatch({ type: 'START' })
  }

  return (
    <>
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
          position: 'fixed', inset: 0,
          pointerEvents: 'none', zIndex: 50
        }}
      >
        <div
          onMouseDown={onMouseDown}
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            pointerEvents: 'all',
            cursor: activeDrag ? 'grabbing' : 'grab',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            userSelect: 'none',
            padding: '24px 20px',
            backgroundColor: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 60,
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: activeDrag
              ? '0 40px 80px rgba(0,0,0,0.4)'
              : '0 10px 30px rgba(0,0,0,0.1)',
            transition: 'box-shadow 0.3s ease, transform 0.2s ease',
            transform: activeDrag ? 'scale(1.02)' : 'scale(1)',
          }}
        >
          {/* Barre de drag */}
          <div style={{
            width: 36, height: 4, borderRadius: 2,
            background: 'rgba(255,255,255,0.15)',
            marginBottom: -8
          }} />

          {/* Timer SVG */}
          <PomoTimer
            progress={progress}
            timeDisplay={timeDisplay}
            phase={state.phase}
            size={240}
          />

          {/* Dots pomodoros */}
          <div style={{ display: 'flex', gap: 8 }}>
            {Array.from({ length: state.config.pomosBeforeLongBreak }).map((_, i) => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: '50%',
                background: i < state.pomosCompleted % state.config.pomosBeforeLongBreak
                  ? '#EF4444'
                  : 'rgba(255,255,255,0.2)',
                transition: 'background 0.3s'
              }} />
            ))}
          </div>

          {/* ✅ PhaseControls avec workDuration pour les boutons de durée */}
          <div onMouseDown={e => e.stopPropagation()}>
            <PhaseControls
              phase={state.phase}
              dispatch={dispatch}
              onStart={handleStart}
              workDuration={state.config.workDuration}
            />
          </div>

          {/* Info matière + mood */}
          {selectedSubject && (
            <div style={{
              fontSize: 11, opacity: 0.4,
              fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '0.05em', color: '#fff'
            }}>
              Focus : {selectedSubject}
              {currentMood && (
                <span style={{ marginLeft: 8 }}>
                  {currentMood === 'great' ? '😄'
                    : currentMood === 'good' ? '🙂'
                    : currentMood === 'meh' ? '😐'
                    : '😞'}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}