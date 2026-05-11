import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useSoundStore = create()(persist((set) => ({
    selectedSound: 'bell',
    volume: 0.8,
    setSound: (selectedSound) => set({ selectedSound }),
    setVolume: (volume) => set({ volume }),
}), { name: 'pomo-sound-prefs' }));
