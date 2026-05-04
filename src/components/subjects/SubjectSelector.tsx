import { subjectsByFilieres } from './subjectsByFilieres'

interface Props {
  filiere: string
  selected: string
  onSelect: (subject: string) => void
}

export function SubjectSelector({ filiere, selected, onSelect }: Props) {
  const subjects = subjectsByFilieres[filiere] ?? []

  return (
    <div className="flex flex-wrap gap-2 p-4 justify-center">
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
  )
}