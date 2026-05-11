import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSoundStore } from '../stores/soundStore';
const sounds = [
    { id: 'bell', label: '🔔 Bell' },
    { id: 'chime', label: '🎵 Chime' },
    { id: 'gong', label: '🥁 Gong' },
];
export default function SoundPicker() {
    const { selectedSound, volume, setSound, setVolume } = useSoundStore();
    const preview = (id) => {
        const audio = new Audio(`/sounds/${id}.mp3`);
        audio.volume = volume;
        audio.play().catch(console.error);
    };
    return (_jsxs("div", { className: "sound-picker", children: [_jsx("h3", { children: "Son de fin" }), _jsx("div", { className: "sound-list", children: sounds.map(({ id, label }) => (_jsx("button", { className: `sound-btn ${selectedSound === id ? 'active' : ''}`, onClick: () => { setSound(id); preview(id); }, children: label }, id))) }), _jsxs("label", { children: ["Volume", _jsx("input", { type: "range", min: 0, max: 1, step: 0.05, value: volume, onChange: (e) => setVolume(Number(e.target.value)) })] })] }));
}
