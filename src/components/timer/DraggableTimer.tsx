import { useState, useRef } from 'react'
import { PomoTimer } from './PomoTimer'
import { PhaseControls } from './PhaseControls'
import { useTimer } from './useTimer'

export function DraggableTimer() {
  // Récupération de la logique du timer via ton hook personnalisé
  const { state, dispatch, progress, timeDisplay } = useTimer('')

  // Position initiale centrée horizontalement
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 150, y: 80 })
  
  // État pour l'interface (curseur et animations)
  const [isHovered, setIsHovered] = useState(false)
  const [activeDrag, setActiveDrag] = useState(false) 

  // Références pour la logique de calcul (ne déclenchent pas de rendu)
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

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp} // Sécurité si la souris quitte l'écran
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
          
          // --- Design Lofi / Aesthetic ---
          padding: '32px 24px',
          backgroundColor: 'rgba(255, 255, 255, 0.12)', // Verre dépoli
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          borderRadius: '48px', // Coins ultra-arrondis
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: activeDrag 
            ? '0 20px 40px rgba(0,0,0,0.2)' 
            : '0 10px 25px rgba(0,0,0,0.1)',
          
          // Animation douce
          transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease',
          transform: activeDrag ? 'scale(1.03)' : (isHovered ? 'scale(1.01)' : 'scale(1)'),
        }}
      >
        {/* Affichage du cercle et du temps */}
        <PomoTimer
          progress={progress}
          timeDisplay={timeDisplay}
          phase={state.phase}
          size={220}
        />

        {/* Contrôles de phase (Focus, Short Break, Long Break) */}
        <div 
          onMouseDown={e => e.stopPropagation()} // Empêche le drag quand on clique sur les boutons
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            padding: '4px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <PhaseControls phase={state.phase} dispatch={dispatch} />
        </div>
      </div>
    </div>
  )
}