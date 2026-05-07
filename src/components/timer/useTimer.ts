import { useReducer, useEffect, useRef, useState, useCallback } from 'react'
import { timerReducer, INITIAL_STATE, phaseDuration } from './timerReducer'
import { useTimerSound } from '../../hooks/useTimerSound'
import { sendPhaseEndNotification } from '../../services/notificationService'
import { isYesterday, isToday, parseISO, format } from 'date-fns'

export function useTimer(selectedSubject: string) {
  const [state, dispatch] = useReducer(timerReducer, INITIAL_STATE)
  
  // 1. État du streak (initialisé depuis le localStorage)
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('pomo_streak')) || 0)
  
  const rafRef = useRef<number | null>(null)
  const lastTickRef = useRef<number | null>(null)
  const hasPlayedRef = useRef(false)
  const { playEndSound } = useTimerSound()

  // 2. Logique du STREAK (Mise à jour du localStorage et du state)
  const updateStreak = useCallback(() => {
    const lastDateStr = localStorage.getItem('last_pomo_date')
    const todayStr = format(new Date(), 'yyyy-MM-dd')
    
    if (!lastDateStr) {
      // Premier pomodoro à vie
      setStreak(1)
      localStorage.setItem('pomo_streak', '1')
    } else {
      const lastDate = parseISO(lastDateStr)
      
      if (isYesterday(lastDate)) {
        // Succès : hier validé, on incrémente la série
        const currentStored = Number(localStorage.getItem('pomo_streak') || 0)
        const newStreak = currentStored + 1
        setStreak(newStreak)
        localStorage.setItem('pomo_streak', newStreak.toString())
      } else if (!isToday(lastDate)) {
        // Échec : plus de 24h d'écart, reset à 1
        setStreak(1)
        localStorage.setItem('pomo_streak', '1')
      }
    }
    localStorage.setItem('last_pomo_date', todayStr)
  }, [])

  // 3. Calculs dérivés du temps
  const total = phaseDuration(state)
  const remaining = Math.max(0, total - state.elapsed)
  const progress = total > 0 ? state.elapsed / total : 0

  // 4. Boucle d'animation (Tick) pour la précision du chrono
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

  // 5. Gestion de la fin de cycle (Correction de l'erreur setState)
  useEffect(() => {
    const isPhaseRunning = 
      state.phase === 'WORK' || 
      state.phase === 'SHORT_BREAK' || 
      state.phase === 'LONG_BREAK'
    
    if (isPhaseRunning && remaining <= 0 && !hasPlayedRef.current) {
      hasPlayedRef.current = true
      playEndSound()
      sendPhaseEndNotification(state.phase)

      // ✅ Utilisation de setTimeout pour éviter le "cascading render"
      if (state.phase === 'WORK') {
        setTimeout(() => {
          updateStreak()
        }, 0)
      }
    }

    // Reset du flag quand le temps est réinitialisé
    if (remaining > 1) {
      hasPlayedRef.current = false
    }
  }, [remaining, state.phase, playEndSound, updateStreak])

  // 6. Formatage de l'affichage (MM:SS)
  const minutes = Math.floor(remaining / 60).toString().padStart(2, '0')
  const seconds = Math.floor(remaining % 60).toString().padStart(2, '0')

  // Log pour éviter le warning orange sur selectedSubject
  useEffect(() => {
    if (selectedSubject) console.debug(`Session active sur : ${selectedSubject}`)
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