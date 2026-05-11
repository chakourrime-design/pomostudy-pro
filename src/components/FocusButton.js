import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
export function FocusButton() {
    const [isFocused, setIsFocused] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    // ✅ Détecter si on sort du plein écran manuellement (touche Échap)
    useEffect(() => {
        function onFullscreenChange() {
            if (!document.fullscreenElement) {
                setIsFullscreen(false);
                setIsFocused(false);
            }
        }
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    }, []);
    async function handleFocus() {
        if (!isFocused) {
            // ✅ Activer plein écran
            try {
                await document.documentElement.requestFullscreen();
                setIsFullscreen(true);
            }
            catch {
                console.log('Fullscreen non supporté');
            }
            setIsFocused(true);
            // ✅ Bloquer touches de navigation (Alt+Tab etc.)
            window.addEventListener('keydown', blockKeys);
        }
        else {
            // Désactiver
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            }
            setIsFullscreen(false);
            setIsFocused(false);
            window.removeEventListener('keydown', blockKeys);
        }
    }
    function blockKeys(e) {
        // Bloquer Alt+Tab, Alt+F4, Windows key
        if ((e.altKey && e.key === 'Tab') ||
            (e.altKey && e.key === 'F4') ||
            e.key === 'Meta' ||
            (e.ctrlKey && e.key === 'w')) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
    return (_jsxs(_Fragment, { children: [_jsxs(motion.button, { whileTap: { scale: 0.95 }, whileHover: { scale: 1.05 }, onClick: handleFocus, animate: {
                    background: isFocused
                        ? 'linear-gradient(135deg, #DC2626, #991B1B)'
                        : 'linear-gradient(135deg, #EF4444, #DC2626)',
                    boxShadow: isFocused
                        ? '0 0 40px rgba(239,68,68,0.6)'
                        : '0 0 24px rgba(239,68,68,0.35)'
                }, style: {
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '12px 28px',
                    borderRadius: 999, border: 'none',
                    color: '#fff', cursor: 'pointer',
                    fontSize: 14, fontWeight: 700,
                    letterSpacing: '0.03em',
                }, children: [_jsx(motion.span, { animate: { rotate: isFocused ? 360 : 0 }, transition: { duration: 0.5 }, style: { fontSize: 16 }, children: isFocused ? '🔓' : '🎯' }), isFocused ? 'Quitter le focus' : "Let's Focus", isFullscreen && (_jsx(motion.span, { initial: { scale: 0 }, animate: { scale: 1 }, style: {
                            width: 8, height: 8, borderRadius: '50%',
                            background: '#22C55E',
                            boxShadow: '0 0 8px rgba(34,197,94,0.8)'
                        } }))] }), _jsx(AnimatePresence, { children: isFocused && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 }, style: {
                        position: 'fixed', inset: 0,
                        zIndex: 30,
                        pointerEvents: 'none'
                    }, children: [_jsx("style", { children: `
              aside, footer, header > div:last-child,
              .daily-goal, .quote-widget {
                opacity: 0 !important;
                pointer-events: none !important;
                transition: opacity 0.3s !important;
              }
            ` }), _jsx(motion.div, { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.3 }, style: {
                                position: 'fixed',
                                bottom: 30, left: '50%',
                                transform: 'translateX(-50%)',
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(16px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 999,
                                padding: '8px 20px',
                                color: 'rgba(255,255,255,0.5)',
                                fontSize: 11,
                                fontWeight: 500,
                                whiteSpace: 'nowrap',
                                pointerEvents: 'none'
                            }, children: "\uD83C\uDFAF Mode Focus activ\u00E9 \u2014 Appuie sur \u00C9chap pour quitter" })] })) })] }));
}
