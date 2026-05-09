import { useMoodStore } from '../../stores/moodStore'

type Mood = 'great' | 'good' | 'meh' | 'bad'

interface Props {
  onSelect: (mood: Mood) => void
  onClose: () => void
}

const MOODS = [
  { value: 'great' as Mood, emoji: '😄', label: 'Super' },
  { value: 'good'  as Mood, emoji: '🙂', label: 'Bien' },
  { value: 'meh'   as Mood, emoji: '😐', label: 'Moyen' },
  { value: 'bad'   as Mood, emoji: '😞', label: 'Difficile' },
]

export default function MoodWindow({ onSelect, onClose }: Props) {
  const setMood = useMoodStore((s) => s.setMood)

  const handleSelect = (mood: Mood) => {
    setMood(mood)
    onSelect(mood)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
                    bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl
                      p-6 w-72 shadow-2xl">
        <h2 className="text-white text-center font-semibold text-base mb-1">
          Comment tu te sens ?
        </h2>
        <p className="text-white/40 text-center text-xs mb-5">
          Avant de commencer ta session
        </p>
        <div className="grid grid-cols-4 gap-3 mb-4">
          {MOODS.map(({ value, emoji, label }) => (
            <button key={value} onClick={() => handleSelect(value)}
              className="flex flex-col items-center gap-1 p-3 rounded-xl
                         bg-white/5 hover:bg-[#FF5F5F]/20 border
                         border-transparent hover:border-[#FF5F5F]/40
                         transition-all group">
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {emoji}
              </span>
              <span className="text-[10px] text-white/50 group-hover:text-white/80">
                {label}
              </span>
            </button>
          ))}
        </div>
        <button onClick={onClose}
          className="w-full text-xs text-white/30 hover:text-white/60 transition-colors">
          Passer
        </button>
      </div>
    </div>
  )
}