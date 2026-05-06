import { useFocusMode } from '../hooks/useFocusMode'

interface Props { children: React.ReactNode }

export function FocusModeOverlay({ children }: Props) {
  const { focusActive, toggleFocus } = useFocusMode()

  return (
    <div className={`app-wrapper ${focusActive ? 'focus-mode' : ''}`}>
      {children}
      <button className="focus-icon-btn" onClick={toggleFocus} title="Mode focus">
        {focusActive ? '👁' : '🙈'}
      </button>
    </div>
  )
}