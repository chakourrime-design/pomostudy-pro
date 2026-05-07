import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Task {
  id: number;
  text: string;
  completed: boolean;
  subject: string;
  date: string;
}

// On ajoute la prop 'subject' pour savoir à quelle matière lier la tâche
export function TaskManager({ currentSubject }: { currentSubject: string }) {
  // Chargement initial depuis le localStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('pomo_tasks_history');
    return saved ? JSON.parse(saved) : [];
  })
  
  const [input, setInput] = useState('')

  // Sauvegarde automatique à chaque changement
  useEffect(() => {
    localStorage.setItem('pomo_tasks_history', JSON.stringify(tasks));
  }, [tasks])

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
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
    <div style={{ width: '100%', marginTop: 10 }}>
      <form onSubmit={addTask} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nouvelle tâche..."
          style={{
            flex: 1, background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
            padding: '8px 12px', color: 'white', fontSize: '13px'
          }}
        />
      </form>

      {/* Liste avec défilement */}
      <div style={{ 
        display: 'flex', flexDirection: 'column', gap: 6, 
        maxHeight: '150px', overflowY: 'auto', paddingRight: '4px' 
      }}>
        <AnimatePresence>
          {tasks.map(task => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px', background: 'rgba(255,255,255,0.03)',
                borderRadius: '8px', fontSize: '12px',
                borderLeft: task.completed ? '3px solid #86EFAC' : '3px solid #FF5F5F'
              }}
            >
              <div onClick={() => toggleTask(task.id)} style={{ cursor: 'pointer', flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                 <div style={{
                    width: 12, height: 12, borderRadius: 3,
                    border: '1px solid rgba(255,255,255,0.3)',
                    background: task.completed ? '#86EFAC' : 'transparent'
                  }} />
                <span style={{ 
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? 'rgba(255,255,255,0.4)' : '#fff'
                }}>
                  {task.text}
                </span>
              </div>
              
              <button 
                onClick={() => deleteTask(task.id)}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer' }}
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}