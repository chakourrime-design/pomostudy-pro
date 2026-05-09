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

function App() {
  const [selectedSubject, setSelectedSubject] = useState('Génie Logiciel')

  return (
    <FocusModeOverlay>
      <div className="relative h-screen w-screen overflow-hidden text-white font-sans">

        <Background />

        {/* --- HEADER --- */}
        <header className="absolute top-0 left-0 right-0 px-8 py-5 flex justify-between items-start z-50 pointer-events-none">
          <div className="pointer-events-auto">
            <Logo />
          </div>
          <div className="pointer-events-auto">
            <DateTimeClock />
          </div>
        </header>

        {/* --- SIDEBAR GAUCHE --- */}
        <aside style={{
          position: 'absolute',
          top: 80,
          left: 24,
          bottom: 90,
          zIndex: 40,
          width: 280,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          pointerEvents: 'auto',
          overflowY: 'auto',
          overflowX: 'hidden',
          /* Masquer la scrollbar visuellement */
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        } as React.CSSProperties}>

          {/* Filières + Matières */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14,
            padding: '12px 14px',
            flexShrink: 0,
          }}>
            <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', margin: '0 0 10px' }}>
              Filière &amp; Matière
            </p>
            <SubjectSelector onSelectSubject={setSelectedSubject} />
          </div>

          {/* Sessions + Heatmap */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14,
            padding: '12px 14px',
            flexShrink: 0,
          }}>
            <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', margin: '0 0 10px' }}>
              Sessions
            </p>
            <StudyDashboard />
            <ContributionHeatmap />
          </div>

          {/* Tâches */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14,
            padding: '12px 14px',
            flexShrink: 0,
          }}>
            <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', margin: '0 0 10px' }}>
              Tâches
            </p>
            <TasksManager currentSubject={selectedSubject} />
          </div>

        </aside>

        {/* --- BOUTON LET'S FOCUS — centré en bas, au-dessus de la BottomBar --- */}
        <div style={{
          position: 'fixed',
          bottom: 96,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          pointerEvents: 'auto',
        }}>
          <FocusButton />
        </div>

        {/* --- DAILY GOAL BAR — flottante droite --- */}
        <DailyGoalBar />

        {/* --- CITATION FLOTTANTE — bas droite --- */}
        <QuoteWidget />

        {/* --- TIMER CENTRE --- */}
        <main className="relative h-full w-full flex items-center justify-center z-20">
          <DraggableTimer selectedSubject={selectedSubject} />
        </main>

        {/* --- BARRE DE NAVIGATION BASSE --- */}
        <footer className="absolute bottom-0 left-0 right-0 z-50">
          <BottomBar />
        </footer>

      </div>
    </FocusModeOverlay>
  )
}

export default App