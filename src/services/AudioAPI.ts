export function playEndSound(src = '/sounds/bell.mp3') {
  const audio = new Audio(src)
  audio.play().catch(console.error)
}