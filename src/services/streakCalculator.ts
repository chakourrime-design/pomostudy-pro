import { differenceInDays, parseISO, startOfDay } from 'date-fns'
import type { PomoSession } from '../components/types'

export function calculateStreak(sessions: PomoSession[]): number {
  if (sessions.length === 0) return 0

  const uniqueDays = [...new Set(
    sessions.map(s => startOfDay(parseISO(s.date)).toISOString())
  )].sort().reverse()

  let streak = 0
  let checkDate = startOfDay(new Date())

  for (const dayStr of uniqueDays) {
    const day = new Date(dayStr)
    const diff = differenceInDays(checkDate, day)
    if (diff === 0 || diff === 1) {
      streak++
      checkDate = day
    } else break
  }

  return streak
}