import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export function StreakBadge({ count }) {
    if (count === 0)
        return null;
    return (_jsxs(motion.div, { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, style: {
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255, 107, 107, 0.12)',
            padding: '6px 14px',
            borderRadius: 20,
            border: '1px solid rgba(255, 107, 107, 0.3)',
        }, children: [_jsx(motion.span, { animate: { scale: [1, 1.2, 1] }, transition: { duration: 1.5, repeat: Infinity }, children: "\uD83D\uDD25" }), _jsxs("span", { style: { color: '#ff6b6b', fontWeight: 700, fontSize: 13 }, children: [count, " ", count > 1 ? 'JOURS' : 'JOUR'] })] }));
}
