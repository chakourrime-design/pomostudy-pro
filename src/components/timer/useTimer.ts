import { useReducer, useEffect, useRef, useState, useCallback } from 'react'
import { timerReducer, INITIAL_STATE, phaseDuration } from './timerReducer'
import { useTimerSound } from '../../hooks/useTimerSound'
import { sendPhaseEndNotification } from '../../services/notificationService'
import { isYesterday, isToday, parseISO, format } from 'date-fns'

export function useTimer(selectedSubject: string) {
  const [state, dispatch] = useReducer(timerReducer, INITIAL_STATE)
  
  // 1. État du streak
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('pomo_streak')) || 0)
  
  const rafRef = useRef<number | null>(null)
  const lastTickRef = useRef<number | null>(null)
  const hasPlayedRef = useRef(false)
  const { playEndSound } = useTimerSound()

  // 2. LOGIQUE : Sauvegarder une session dans l'historique (KPIs)
  const logSession = useCallback(() => {
    const history = JSON.parse(localStorage.getItem('study_history') || '[]')
    const newSession = {
      id: Date.now(),
      subject: selectedSubject || 'Autre',
      duration: 25, // minutes par défaut pour un Pomo
      date: new Date().toISOString()
    }
    localStorage.setItem('study_history', JSON.stringify([...history, newSession]))
  }, [selectedSubject])

  // 3. LOGIQUE : Mise à jour du Streak journalier
  const updateStreak = useCallback(() => {
    const lastDateStr = localStorage.getItem('last_pomo_date')
    const todayStr = format(new Date(), 'yyyy-MM-dd')
    
    if (!lastDateStr) {
      setStreak(1)
      localStorage.setItem('pomo_streak', '1')
    } else {
      const lastDate = parseISO(lastDateStr)
      if (isYesterday(lastDate)) {
        const currentStored = Number(localStorage.getItem('pomo_streak') || 0)
        const newStreak = currentStored + 1
        setStreak(newStreak)
        localStorage.setItem('pomo_streak', newStreak.toString())
      } else if (!isToday(lastDate)) {
        setStreak(1)
        localStorage.setItem('pomo_streak', '1')
      }
    }
    localStorage.setItem('last_pomo_date', todayStr)
  }, [])

  // 4. Calculs de temps
  const total = phaseDuration(state)
  const remaining = Math.max(0, total - state.elapsed)
  const progress = total > 0 ? state.elapsed / total : 0

  // 5. Boucle d'animation (Tick)
  useEffect(() => {
    const isRunning = 
      state.phase === 'WORK' || 
      state.phase === 'SHORT_BREAK' || 
      state.phase === 'LONG_BREAK'

    if (!isRunning) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastTickRef.current = null
      return
    }

    const tick = (now: number) => {
      if (lastTickRef.current !== null) {
        const elapsed = (now - lastTickRef.current) / 1000
        dispatch({ type: 'TICK', payload: { elapsed } })
      }
      lastTickRef.current = now
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [state.phase])

  // 6. Gestion de la fin de cycle (Streak + Logging des Sessions)
  useEffect(() => {
    const isPhaseRunning = 
      state.phase === 'WORK' || 
      state.phase === 'SHORT_BREAK' || 
      state.phase === 'LONG_BREAK'
    
    if (isPhaseRunning && remaining <= 0 && !hasPlayedRef.current) {
      hasPlayedRef.current = true
      playEndSound()
      sendPhaseEndNotification(state.phase)

      if (state.phase === 'WORK') {
        // setTimeout pour éviter les erreurs de "cascading renders"
        setTimeout(() => {
          updateStreak()
          logSession() // ✅ On enregistre la session pour les KPIs de la tâche 26
        }, 0)
      }
    }

    if (remaining > 1) {
      hasPlayedRef.current = false
    }
  }, [remaining, state.phase, playEndSound, updateStreak, logSession])

  // 7. Formatage affichage
  const minutes = Math.floor(remaining / 60).toString().padStart(2, '0')
  const seconds = Math.floor(remaining % 60).toString().padStart(2, '0')

  // Log discret pour valider selectedSubject
  useEffect(() => {
    if (selectedSubject) console.debug(`Target: ${selectedSubject}`)
  }, [selectedSubject])

  return { 
    state, 
    dispatch, 
    remaining, 
    progress, 
    streak, 
    timeDisplay: `${minutes}:${seconds}` 
  }
}