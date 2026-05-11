import { useState } from 'react'
import { Background } from './components/layout/Background'
import { BottomBar } from './components/layout/BottomBar'
import { Logo } from './components/ui/Logo'
import { DateTimeClock } from './components/DateTimeClock'
import { FocusModeOverlay } from './components/FocusModeOverlay'
import { FocusButton } from './components/FocusButton'
import { DraggableTimer } from './components/timer/DraggableTimer'
import { SubjectSelector } from './components/subjects/SubjectSelector'
import { TasksManager } from './components/tasks/TasksManager'
import DailyGoalBar from './components/stats/DailyGoalBar'
import QuoteWidget from './components/quotes/QuoteWidget'
import { AuthPage } from './components/auth/AuthPage'

function App() {
  const [selectedSubject, setSelectedSubject] = useState('')

  const [userName, setUserName] = useState<string | null>(() => {
    const saved = localStorage.getItem('pomostudy_user')
    if (!saved) return null
    try { return JSON.parse(saved).name as string }
    catch { return null }
  })

  function handleLogout() {
    localStorage.removeItem('pomostudy_user')
    setUserName(null)
  }

  if (!userName) {
    return <AuthPage onAuth={(name) => setUserName(name)} />
  }

  return (
    <FocusModeOverlay>
      <div style={{
        position: 'relative', height: '100vh',
        width: '100vw', overflow: 'hidden',
        color: '#fff', fontFamily: 'Inter, sans-serif'
      }}>
        <Background />

        {/* HEADER */}
        <header style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          padding: '16px 24px',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', zIndex: 50,
          pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)'
        }}>
          <div style={{ pointerEvents: 'all' }}>
            <Logo />
          </div>

          {/* ✅ User + Clock + Logout */}
          <div style={{
            pointerEvents: 'all',
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16, padding: '8px 16px'
          }}>
            {/* Icône user */}
            <div style={{
              width: 32, height: 32,
              background: '#EF4444',
              borderRadius: 10,
              display: 'flex', alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              boxShadow: '0 0 12px rgba(239,68,68,0.4)',
              flexShrink: 0
            }}>
              👤
            </div>

            {/* Nom */}
            <span style={{
              fontWeight: 700, fontSize: 13,
              color: '#fff', paddingRight: 12,
              borderRight: '1px solid rgba(255,255,255,0.15)'
            }}>
              {userName}
            </span>

            {/* Clock */}
            <DateTimeClock />

            {/* Logout */}
            <button
              onClick={handleLogout}
              title="Se déconnecter"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8, padding: '6px 10px',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.5)',
                fontSize: 14, transition: 'all 0.2s',
                marginLeft: 4
              }}
            >
              🚪
            </button>
          </div>
        </header>

        {/* SIDEBAR GAUCHE — sans Sessions */}
        <aside style={{
          position: 'absolute',
          top: 80, left: 24, bottom: 90,
          zIndex: 40, width: 280,
          display: 'flex', flexDirection: 'column', gap: 12,
          pointerEvents: 'auto',
          overflowY: 'auto', overflowX: 'hidden',
          scrollbarWidth: 'none',
        } as React.CSSProperties}>

          {/* ✅ Filière & Matière seulement */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14, padding: '12px 14px', flexShrink: 0
          }}>
            <p style={{
              fontSize: 9, textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.4)', margin: '0 0 10px'
            }}>
              Filière &amp; Matière
            </p>
            <SubjectSelector onSelectSubject={setSelectedSubject} />
          </div>

          {/* ✅ Tâches seulement */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14, padding: '12px 14px', flexShrink: 0
          }}>
            <p style={{
              fontSize: 9, textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.4)', margin: '0 0 10px'
            }}>
              Tâches
            </p>
            <TasksManager currentSubject={selectedSubject} />
          </div>
        </aside>

        {/* TIMER CENTRE */}
        <main style={{
          position: 'relative', height: '100%', width: '100%',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 20
        }}>
          <DraggableTimer selectedSubject={selectedSubject} />
        </main>

        {/* LET'S FOCUS */}
        <div style={{
          position: 'fixed', bottom: 96,
          left: '50%', transform: 'translateX(-50%)',
          zIndex: 50, pointerEvents: 'auto'
        }}>
          <FocusButton />
        </div>

        <DailyGoalBar />
        <QuoteWidget />

        <footer style={{
          position: 'absolute', bottom: 0,
          left: 0, right: 0, zIndex: 50
        }}>
          <BottomBar />
        </footer>
      </div>
    </FocusModeOverlay>
  )
}

export default App