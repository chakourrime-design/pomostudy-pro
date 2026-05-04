import { subjectsByFilieres } from './subjectsByFilieres'
import { useUserStore } from '../stores/userStore'

export function SubjectSelector({ onSelect }: { onSelect: (s: string) => void }) {
  const filiere = useUserStore(s => s.filiere)
  const subjects = subjectsByFilieres[filiere] ?? []

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {subjects.map(subject => (
        <button
          key={subject}
          onClick={() => onSelect(subject)}
          className="px-3 py-1 rounded-full bg-red-500 text-white text-sm hover:bg-red-600 transition"
        >
          {subject}
        </button>
      ))}
    </div>
  )
}