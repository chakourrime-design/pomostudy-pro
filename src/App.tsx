import { useState } from 'react'
import { Background } from './components/layout/Background'
import { BottomBar } from './components/layout/BottomBar'
import { Logo } from './components/ui/Logo'
import { DateTimeClock } from './components/ui/DateTimeClock'
import { FocusModeOverlay } from './components/ui/FocusModeOverlay'
import { DraggableTimer } from './components/timer/DraggableTimer' 
import { StudyDashboard } from './components/stats/StudyDashboard'

function App() {
  const [selectedSubject] = useState('Génie Logiciel')

  return (
    <FocusModeOverlay>
      <div className="relative h-screen w-screen overflow-hidden text-white">
        <Background />

        <header className="absolute top-0 left-0 right-0 p-8 flex justify-between items-start z-30 pointer-events-none">
          <div className="pointer-events-auto">
            <Logo />
          </div>
          <div className="pointer-events-auto">
            <DateTimeClock />
          </div>
        </header>

        <main className="relative h-full w-full flex items-center justify-center z-20">
          {/* Les props sont maintenant acceptées grâce à l'interface ajoutée dans DraggableTimer */}
          <DraggableTimer 
            selectedSubject={selectedSubject} 
          />
        </main>

        <section className="absolute bottom-[110px] left-1/2 -translate-x-1/2 z-40">
          <StudyDashboard />
        </section>

        <footer className="absolute bottom-0 left-0 right-0 z-50">
          <BottomBar />
        </footer>
      </div>
    </FocusModeOverlay>
  )
}

export default App