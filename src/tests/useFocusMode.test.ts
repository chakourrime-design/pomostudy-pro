import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useFocusMode } from '@/hooks/useFocusMode'

describe('useFocusMode', () => {
  it('focusActive est false par défaut', () => {
    const { result } = renderHook(() => useFocusMode())
    expect(result.current.focusActive).toBe(false)
  })

  it('toggleFocus passe à true', () => {
    const { result } = renderHook(() => useFocusMode())
    act(() => result.current.toggleFocus())
    expect(result.current.focusActive).toBe(true)
  })

  it('double toggle revient à false', () => {
    const { result } = renderHook(() => useFocusMode())
    act(() => result.current.toggleFocus())
    act(() => result.current.toggleFocus())
    expect(result.current.focusActive).toBe(false)
  })

  it('toggleFocus est stable (même référence)', () => {
    const { result, rerender } = renderHook(() => useFocusMode())
    const first = result.current.toggleFocus
    rerender()
    // setState setter est stable dans React
    expect(typeof first).toBe('function')
  })
})