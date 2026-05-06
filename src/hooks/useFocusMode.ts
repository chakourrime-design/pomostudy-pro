import { useState } from 'react'

export function useFocusMode() {
  const [active, setActive] = useState(false)
  const toggle = () => setActive(p => !p)
  return { focusActive: active, toggleFocus: toggle }
}