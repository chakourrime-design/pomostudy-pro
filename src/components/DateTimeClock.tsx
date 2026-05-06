import { useDateTime } from '../hooks/useDateTime'

export function DateTimeClock() {
  const { date, time } = useDateTime()

  return (
    <div 
      className="datetime-clock"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end', // Aligné à droite pour le header
        color: '#ffffff',
        fontFamily: "'Inter', sans-serif",
        userSelect: 'none',
        textShadow: '0 2px 10px rgba(0,0,0,0.4)',
      }}
    >
      {/* L'Heure : plus grande et bien visible */}
      <span 
        className="clock-time"
        style={{
          fontSize: '24px',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          lineHeight: '1',
        }}
      >
        {time}
      </span>

      {/* La Date : plus petite et élégante */}
      <span 
        className="clock-date"
        style={{
          fontSize: '12px',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          opacity: 0.8,
          marginTop: '4px'
        }}
      >
        {date}
      </span>
    </div>
  )
}