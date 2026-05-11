import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STATIC_THEMES } from '../components/themes/staticThemes';
export const useThemeStore = create()(persist((set) => ({
    activeTheme: STATIC_THEMES[0],
    setTheme: (theme) => set({ activeTheme: theme })
}), { name: 'pomostudy_theme' }));
