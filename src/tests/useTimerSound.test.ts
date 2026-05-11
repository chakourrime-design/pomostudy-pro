import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useTimerSound } from '@/hooks/useTimerSound'

// Mock du store Zustand
vi.mock('@/stores/soundStore', () => ({
  useSoundStore: () => ({
    selectedSound: 'FinishAlarm',
    volume: 0.8,
  }),
}))

// Mock Audio Web API
const playMock = vi.fn().mockResolvedValue(undefined)
const audioMock = { volume: 1, play: playMock }

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubGlobal('Audio', vi.fn().mockImplementation(() => audioMock))
})

describe('useTimerSound', () => {
  it('retourne playEndSound', () => {
    const { result } = renderHook(() => useTimerSound())
    expect(typeof result.current.playEndSound).toBe('function')
  })

  it('playEndSound crée un Audio avec FinishAlarm.mp3', () => {
    const { result } = renderHook(() => useTimerSound())
    result.current.playEndSound()
    expect(Audio).toHaveBeenCalledWith('/sounds/FinishAlarm.mp3')
  })

  it('playEndSound applique le volume du store (0.8)', () => {
    const { result } = renderHook(() => useTimerSound())
    result.current.playEndSound()
    expect(audioMock.volume).toBe(0.8)
  })

  it('playEndSound appelle .play()', () => {
    const { result } = renderHook(() => useTimerSound())
    result.current.playEndSound()
    expect(playMock).toHaveBeenCalledOnce()
  })

  it('gère l\'erreur de play() silencieusement', async () => {
    playMock.mockRejectedValueOnce(new Error('NotAllowedError'))
    const { result } = renderHook(() => useTimerSound())
    // Ne doit pas throw
    await expect(
      Promise.resolve(result.current.playEndSound())
    ).resolves.not.toThrow()
  })
})