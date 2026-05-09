import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_QUOTES } from '../data/quotes'

interface QuoteState {
  quotes: string[]
  currentIndex: number
  addQuote: (q: string) => void
  removeQuote: (i: number) => void
  nextQuote: () => void
  randomQuote: () => void
}

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set, get) => ({
      quotes: DEFAULT_QUOTES,
      currentIndex: 0,
      addQuote: (q) => {
        const t = q.trim()
        if (t) set((s) => ({ quotes: [...s.quotes, t] }))
      },
      removeQuote: (i) => set((s) => {
        const next = s.quotes.filter((_, idx) => idx !== i)
        return { quotes: next,
          currentIndex: Math.min(s.currentIndex, Math.max(0, next.length - 1)) }
      }),
      nextQuote: () => set((s) => ({
        currentIndex: (s.currentIndex + 1) % s.quotes.length
      })),
      randomQuote: () => {
        const { quotes } = get()
        set({ currentIndex: Math.floor(Math.random() * quotes.length) })
      },
    }),
    { name: 'quote-store' }
  )
)