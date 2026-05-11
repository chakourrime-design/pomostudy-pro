export const fullscreenManager = {
    enter() {
        const el = document.documentElement;
        if (el.requestFullscreen)
            el.requestFullscreen();
    },
    exit() {
        if (document.exitFullscreen)
            document.exitFullscreen();
    },
    toggle() {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        document.fullscreenElement ? this.exit() : this.enter();
    },
    isFullscreen() {
        return !!document.fullscreenElement;
    }
};
