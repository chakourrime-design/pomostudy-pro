import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Task {
  id: number;
  text: string;
  completed: boolean;
  subject: string;
  date: string;
}

export function TasksManager({ currentSubject }: { currentSubject: string }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('pomo_tasks_history');
    return saved ? JSON.parse(saved) : [];
  })

  const [input, setInput] = useState('')

  useEffect(() => {
    localStorage.setItem('pomo_tasks_history', JSON.stringify(tasks));
  }, [tasks])

  // ✅ Plus de <form>, on appelle addTask() directement
  const addTask = () => {
    if (!input.trim()) return
    const newTask: Task = {
      id: Date.now(),
      text: input,
      completed: false,
      subject: currentSubject || 'Général',
      date: new Date().toISOString()
    }
    setTasks([newTask, ...tasks])
    setInput('')
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div style={{ width: '100%' }}>

      {/* ✅ div à la place de form, avec onKeyDown pour Enter */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Nouvelle tâche..."
          style={{
            flex: 1,
            minWidth: 0,          // ✅ empêche le débordement
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
            padding: '7px 10px',
            color: 'white',
            fontSize: '12px',
            outline: 'none'
          }}
        />
        <button
          onClick={addTask}
          style={{
            width: 30,
            height: 30,
            borderRadius: '8px',
            background: '#FF5F5F',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0         // ✅ le bouton + ne rétrécit pas
          }}
        >
          +
        </button>
      </div>

      {/* Liste des tâches */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        maxHeight: '150px',
        overflowY: 'auto',
        paddingRight: '2px'
      }}>
        <AnimatePresence>
          {tasks.map(task => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '7px 8px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '8px',
                fontSize: '11px',
                borderLeft: task.completed ? '2px solid #86EFAC' : '2px solid #FF5F5F'
              }}
            >
              <div
                onClick={() => toggleTask(task.id)}
                style={{ cursor: 'pointer', flex: 1, display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}
              >
                <div style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  background: task.completed ? '#86EFAC' : 'transparent',
                  flexShrink: 0
                }} />
                <span style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? 'rgba(255,255,255,0.35)' : '#fff',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'   // ✅ texte long ne déborde pas
                }}>
                  {task.text}
                </span>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  fontSize: '12px',
                  flexShrink: 0,
                  padding: '0 2px'
                }}
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {tasks.length === 0 && (
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px', textAlign: 'center', padding: '8px 0' }}>
            Aucune tâche pour le moment
          </p>
        )}
      </div>
    </div>
  )
}