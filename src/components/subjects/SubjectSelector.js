import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { subjectsByFilieres } from './subjectsByFilieres';
import { useState } from 'react';
const FILIERES = Object.keys(subjectsByFilieres);
export function SubjectSelector({ onSelectSubject }) {
    // On gère l'état interne des filières ici pour simplifier App.tsx
    const [currentFiliere, setCurrentFiliere] = useState('');
    const [currentSubject, setCurrentSubject] = useState('');
    const subjects = subjectsByFilieres[currentFiliere] ?? [];
    const handleSubjectClick = (subject) => {
        setCurrentSubject(subject);
        onSelectSubject(subject); // C'est cette ligne qui fait le lien avec le Timer !
    };
    const handleFiliereClick = (f) => {
        setCurrentFiliere(f);
        setCurrentSubject(''); // On reset le sujet quand on change de filière
    };
    return (_jsxs("div", { className: "flex flex-col items-center gap-3 p-4 w-full max-w-md", children: [_jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: FILIERES.map(f => (_jsx("button", { onClick: () => handleFiliereClick(f), style: {
                        padding: '6px 14px',
                        borderRadius: '14px',
                        fontSize: '11px',
                        cursor: 'pointer',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: currentFiliere === f ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                        color: currentFiliere === f ? '#fff' : 'rgba(255,255,255,0.6)',
                        transition: 'all 0.3s'
                    }, children: f }, f))) }), _jsx("hr", { style: {
                    border: 'none',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    margin: '4px 0',
                    width: '100%'
                } }), currentFiliere && (_jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: subjects.map(subject => (_jsx("button", { onClick: () => handleSubjectClick(subject), style: {
                        padding: '4px 12px',
                        borderRadius: '10px',
                        fontSize: '11px',
                        cursor: 'pointer',
                        border: 'none',
                        background: currentSubject === subject ? '#FF5F5F' : 'rgba(255,255,255,0.1)',
                        color: '#fff',
                        transition: 'all 0.2s'
                    }, children: subject }, subject))) })), !currentFiliere && (_jsx("p", { style: { color: 'rgba(255,255,255,0.4)', fontSize: '11px' }, children: "S\u00E9lectionne ta fili\u00E8re \u2191" }))] }));
}
