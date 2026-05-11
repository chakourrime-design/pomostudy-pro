import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fullscreenManager } from '@/utils/fullscreenManager'

describe('fullscreenManager', () => {
  beforeEach(() => {
    // Reset fullscreen state
    Object.defineProperty(document, 'fullscreenElement', {
      writable: true, configurable: true, value: null
    })
    Object.defineProperty(document.documentElement, 'requestFullscreen', {
      writable: true, configurable: true,
      value: vi.fn().mockResolvedValue(undefined)
    })
    Object.defineProperty(document, 'exitFullscreen', {
      writable: true, configurable: true,
      value: vi.fn().mockResolvedValue(undefined)
    })
  })

  it('enter() appelle requestFullscreen sur documentElement', () => {
    fullscreenManager.enter()
    expect(document.documentElement.requestFullscreen).toHaveBeenCalledOnce()
  })

  it('exit() appelle document.exitFullscreen', () => {
    fullscreenManager.exit()
    expect(document.exitFullscreen).toHaveBeenCalledOnce()
  })

  it('isFullscreen() retourne false si fullscreenElement est null', () => {
    expect(fullscreenManager.isFullscreen()).toBe(false)
  })

  it('isFullscreen() retourne true si fullscreenElement est défini', () => {
    Object.defineProperty(document, 'fullscreenElement', {
      writable: true, configurable: true,
      value: document.documentElement
    })
    expect(fullscreenManager.isFullscreen()).toBe(true)
  })

  it('toggle() appelle enter() quand pas en fullscreen', () => {
    const enterSpy = vi.spyOn(fullscreenManager, 'enter')
    fullscreenManager.toggle()
    expect(enterSpy).toHaveBeenCalledOnce()
  })

  it('toggle() appelle exit() quand déjà en fullscreen', () => {
    Object.defineProperty(document, 'fullscreenElement', {
      writable: true, configurable: true,
      value: document.documentElement
    })
    const exitSpy = vi.spyOn(fullscreenManager, 'exit')
    fullscreenManager.toggle()
    expect(exitSpy).toHaveBeenCalledOnce()
  })
})