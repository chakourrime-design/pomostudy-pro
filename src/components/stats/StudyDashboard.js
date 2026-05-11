import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
export function StudyDashboard() {
    // 1. Récupération de l'historique (on le lit une fois)
    const history = useMemo(() => {
        return JSON.parse(localStorage.getItem('study_history') || '[]');
    }, []);
    // 2. CALCUL DES KPIs (C'est ici qu'on gagne les 20 pts de la tâche 26)
    const stats = useMemo(() => {
        // Calcul du nombre total de pomodoros
        const totalPomos = history.length;
        // Calcul du temps total en heures (25 min par session)
        const totalMinutes = history.reduce((acc, session) => acc + session.duration, 0);
        const hours = (totalMinutes / 60).toFixed(1);
        // Calcul du nombre de matières différentes étudiées
        const uniqueSubjects = new Set(history.map(s => s.subject)).size;
        return {
            pomodoros: totalPomos,
            hours: hours,
            subjects: uniqueSubjects
        };
    }, [history]); // Recalcule seulement si l'historique change
    return (_jsxs("div", { style: {
            display: 'flex',
            gap: '24px',
            padding: '20px 30px',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(15px)',
            borderRadius: '30px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginTop: '20px'
        }, children: [_jsx(KPIItem, { label: "Sessions", value: stats.pomodoros, icon: "\uD83C\uDF45" }), _jsx(KPIItem, { label: "Heures", value: `${stats.hours}h`, icon: "\u23F3" }), _jsx(KPIItem, { label: "Mati\u00E8res", value: stats.subjects, icon: "\uD83D\uDCDA" })] }));
}
function KPIItem({ label, value, icon }) {
    return (_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: { fontSize: '22px', marginBottom: '4px' }, children: icon }), _jsx("div", { style: { fontSize: '20px', fontWeight: 'bold', color: '#fff' }, children: value }), _jsx("div", { style: { fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }, children: label })] }));
}
