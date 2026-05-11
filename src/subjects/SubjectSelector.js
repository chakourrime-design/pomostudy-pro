import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { subjectsByFilieres } from './subjectsByFilieres';
export function SubjectSelector({ onSelectSubject }) {
    const [selectedFiliere, setSelectedFiliere] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const filieres = Object.keys(subjectsByFilieres);
    // Fonction pour gérer la sélection et communiquer avec le parent (App.tsx)
    const handleSubjectClick = (subject) => {
        setSelectedSubject(subject);
        onSelectSubject(subject);
    };
    return (_jsxs("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            width: '100%'
        }, children: [_jsx("div", { style: {
                    display: 'flex',
                    gap: 8,
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }, children: filieres.map(f => (_jsx(motion.button, { whileTap: { scale: 0.95 }, onClick: () => {
                        setSelectedFiliere(f === selectedFiliere ? null : f);
                        setSelectedSubject(null); // Reset le sujet si on change de filière
                    }, style: {
                        padding: '6px 14px',
                        borderRadius: '14px',
                        border: selectedFiliere === f
                            ? '1px solid rgba(255,255,255,0.4)'
                            : '1px solid rgba(255,255,255,0.08)',
                        background: selectedFiliere === f
                            ? 'rgba(255,255,255,0.15)'
                            : 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(10px)',
                        color: selectedFiliere === f ? '#fff' : 'rgba(255,255,255,0.5)',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: 500,
                        transition: 'all 0.2s ease',
                    }, children: f }, f))) }), _jsx(AnimatePresence, { mode: "wait", children: selectedFiliere && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.95, y: 5 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 5 }, style: {
                        display: 'flex',
                        gap: 6,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        padding: '12px',
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: '20px',
                        width: '100%',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }, children: subjectsByFilieres[selectedFiliere]?.map(subject => (_jsx(motion.button, { whileTap: { scale: 0.95 }, onClick: () => handleSubjectClick(subject), style: {
                            padding: '6px 12px',
                            borderRadius: '10px',
                            border: 'none',
                            background: selectedSubject === subject
                                ? 'rgba(255, 255, 255, 0.9)'
                                : 'rgba(255, 255, 255, 0.05)',
                            color: selectedSubject === subject ? '#000' : 'rgba(255,255,255,0.7)',
                            cursor: 'pointer',
                            fontSize: '10.5px',
                            fontWeight: 600,
                            transition: 'all 0.2s ease',
                        }, children: subject }, subject))) }, selectedFiliere)) }), _jsx(AnimatePresence, { children: selectedSubject && (_jsxs(motion.div, { initial: { opacity: 0, y: 5 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 5 }, style: {
                        fontSize: '11px',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(5px)'
                    }, children: [_jsx("span", { style: { opacity: 0.7 }, children: "Focus sur :" }), _jsx("strong", { style: { color: '#86EFAC', fontWeight: 600 }, children: selectedSubject })] })) })] }));
}
