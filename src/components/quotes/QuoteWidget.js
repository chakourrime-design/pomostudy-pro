import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { useQuoteStore } from '../../stores/quoteStore';
export default function QuoteWidget() {
    const { quotes, currentIndex, randomQuote } = useQuoteStore();
    const [clicked, setClicked] = useState(false);
    const current = quotes[currentIndex] ?? '';
    const handleClick = () => {
        setClicked(true);
        randomQuote();
        setTimeout(() => setClicked(false), 400);
    };
    return (_jsxs("div", { onClick: handleClick, title: "Cliquer pour changer", style: {
            position: 'fixed',
            bottom: 80, // Remonté un peu pour plus d'espace
            right: 40,
            zIndex: 30,
            maxWidth: 450, // Augmenté de 300 à 450 pour éviter trop de retours à la ligne
            cursor: 'pointer',
            userSelect: 'none',
            opacity: clicked ? 0 : 1,
            transform: clicked ? 'translateY(6px)' : 'translateY(0)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
        }, children: [_jsxs("p", { style: {
                    margin: 0,
                    fontSize: 22, // Augmenté de 15 à 22
                    fontStyle: 'italic',
                    fontWeight: 300, // Un peu plus fin pour le style "premium"
                    lineHeight: 1.4,
                    color: '#ffffff', // Blanc pur pour plus de contraste
                    textShadow: `
          0 2px 10px rgba(0,0,0,0.8), 
          0 0 20px rgba(0,0,0,0.4)
        `,
                    letterSpacing: '0.02em',
                    fontFamily: '"Georgia", "Times New Roman", serif',
                    textAlign: 'right',
                }, children: ["\"", current, "\""] }), _jsx("p", { style: {
                    margin: '10px 0 0',
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.4)', // Un peu plus visible
                    textAlign: 'right',
                    textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontFamily: 'system-ui, sans-serif',
                }, children: "cliquer pour changer" })] }));
}
