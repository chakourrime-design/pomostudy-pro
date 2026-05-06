import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SoundOption = 'bell' | 'chime' | 'gong'

interface SoundState {
  selectedSound: SoundOption
  volume: number
  setSound: (s: SoundOption) => void
  setVolume: (v: number) => void
}

export const useSoundStore = create<SoundState>()(
  persist(
    (set) => ({
      selectedSound: 'bell',
      volume: 0.8,
      setSound: (selectedSound) => set({ selectedSound }),
      setVolume: (volume) => set({ volume }),
    }),
    { name: 'pomo-sound-prefs' }
  )
)