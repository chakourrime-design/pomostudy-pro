import { useThemeStore } from '../../stores/themeStore'
import { STATIC_THEMES } from './staticThemes'

export function ThemeTab() {
  const { activeTheme, setTheme } = useThemeStore()

  return (
    <div style={{ display: 'flex', gap: 12, padding: 16, flexWrap: 'wrap' }}>
      {STATIC_THEMES.map(theme => (
        <button
          key={theme.id}
          onClick={() => setTheme(theme)}
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: theme.background,
            border: activeTheme.id === theme.id
              ? `3px solid ${theme.primaryColor}`
              : '2px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.2s'
          }}
          title={theme.name}
        >
          <div style={{
            position: 'absolute',
            bottom: 4,
            right: 4,
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: theme.primaryColor
          }} />
        </button>
      ))}
    </div>
  )
}