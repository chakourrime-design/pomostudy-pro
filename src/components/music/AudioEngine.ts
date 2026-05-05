class AudioEngineClass {
  private audio: HTMLAudioElement | null = null
  private volume: number = 0.7

  play(src: string): void {
    if (this.audio) {
      this.audio.pause()
    }
    this.audio = new Audio(src)
    this.audio.volume = this.volume
    this.audio.loop = true
    this.audio.play().catch(console.error)
  }

  pause(): void {
    this.audio?.pause()
  }

  resume(): void {
    this.audio?.play().catch(console.error)
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause()
      this.audio.currentTime = 0
    }
  }

  setVolume(v: number): void {
    this.volume = v
    if (this.audio) this.audio.volume = v
  }

  isPlaying(): boolean {
    return this.audio ? !this.audio.paused : false
  }
}

export const AudioEngine = new AudioEngineClass()