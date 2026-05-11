import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useMoodStore = create()(persist((set) => ({
    currentMood: null,
    setMood: (mood) => set({ currentMood: mood }),
    clearMood: () => set({ currentMood: null }),
}), { name: 'mood-store' }));
