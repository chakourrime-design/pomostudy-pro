import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSessionStore } from '../../stores/sessionStore'
import { format, parseISO, isToday, isThisWeek } from 'date-fns'
import { fr } from 'date-fns/locale'

type Filter = 'all' | 'today' | 'week' | 'completed' | 'incomplete'

export function SessionHistory() {
  const { sessions } = useSessionStore()
  const [filter, setFilter] = useState<Filter>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = sessions
    .filter(s => {
      if (filter === 'today')
        return isToday(parseISO(s.date))
      if (filter === 'week')
        return isThisWeek(parseISO(s.date))
      if (filter === 'completed')
        return s.tasks.length > 0 &&
          s.tasks.every(t => t.status === 'completed')
      if (filter === 'incomplete')
        return s.tasks.some(t => t.status !== 'completed')
      return true
    })
    .sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )

  const FILTERS: { id: Filter; label: string }[] = [
    { id: 'all',        label: 'Toutes'      },
    { id: 'today',      label: "Aujourd'hui" },
    { id: 'week',       label: 'Cette sem.'  },
    { id: 'completed',  label: '✓ Complètes' },
    { id: 'incomplete', label: '○ Incomplètes' },
  ]

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 12
    }}>

      {/* Filtres */}
      <div style={{
        display: 'flex', gap: 6,
        flexWrap: 'wrap'
      }}>
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              padding: '4px 12px',
              borderRadius: 999,
              border: filter === f.id
                ? '2px solid #EF4444'
                : '1px solid rgba(255,255,255,0.12)',
              background: filter === f.id
                ? 'rgba(239,68,68,0.2)'
                : 'rgba(255,255,255,0.04)',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: filter === f.id ? 700 : 400,
              transition: 'all 0.15s'
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Compteur */}
      <p style={{
        fontSize: 10, color: 'rgba(255,255,255,0.3)',
        margin: 0
      }}>
        {filtered.length} session{filtered.length > 1 ? 's' : ''}
      </p>

      {/* Liste vide */}
      {filtered.length === 0 && (
        <div style={{
          padding: '24px 0',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.25)',
          fontSize: 13
        }}>
          🍅 Aucune session trouvée
        </div>
      )}

      {/* Liste des sessions */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 8,
        maxHeight: 320, overflowY: 'auto',
        paddingRight: 4,
        scrollbarWidth: 'none'
      }}>
        <AnimatePresence>
          {filtered.map(session => {
            const completedTasks = session.tasks
              .filter(t => t.status === 'completed').length
            const totalTasks = session.tasks.length
            const isComplete = totalTasks > 0 &&
              completedTasks === totalTasks
            const isExpanded = expanded === session.id

            return (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                style={{
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isComplete
                    ? 'rgba(34,197,94,0.2)'
                    : 'rgba(255,255,255,0.07)'}`,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'border 0.2s'
                }}
                onClick={() => setExpanded(
                  isExpanded ? null : session.id
                )}
              >
                {/* En-tête session */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 14px',
                }}>
                  {/* Gauche */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column', gap: 3
                  }}>
                    <span style={{
                      color: '#fff', fontSize: 13,
                      fontWeight: 600
                    }}>
                      {session.subject || 'Sans matière'}
                    </span>
                    <span style={{
                      color: 'rgba(255,255,255,0.35)',
                      fontSize: 10
                    }}>
                      {format(
                        parseISO(session.date),
                        "dd MMM yyyy '·' HH:mm",
                        { locale: fr }
                      )}
                    </span>
                  </div>

                  {/* Droite — badges */}
                  <div style={{
                    display: 'flex', gap: 6,
                    alignItems: 'center'
                  }}>
                    <span style={{
                      background: 'rgba(239,68,68,0.15)',
                      border: '1px solid rgba(239,68,68,0.25)',
                      borderRadius: 999,
                      padding: '2px 8px',
                      fontSize: 10, color: '#FCA5A5',
                      fontWeight: 600
                    }}>
                      🍅 {session.pomosCompleted}
                    </span>

                    <span style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 999,
                      padding: '2px 8px',
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.5)'
                    }}>
                      ⏱ {Math.round(session.duration / 60)}min
                    </span>

                    {totalTasks > 0 && (
                      <span style={{
                        background: isComplete
                          ? 'rgba(34,197,94,0.15)'
                          : 'rgba(245,158,11,0.15)',
                        border: `1px solid ${isComplete
                          ? 'rgba(34,197,94,0.25)'
                          : 'rgba(245,158,11,0.25)'}`,
                        borderRadius: 999,
                        padding: '2px 8px',
                        fontSize: 10,
                        color: isComplete ? '#86EFAC' : '#FCD34D',
                        fontWeight: 600
                      }}>
                        {completedTasks}/{totalTasks}
                      </span>
                    )}

                    <span style={{
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: 12,
                      transform: isExpanded
                        ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                      display: 'inline-block'
                    }}>
                      ▾
                    </span>
                  </div>
                </div>

                {/* Détails dépliables */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        padding: '10px 14px',
                        display: 'flex',
                        flexDirection: 'column', gap: 6
                      }}
                    >
                      {/* Mood */}
                      {session.mood && (
                        <div style={{
                          fontSize: 11,
                          color: 'rgba(255,255,255,0.4)'
                        }}>
                          Humeur :{' '}
                          <span style={{ fontSize: 16 }}>
                            {/* Mood */}
{session.mood && (
  <div style={{
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)'
  }}>
    Humeur :{' '}
    <span style={{ fontSize: 16 }}>
      {String(session.mood) === 'great' ? '😄'
        : String(session.mood) === 'good' ? '🙂'
        : String(session.mood) === 'meh' ? '😐'
        : String(session.mood) === 'bad' ? '😞'
        : '😐'}
    </span>
  </div>
)} ? '😐'
                          </span>
                        </div>
                      )}

                      {/* Tâches */}
                      {session.tasks.length > 0 && (
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column', gap: 4
                        }}>
                          <p style={{
                            fontSize: 10, margin: 0,
                            color: 'rgba(255,255,255,0.3)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em'
                          }}>
                            Tâches
                          </p>
                          {session.tasks.map(task => (
                            <div
                              key={task.id}
                              style={{
                                display: 'flex',
                                alignItems: 'center', gap: 8,
                                fontSize: 12
                              }}
                            >
                              <span style={{
                                color: task.status === 'completed'
                                  ? '#22C55E' : 'rgba(255,255,255,0.3)',
                                fontSize: 14
                              }}>
                                {task.status === 'completed' ? '✓' : '○'}
                              </span>
                              <span style={{
                                color: task.status === 'completed'
                                  ? 'rgba(255,255,255,0.5)'
                                  : '#fff',
                                textDecoration: task.status === 'completed'
                                  ? 'line-through' : 'none'
                              }}>
                                {task.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Notes */}
                      {session.notes && (
                        <p style={{
                          fontSize: 11, margin: 0,
                          color: 'rgba(255,255,255,0.4)',
                          fontStyle: 'italic',
                          borderLeft: '2px solid rgba(255,255,255,0.1)',
                          paddingLeft: 8
                        }}>
                          "{session.notes}"
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}