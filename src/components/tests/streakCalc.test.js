import { describe, it, expect } from 'vitest';
import { calculateStreak } from '../../services/streakCalculator';
describe('calculateStreak', () => {
    it('retourne 0 si aucune session', () => {
        expect(calculateStreak([])).toBe(0);
    });
    it('retourne 1 pour une session aujourd\'hui', () => {
        const sessions = [{
                id: '1',
                date: new Date().toISOString(),
                subject: 'Algo',
                duration: 25,
                subjectId: '1',
                pomosCompleted: 1,
                tasks: []
            }];
        expect(calculateStreak(sessions)).toBe(1);
    });
});
