import { useReducer, useEffect, useRef, useState, useCallback } from 'react';
import { timerReducer, INITIAL_STATE, phaseDuration } from './timerReducer';
import { useTimerSound } from '../../hooks/useTimerSound';
import { sendPhaseEndNotification } from '../../services/notificationService';
import { isYesterday, isToday, parseISO, format } from 'date-fns';
import { useSessionStore } from '../../stores/sessionStore'; // ← AJOUT
export function useTimer(selectedSubject) {
    const [state, dispatch] = useReducer(timerReducer, INITIAL_STATE);
    // ── SessionStore Zustand ─────────────────────────────────────────
    const addSession = useSessionStore((s) => s.addSession);
    // ────────────────────────────────────────────────────────────────
    const [streak, setStreak] = useState(() => Number(localStorage.getItem('pomo_streak')) || 0);
    const rafRef = useRef(null);
    const lastTickRef = useRef(null);
    const hasPlayedRef = useRef(false);
    const { playEndSound } = useTimerSound();
    // Sauvegarder session dans ZUSTAND (plus localStorage seul)
    const logSession = useCallback(() => {
        const now = new Date().toISOString();
        // ── Zustand (DailyGoalBar, ContributionHeatmap, StudyDashboard) ──
        addSession({
            id: String(Date.now()), // ou uuidv4() si uuid est installé
            subject: selectedSubject || 'Autre',
            duration: 25,
            date: now,
            subjectId: '',
            pomosCompleted: 0,
            tasks: []
        });
        // ── localStorage conservé pour rétrocompatibilité (StudyDashboard ancien) ──
        const history = JSON.parse(localStorage.getItem('study_history') || '[]');
        localStorage.setItem('study_history', JSON.stringify([
            ...history,
            { id: Date.now(), subject: selectedSubject || 'Autre', duration: 25, date: now }
        ]));
    }, [selectedSubject, addSession]);
    // Streak inchangé
    const updateStreak = useCallback(() => {
        const lastDateStr = localStorage.getItem('last_pomo_date');
        const todayStr = format(new Date(), 'yyyy-MM-dd');
        if (!lastDateStr) {
            setStreak(1);
            localStorage.setItem('pomo_streak', '1');
        }
        else {
            const lastDate = parseISO(lastDateStr);
            if (isYesterday(lastDate)) {
                const currentStored = Number(localStorage.getItem('pomo_streak') || 0);
                const newStreak = currentStored + 1;
                setStreak(newStreak);
                localStorage.setItem('pomo_streak', newStreak.toString());
            }
            else if (!isToday(lastDate)) {
                setStreak(1);
                localStorage.setItem('pomo_streak', '1');
            }
        }
        localStorage.setItem('last_pomo_date', todayStr);
    }, []);
    const total = phaseDuration(state);
    const remaining = Math.max(0, total - state.elapsed);
    const progress = total > 0 ? state.elapsed / total : 0;
    // Boucle animation
    useEffect(() => {
        const isRunning = state.phase === 'WORK' ||
            state.phase === 'SHORT_BREAK' ||
            state.phase === 'LONG_BREAK';
        if (!isRunning) {
            if (rafRef.current)
                cancelAnimationFrame(rafRef.current);
            lastTickRef.current = null;
            return;
        }
        const tick = (now) => {
            if (lastTickRef.current !== null) {
                const elapsed = (now - lastTickRef.current) / 1000;
                dispatch({ type: 'TICK', payload: { elapsed } });
            }
            lastTickRef.current = now;
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current)
                cancelAnimationFrame(rafRef.current);
        };
    }, [state.phase]);
    // Fin de cycle
    useEffect(() => {
        const isPhaseRunning = state.phase === 'WORK' ||
            state.phase === 'SHORT_BREAK' ||
            state.phase === 'LONG_BREAK';
        if (isPhaseRunning && remaining <= 0 && !hasPlayedRef.current) {
            hasPlayedRef.current = true;
            playEndSound();
            sendPhaseEndNotification(state.phase);
            if (state.phase === 'WORK') {
                setTimeout(() => {
                    updateStreak();
                    logSession();
                }, 0);
            }
        }
        if (remaining > 1) {
            hasPlayedRef.current = false;
        }
    }, [remaining, state.phase, playEndSound, updateStreak, logSession]);
    const minutes = Math.floor(remaining / 60).toString().padStart(2, '0');
    const seconds = Math.floor(remaining % 60).toString().padStart(2, '0');
    useEffect(() => {
        if (selectedSubject)
            console.debug(`Target: ${selectedSubject}`);
    }, [selectedSubject]);
    return {
        state,
        dispatch,
        remaining,
        progress,
        streak,
        timeDisplay: `${minutes}:${seconds}`,
    };
}
