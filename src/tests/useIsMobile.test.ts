import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useIsMobile } from '@/hooks/useIsMobile'

// Mock matchMedia pour jsdom
function mockMatchMedia(matches: boolean) {
  const listeners: ((e: MediaQueryListEvent) => void)[] = []
  const mq = {
    matches,
    addEventListener: vi.fn((_: string, fn: (e: MediaQueryListEvent) => void) => listeners.push(fn)),
    removeEventListener: vi.fn(),
  }
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockReturnValue(mq),
  })
  return { mq, listeners }
}

describe('useIsMobile', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 })
  })

  it('retourne false sur desktop (1024px)', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('retourne true sur mobile (375px)', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 })
    mockMatchMedia(true)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('accepte un breakpoint custom', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useIsMobile(480))
    expect(result.current).toBe(false)
  })

  it('breakpoint par défaut est 768', () => {
    mockMatchMedia(false)
    renderHook(() => useIsMobile())
    // Vérifie que matchMedia est appelé avec 768px
    expect(window.matchMedia).toHaveBeenCalledWith('(max-width: 768px)')
  })

  it('removeEventListener appelé au démontage', () => {
    const { mq } = mockMatchMedia(false)
    const { unmount } = renderHook(() => useIsMobile())
    unmount()
    expect(mq.removeEventListener).toHaveBeenCalled()
  })
})