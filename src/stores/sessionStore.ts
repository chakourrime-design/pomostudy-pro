import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PomoSession } from '../components/types'

interface SessionStore {
  sessions: PomoSession[]
  addSession: (s: PomoSession) => void
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      sessions: [],
      addSession: (s) => set(state => ({
        sessions: [...state.sessions, s]
      }))
    }),
    { name: 'pomostudy_sessions' }
  )
)