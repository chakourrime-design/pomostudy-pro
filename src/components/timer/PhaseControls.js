import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
const DURATIONS = [20, 25, 30, 45, 50];
export function PhaseControls({ phase, dispatch, onStart, workDuration }) {
    const isRunning = phase === 'WORK' || phase === 'SHORT_BREAK' || phase === 'LONG_BREAK';
    const isPaused = phase === 'PAUSED';
    const isIdle = phase === 'IDLE';
    const activeMins = Math.round(workDuration / 60);
    const label = isIdle ? '▶  Démarrer'
        : isRunning ? '⏸  Pause'
            : '▶  Reprendre';
    function handleMainButton() {
        if (isIdle) {
            // ✅ Fix : appeler onStart si fourni, sinon dispatch START directement
            if (onStart) {
                onStart();
            }
            else {
                dispatch({ type: 'START' });
            }
        }
        if (isRunning)
            dispatch({ type: 'PAUSE' });
        if (isPaused)
            dispatch({ type: 'RESUME' });
    }
    function handleLongBreak() {
        // ✅ Force le long break directement
        dispatch({
            type: 'SET_CONFIG',
            payload: {
                workDuration,
                shortBreak: 300,
                longBreak: 900,
                pomosBeforeLongBreak: 4,
                dailyGoal: 8
            }
        });
        // Passer en LONG_BREAK directement via PHASE_COMPLETE depuis WORK
        // Si IDLE, simuler une fin de WORK
        dispatch({ type: 'START' });
        setTimeout(() => {
            dispatch({ type: 'PHASE_COMPLETE' });
        }, 100);
    }
    return (_jsxs("div", { style: {
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 10
        }, children: [_jsx("div", { style: { display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }, children: DURATIONS.map(min => (_jsxs(motion.button, { whileTap: { scale: 0.9 }, whileHover: { scale: 1.08 }, onClick: () => dispatch({ type: 'SET_WORK_DURATION', payload: min }), style: {
                        padding: '5px 12px',
                        borderRadius: 999,
                        border: activeMins === min
                            ? '2px solid #EF4444'
                            : '1px solid rgba(255,255,255,0.15)',
                        background: activeMins === min
                            ? 'rgba(239,68,68,0.25)'
                            : 'rgba(0,0,0,0.35)',
                        backdropFilter: 'blur(8px)',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: 11,
                        fontWeight: activeMins === min ? 700 : 400,
                        fontFamily: 'monospace',
                        transition: 'all 0.2s',
                        boxShadow: activeMins === min
                            ? '0 0 12px rgba(239,68,68,0.3)'
                            : 'none'
                    }, children: [min, ":00"] }, min))) }), _jsxs("div", { style: {
                    display: 'flex', gap: 8, alignItems: 'center',
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(16px)',
                    padding: '10px 16px',
                    borderRadius: 999,
                    border: '1px solid rgba(255,255,255,0.12)'
                }, children: [_jsx(motion.button, { whileTap: { scale: 0.93 }, whileHover: { scale: 1.05 }, onClick: handleLongBreak, style: {
                            padding: '10px 14px',
                            borderRadius: 999,
                            border: '1px solid rgba(59,130,246,0.4)',
                            background: 'rgba(59,130,246,0.15)',
                            backdropFilter: 'blur(8px)',
                            color: '#93C5FD',
                            cursor: 'pointer',
                            fontSize: 12,
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s',
                        }, children: "\u2615 15:00" }), _jsx("div", { style: {
                            width: 1, height: 28,
                            background: 'rgba(255,255,255,0.1)'
                        } }), _jsx(motion.button, { whileTap: { scale: 0.93 }, whileHover: { scale: 1.05 }, onClick: handleMainButton, style: {
                            padding: '12px 28px',
                            borderRadius: 999,
                            border: 'none',
                            background: isRunning
                                ? 'rgba(239,68,68,0.7)'
                                : 'rgba(239,68,68,0.9)',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: 15,
                            fontWeight: 700,
                            letterSpacing: '0.02em',
                            boxShadow: '0 0 24px rgba(239,68,68,0.5)',
                        }, children: label }), _jsx("div", { style: {
                            width: 1, height: 28,
                            background: 'rgba(255,255,255,0.1)'
                        } }), _jsx(motion.button, { whileTap: { scale: 0.93 }, whileHover: { scale: 1.05 }, onClick: () => dispatch({ type: 'RESET' }), style: {
                            padding: '10px 14px',
                            borderRadius: 999,
                            border: '1px solid rgba(255,255,255,0.2)',
                            background: 'rgba(255,255,255,0.08)',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: 14,
                            fontWeight: 500,
                        }, children: "\u21BA" })] })] }));
}
