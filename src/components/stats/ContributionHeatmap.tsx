import { useMemo } from 'react'
import { useSessionStore } from '../../stores/sessionStore'
import { format, subDays, parseISO, isSameDay } from 'date-fns'

export default function ContributionHeatmap() {
  const { sessions } = useSessionStore()

  const grid = useMemo(() => {
    const today = new Date()
    return Array.from({ length: 90 }, (_, i) => {
      const date = subDays(today, 89 - i)
      const count = sessions.filter((s) =>
        isSameDay(parseISO(s.date), date)
      ).length
      return { date, count }
    })
  }, [sessions])

  const getOpacity = (count: number): number => {
    if (count === 0) return 0.12
    if (count === 1) return 0.4
    if (count === 2) return 0.7
    return 1
  }

  const weeks: typeof grid[] = []
  for (let i = 0; i < grid.length; i += 7) {
    weeks.push(grid.slice(i, i + 7))
  }

  return (
    <div style={{ marginTop: 12 }}>
      <p style={{
        fontSize: 9,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: 'rgba(255,255,255,0.4)',
        marginBottom: 8,
        fontWeight: 500,
      }}>
        Activité — 90 jours
      </p>

      <div style={{ display: 'flex', gap: 3 }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {week.map(({ date, count }, di) => (
              <div
                key={di}
                title={`${format(date, 'dd MMM yyyy')} — ${count} session${count !== 1 ? 's' : ''}`}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  backgroundColor: '#FF5F5F',
                  opacity: getOpacity(count),
                  cursor: 'default',
                  transition: 'transform 0.15s',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            ))}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Moins</span>
        {[0, 1, 2, 3].map((level) => (
          <div
            key={level}
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              backgroundColor: '#FF5F5F',
              opacity: getOpacity(level),
              flexShrink: 0,
            }}
          />
        ))}
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Plus</span>
      </div>
    </div>
  )
}