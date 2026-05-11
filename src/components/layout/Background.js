import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Constantes définies avant le composant pour éviter les erreurs de référence
const BACKGROUNDS = [
    { id: 'ensab1', src: '/backgrounds/background1.jfif', label: 'Nature' },
    { id: 'ensab2', src: '/backgrounds/background2.jfif', label: 'Pets' },
    { id: 'ensab3', src: '/backgrounds/background3.jfif', label: '' },
    { id: 'ensab3', src: '/backgrounds/background4.jpeg', label: '' },
    { id: 'ensab3', src: '/backgrounds/background5.jpeg', label: '' },
    { id: 'ensab3', src: '/backgrounds/background6.jpeg', label: '' },
    { id: 'ensab3', src: '/backgrounds/background7.jpeg', label: '' },
    { id: 'ensab3', src: '/backgrounds/background8.jpeg', label: '' },
    { id: 'ensab3', src: '/backgrounds/background9.jpeg', label: '' },
    { id: 'ensab3', src: '/backgrounds/videoframe_8725.png', label: '' },
    { id: 'ensab3', src: '/backgrounds/videoframe_13766.png', label: '' },
];
const SOLID_COLORS = [
    { id: 'color1', label: 'Noir', color: '#0a0a0a' },
    { id: 'color2', label: 'Forêt', color: '#0D1F0F' },
    { id: 'color3', label: 'Océan', color: '#0C1A2E' },
    { id: 'color4', label: 'Sunset', color: '#1C0A00' },
];
export function Background() {
    // Initialisation sécurisée
    const [selected, setSelected] = useState(BACKGROUNDS[0]);
    const [showPicker, setShowPicker] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.8 }, style: {
                        position: 'fixed',
                        inset: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: -2,
                        backgroundImage: selected.src ? `url(${selected.src})` : 'none',
                        backgroundColor: selected.color || '#0a0a0a',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    } }, selected.id) }), _jsx("div", { style: {
                    position: 'fixed',
                    inset: 0,
                    zIndex: -1,
                    background: 'rgba(0,0,0,0.3)',
                    pointerEvents: 'none'
                } }), _jsx(motion.button, { whileTap: { scale: 0.95 }, onClick: () => setShowPicker(!showPicker), style: {
                    position: 'fixed',
                    bottom: 25,
                    right: 25,
                    zIndex: 2000, // Très élevé pour rester visible au-dessus de tout
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 999,
                    padding: '10px 20px',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                }, children: "\uD83D\uDDBC\uFE0F" }), _jsx(AnimatePresence, { children: showPicker && (_jsxs(motion.div, { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 15 }, style: {
                        position: 'fixed',
                        bottom: 80,
                        right: 25,
                        zIndex: 2000,
                        background: 'rgba(15,15,15,0.95)',
                        backdropFilter: 'blur(25px)',
                        WebkitBackdropFilter: 'blur(25px)',
                        borderRadius: 24,
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '20px',
                        width: 240,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                    }, children: [_jsx("p", { style: { color: 'rgba(255,255,255,0.4)', fontSize: 10, textTransform: 'uppercase', fontWeight: 700, margin: 0 }, children: "Photos" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: BACKGROUNDS.map(bg => (_jsxs("button", { onClick: () => { setSelected(bg); setShowPicker(false); }, style: {
                                    display: 'flex', gap: 12, background: 'none', border: 'none',
                                    color: '#fff', cursor: 'pointer', alignItems: 'center', padding: '4px'
                                }, children: [_jsx("div", { style: {
                                            width: 44, height: 28,
                                            backgroundImage: `url(${bg.src})`,
                                            backgroundSize: 'cover', borderRadius: 6,
                                            border: '1px solid rgba(255,255,255,0.1)'
                                        } }), _jsx("span", { style: { fontSize: '13px' }, children: bg.label })] }, bg.id))) }), _jsx("p", { style: { color: 'rgba(255,255,255,0.4)', fontSize: 10, textTransform: 'uppercase', fontWeight: 700, marginTop: 8, margin: 0 }, children: "Couleurs" }), _jsx("div", { style: { display: 'flex', gap: 10 }, children: SOLID_COLORS.map((c) => (_jsx("button", { onClick: () => { setSelected(c); setShowPicker(false); }, style: {
                                    width: 32, height: 32, borderRadius: 8,
                                    background: c.color,
                                    border: selected.id === c.id ? '2px solid #fff' : '1px solid rgba(255,255,255,0.2)',
                                    cursor: 'pointer'
                                } }, c.id))) })] })) })] }));
}
