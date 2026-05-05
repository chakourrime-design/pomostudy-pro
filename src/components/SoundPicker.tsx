import { useSoundStore, SoundOption } from '../stores/soundStore'

const sounds: { id: SoundOption; label: string }[] = [
  { id: 'bell',  label: '🔔 Bell'  },
  { id: 'chime', label: '🎵 Chime' },
  { id: 'gong',  label: '🥁 Gong'  },
]

export default function SoundPicker() {
  const { selectedSound, volume, setSound, setVolume } = useSoundStore()

  const preview = (id: SoundOption) => {
    const audio = new Audio(`/sounds/${id}.mp3`)
    audio.volume = volume
    audio.play().catch(console.error)
  }

  return (
    <div className="sound-picker">
      <h3>Son de fin</h3>
      <div className="sound-list">
        {sounds.map(({ id, label }) => (
          <button
            key={id}
            className={`sound-btn ${selectedSound === id ? 'active' : ''}`}
            onClick={() => { setSound(id); preview(id) }}
          >
            {label}
          </button>
        ))}
      </div>
      <label>
        Volume
        <input
          type="range" min={0} max={1} step={0.05}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </label>
    </div>
  )
}