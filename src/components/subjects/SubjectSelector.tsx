import { subjectsByFilieres } from './subjectsByFilieres'
import { useState } from 'react'

// On adapte l'interface pour correspondre à l'appel dans App.tsx
interface Props {
  onSelectSubject: (subject: string) => void
}

const FILIERES = Object.keys(subjectsByFilieres)

export function SubjectSelector({ onSelectSubject }: Props) {
  // On gère l'état interne des filières ici pour simplifier App.tsx
  const [currentFiliere, setCurrentFiliere] = useState<string>('')
  const [currentSubject, setCurrentSubject] = useState<string>('')

  const subjects = subjectsByFilieres[currentFiliere as keyof typeof subjectsByFilieres] ?? []

  const handleSubjectClick = (subject: string) => {
    setCurrentSubject(subject)
    onSelectSubject(subject) // C'est cette ligne qui fait le lien avec le Timer !
  }

  const handleFiliereClick = (f: string) => {
    setCurrentFiliere(f)
    setCurrentSubject('') // On reset le sujet quand on change de filière
  }

  return (
    <div className="flex flex-col items-center gap-3 p-4 w-full max-w-md">

      {/* Sélecteur de filière */}
      <div className="flex flex-wrap gap-2 justify-center">
        {FILIERES.map(f => (
          <button
            key={f}
            onClick={() => handleFiliereClick(f)}
            style={{
               padding: '6px 14px',
               borderRadius: '14px',
               fontSize: '11px',
               cursor: 'pointer',
               border: '1px solid rgba(255,255,255,0.1)',
               background: currentFiliere === f ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
               color: currentFiliere === f ? '#fff' : 'rgba(255,255,255,0.6)',
               transition: 'all 0.3s'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Sélecteur de matière */}
      {currentFiliere && (
        <div className="flex flex-wrap gap-2 justify-center">
          {subjects.map(subject => (
            <button
              key={subject}
              onClick={() => handleSubjectClick(subject)}
              style={{
                padding: '4px 12px',
                borderRadius: '10px',
                fontSize: '11px',
                cursor: 'pointer',
                border: 'none',
                background: currentSubject === subject ? '#FF5F5F' : 'rgba(255,255,255,0.1)',
                color: '#fff',
                transition: 'all 0.2s'
              }}
            >
              {subject}
            </button>
          ))}
        </div>
      )}

      {!currentFiliere && (
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>Sélectionne ta filière ↑</p>
      )}

    </div>
  )
}