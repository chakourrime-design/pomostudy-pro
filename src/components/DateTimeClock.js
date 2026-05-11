import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDateTime } from '../hooks/useDateTime';
export function DateTimeClock() {
    const { date, time } = useDateTime();
    return (_jsxs("div", { className: "datetime-clock", style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            color: '#ffffff',
            fontFamily: "'Inter', sans-serif",
            userSelect: 'none',
        }, children: [_jsx("span", { className: "clock-time", style: {
                    fontSize: '22px', // Légèrement réduit pour l'équilibre du header
                    fontWeight: 800, // Plus gras pour le style "Admin"
                    letterSpacing: '-0.04em',
                    lineHeight: '1',
                    fontFamily: 'monospace', // Pour éviter que les chiffres ne sautent
                }, children: time }), _jsx("span", { className: "clock-date", style: {
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    opacity: 0.6,
                    marginTop: '2px'
                }, children: date })] }));
}
