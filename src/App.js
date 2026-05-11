import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Background } from './components/layout/Background';
import { BottomBar } from './components/layout/BottomBar';
import { Logo } from './components/ui/Logo';
import { DateTimeClock } from './components/DateTimeClock';
import { FocusModeOverlay } from './components/FocusModeOverlay';
import { FocusButton } from './components/FocusButton';
import { DraggableTimer } from './components/timer/DraggableTimer';
import { SubjectSelector } from './components/subjects/SubjectSelector';
import { TasksManager } from './components/tasks/TasksManager';
import DailyGoalBar from './components/stats/DailyGoalBar';
import QuoteWidget from './components/quotes/QuoteWidget';
import { AuthPage } from './components/auth/AuthPage';
function App() {
    const [selectedSubject, setSelectedSubject] = useState('');
    const [userName, setUserName] = useState(() => {
        const saved = localStorage.getItem('pomostudy_user');
        if (!saved)
            return null;
        try {
            return JSON.parse(saved).name;
        }
        catch {
            return null;
        }
    });
    function handleLogout() {
        localStorage.removeItem('pomostudy_user');
        setUserName(null);
    }
    if (!userName) {
        return _jsx(AuthPage, { onAuth: (name) => setUserName(name) });
    }
    return (_jsx(FocusModeOverlay, { children: _jsxs("div", { style: {
                position: 'relative', height: '100vh',
                width: '100vw', overflow: 'hidden',
                color: '#fff', fontFamily: 'Inter, sans-serif'
            }, children: [_jsx(Background, {}), _jsxs("header", { style: {
                        position: 'absolute', top: 0, left: 0, right: 0,
                        padding: '16px 24px',
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', zIndex: 50,
                        pointerEvents: 'none',
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)'
                    }, children: [_jsx("div", { style: { pointerEvents: 'all' }, children: _jsx(Logo, {}) }), _jsxs("div", { style: {
                                pointerEvents: 'all',
                                display: 'flex', alignItems: 'center', gap: 12,
                                background: 'rgba(0,0,0,0.35)',
                                backdropFilter: 'blur(16px)',
                                WebkitBackdropFilter: 'blur(16px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 16, padding: '8px 16px'
                            }, children: [_jsx("div", { style: {
                                        width: 32, height: 32,
                                        background: '#EF4444',
                                        borderRadius: 10,
                                        display: 'flex', alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 16,
                                        boxShadow: '0 0 12px rgba(239,68,68,0.4)',
                                        flexShrink: 0
                                    }, children: "\uD83D\uDC64" }), _jsx("span", { style: {
                                        fontWeight: 700, fontSize: 13,
                                        color: '#fff', paddingRight: 12,
                                        borderRight: '1px solid rgba(255,255,255,0.15)'
                                    }, children: userName }), _jsx(DateTimeClock, {}), _jsx("button", { onClick: handleLogout, title: "Se d\u00E9connecter", style: {
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: 8, padding: '6px 10px',
                                        cursor: 'pointer',
                                        color: 'rgba(255,255,255,0.5)',
                                        fontSize: 14, transition: 'all 0.2s',
                                        marginLeft: 4
                                    }, children: "\uD83D\uDEAA" })] })] }), _jsxs("aside", { style: {
                        position: 'absolute',
                        top: 80, left: 24, bottom: 90,
                        zIndex: 40, width: 280,
                        display: 'flex', flexDirection: 'column', gap: 12,
                        pointerEvents: 'auto',
                        overflowY: 'auto', overflowX: 'hidden',
                        scrollbarWidth: 'none',
                    }, children: [_jsxs("div", { style: {
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 14, padding: '12px 14px', flexShrink: 0
                            }, children: [_jsx("p", { style: {
                                        fontSize: 9, textTransform: 'uppercase',
                                        letterSpacing: '0.12em',
                                        color: 'rgba(255,255,255,0.4)', margin: '0 0 10px'
                                    }, children: "Fili\u00E8re & Mati\u00E8re" }), _jsx(SubjectSelector, { onSelectSubject: setSelectedSubject })] }), _jsxs("div", { style: {
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 14, padding: '12px 14px', flexShrink: 0
                            }, children: [_jsx("p", { style: {
                                        fontSize: 9, textTransform: 'uppercase',
                                        letterSpacing: '0.12em',
                                        color: 'rgba(255,255,255,0.4)', margin: '0 0 10px'
                                    }, children: "T\u00E2ches" }), _jsx(TasksManager, { currentSubject: selectedSubject })] })] }), _jsx("main", { style: {
                        position: 'relative', height: '100%', width: '100%',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', zIndex: 20
                    }, children: _jsx(DraggableTimer, { selectedSubject: selectedSubject }) }), _jsx("div", { style: {
                        position: 'fixed', bottom: 96,
                        left: '50%', transform: 'translateX(-50%)',
                        zIndex: 50, pointerEvents: 'auto'
                    }, children: _jsx(FocusButton, {}) }), _jsx(DailyGoalBar, {}), _jsx(QuoteWidget, {}), _jsx("footer", { style: {
                        position: 'absolute', bottom: 0,
                        left: 0, right: 0, zIndex: 50
                    }, children: _jsx(BottomBar, {}) })] }) }));
}
export default App;
