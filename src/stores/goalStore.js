import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useGoalStore = create()(persist((set) => ({
    dailyGoal: 4,
    setDailyGoal: (goal) => set({ dailyGoal: Math.max(1, goal) }),
}), { name: 'goal-store' }));
