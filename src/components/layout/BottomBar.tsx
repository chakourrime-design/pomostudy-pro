import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeTab } from '../themes/ThemeTab'
import { MusicPlayer } from '../music/MusicPlayer'
import GroupSession from '.././groups/GroupSession' // ← POMO-30

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
      bottom: 30,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 15,
      pointerEvents: 'none'
    }}>

      {/* Fenêtre de l'onglet actif */}
      <AnimatePresence>
        {activeTab && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              pointerEvents: 'all',
              background: 'rgba(15, 15, 15, 0.7)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              borderRadius: 32,
              border: '1px solid rgba(255, 255, 255, 0.12)',
              padding: '20px',
              // groups est plus compact, les autres gardent 380px
              width: activeTab === 'groups' ? 340 : 380,
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
            }}
          >
            {activeTab === 'themes'   && <ThemeTab />}
            {activeTab === 'stats'    && (
              <div style={{ padding: 20, color: '#fff', textAlign: 'center' }}>
                <h3 style={{ margin: 0 }}>Statistiques</h3>
                <p style={{ opacity: 0.6, fontSize: 13 }}>Sprint 3 en cours...</p>
              </div>
            )}
            {activeTab === 'music'    && <MusicPlayer />}
            {activeTab === 'playlist' && (
              <div style={{ padding: 20, color: '#fff', textAlign: 'center' }}>Playlist Active</div>
            )}
            {/* ← POMO-30 : QR code + lien de session */}
            {activeTab === 'groups'   && <GroupSession />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barre de navigation style Pilule */}
      <div style={{
        pointerEvents: 'all',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: 40,
        border: '1px solid rgba(255, 255, 255, 0.15)',
        padding: '6px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
      }}>
        {TABS.map(tab => (
          <motion.button
            key={tab.id}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: activeTab === tab.id ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '10px 20px',
              borderRadius: 30,
              transition: 'all 0.2s ease',
              color: '#fff'
            }}
          >
            <span style={{ fontSize: 20 }}>{tab.icon}</span>
            {activeTab === tab.id && (
              <motion.span
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ fontSize: 13, fontWeight: 600 }}
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