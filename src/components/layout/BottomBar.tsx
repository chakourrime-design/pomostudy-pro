import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeTab } from '../themes/ThemeTab'
import { MusicPlayer } from '../music/MusicPlayer'
import GroupSession from '../groups/GroupSession'
import { StudyDashboard } from '../stats/StudyDashboard'
import ContributionHeatmap from '../stats/ContributionHeatmap'
import { SessionHistory } from '../history/SessionHistory'

type Tab = 'themes' | 'stats' | 'music' | 'playlist' | 'groups'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'themes',   label: 'Thèmes',   icon: '🖼️' },
  { id: 'stats',    label: 'Stats',    icon: '📊' },
  { id: 'music',    label: 'Musique',  icon: '🎵' },
  { id: 'playlist', label: 'Playlist', icon: '🎧' },
  { id: 'groups',   label: 'Groupe',   icon: '👥' },
]

export function BottomBar() {
  const [activeTab, setActiveTab] = useState<Tab | null>(null)

  return (
    <div style={{
      position: 'fixed',
      bottom: 30, left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 15,
      pointerEvents: 'none'
    }}>

      {/* Panneau contenu */}
      <AnimatePresence>
        {activeTab && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              pointerEvents: 'all',
              background: 'rgba(15,15,15,0.75)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderRadius: 32,
              border: '1px solid rgba(255,255,255,0.12)',
              padding: 24,
              width: activeTab === 'groups' ? 340 : 420,
              maxHeight: '60vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
            }}
          >
            {activeTab === 'themes' && <ThemeTab />}

            {/* ✅ Stats — vrai dashboard */}
            {activeTab === 'stats' && (
              <div style={{ color: '#fff' }}>
                <h3 style={{
                  textAlign: 'center', marginBottom: 20,
                  fontSize: 18, fontWeight: 800
                }}>
                  📊 Statistiques
                </h3>
                <StudyDashboard />
                <div style={{ marginTop: 16 }}>
                  <ContributionHeatmap />
                </div>
                <div style={{ marginTop: 16 }}>
                  <p style={{
                    fontSize: 10, textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.35)',
                    marginBottom: 10
                  }}>
                    Historique
                  </p>
                  <SessionHistory />
                </div>
              </div>
            )}

            {activeTab === 'music' && <MusicPlayer />}

            {activeTab === 'playlist' && (
              <div style={{
                padding: 20, color: '#fff',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: 32, marginBottom: 8 }}>🎧</p>
                <h3 style={{ margin: 0, marginBottom: 8 }}>Mes Playlists</h3>
                <p style={{
                  fontSize: 12, color: 'rgba(255,255,255,0.4)'
                }}>
                  Bientôt disponible
                </p>
              </div>
            )}

            {activeTab === 'groups' && <GroupSession />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barre navigation pilule */}
      <div style={{
        pointerEvents: 'all',
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: 40,
        border: '1px solid rgba(255,255,255,0.15)',
        padding: 6,
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
      }}>
        {TABS.map(tab => (
          <motion.button
            key={tab.id}
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(
              activeTab === tab.id ? null : tab.id
            )}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: activeTab === tab.id
                ? 'rgba(255,255,255,0.18)'
                : 'transparent',
              border: 'none', cursor: 'pointer',
              padding: '10px 22px', borderRadius: 30,
              transition: 'all 0.2s ease',
              color: '#fff', outline: 'none'
            }}
          >
            <span style={{ fontSize: 20 }}>{tab.icon}</span>
            {activeTab === tab.id && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ fontSize: 13, fontWeight: 700 }}
              >
                {tab.label}
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}