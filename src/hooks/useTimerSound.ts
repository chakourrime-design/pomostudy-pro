import { useCallback } from 'react'
import { useSoundStore } from '../stores/soundStore'

export function useTimerSound() {
  const { selectedSound, volume } = useSoundStore()

  const playEndSound = useCallback(() => {
    const audio = new Audio(`/sounds/${selectedSound}.mp3`)
    audio.volume = volume
    audio.play().catch(console.error)
  }, [selectedSound, volume])

  return { playEndSound }
}