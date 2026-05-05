import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme } from '../components/types/index'
import { STATIC_THEMES } from '../components/themes/staticThemes'

interface ThemeStore {
  activeTheme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      activeTheme: STATIC_THEMES[0] as Theme,
      setTheme: (theme: Theme) => set({ activeTheme: theme })
    }),
    { name: 'pomostudy_theme' }
  )
)