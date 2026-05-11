import { describe, it, expect } from 'vitest';
import { timerReducer, INITIAL_STATE, DEFAULT_CONFIG } from '@/components/timer/timerReducer';
describe('timerReducer', () => {
    // ── START ──────────────────────────────────────────────
    describe('START', () => {
        it('passe IDLE → WORK', () => {
            const next = timerReducer(INITIAL_STATE, { type: 'START' });
            expect(next.phase).toBe('WORK');
            expect(next.elapsed).toBe(0);
        });
        it('ignore START si déjà en WORK', () => {
            const state = { ...INITIAL_STATE, phase: 'WORK' };
            const next = timerReducer(state, { type: 'START' });
            expect(next).toBe(state); // même référence = pas modifié
        });
    });
    // ── PAUSE ──────────────────────────────────────────────
    describe('PAUSE', () => {
        it('passe WORK → PAUSED', () => {
            const state = { ...INITIAL_STATE, phase: 'WORK' };
            const next = timerReducer(state, { type: 'PAUSE' });
            expect(next.phase).toBe('PAUSED');
        });
        it('ignore PAUSE depuis IDLE', () => {
            const next = timerReducer(INITIAL_STATE, { type: 'PAUSE' });
            expect(next.phase).toBe('IDLE');
        });
    });
    // ── RESUME ─────────────────────────────────────────────
    describe('RESUME', () => {
        it('passe PAUSED → WORK', () => {
            const state = { ...INITIAL_STATE, phase: 'PAUSED' };
            const next = timerReducer(state, { type: 'RESUME' });
            expect(next.phase).toBe('WORK');
        });
    });
    // ── RESET ──────────────────────────────────────────────
    describe('RESET', () => {
        it('remet tout à zéro sauf config', () => {
            const state = {
                ...INITIAL_STATE,
                phase: 'WORK',
                elapsed: 300,
                pomosCompleted: 3
            };
            const next = timerReducer(state, { type: 'RESET' });
            expect(next.phase).toBe('IDLE');
            expect(next.elapsed).toBe(0);
            expect(next.pomosCompleted).toBe(0);
            expect(next.config).toEqual(DEFAULT_CONFIG); // config préservée
        });
    });
    // ── TICK ───────────────────────────────────────────────
    describe('TICK', () => {
        it('incrémente elapsed en WORK', () => {
            const state = { ...INITIAL_STATE, phase: 'WORK', elapsed: 0 };
            const next = timerReducer(state, { type: 'TICK', payload: { elapsed: 1 } });
            expect(next.elapsed).toBe(1);
        });
        it('ignore TICK si IDLE', () => {
            const next = timerReducer(INITIAL_STATE, { type: 'TICK', payload: { elapsed: 1 } });
            expect(next.elapsed).toBe(0);
        });
        it('déclenche PHASE_COMPLETE quand elapsed ≥ durée', () => {
            const state = {
                ...INITIAL_STATE,
                phase: 'WORK',
                elapsed: DEFAULT_CONFIG.workDuration - 0.5 // 0.5s avant la fin
            };
            const next = timerReducer(state, {
                type: 'TICK',
                payload: { elapsed: 1 } // dépasse la durée
            });
            // Doit avoir changé de phase
            expect(next.phase).not.toBe('WORK');
        });
    });
    // ── PHASE_COMPLETE ─────────────────────────────────────
    describe('PHASE_COMPLETE', () => {
        it('WORK → SHORT_BREAK après 1er pomodoro', () => {
            const state = { ...INITIAL_STATE, phase: 'WORK' };
            const next = timerReducer(state, { type: 'PHASE_COMPLETE' });
            expect(next.phase).toBe('SHORT_BREAK');
            expect(next.pomosCompleted).toBe(1);
        });
        it('WORK → LONG_BREAK après 4 pomodoros', () => {
            const state = {
                ...INITIAL_STATE,
                phase: 'WORK',
                pomosCompleted: 3,
                config: {
                    ...DEFAULT_CONFIG,
                    pomosBeforeLongBreak: 4 // ✅ explicitement à 4
                } // le 4e va déclencher long break
            };
            const next = timerReducer(state, { type: 'PHASE_COMPLETE' });
            expect(next.phase).toBe('LONG_BREAK');
            expect(next.pomosCompleted).toBe(4);
        });
        it('SHORT_BREAK → IDLE', () => {
            const state = { ...INITIAL_STATE, phase: 'SHORT_BREAK' };
            const next = timerReducer(state, { type: 'PHASE_COMPLETE' });
            expect(next.phase).toBe('IDLE');
        });
        it('remet elapsed à 0 à chaque changement de phase', () => {
            const state = { ...INITIAL_STATE, phase: 'WORK', elapsed: 500 };
            const next = timerReducer(state, { type: 'PHASE_COMPLETE' });
            expect(next.elapsed).toBe(0);
        });
    });
    // ── SET_CONFIG ─────────────────────────────────────────
    describe('SET_CONFIG', () => {
        it('met à jour la config sans toucher l\'état', () => {
            const newConfig = { ...DEFAULT_CONFIG, workDuration: 3000 };
            const next = timerReducer(INITIAL_STATE, {
                type: 'SET_CONFIG',
                payload: newConfig
            });
            expect(next.config.workDuration).toBe(3000);
            expect(next.phase).toBe('IDLE');
        });
    });
});
