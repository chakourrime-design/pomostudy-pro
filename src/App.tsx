import { useState } from 'react'
import { Background } from './components/layout/Background'
import { BottomBar } from './components/layout/BottomBar'
import { Logo } from './components/ui/Logo'
import { DateTimeClock } from './components/DateTimeClock'
import { FocusModeOverlay } from './components/FocusModeOverlay'
import { FocusButton } from './components/FocusButton'
import { DraggableTimer } from './components/timer/DraggableTimer'
import { StudyDashboard } from './components/stats/StudyDashboard'
import { SubjectSelector } from './components/subjects/SubjectSelector'
import { TasksManager } from './components/tasks/TasksManager'
import ContributionHeatmap from './components/stats/ContributionHeatmap'
import DailyGoalBar from './components/stats/DailyGoalBar'
import QuoteWidget from './components/quotes/QuoteWidget'
import { AuthPage } from './components/auth/AuthPage'
import { User, LogOut } from 'lucide-react'

function App() {
  const [selectedSubject, setSelectedSubject] = useState('')

  // ✅ Auth — vérifier si déjà connecté
  const [userName, setUserName] = useState<string | null>(() => {
    const saved = localStorage.getItem('pomostudy_user')
    if (!saved) return null
    try {
      return JSON.parse(saved).name as string
    } catch {
      return null
    }
  })

  function handleLogout() {
    localStorage.removeItem('pomostudy_user')
    setUserName(null)
  }

  // ✅ Page auth si pas connecté
  if (!userName) {
    return <AuthPage onAuth={(name) => setUserName(name)} />
  }

  return (
    <FocusModeOverlay>
      <div className="relative h-screen w-screen overflow-hidden text-white font-sans">

        <Background />

        {/* HEADER */}
        <header className="absolute top-0 left-0 right-0 px-8 py-5 flex justify-between items-start z-50 pointer-events-none">
          <div className="pointer-events-auto">
            <Logo />
          </div>

          {/* User + Clock */}
          <div className="pointer-events-auto flex items-center gap-4 bg-black/20 backdrop-blur-md p-2 px-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 pr-4 border-r border-white/20">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-lg">
                <User size={18} strokeWidth={3} />
              </div>
              {/* ✅ Vrai nom */}
              <span className="font-bold text-sm tracking-wide">
                {userName}
              </span>
            </div>
            <DateTimeClock />

            {/* ✅ Bouton déconnexion */}
            <button
              onClick={handleLogout}
              title="Se déconnecter"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: '6px 8px',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.5)',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.2s'
              }}
            >
              <LogOut size={14} />
            </button>
          </div>
        </header>

        {/* SIDEBAR GAUCHE */}
        <aside style={{
          position: 'absolute',
          top: 80, left: 24, bottom: 90,
          zIndex: 40, width: 280,
          display: 'flex', flexDirection: 'column', gap: 12,
          pointerEvents: 'auto',
          overflowY: 'auto', overflowX: 'hidden',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        } as React.CSSProperties}>

          {/* Filière & Matière */}
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

          {/* Sessions */}
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
              Sessions
            </p>
            <StudyDashboard />
            <ContributionHeatmap />
          </div>

          {/* Tâches */}
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
        <main className="relative h-full w-full flex items-center justify-center z-20">
          <DraggableTimer selectedSubject={selectedSubject} />
        </main>

        {/* BOUTON LET'S FOCUS */}
        <div style={{
          position: 'fixed', bottom: 96,
          left: '50%', transform: 'translateX(-50%)',
          zIndex: 50, pointerEvents: 'auto'
        }}>
          <FocusButton />
        </div>

        <DailyGoalBar />
        <QuoteWidget />

        <footer className="absolute bottom-0 left-0 right-0 z-50">
          <BottomBar />
        </footer>

      </div>
    </FocusModeOverlay>
  )
}

export default App