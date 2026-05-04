import { useEffect, useState } from 'react'
import { PomoTimer } from './components/timer/PomoTimer'
import { PhaseControls } from './components/timer/PhaseControls'
import { useTimer } from './components/timer/useTimer'
import { SubjectSelector } from './components/subjects/SubjectSelector'
import { requestNotificationPermission, sendNotification } from './services/NotificationAPI'
import { playEndSound } from './services/AudioAPI'
import { subjectsByFilieres } from './components/subjects/subjectsByFilieres'

const filieres = Object.keys(subjectsByFilieres) // ['Architecture', 'Génie Civil', 'Informatique', 'Design']

export default function App() {
  const [selectedFiliere, setSelectedFiliere] = useState(filieres[0])
  const [selectedSubject, setSelectedSubject] = useState('Général')
  const { state, dispatch, progress, timeDisplay } = useTimer(selectedSubject)

  useEffect(() => {
    requestNotificationPermission()
  }, [])

  useEffect(() => {
    if (state.phase === 'SHORT_BREAK' || state.phase === 'LONG_BREAK') {
      sendNotification('Pomodoro terminé !', 'Temps de pause 🎉')
      playEndSound()
    }
  }, [state.phase])

  return (
    <div style={{ display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 32, padding: 48 }}>

      {/* Sélecteur de filière */}
      <div className="flex gap-2">
        {filieres.map(f => (
          <button
            key={f}
            onClick={() => { setSelectedFiliere(f); setSelectedSubject('Général') }}
            className={`px-4 py-2 rounded-lg font-medium transition
              ${selectedFiliere === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Sélecteur de matière selon la filière */}
      <SubjectSelector
        filiere={selectedFiliere!}
        selected={selectedSubject}
        onSelect={setSelectedSubject}
      />

      <PomoTimer progress={progress} timeDisplay={timeDisplay} phase={state.phase} />
      <PhaseControls isRunning={state.phase === 'WORK'} dispatch={dispatch} />
    </div>
  )
}