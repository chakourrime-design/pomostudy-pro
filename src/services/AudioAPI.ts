export function playEndSound(src = '/sounds/FinishAlarm.mp3') {
  const audio = new Audio(src)
  audio.play().catch(console.error)
}