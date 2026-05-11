class AudioEngineClass {
    audio = null;
    volume = 0.7;
    play(src) {
        if (this.audio) {
            this.audio.pause();
        }
        this.audio = new Audio(src);
        this.audio.volume = this.volume;
        this.audio.loop = true;
        this.audio.play().catch(console.error);
    }
    pause() {
        this.audio?.pause();
    }
    resume() {
        this.audio?.play().catch(console.error);
    }
    stop() {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
        }
    }
    setVolume(v) {
        this.volume = v;
        if (this.audio)
            this.audio.volume = v;
    }
    isPlaying() {
        return this.audio ? !this.audio.paused : false;
    }
}
export const AudioEngine = new AudioEngineClass();
