import { ReactNode } from 'react';

export function FocusModeOverlay({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#050505] selection:bg-red-500/30">
      {children}
    </div>
  );
}