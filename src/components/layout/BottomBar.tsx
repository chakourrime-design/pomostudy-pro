import { useState } from 'react'
import { ThemeTab } from '../themes/ThemeTab'

type Tab = 'themes' | 'stats' | 'music' | 'playlist'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'themes',   label: 'Thèmes',   icon: '🎨' },
  { id: 'stats',    label: 'Stats',    icon: '📊' },
  { id: 'music',    label: 'Musique',  icon: '🎵' },
  { id: 'playlist', label: 'Playlist', icon: '🎧' },
]

export function BottomBar() {
  const [activeTab, setActiveTab] = useState<Tab | null>(null)

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
    }}>
      {/* Contenu de l'onglet actif */}
      {activeTab && (
        <div style={{
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '8px 0',
          minHeight: 80
        }}>
          {activeTab === 'themes' && <ThemeTab />}
          {activeTab === 'stats' && (
            <div style={{ padding: 16, color: '#fff', opacity: 0.5 }}>
              Stats — Sprint 3
            </div>
          )}
          {activeTab === 'music' && (
            <div style={{ padding: 16, color: '#fff', opacity: 0.5 }}>
              Musique — POMO-16
            </div>
          )}
          {activeTab === 'playlist' && (
            <div style={{ padding: 16, color: '#fff', opacity: 0.5 }}>
              Playlist — POMO-16
            </div>
          )}
        </div>
      )}

      {/* Barre de navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        background: 'rgba(0,0,0,0.9)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '12px 0',
      }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(
              activeTab === tab.id ? null : tab.id
            )}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 20px',
              borderRadius: 12,
              opacity: activeTab === tab.id ? 1 : 0.5,
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontSize: 20 }}>{tab.icon}</span>
            <span style={{
              fontSize: 10,
              color: '#fff',
              fontWeight: activeTab === tab.id ? 600 : 400
            }}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}