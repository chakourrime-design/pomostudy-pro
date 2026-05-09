import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GoalState {
  dailyGoal: number
  setDailyGoal: (goal: number) => void
}

export const useGoalStore = create<GoalState>()(
  persist(
    (set) => ({
      dailyGoal: 4,
      setDailyGoal: (goal) => set({ dailyGoal: Math.max(1, goal) }),
    }),
    { name: 'goal-store' }
  )
)