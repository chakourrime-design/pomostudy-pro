import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { DraggableTimer } from '@/components/timer/DraggableTimer'

// ── Mocks ──────────────────────────────────────────────────────
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div {...p}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

vi.mock('@/stores/moodStore', () => ({
  useMoodStore: () => ({
    currentMood: null,
    setMood: vi.fn(),
  }),
}))

vi.mock('@/components/timer/PhaseTransition', () => ({
  PhaseTransition: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

vi.mock('@/components/mood/MoodWindow', () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="mood-window">
      <button onClick={onClose}>Passer</button>
    </div>
  ),
}))

// Mock window dimensions pour jsdom
Object.defineProperty(window, 'innerWidth',  { writable: true, configurable: true, value: 1280 })
Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 800 })

describe('DraggableTimer', () => {
  beforeEach(() => vi.clearAllMocks())

  it('affiche le timer avec 25:00 par défaut', () => {
    render(<DraggableTimer selectedSubject="" />)
    expect(screen.getByText('25:00')).toBeInTheDocument()
  })

  it('affiche le statut PRÊT au démarrage', () => {
    render(<DraggableTimer selectedSubject="" />)
    expect(screen.getByText(/prêt/i)).toBeInTheDocument()
  })

  it('ouvre MoodWindow au clic Démarrer si pas de mood', async () => {
    render(<DraggableTimer selectedSubject="" />)
    const btn = screen.getByRole('button', { name: /démarrer/i })
    await userEvent.click(btn)
    expect(screen.getByTestId('mood-window')).toBeInTheDocument()
  })

  it('affiche la matière sélectionnée', () => {
    render(<DraggableTimer selectedSubject="Mathématiques" />)
    expect(screen.getByText(/mathématiques/i)).toBeInTheDocument()
  })

  it('affiche les points pomodoro', () => {
    render(<DraggableTimer selectedSubject="" />)
    // 4 dots par défaut (pomosBeforeLongBreak = 4)
    const dots = document.querySelectorAll('[style*="border-radius: 50%"]')
    expect(dots.length).toBeGreaterThan(0)
  })

  it('ferme MoodWindow au clic Passer et démarre', async () => {
    render(<DraggableTimer selectedSubject="" />)
    await userEvent.click(screen.getByRole('button', { name: /démarrer/i }))
    await userEvent.click(screen.getByRole('button', { name: /passer/i }))
    expect(screen.queryByTestId('mood-window')).not.toBeInTheDocument()
  })
})