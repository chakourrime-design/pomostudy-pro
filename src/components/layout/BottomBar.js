import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeTab } from '../themes/ThemeTab';
import { MusicPlayer } from '../music/MusicPlayer';
import GroupSession from '../groups/GroupSession';
import { StudyDashboard } from '../stats/StudyDashboard';
import ContributionHeatmap from '../stats/ContributionHeatmap';
import { SessionHistory } from '../history/SessionHistory';
const TABS = [
    { id: 'themes', label: 'Thèmes', icon: '🖼️' },
    { id: 'stats', label: 'Stats', icon: '📊' },
    { id: 'music', label: 'Musique', icon: '🎵' },
    { id: 'groups', label: 'Groupe', icon: '👥' },
];
export function BottomBar() {
    const [activeTab, setActiveTab] = useState(null);
    return (_jsxs("div", { style: {
            position: 'fixed',
            bottom: 30, left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 15,
            pointerEvents: 'none'
        }, children: [_jsx(AnimatePresence, { children: activeTab && (_jsxs(motion.div, { initial: { opacity: 0, y: 20, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 20, scale: 0.95 }, style: {
                        pointerEvents: 'all',
                        background: 'rgba(15,15,15,0.75)',
                        backdropFilter: 'blur(40px)',
                        WebkitBackdropFilter: 'blur(40px)',
                        borderRadius: 32,
                        border: '1px solid rgba(255,255,255,0.12)',
                        padding: 24,
                        width: activeTab === 'groups' ? 340 : 420,
                        maxHeight: '60vh',
                        overflowY: 'auto',
                        boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                    }, children: [activeTab === 'themes' && _jsx(ThemeTab, {}), activeTab === 'stats' && (_jsxs("div", { style: { color: '#fff' }, children: [_jsx("h3", { style: {
                                        textAlign: 'center', marginBottom: 20,
                                        fontSize: 18, fontWeight: 800
                                    }, children: "\uD83D\uDCCA Statistiques" }), _jsx(StudyDashboard, {}), _jsx("div", { style: { marginTop: 16 }, children: _jsx(ContributionHeatmap, {}) }), _jsxs("div", { style: { marginTop: 16 }, children: [_jsx("p", { style: {
                                                fontSize: 10, textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                                color: 'rgba(255,255,255,0.35)',
                                                marginBottom: 10
                                            }, children: "Historique" }), _jsx(SessionHistory, {})] })] })), activeTab === 'music' && _jsx(MusicPlayer, {}), activeTab === 'playlist' && (_jsxs("div", { style: {
                                padding: 20, color: '#fff',
                                textAlign: 'center'
                            }, children: [_jsx("p", { style: { fontSize: 32, marginBottom: 8 }, children: "\uD83C\uDFA7" }), _jsx("h3", { style: { margin: 0, marginBottom: 8 }, children: "Mes Playlists" }), _jsx("p", { style: {
                                        fontSize: 12, color: 'rgba(255,255,255,0.4)'
                                    }, children: "Bient\u00F4t disponible" })] })), activeTab === 'groups' && _jsx(GroupSession, {})] }, activeTab)) }), _jsx("div", { style: {
                    pointerEvents: 'all',
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: 40,
                    border: '1px solid rgba(255,255,255,0.15)',
                    padding: 6,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                }, children: TABS.map(tab => (_jsxs(motion.button, { whileHover: { backgroundColor: 'rgba(255,255,255,0.12)' }, whileTap: { scale: 0.95 }, onClick: () => setActiveTab(activeTab === tab.id ? null : tab.id), style: {
                        display: 'flex', alignItems: 'center', gap: 8,
                        background: activeTab === tab.id
                            ? 'rgba(255,255,255,0.18)'
                            : 'transparent',
                        border: 'none', cursor: 'pointer',
                        padding: '10px 22px', borderRadius: 30,
                        transition: 'all 0.2s ease',
                        color: '#fff', outline: 'none'
                    }, children: [_jsx("span", { style: { fontSize: 20 }, children: tab.icon }), activeTab === tab.id && (_jsx(motion.span, { initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, style: { fontSize: 13, fontWeight: 700 }, children: tab.label }))] }, tab.id))) })] }));
}
