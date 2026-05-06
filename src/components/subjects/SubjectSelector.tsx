import { subjectsByFilieres } from './subjectsByFilieres'

interface Props {
  filiere: string
  selected: string
  onSelect: (subject: string) => void
  onFiliereChange: (filiere: string) => void
}

const FILIERES = Object.keys(subjectsByFilieres)

export function SubjectSelector({ filiere, selected, onSelect, onFiliereChange }: Props) {
  const subjects = subjectsByFilieres[filiere] ?? []

  return (
    <div className="flex flex-col items-center gap-3 p-4 w-full max-w-md">

      {/* Sélecteur de filière */}
      <div className="flex flex-wrap gap-2 justify-center">
        {FILIERES.map(f => (
          <button
            key={f}
            onClick={() => onFiliereChange(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition
              ${filiere === f
                ? 'bg-red-500 text-white shadow-lg scale-105'
                : 'bg-gray-700 text-gray-300 hover:bg-red-400 hover:text-white'
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Sélecteur de matière */}
      {filiere && (
        <div className="flex flex-wrap gap-2 justify-center">
          {subjects.map(subject => (
            <button
              key={subject}
              onClick={() => onSelect(subject)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition
                ${selected === subject
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-red-400 hover:text-white'
                }`}
            >
              {subject}
            </button>
          ))}
        </div>
      )}

      {!filiere && (
        <p className="text-gray-400 text-sm">Sélectionne ta filière ↑</p>
      )}

    </div>
  )
}