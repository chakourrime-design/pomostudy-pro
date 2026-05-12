import { useCallback } from 'react'
import { useSoundStore } from '../stores/soundStore'

export function useTimerSound() {
  const { selectedSound, volume } = useSoundStore()

  const playEndSound = useCallback(() => {
    const audio = new Audio('.../sounds/FinishAlarm.mp3')
    audio.volume = volume
    audio.play().catch((err: unknown) => {
      console.error('Audio play failed:', err)
    })
  }, [selectedSound, volume])

  return { playEndSound }
}