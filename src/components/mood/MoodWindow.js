import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useMoodStore } from '../../stores/moodStore';
const MOODS = [
    { value: 'great', emoji: '😄', label: 'Super' },
    { value: 'good', emoji: '🙂', label: 'Bien' },
    { value: 'meh', emoji: '😐', label: 'Moyen' },
    { value: 'bad', emoji: '😞', label: 'Difficile' },
];
export default function MoodWindow({ onSelect, onClose }) {
    const setMood = useMoodStore((s) => s.setMood);
    function handleSelect(mood) {
        setMood(mood);
        onSelect(mood);
    }
    return (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, style: {
            position: 'fixed', inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
        }, children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.92, y: 16 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.92, y: 16 }, transition: { duration: 0.3, ease: 'backOut' }, style: {
                width: 320,
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 28,
                padding: '32px 28px',
                boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 20,
            }, children: [_jsx(motion.div, { animate: { scale: [1, 1.1, 1] }, transition: { repeat: Infinity, duration: 2 }, style: { fontSize: 36 }, children: "\uD83C\uDF3F" }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("h2", { style: {
                                margin: 0, color: '#fff',
                                fontSize: 18, fontWeight: 700,
                                letterSpacing: '-0.01em'
                            }, children: "Comment tu te sens ?" }), _jsx("p", { style: {
                                margin: '6px 0 0',
                                color: 'rgba(255,255,255,0.4)',
                                fontSize: 12
                            }, children: "Avant de commencer ta session" })] }), _jsx("div", { style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 10, width: '100%'
                    }, children: MOODS.map(({ value, emoji, label }) => (_jsxs(motion.button, { whileTap: { scale: 0.9 }, whileHover: { scale: 1.08 }, onClick: () => handleSelect(value), style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 6,
                            padding: '14px 8px',
                            borderRadius: 16,
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(255,255,255,0.05)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }, children: [_jsx("span", { style: { fontSize: 24 }, children: emoji }), _jsx("span", { style: {
                                    fontSize: 10,
                                    color: 'rgba(255,255,255,0.5)',
                                    fontWeight: 500
                                }, children: label })] }, value))) }), _jsx(motion.button, { whileTap: { scale: 0.96 }, onClick: onClose, style: {
                        background: 'none',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 999,
                        padding: '8px 24px',
                        color: 'rgba(255,255,255,0.35)',
                        cursor: 'pointer',
                        fontSize: 12,
                        transition: 'all 0.2s'
                    }, children: "Passer \u2192" })] }) }));
}
