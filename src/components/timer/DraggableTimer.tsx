import { useState, useRef } from 'react'
import { PomoTimer } from './PomoTimer'
import { PhaseControls } from './PhaseControls'
import { useTimer } from './useTimer'
import MoodWindow from '../mood/MoodWindow'
import { useMoodStore } from '../../stores/moodStore'
import { motion } from 'framer-motion'
import { PhaseTransition } from './PhaseTransition'
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

 // Dans le return, remplacez le div principal par :
return (
  <>
    {showMoodWindow && (
      <MoodWindow
        onSelect={handleMoodSelect}
        onClose={() => setShowMoodWindow(false)}
      />
    )}

    {/* ✅ Fond animé selon la phase */}
    <PhaseTransition phase={state.phase}>

      <div
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          position: 'fixed', inset: 0,
          pointerEvents: 'none', zIndex: 50
        }}
      >
        <motion.div
          onMouseDown={onMouseDown}
          // ✅ Animation d'entrée + changement de phase
          animate={{
            scale: state.phase === 'WORK' ? 1.02 : 1,
            boxShadow: state.phase === 'WORK'
              ? '0 0 60px rgba(239,68,68,0.2)'
              : state.phase === 'SHORT_BREAK'
              ? '0 0 60px rgba(34,197,94,0.2)'
              : state.phase === 'LONG_BREAK'
              ? '0 0 60px rgba(59,130,246,0.2)'
              : '0 10px 30px rgba(0,0,0,0.1)'
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
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
            border: state.phase === 'WORK'
              ? '1px solid rgba(239,68,68,0.2)'
              : state.phase === 'SHORT_BREAK'
              ? '1px solid rgba(34,197,94,0.2)'
              : state.phase === 'LONG_BREAK'
              ? '1px solid rgba(59,130,246,0.2)'
              : '1px solid rgba(255,255,255,0.1)',
            transform: activeDrag ? 'scale(1.02)' : 'scale(1)',
            transition: 'border 0.5s ease'
          }}
        >
          {/* Barre drag */}
          <div style={{
            width: 36, height: 4, borderRadius: 2,
            background: 'rgba(255,255,255,0.15)', marginBottom: -8
          }} />

          {/* ✅ Timer avec animation pulse en WORK */}
          <motion.div
            animate={state.phase === 'WORK'
              ? { scale: [1, 1.01, 1] }
              : { scale: 1 }
            }
            transition={{
              repeat: state.phase === 'WORK' ? Infinity : 0,
              duration: 2, ease: 'easeInOut'
            }}
          >
            <PomoTimer
              progress={progress}
              timeDisplay={timeDisplay}
              phase={state.phase}
              size={240}
            />
          </motion.div>

          {/* Dots pomodoros avec animation */}
          <div style={{ display: 'flex', gap: 8 }}>
            {Array.from({ length: state.config.pomosBeforeLongBreak }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: i === state.pomosCompleted % state.config.pomosBeforeLongBreak
                    ? [1, 1.3, 1]
                    : 1,
                  background: i < state.pomosCompleted % state.config.pomosBeforeLongBreak
                    ? '#EF4444'
                    : 'rgba(255,255,255,0.2)'
                }}
                transition={{ duration: 0.4 }}
                style={{
                  width: 8, height: 8, borderRadius: '50%'
                }}
              />
            ))}
          </div>

          {/* PhaseControls */}
          <div onMouseDown={e => e.stopPropagation()}>
            <PhaseControls
              phase={state.phase}
              dispatch={dispatch}
              onStart={handleStart}
              workDuration={state.config.workDuration}
            />
          </div>

          {/* Info matière */}
          {selectedSubject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              style={{
                fontSize: 11, fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em', color: '#fff'
              }}
            >
              Focus : {selectedSubject}
              {currentMood && (
                <span style={{ marginLeft: 8 }}>
                  {currentMood === 'great' ? '😄'
                    : currentMood === 'good' ? '🙂'
                    : currentMood === 'meh' ? '😐' : '😞'}
                </span>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

    </PhaseTransition>
  </>
)}