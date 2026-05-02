import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserStore {
  filiere: string
  username: string
  setFiliere: (f: string) => void
  setUsername: (u: string) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      filiere: '',
      username: '',
      setFiliere: (f) => set({ filiere: f }),
      setUsername: (u) => set({ username: u }),
    }),
    { name: 'pomostudy_user' }
  )
)