import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useUserStore = create()(persist((set) => ({
    filiere: '',
    username: '',
    setFiliere: (f) => set({ filiere: f }),
    setUsername: (u) => set({ username: u }),
}), { name: 'pomostudy_user' }));
