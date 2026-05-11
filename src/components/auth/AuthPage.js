import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const FILIERES = ['ISIBD', 'GI', 'GEE', 'IIA', 'ASD', 'GMSI'];
export function AuthPage({ onAuth }) {
    const [mode, setMode] = useState('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [filiere, setFiliere] = useState('');
    const [error, setError] = useState('');
    function handleSubmit() {
        setError('');
        if (!email.trim() || !password.trim()) {
            setError('Remplis tous les champs');
            return;
        }
        if (mode === 'register' && !name.trim()) {
            setError('Entre ton prénom');
            return;
        }
        if (mode === 'register' && !filiere) {
            setError('Choisis ta filière');
            return;
        }
        if (mode === 'register') {
            localStorage.setItem('pomostudy_user', JSON.stringify({
                name: name.trim(),
                email: email.trim(),
                filiere
            }));
            onAuth(name.trim());
        }
        else {
            const saved = localStorage.getItem('pomostudy_user');
            if (!saved) {
                setError("Aucun compte trouvé, inscris-toi d'abord");
                return;
            }
            const user = JSON.parse(saved);
            if (user.email !== email.trim()) {
                setError('Email incorrect');
                return;
            }
            onAuth(user.name);
        }
    }
    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(8px)',
        color: '#fff',
        fontSize: 14,
        outline: 'none',
        boxSizing: 'border-box',
    };
    return (_jsxs("div", { style: {
            position: 'fixed', inset: 0,
            background: 'linear-gradient(135deg, #0a0a0a 0%, #0D1F0F 50%, #0C1A2E 100%)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', zIndex: 9999
        }, children: [_jsx("div", { style: {
                    position: 'absolute', top: -100, left: -100,
                    width: 400, height: 400, borderRadius: '50%',
                    background: 'rgba(239,68,68,0.08)',
                    filter: 'blur(60px)', pointerEvents: 'none'
                } }), _jsx("div", { style: {
                    position: 'absolute', bottom: -100, right: -100,
                    width: 300, height: 300, borderRadius: '50%',
                    background: 'rgba(59,130,246,0.08)',
                    filter: 'blur(60px)', pointerEvents: 'none'
                } }), _jsxs(motion.div, { initial: { opacity: 0, y: 24, scale: 0.97 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0.4 }, style: {
                    width: '100%', maxWidth: 420,
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(32px)',
                    WebkitBackdropFilter: 'blur(32px)',
                    borderRadius: 32,
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '36px 32px',
                    boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
                    display: 'flex', flexDirection: 'column', gap: 20,
                    position: 'relative', zIndex: 1
                }, children: [_jsxs("div", { style: {
                            display: 'flex', alignItems: 'center',
                            gap: 12, marginBottom: 4
                        }, children: [_jsx("img", { src: "/Club-Logo.png", alt: "logo", style: {
                                    width: 44, height: 44,
                                    borderRadius: 12,
                                    boxShadow: '0 0 20px rgba(239,68,68,0.3)'
                                } }), _jsxs("div", { children: [_jsx("p", { style: {
                                            margin: 0, color: '#fff',
                                            fontSize: 20, fontWeight: 800,
                                            letterSpacing: '-0.02em'
                                        }, children: "PomoStudy" }), _jsx("p", { style: {
                                            margin: 0, fontSize: 11,
                                            color: 'rgba(255,255,255,0.4)'
                                        }, children: "ENSAB \u2022 Club Productivit\u00E9" })] })] }), _jsx("div", { style: {
                            display: 'flex',
                            background: 'rgba(255,255,255,0.06)',
                            borderRadius: 14, padding: 4, gap: 4
                        }, children: ['login', 'register'].map(m => (_jsx(motion.button, { whileTap: { scale: 0.96 }, onClick: () => { setMode(m); setError(''); }, style: {
                                flex: 1, padding: '10px 0',
                                borderRadius: 10, border: 'none',
                                background: mode === m
                                    ? 'rgba(239,68,68,0.25)'
                                    : 'transparent',
                                color: mode === m
                                    ? '#fff'
                                    : 'rgba(255,255,255,0.4)',
                                cursor: 'pointer',
                                fontSize: 13,
                                fontWeight: mode === m ? 700 : 400,
                                transition: 'all 0.2s',
                                borderBottom: mode === m
                                    ? '2px solid #EF4444'
                                    : '2px solid transparent'
                            }, children: m === 'login' ? '🔑 Se connecter' : '✨ S\'inscrire' }, m))) }), _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, x: mode === 'register' ? 20 : -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, style: {
                                display: 'flex', flexDirection: 'column', gap: 12
                            }, children: [mode === 'register' && (_jsx("input", { placeholder: "\uD83D\uDC64 Ton pr\u00E9nom", value: name, onChange: e => setName(e.target.value), style: inputStyle })), _jsx("input", { placeholder: "\uD83D\uDCE7 Email", type: "email", value: email, onChange: e => setEmail(e.target.value), style: inputStyle }), _jsx("input", { placeholder: "\uD83D\uDD12 Mot de passe", type: "password", value: password, onChange: e => setPassword(e.target.value), onKeyDown: e => e.key === 'Enter' && handleSubmit(), style: inputStyle }), mode === 'register' && (_jsxs("div", { style: {
                                        display: 'flex', flexDirection: 'column', gap: 8
                                    }, children: [_jsx("p", { style: {
                                                margin: 0, fontSize: 11,
                                                color: 'rgba(255,255,255,0.4)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.08em'
                                            }, children: "Ta fili\u00E8re" }), _jsx("div", { style: {
                                                display: 'flex', gap: 6, flexWrap: 'wrap'
                                            }, children: FILIERES.map(f => (_jsx(motion.button, { whileTap: { scale: 0.93 }, onClick: () => setFiliere(f), style: {
                                                    padding: '6px 14px',
                                                    borderRadius: 999,
                                                    border: filiere === f
                                                        ? '2px solid #EF4444'
                                                        : '1px solid rgba(255,255,255,0.15)',
                                                    background: filiere === f
                                                        ? 'rgba(239,68,68,0.2)'
                                                        : 'rgba(255,255,255,0.04)',
                                                    color: '#fff',
                                                    cursor: 'pointer',
                                                    fontSize: 12,
                                                    fontWeight: filiere === f ? 700 : 400,
                                                    transition: 'all 0.15s',
                                                    boxShadow: filiere === f
                                                        ? '0 0 12px rgba(239,68,68,0.3)'
                                                        : 'none'
                                                }, children: f }, f))) })] }))] }, mode) }), _jsx(AnimatePresence, { children: error && (_jsxs(motion.p, { initial: { opacity: 0, y: -4 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, style: {
                                margin: 0, fontSize: 12,
                                color: '#FCA5A5',
                                background: 'rgba(239,68,68,0.1)',
                                border: '1px solid rgba(239,68,68,0.2)',
                                padding: '8px 14px',
                                borderRadius: 10,
                                textAlign: 'center'
                            }, children: ["\u26A0\uFE0F ", error] })) }), _jsx(motion.button, { whileTap: { scale: 0.96 }, whileHover: { scale: 1.02 }, onClick: handleSubmit, style: {
                            width: '100%', padding: '14px 0',
                            borderRadius: 16, border: 'none',
                            background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                            color: '#fff', cursor: 'pointer',
                            fontSize: 15, fontWeight: 700,
                            boxShadow: '0 0 32px rgba(239,68,68,0.35)',
                            letterSpacing: '0.02em'
                        }, children: mode === 'login' ? 'Se connecter →' : 'Créer mon compte →' }), _jsx("p", { style: {
                            margin: 0, textAlign: 'center',
                            fontSize: 11, color: 'rgba(255,255,255,0.2)'
                        }, children: "Club Productivit\u00E9 ENSAB Berrechid \uD83C\uDF93" })] })] }));
}
