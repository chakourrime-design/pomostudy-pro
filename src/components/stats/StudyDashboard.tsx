import { useMemo } from 'react';

interface Session {
  subject: string;
  duration: number;
  date: string;
}

export function StudyDashboard() {
  // 1. Récupération de l'historique (on le lit une fois)
  const history: Session[] = useMemo(() => {
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

  return (
    <div style={{
      display: 'flex',
      gap: '24px',
      padding: '20px 30px',
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(15px)',
      borderRadius: '30px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: '20px'
    }}>
      <KPIItem label="Sessions" value={stats.pomodoros} icon="🍅" />
      <KPIItem label="Heures" value={`${stats.hours}h`} icon="⏳" />
      <KPIItem label="Matières" value={stats.subjects} icon="📚" />
    </div>
  );
}

function KPIItem({ label, value, icon }: { label: string, value: string | number, icon: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '22px', marginBottom: '4px' }}>{icon}</div>
      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>{value}</div>
      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}