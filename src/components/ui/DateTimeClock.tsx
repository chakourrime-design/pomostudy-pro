import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export function DateTimeClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-right font-medium">
      <div className="text-4xl tracking-tighter text-white">
        {format(time, 'HH:mm')}
      </div>
      <div className="text-xs uppercase tracking-widest text-white/40">
        {format(time, 'eeee d MMMM', { locale: fr })}
      </div>
    </div>
  );
}