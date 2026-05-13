import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type AuthMode = 'login' | 'register'

type Props = {
  onAuth: (name: string) => void
}

export function AuthPage({ onAuth }: Props) {
  const [mode, setMode] = useState<AuthMode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit() {
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Remplis tous les champs')
      return
    }
    if (mode === 'register' && !name.trim()) {
      setError('Entre ton prénom')
      return
    }

    if (mode === 'register') {
      localStorage.setItem('pomostudy_user', JSON.stringify({
        name: name.trim(),
        email: email.trim(),
      }))
      onAuth(name.trim())
    } else {
      const saved = localStorage.getItem('pomostudy_user')
      if (!saved) {
        setError("Aucun compte trouvé, inscris-toi d'abord")
        return
      }
      const user = JSON.parse(saved)
      if (user.email !== email.trim()) {
        setError('Email incorrect')
        return
      }
      onAuth(user.name)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.12)',
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(8px)',
    color: '#fff',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'linear-gradient(135deg, #0a0a0a 0%, #0D1F0F 50%, #0C1A2E 100%)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 9999
    }}>

      {/* Cercles décoratifs */}
      <div style={{
        position: 'absolute', top: -100, left: -100,
        width: 400, height: 400, borderRadius: '50%',
        background: 'rgba(239,68,68,0.08)',
        filter: 'blur(60px)', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: -100, right: -100,
        width: 300, height: 300, borderRadius: '50%',
        background: 'rgba(59,130,246,0.08)',
        filter: 'blur(60px)', pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          width: '100%', maxWidth: 420,
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          borderRadius: 32,
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '36px 32px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          display: 'flex', flexDirection: 'column', gap: 20,
          position: 'relative', zIndex: 1
        }}
      >
        {/* Logo */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: 12, marginBottom: 4
        }}>
          <img
            src="/Club-Logo.png"
            alt="logo"
            style={{
              width: 44, height: 44,
              borderRadius: 12,
              boxShadow: '0 0 20px rgba(239,68,68,0.3)'
            }}
          />
          <div>
            <p style={{
              margin: 0, color: '#fff',
              fontSize: 20, fontWeight: 800,
              letterSpacing: '-0.02em'
            }}>
              PomoStudy
            </p>
            <p style={{
              margin: 0, fontSize: 11,
              color: 'rgba(255,255,255,0.4)'
            }}>
              ENSAB • Club Productivité
            </p>
          </div>
        </div>

        {/* Toggle Login / Register */}
        <div style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 14, padding: 4, gap: 4
        }}>
          {(['login', 'register'] as AuthMode[]).map(m => (
            <motion.button
              key={m}
              whileTap={{ scale: 0.96 }}
              onClick={() => { setMode(m); setError('') }}
              style={{
                flex: 1, padding: '10px 0',
                borderRadius: 10, border: 'none',
                background: mode === m
                  ? 'rgba(239,68,68,0.25)'
                  : 'transparent',
                color: mode === m
                  ? '#fff'
                  : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: mode === m ? 700 : 400,
                transition: 'all 0.2s',
                borderBottom: mode === m
                  ? '2px solid #EF4444'
                  : '2px solid transparent'
              }}
            >
              {m === 'login' ? '🔑 Se connecter' : '✨ S\'inscrire'}
            </motion.button>
          ))}
        </div>

        {/* Formulaire */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: mode === 'register' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex', flexDirection: 'column', gap: 12
            }}
          >
            {/* Prénom — inscription seulement */}
            {mode === 'register' && (
              <input
                placeholder="👤 Ton prénom"
                value={name}
                onChange={e => setName(e.target.value)}
                style={inputStyle}
              />
            )}

            {/* Email */}
            <input
              placeholder="📧 Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
            />

            {/* Mot de passe */}
            <input
              placeholder="🔒 Mot de passe"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={inputStyle}
            />
          </motion.div>
        </AnimatePresence>

        {/* Message d'erreur */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                margin: 0, fontSize: 12,
                color: '#FCA5A5',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.2)',
                padding: '8px 14px',
                borderRadius: 10,
                textAlign: 'center'
              }}
            >
              ⚠️ {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Bouton soumettre */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleSubmit}
          style={{
            width: '100%', padding: '14px 0',
            borderRadius: 16, border: 'none',
            background: 'linear-gradient(135deg, #EF4444, #DC2626)',
            color: '#fff', cursor: 'pointer',
            fontSize: 15, fontWeight: 700,
            boxShadow: '0 0 32px rgba(239,68,68,0.35)',
            letterSpacing: '0.02em'
          }}
        >
          {mode === 'login' ? 'Se connecter →' : 'Créer mon compte →'}
        </motion.button>

        {/* Footer */}
        <p style={{
          margin: 0, textAlign: 'center',
          fontSize: 11, color: 'rgba(255,255,255,0.2)'
        }}>
          Club Productivité ENSAB Berrechid 🎓
        </p>
      </motion.div>
    </div>
  )
}