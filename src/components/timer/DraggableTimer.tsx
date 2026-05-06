import { useState, useRef } from 'react'
import { PomoTimer } from './PomoTimer'
import { PhaseControls } from './PhaseControls'
import { useTimer } from './useTimer'

export function DraggableTimer() {
  const { state, dispatch, progress, timeDisplay } = useTimer('')

  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 150, y: 80 })
  const isDragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  function onMouseDown(e: React.MouseEvent) {
    isDragging.current = true
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
  }

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      style={{ position: 'relative', inset: 0, pointerEvents: 'none' }}
    >
      <div
        onMouseDown={onMouseDown}
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          pointerEvents: 'all',
          // eslint-disable-next-line react-hooks/refs
          cursor: isDragging.current ? 'grabbing' : 'grab',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          userSelect: 'none'
        }}
      >
        <PomoTimer
          progress={progress}
          timeDisplay={timeDisplay}
          phase={state.phase}
          size={260}
        />

        <div onMouseDown={e => e.stopPropagation()}>
          <PhaseControls phase={state.phase} dispatch={dispatch} />
        </div>
      </div>
    </div>
  )
}