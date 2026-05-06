import { useState } from 'react'
import { ThemeTab } from '../themes/ThemeTab'
import { MusicPlayer } from '../music/MusicPlayer'

type Tab = 'themes' | 'stats' | 'music' | 'playlist'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'themes',   label: 'Thèmes',   icon: '🖼️' },
  { id: 'stats',    label: 'Stats',    icon: '📊' },
  { id: 'music',    label: 'Musique',  icon: '🎵' },
  { id: 'playlist', label: 'Playlist', icon: '🎧' },
]

export function BottomBar() {
  const [activeTab, setActiveTab] = useState<Tab | null>(null)

  return (
    <div style={{
      position: 'fixed',
      bottom: 30, // On remonte un peu pour voir le fond en dessous
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 15,
      width: 'auto', 
      pointerEvents: 'none' // Important : permet de cliquer sur le fond si on ne touche pas aux boutons
    }}>
      
      {/* Contenu de l'onglet actif */}
      {activeTab && (
        <div style={{
          pointerEvents: 'all',
          background: 'rgba(255, 255, 255, 0.05)', // Très léger blanc au lieu du noir
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 28,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '16px',
          width: '100%',
          minWidth: 350,
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        }}>
          {activeTab === 'themes' && <ThemeTab />}
          {activeTab === 'stats' && (
            <div style={{ padding: 20, color: '#fff', textAlign: 'center' }}>Stats - Sprint 3</div>
          )}
          {activeTab === 'music' && <MusicPlayer />}
          {activeTab === 'playlist' && (
            <div style={{ padding: 20, color: '#fff', textAlign: 'center' }}>Playlist Active</div>
          )}
        </div>
      )}

      {/* Barre de navigation style Pilule */}
      <div style={{
        pointerEvents: 'all',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: 'rgba(255, 255, 255, 0.08)', // Fond clair transparent
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        borderRadius: 40,
        border: '1px solid rgba(255, 255, 255, 0.15)',
        padding: '8px 12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: activeTab === tab.id ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '10px 18px',
              borderRadius: 30,
              transition: 'all 0.3s ease',
            }}
          >
            <span style={{ fontSize: 20 }}>{tab.icon}</span>
            {activeTab === tab.id && (
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{tab.label}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}