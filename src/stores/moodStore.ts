import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Mood } from '../components/types'

interface MoodState {
  currentMood: Mood | null
  setMood: (mood: Mood) => void
  clearMood: () => void
}

export const useMoodStore = create<MoodState>()(
  persist(
    (set) => ({
      currentMood: null,
      setMood: (mood) => set({ currentMood: mood }),
      clearMood: () => set({ currentMood: null }),
    }),
    { name: 'mood-store' }
  )
)