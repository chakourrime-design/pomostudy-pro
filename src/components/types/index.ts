// ─── Timer ──────────────────────────────────────────────
export type TimerPhase =
  | 'IDLE'
  | 'WORK'
  | 'SHORT_BREAK'
  | 'LONG_BREAK'
  | 'PAUSED'

export type TimerAction =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'RESET' }
  | { type: 'TICK'; payload: { elapsed: number } }
  | { type: 'PHASE_COMPLETE' }
  | { type: 'SET_CONFIG'; payload: TimerConfig }
| { type: 'SET_WORK_DURATION'; payload: number }  // payload en minutes

export type TimerConfig = {
  workDuration: number        // en secondes, défaut 1500 (25 min)
  shortBreak: number          // défaut 300  (5 min)
  longBreak: number           // défaut 900  (15 min)
  pomosBeforeLongBreak: number // défaut 4
  dailyGoal: number           // défaut 8 pomodoros
}

export type TimerState = {
  phase: TimerPhase
  elapsed: number             // secondes écoulées dans la phase
  pomosCompleted: number      // total session
  config: TimerConfig
}

// ─── Sessions & Tâches ──────────────────────────────────
export type TaskStatus = 'pending' | 'completed' | 'skipped'

export type Task = {
  id: string
  label: string
  status: TaskStatus
  createdAt: string           // ISO string
}

export type PomoSession = {
  id: string
  date: string                // ISO string
  subject: string
  subjectId: string
  duration: number            // secondes effectuées
  pomosCompleted: number
  tasks: Task[]
  notes?: string
  mood?: Mood
}

// ─── Filières & Matières ────────────────────────────────
export type FiliereName =
  | 'Architecture'
  | 'Génie Civil'
  | 'Informatique'
  | 'Design'
  | 'Urbanisme'

export type Subject = {
  id: string
  name: string
  color: string               // hex
  filiereId: FiliereName
}

// ─── Mood ────────────────────────────────────────────────
export type Mood =
  | 'focused'
  | 'tired'
  | 'motivated'
  | 'stressed'
  | 'happy'
  | 'neutral'

// ─── Thèmes ──────────────────────────────────────────────
export type ThemeType = 'static' | 'live'

export type Theme = {
  id: string
  name: string
  type: ThemeType
  background: string          // URL ou CSS
  primaryColor: string
  accentColor: string
  isDark: boolean
}

// ─── Groupes ─────────────────────────────────────────────
export type GroupMember = {
  id: string
  name: string
  filiere: FiliereName
  isOnline: boolean
}

export type Group = {
  id: string
  name: string
  members: GroupMember[]
  createdAt: string
  currentSession?: string     // session id en cours
}

// ─── User ────────────────────────────────────────────────
export type User = {
  id: string
  name: string
  filiere: FiliereName
  avatar?: string
  createdAt: string
}

// ─── Quotes ──────────────────────────────────────────────
export type Quote = {
  id: string
  text: string
  author?: string
  isCustom: boolean           // ajoutée par l'utilisateur
}
