import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { requestNotificationPermission } from '../../services/notificationService';
const PHASE_COLORS = {
    IDLE: '#ffffff',
    WORK: '#EF4444',
    SHORT_BREAK: '#22C55E',
    LONG_BREAK: '#3B82F6',
    PAUSED: '#F59E0B'
};
const PHASE_LABELS = {
    IDLE: 'Prêt',
    WORK: 'Focus',
    SHORT_BREAK: 'Pause courte',
    LONG_BREAK: 'Pause longue',
    PAUSED: 'En pause'
};
export function PomoTimer({ progress, timeDisplay, phase, size = 280 }) {
    const center = size / 2;
    const strokeWidth = 10;
    const radius = center - strokeWidth - 4;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - progress);
    const color = PHASE_COLORS[phase];
    useEffect(() => {
        requestNotificationPermission();
    }, []);
    return (_jsxs("div", { style: { position: 'relative', width: size, height: size }, children: [_jsxs("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, style: { transform: 'rotate(-90deg)' }, children: [_jsx("circle", { cx: center, cy: center, r: radius, fill: "none", stroke: "rgba(255,255,255,0.15)", strokeWidth: strokeWidth }), _jsx(motion.circle, { cx: center, cy: center, r: radius, fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeDasharray: circumference, animate: { strokeDashoffset: dashOffset }, transition: { duration: 0.5, ease: 'linear' }, initial: false })] }), _jsxs("div", { style: {
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 6
                }, children: [_jsx("div", { style: {
                            position: 'absolute',
                            width: size * 0.7,
                            height: size * 0.4,
                            background: 'rgba(0,0,0,0.55)',
                            backdropFilter: 'blur(12px)',
                            borderRadius: 20,
                        } }), _jsx(motion.span, { initial: { scale: 0.95 }, animate: { scale: 1 }, style: {
                            position: 'relative',
                            fontSize: size * 0.2,
                            fontWeight: 800,
                            fontVariantNumeric: 'tabular-nums',
                            letterSpacing: '-0.02em',
                            color: '#ffffff',
                            textShadow: `0 0 30px ${color}, 0 2px 8px rgba(0,0,0,0.8)`,
                            zIndex: 1
                        }, children: timeDisplay }, timeDisplay), _jsx("span", { style: {
                            position: 'relative',
                            fontSize: size * 0.062,
                            fontWeight: 600,
                            color,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                            zIndex: 1
                        }, children: PHASE_LABELS[phase] })] })] }));
}
