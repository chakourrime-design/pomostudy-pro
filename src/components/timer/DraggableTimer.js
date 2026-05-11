import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PomoTimer } from './PomoTimer';
import { PhaseControls } from './PhaseControls';
import { useTimer } from './useTimer';
import { PhaseTransition } from './PhaseTransition';
import MoodWindow from '../mood/MoodWindow';
import { useMoodStore } from '../../stores/moodStore';
export function DraggableTimer({ selectedSubject }) {
    const { state, dispatch, progress, timeDisplay } = useTimer(selectedSubject);
    const { currentMood, setMood } = useMoodStore();
    const [showMoodWindow, setShowMoodWindow] = useState(false);
    const [position, setPosition] = useState({
        x: window.innerWidth / 2 - 175,
        y: window.innerHeight / 2 - 230
    });
    const [activeDrag, setActiveDrag] = useState(false);
    const isDragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });
    // ── Drag handlers ──────────────────────────────────────────────
    function onMouseDown(e) {
        if (e.target.closest('button'))
            return;
        isDragging.current = true;
        setActiveDrag(true);
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    }
    function onMouseMove(e) {
        if (!isDragging.current)
            return;
        setPosition({
            x: e.clientX - offset.current.x,
            y: e.clientY - offset.current.y
        });
    }
    function onMouseUp() {
        isDragging.current = false;
        setActiveDrag(false);
    }
    // ── Timer handlers ─────────────────────────────────────────────
    function handleStart() {
        // ✅ Fix : si pas de mood → ouvrir MoodWindow
        if (!currentMood) {
            setShowMoodWindow(true);
            return;
        }
        dispatch({ type: 'START' });
    }
    function handleMoodSelect(mood) {
        setMood(mood);
        setShowMoodWindow(false);
        // ✅ Démarrer après sélection du mood
        setTimeout(() => dispatch({ type: 'START' }), 50);
    }
    function handleMoodClose() {
        setShowMoodWindow(false);
        // ✅ Passer sans mood → démarrer quand même
        setTimeout(() => dispatch({ type: 'START' }), 50);
    }
    // ── Styles dynamiques selon phase ──────────────────────────────
    const borderColor = {
        IDLE: 'rgba(255,255,255,0.1)',
        WORK: 'rgba(239,68,68,0.3)',
        SHORT_BREAK: 'rgba(34,197,94,0.3)',
        LONG_BREAK: 'rgba(59,130,246,0.3)',
        PAUSED: 'rgba(245,158,11,0.2)',
    }[state.phase];
    const glowShadow = {
        IDLE: '0 16px 48px rgba(0,0,0,0.3)',
        WORK: '0 0 60px rgba(239,68,68,0.12), 0 16px 48px rgba(0,0,0,0.3)',
        SHORT_BREAK: '0 0 60px rgba(34,197,94,0.12), 0 16px 48px rgba(0,0,0,0.3)',
        LONG_BREAK: '0 0 60px rgba(59,130,246,0.12), 0 16px 48px rgba(0,0,0,0.3)',
        PAUSED: '0 0 40px rgba(245,158,11,0.1), 0 16px 48px rgba(0,0,0,0.3)',
    }[state.phase];
    return (_jsxs(_Fragment, { children: [_jsx(AnimatePresence, { children: showMoodWindow && (_jsx(MoodWindow, { onSelect: handleMoodSelect, onClose: handleMoodClose })) }), _jsx(PhaseTransition, { phase: state.phase, children: _jsx("div", { onMouseMove: onMouseMove, onMouseUp: onMouseUp, onMouseLeave: onMouseUp, style: {
                        position: 'fixed', inset: 0,
                        pointerEvents: 'none',
                        zIndex: 50
                    }, children: _jsxs(motion.div, { onMouseDown: onMouseDown, animate: {
                            scale: state.phase === 'WORK' ? 1.01 : 1,
                            boxShadow: glowShadow
                        }, transition: { duration: 0.5, ease: 'easeOut' }, style: {
                            position: 'absolute',
                            left: position.x,
                            top: position.y,
                            pointerEvents: 'all',
                            cursor: activeDrag ? 'grabbing' : 'grab',
                            userSelect: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 14,
                            // ✅ Fix affichage troublé : fond plus opaque
                            backgroundColor: 'rgba(8,8,8,0.60)',
                            backdropFilter: 'blur(32px)',
                            WebkitBackdropFilter: 'blur(32px)',
                            borderRadius: 56,
                            border: `1px solid ${borderColor}`,
                            padding: '22px 20px 26px',
                            transition: 'border-color 0.5s ease',
                        }, children: [_jsx("div", { style: {
                                    width: 36, height: 4,
                                    borderRadius: 2,
                                    background: 'rgba(255,255,255,0.18)',
                                    marginBottom: -2,
                                    flexShrink: 0
                                } }), _jsx(motion.div, { animate: state.phase === 'WORK'
                                    ? { scale: [1, 1.012, 1] }
                                    : { scale: 1 }, transition: {
                                    repeat: state.phase === 'WORK' ? Infinity : 0,
                                    duration: 2.5,
                                    ease: 'easeInOut'
                                }, children: _jsx(PomoTimer, { progress: progress, timeDisplay: timeDisplay, phase: state.phase, size: 240 }) }), _jsx("div", { style: {
                                    display: 'flex', gap: 8,
                                    alignItems: 'center'
                                }, children: Array.from({ length: state.config.pomosBeforeLongBreak }).map((_, i) => (_jsx(motion.div, { animate: {
                                        scale: i === state.pomosCompleted % state.config.pomosBeforeLongBreak
                                            ? [1, 1.4, 1] : 1,
                                        background: i < state.pomosCompleted % state.config.pomosBeforeLongBreak
                                            ? '#EF4444'
                                            : 'rgba(255,255,255,0.2)'
                                    }, transition: { duration: 0.4 }, style: {
                                        width: 8, height: 8,
                                        borderRadius: '50%',
                                        flexShrink: 0
                                    } }, i))) }), _jsx("div", { onMouseDown: e => e.stopPropagation(), children: _jsx(PhaseControls, { phase: state.phase, dispatch: dispatch, onStart: handleStart, workDuration: state.config.workDuration }) }), _jsx(AnimatePresence, { children: selectedSubject && (_jsxs(motion.div, { initial: { opacity: 0, y: 4 }, animate: { opacity: 0.45 }, exit: { opacity: 0 }, style: {
                                        fontSize: 11,
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.06em',
                                        color: '#fff',
                                        textAlign: 'center'
                                    }, children: ["\uD83C\uDFAF ", selectedSubject, currentMood && (_jsx("span", { style: { marginLeft: 8 }, children: currentMood === 'great' ? '😄'
                                                : currentMood === 'good' ? '🙂'
                                                    : currentMood === 'meh' ? '😐'
                                                        : '😞' }))] })) })] }) }) })] }));
}
