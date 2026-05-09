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
import ContributionHeatmap from './components/stats/ContributionHeatmap' // POMO-28
import QuoteWidget from './components/quotes/QuoteWidget'                 // ← POMO-31

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
        <aside className="absolute top-20 left-6 z-40 w-64 flex flex-col gap-4 pointer-events-auto">

          {/* Filières + Matières */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '14px',
            padding: '12px 14px',
          }}>
            <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>
              Filière &amp; Matière
            </p>
            <SubjectSelector onSelectSubject={setSelectedSubject} />
          </div>

          {/* Sessions + Heatmap */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '14px',
            padding: '12px 14px',
          }}>
            <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>
              Sessions
            </p>
            <StudyDashboard />
            <ContributionHeatmap />
          </div>

          {/* Tâches */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '14px',
            padding: '12px 14px',
          }}>
            <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>
              Tâches
            </p>
            <TasksManager currentSubject={selectedSubject} />
          </div>

        </aside>

        {/* --- CITATION FLOTTANTE POMO-31 ---
            position: fixed bas droite, directement sur le background.
            Clic → citation aléatoire avec animation fade. */}
        <QuoteWidget />

        {/* --- TIMER CENTRE --- */}
        <main className="relative h-full w-full flex items-center justify-center z-20">
          <DraggableTimer selectedSubject={selectedSubject} />
        </main>

        {/* --- BOUTON FOCUS --- */}
        <section className="absolute bottom-20 left-6 z-50 pointer-events-auto">
          <FocusButton />
        </section>

        {/* --- BARRE DE NAVIGATION BASSE --- */}
        <footer className="absolute bottom-0 left-0 right-0 z-50">
          <BottomBar />
        </footer>

      </div>
    </FocusModeOverlay>
  )
}

export default App