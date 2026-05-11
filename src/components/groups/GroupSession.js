import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
function generateSessionId() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}
export default function GroupSession() {
    const [sessionId, setSessionId] = useState(() => {
        const stored = sessionStorage.getItem('pomo_session_id');
        if (stored)
            return stored;
        const id = generateSessionId();
        sessionStorage.setItem('pomo_session_id', id);
        return id;
    });
    const [qrDataUrl, setQrDataUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const sessionUrl = `${window.location.origin}?session=${sessionId}`;
    // Génère le QR code en canvas → dataURL
    useEffect(() => {
        QRCode.toDataURL(sessionUrl, {
            width: 180,
            margin: 2,
            color: { dark: '#ffffff', light: '#00000000' },
        }).then(setQrDataUrl).catch(console.error);
    }, [sessionUrl]);
    const handleCopy = () => {
        navigator.clipboard.writeText(sessionUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const handleNewSession = () => {
        const id = generateSessionId();
        sessionStorage.setItem('pomo_session_id', id);
        setSessionId(id);
    };
    return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '8px 0' }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("p", { style: { fontSize: 15, fontWeight: 600, color: '#fff', margin: 0 }, children: "Session de groupe" }), _jsx("p", { style: { fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: '4px 0 0' }, children: "Scanne le QR ou partage le lien pour inviter" })] }), _jsx("div", { style: {
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 20,
                    padding: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: qrDataUrl
                    ? _jsx("img", { src: qrDataUrl, alt: "QR Session", style: { width: 160, height: 160, borderRadius: 8 } })
                    : _jsx("div", { style: { width: 160, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 12 }, children: "G\u00E9n\u00E9ration\u2026" }) }), _jsxs("div", { style: {
                    background: 'rgba(255,95,95,0.12)',
                    border: '1px solid rgba(255,95,95,0.3)',
                    borderRadius: 10,
                    padding: '6px 14px',
                    textAlign: 'center',
                }, children: [_jsx("span", { style: { fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }, children: "Code session" }), _jsx("p", { style: { fontSize: 22, fontWeight: 700, color: '#FF5F5F', margin: '2px 0 0', letterSpacing: '0.15em' }, children: sessionId })] }), _jsxs("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                }, children: [_jsx("div", { style: {
                            flex: 1,
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 10,
                            padding: '8px 12px',
                            overflow: 'hidden',
                        }, children: _jsx("p", { style: {
                                fontSize: 11,
                                color: 'rgba(255,255,255,0.4)',
                                margin: 0,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }, children: sessionUrl }) }), _jsx("button", { onClick: handleCopy, style: {
                            flexShrink: 0,
                            padding: '8px 14px',
                            borderRadius: 10,
                            border: 'none',
                            background: copied ? 'rgba(34,197,94,0.3)' : 'rgba(255,95,95,0.8)',
                            color: '#fff',
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                            whiteSpace: 'nowrap',
                        }, children: copied ? '✓ Copié !' : 'Copier' })] }), _jsx("button", { onClick: handleNewSession, style: {
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 10,
                    padding: '7px 18px',
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: 12,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                }, onMouseEnter: e => (e.currentTarget.style.color = '#fff'), onMouseLeave: e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)'), children: "\u21BA Nouvelle session" })] }));
}
