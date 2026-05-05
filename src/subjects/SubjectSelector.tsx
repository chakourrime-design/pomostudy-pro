import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { subjectsByFilieres } from './subjectsByFilieres'

type FiliereName = keyof typeof subjectsByFilieres

export function SubjectSelector() {
  const [selectedFiliere, setSelectedFiliere] = useState<FiliereName | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const filieres = Object.keys(subjectsByFilieres) as FiliereName[]

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 12
    }}>
      {/* Filières */}
      <div style={{
        display: 'flex', gap: 8, flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {filieres.map(f => (
          <motion.button
            key={f}
            whileTap={{ scale: 0.93 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              setSelectedFiliere(f === selectedFiliere ? null : f)
              setSelectedSubject(null)
            }}
            style={{
              padding: '8px 18px',
              borderRadius: 999,
              border: selectedFiliere === f
                ? '2px solid #EF4444'
                : '1px solid rgba(255,255,255,0.3)',
              background: selectedFiliere === f
                ? 'rgba(239,68,68,0.25)'
                : 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(12px)',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: selectedFiliere === f ? 700 : 400,
              transition: 'all 0.2s',
              boxShadow: selectedFiliere === f
                ? '0 0 16px rgba(239,68,68,0.35)'
                : 'none'
            }}
          >
            {f}
          </motion.button>
        ))}
      </div>

      {/* Matières */}
      <AnimatePresence>
        {selectedFiliere && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex', gap: 8,
              flexWrap: 'wrap', justifyContent: 'center'
            }}
          >
            {subjectsByFilieres[selectedFiliere].map(subject => (
              <motion.button
                key={subject}
                whileTap={{ scale: 0.93 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedSubject(subject)}
                style={{
                  padding: '6px 16px',
                  borderRadius: 999,
                  border: selectedSubject === subject
                    ? '2px solid #22C55E'
                    : '1px solid rgba(255,255,255,0.2)',
                  background: selectedSubject === subject
                    ? 'rgba(34,197,94,0.25)'
                    : 'rgba(0,0,0,0.35)',
                  backdropFilter: 'blur(8px)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: selectedSubject === subject ? 700 : 400,
                  transition: 'all 0.2s',
                  boxShadow: selectedSubject === subject
                    ? '0 0 12px rgba(34,197,94,0.3)'
                    : 'none'
                }}
              >
                {subject}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matière sélectionnée */}
      {selectedSubject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            padding: '6px 16px',
            background: 'rgba(34,197,94,0.15)',
            border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: 999,
            color: '#86EFAC',
            fontSize: 12,
            fontWeight: 600
          }}
        >
          ✓ {selectedSubject}
        </motion.div>
      )}
    </div>
  )
}