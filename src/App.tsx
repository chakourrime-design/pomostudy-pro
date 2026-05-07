import { useState } from 'react'
import { Background } from './components/layout/Background'
import { BottomBar } from './components/layout/BottomBar'
import { Logo } from './components/ui/Logo'
import { DateTimeClock } from './components/DateTimeClock'
import { FocusModeOverlay } from './components/FocusModeOverlay'
import { FocusButton } from './components/FocusButton' 
import { DraggableTimer } from './components/timer/DraggableTimer' 
import { StudyDashboard } from './components/stats/StudyDashboard'

// ✅ Réimport des composants que tu avais avant
import { SubjectSelector } from './components/subjects/SubjectSelector'
import { TasksManager } from './components/tasks/TasksManager'

function App() {
  const [selectedSubject, setSelectedSubject] = useState('Génie Logiciel')

  return (
    <FocusModeOverlay>
      <div className="relative h-screen w-screen overflow-hidden text-white font-sans">
        
        <Background />

        {/* --- HEADER --- */}
        <header className="absolute top-0 left-0 right-0 p-8 flex justify-between items-start z-50 pointer-events-none">
          <div className="pointer-events-auto">
            <Logo />
          </div>
          <div className="pointer-events-auto">
            <DateTimeClock />
          </div>
        </header>

        {/* --- ZONE LATERALE GAUCHE (Sélecteur de Filière/Module) --- */}
        <aside className="absolute top-32 left-8 z-40 w-72 pointer-events-auto">
          <SubjectSelector 
            selectedSubject={selectedSubject} 
            setSelectedSubject={setSelectedSubject} 
          />
        </aside>

        {/* --- ZONE LATERALE DROITE (Gestion des tâches) --- */}
        <aside className="absolute top-32 right-8 z-40 w-80 pointer-events-auto">
          <TasksManager />
        </aside>

        {/* --- ZONE CENTRALE (Timer) --- */}
        <main className="relative h-full w-full flex items-center justify-center z-20">
          <DraggableTimer 
            selectedSubject={selectedSubject} 
          />
        </main>

        {/* --- ✅ BOUTON FOCUS (Bas Gauche) --- */}
        <section className="absolute bottom-28 left-8 z-50 pointer-events-auto">
          <FocusButton />
        </section>

        {/* --- DASHBOARD (Centré Bas) --- */}
        <section className="absolute bottom-32 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
          <StudyDashboard />
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