import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useSessionStore = create()(persist((set) => ({
    sessions: [],
    addSession: (s) => set(state => ({
        sessions: [...state.sessions, s]
    }))
}), { name: 'pomostudy_sessions' }));
