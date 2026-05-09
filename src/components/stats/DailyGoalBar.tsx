// src/components/stats/DailyGoalBar.tsx
import { useMemo, useState } from 'react'
import { isToday, parseISO } from 'date-fns'
import { useSessionStore } from '../../stores/sessionStore'
import { useGoalStore } from '../../stores/goalStore'

export default function DailyGoalBar() {
  const { sessions } = useSessionStore()
  const { dailyGoal, setDailyGoal } = useGoalStore()
  const [editing, setEditing] = useState(false)
  const [inputVal, setInputVal] = useState('')

  const todaySessions = useMemo(
    () => sessions.filter((s) => isToday(parseISO(s.date))).length,
    [sessions]
  )

  const pct = Math.min((todaySessions / dailyGoal) * 100, 100)
  const done = todaySessions >= dailyGoal

  const handleConfirm = () => {
    const parsed = parseInt(inputVal, 10)
    if (!isNaN(parsed) && parsed > 0) setDailyGoal(parsed)
    setEditing(false)
  }

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      right: 32,
      transform: 'translateY(-50%)',
      zIndex: 40,
      width: 200,
      pointerEvents: 'all',
    }}>

      {/* Titre */}
      <p style={{
        fontSize: 9,
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        color: 'rgba(255,255,255,0.35)',
        marginBottom: 10,
        textAlign: 'right',
        textShadow: '0 1px 8px rgba(0,0,0,0.6)',
      }}>
        Objectif du jour
      </p>

      {/* Compteur X / Y */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'flex-end',
        gap: 4,
        marginBottom: 12,
      }}>
        {/* Sessions faites */}
        <span style={{
          fontSize: 40,
          fontWeight: 700,
          color: '#fff',
          textShadow: '0 2px 20px rgba(0,0,0,0.7)',
          lineHeight: 1,
        }}>
          {todaySessions}
        </span>

        <span style={{
          fontSize: 20,
          color: 'rgba(255,255,255,0.3)',
          textShadow: '0 1px 8px rgba(0,0,0,0.6)',
        }}>
          /
        </span>

        {/* Objectif — clic pour modifier, SANS tirets */}
        {editing ? (
          <input
            autoFocus
            type="number"
            min={1}
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onBlur={handleConfirm}
            onKeyDown={e => {
              if (e.key === 'Enter') handleConfirm()
              if (e.key === 'Escape') setEditing(false)
            }}
            style={{
              width: 44,
              background: 'rgba(255,95,95,0.2)',
              border: '1px solid rgba(255,95,95,0.6)',
              borderRadius: 6,
              padding: '2px 4px',
              fontSize: 20,
              color: '#fff',
              textAlign: 'center',
              outline: 'none',
            }}
          />
        ) : (
          <button
            onClick={() => { setInputVal(String(dailyGoal)); setEditing(true) }}
            title="Cliquer pour modifier l'objectif"
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.5)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              // ← plus de textDecoration, plus de tirets
              textDecoration: 'none',
              textShadow: '0 1px 8px rgba(0,0,0,0.6)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FF5F5F')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          >
            {dailyGoal}
          </button>
        )}

        <span style={{
          fontSize: 11,
          color: 'rgba(255,255,255,0.3)',
          marginLeft: 4,
          textShadow: '0 1px 6px rgba(0,0,0,0.5)',
        }}>
          {done ? '🎉' : 'sessions'}
        </span>
      </div>

      {/* Barre de progression */}
      <div style={{
        height: 5,
        width: '100%',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: 99,
        overflow: 'hidden',
        marginBottom: 8,
      }}>
        <div style={{
          height: '100%',
          borderRadius: 99,
          width: `${pct}%`,
          background: done
            ? 'linear-gradient(90deg, #FF5F5F, #ff9a3c)'
            : 'linear-gradient(90deg, #FF5F5F, #ff8080)',
          transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: '0 0 10px rgba(255,95,95,0.5)',
        }} />
      </div>

      {/* Indicateurs individuels par pomo */}
      <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
        {Array.from({ length: dailyGoal }, (_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              maxWidth: 24,
              height: 3,
              borderRadius: 99,
              background: i < todaySessions
                ? '#FF5F5F'
                : 'rgba(255,255,255,0.12)',
              transition: 'background 0.3s',
              boxShadow: i < todaySessions
                ? '0 0 6px rgba(255,95,95,0.4)'
                : 'none',
            }}
          />
        ))}
      </div>

    </div>
  )
}