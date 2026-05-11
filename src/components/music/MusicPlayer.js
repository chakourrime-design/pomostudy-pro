import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioEngine } from './AudioEngine';
// ── Sons d'ambiance inclus ──────────────────────────────────────
const AMBIENT_TRACKS = [
    { id: 'rain', name: 'Pluie', src: '/sounds/rainAndThunder.mp3', emoji: '🌧️', category: 'ambient' },
    { id: 'cafe', name: 'Cheminée', src: '/sounds/CampfireWoods.mp3', emoji: '🔥', category: 'ambient' },
    { id: 'forest', name: 'Forêt', src: '/sounds/forestBirds.mp3', emoji: '🌿', category: 'ambient' },
    { id: 'focus', name: 'Focus', src: '/sounds/BackgroundMusicFocus.mp3', emoji: '🎯', category: 'ambient' },
    { id: 'waves', name: 'Vagues', src: '/sounds/waves.mp3', emoji: '🌊', category: 'ambient' },
];
// ── Playlist intégrée (lofi libres de droits) ──────────────────
const PLAYLIST_TRACKS = [
    {
        id: 'lofi1', name: 'Lofi Study', emoji: '🎵', category: 'playlist',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
        id: 'lofi2', name: 'Chill Beats', emoji: '🎶', category: 'playlist',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    {
        id: 'lofi3', name: 'Deep Focus', emoji: '🧠', category: 'playlist',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    },
    {
        id: 'lofi4', name: 'Night Study', emoji: '🌙', category: 'playlist',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
    },
];
export function MusicPlayer() {
    const [playing, setPlaying] = useState(null);
    const [volume, setVolume] = useState(0.7);
    const [activeTab, setActiveTab] = useState('ambient');
    const [spotifyStatus, setSpotifyStatus] = useState('disconnected');
    const [spotifyUrl, setSpotifyUrl] = useState('');
    const [customTracks, setCustomTracks] = useState([]);
    const [newTrackName, setNewTrackName] = useState('');
    const [newTrackUrl, setNewTrackUrl] = useState('');
    function toggleTrack(track) {
        if (playing === track.id) {
            AudioEngine.pause();
            setPlaying(null);
        }
        else {
            AudioEngine.play(track.src);
            setPlaying(track.id);
        }
    }
    function handleVolume(e) {
        const v = parseFloat(e.target.value);
        setVolume(v);
        AudioEngine.setVolume(v);
    }
    function handleSpotifyConnect() {
        if (!spotifyUrl.trim())
            return;
        setSpotifyStatus('connecting');
        setTimeout(() => {
            setSpotifyStatus('connected');
        }, 1500);
    }
    function handleAddTrack() {
        if (!newTrackName.trim() || !newTrackUrl.trim())
            return;
        const track = {
            id: `custom-${Date.now()}`,
            name: newTrackName.trim(),
            src: newTrackUrl.trim(),
            emoji: '🎵',
            category: 'playlist'
        };
        setCustomTracks(prev => [...prev, track]);
        setNewTrackName('');
        setNewTrackUrl('');
    }
    function handleRemoveTrack(id) {
        if (playing === id) {
            AudioEngine.pause();
            setPlaying(null);
        }
        setCustomTracks(prev => prev.filter(t => t.id !== id));
    }
    const inputStyle = {
        flex: 1,
        padding: '8px 12px',
        borderRadius: 10,
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(255,255,255,0.06)',
        color: '#fff',
        fontSize: 12,
        outline: 'none',
    };
    // ── Composant bouton track ──────────────────────────────────────
    function TrackButton({ track }) {
        const isPlaying = playing === track.id;
        return (_jsxs(motion.button, { whileTap: { scale: 0.93 }, whileHover: { scale: 1.04 }, onClick: () => toggleTrack(track), style: {
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '9px 16px',
                borderRadius: 999,
                border: isPlaying
                    ? '2px solid #EF4444'
                    : '1px solid rgba(255,255,255,0.12)',
                background: isPlaying
                    ? 'rgba(239,68,68,0.2)'
                    : 'rgba(255,255,255,0.05)',
                color: '#fff',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: isPlaying ? 600 : 400,
                transition: 'all 0.2s',
                boxShadow: isPlaying ? '0 0 12px rgba(239,68,68,0.25)' : 'none'
            }, children: [_jsx(motion.span, { animate: isPlaying ? { scale: [1, 1.2, 1] } : { scale: 1 }, transition: { repeat: isPlaying ? Infinity : 0, duration: 1.2 }, children: isPlaying ? '▶️' : track.emoji }), _jsx("span", { children: track.name }), isPlaying && (_jsx(motion.div, { style: { display: 'flex', gap: 2, alignItems: 'flex-end' }, children: [1, 2, 3].map(i => (_jsx(motion.div, { animate: { height: ['4px', '12px', '4px'] }, transition: {
                            repeat: Infinity, duration: 0.8,
                            delay: i * 0.15, ease: 'easeInOut'
                        }, style: {
                            width: 3, background: '#EF4444',
                            borderRadius: 2, minHeight: 4
                        } }, i))) }))] }));
    }
    return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 16 }, children: [_jsx("div", { style: {
                    display: 'flex', gap: 4,
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 12, padding: 4
                }, children: [
                    { id: 'ambient', label: '🌿 Ambiance' },
                    { id: 'playlist', label: '🎵 Playlist' },
                    { id: 'spotify', label: '🎧 Spotify' },
                ].map(tab => (_jsx(motion.button, { whileTap: { scale: 0.95 }, onClick: () => setActiveTab(tab.id), style: {
                        flex: 1, padding: '7px 0',
                        borderRadius: 8, border: 'none',
                        background: activeTab === tab.id
                            ? 'rgba(255,255,255,0.12)'
                            : 'transparent',
                        color: activeTab === tab.id
                            ? '#fff'
                            : 'rgba(255,255,255,0.4)',
                        cursor: 'pointer',
                        fontSize: 12,
                        fontWeight: activeTab === tab.id ? 700 : 400,
                        transition: 'all 0.2s'
                    }, children: tab.label }, tab.id))) }), _jsxs(AnimatePresence, { mode: "wait", children: [activeTab === 'ambient' && (_jsx(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, style: { display: 'flex', flexDirection: 'column', gap: 10 }, children: _jsx("div", { style: { display: 'flex', gap: 8, flexWrap: 'wrap' }, children: AMBIENT_TRACKS.map(track => (_jsx(TrackButton, { track: track }, track.id))) }) }, "ambient")), activeTab === 'playlist' && (_jsxs(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, style: { display: 'flex', flexDirection: 'column', gap: 12 }, children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 6 }, children: [_jsx("p", { style: {
                                            margin: 0, fontSize: 10,
                                            color: 'rgba(255,255,255,0.35)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.08em'
                                        }, children: "Inclus" }), _jsx("div", { style: { display: 'flex', gap: 8, flexWrap: 'wrap' }, children: PLAYLIST_TRACKS.map(track => (_jsx(TrackButton, { track: track }, track.id))) })] }), customTracks.length > 0 && (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 6 }, children: [_jsx("p", { style: {
                                            margin: 0, fontSize: 10,
                                            color: 'rgba(255,255,255,0.35)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.08em'
                                        }, children: "Mes ajouts" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 6 }, children: customTracks.map(track => (_jsxs("div", { style: {
                                                display: 'flex', alignItems: 'center', gap: 8
                                            }, children: [_jsx(TrackButton, { track: track }), _jsx(motion.button, { whileTap: { scale: 0.9 }, onClick: () => handleRemoveTrack(track.id), style: {
                                                        background: 'rgba(239,68,68,0.1)',
                                                        border: '1px solid rgba(239,68,68,0.2)',
                                                        borderRadius: 8,
                                                        padding: '6px 10px',
                                                        color: '#FCA5A5',
                                                        cursor: 'pointer',
                                                        fontSize: 12
                                                    }, children: "\u2715" })] }, track.id))) })] })), _jsxs("div", { style: {
                                    borderTop: '1px solid rgba(255,255,255,0.08)',
                                    paddingTop: 12,
                                    display: 'flex', flexDirection: 'column', gap: 8
                                }, children: [_jsx("p", { style: {
                                            margin: 0, fontSize: 10,
                                            color: 'rgba(255,255,255,0.35)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.08em'
                                        }, children: "Ajouter un lien MP3" }), _jsxs("div", { style: { display: 'flex', gap: 8 }, children: [_jsx("input", { placeholder: "Nom", value: newTrackName, onChange: e => setNewTrackName(e.target.value), style: { ...inputStyle, maxWidth: 100 } }), _jsx("input", { placeholder: "URL du fichier .mp3", value: newTrackUrl, onChange: e => setNewTrackUrl(e.target.value), onKeyDown: e => e.key === 'Enter' && handleAddTrack(), style: inputStyle }), _jsx(motion.button, { whileTap: { scale: 0.9 }, onClick: handleAddTrack, style: {
                                                    padding: '8px 14px',
                                                    borderRadius: 10, border: 'none',
                                                    background: '#EF4444',
                                                    color: '#fff', cursor: 'pointer',
                                                    fontSize: 16, fontWeight: 700,
                                                    boxShadow: '0 0 12px rgba(239,68,68,0.3)'
                                                }, children: "+" })] })] })] }, "playlist")), activeTab === 'spotify' && (_jsxs(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, style: { display: 'flex', flexDirection: 'column', gap: 16 }, children: [spotifyStatus === 'disconnected' && (_jsxs("div", { style: {
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', gap: 16, padding: '8px 0'
                                }, children: [_jsx("div", { style: { fontSize: 40 }, children: "\uD83C\uDFA7" }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("p", { style: {
                                                    margin: 0, color: '#fff',
                                                    fontSize: 14, fontWeight: 600
                                                }, children: "Connecter Spotify" }), _jsx("p", { style: {
                                                    margin: '4px 0 0',
                                                    color: 'rgba(255,255,255,0.4)',
                                                    fontSize: 11
                                                }, children: "Collez l'URL d'une playlist Spotify" })] }), _jsx("input", { placeholder: "https://open.spotify.com/playlist/...", value: spotifyUrl, onChange: e => setSpotifyUrl(e.target.value), style: { ...inputStyle, width: '100%', textAlign: 'center' } }), _jsx(motion.button, { whileTap: { scale: 0.95 }, whileHover: { scale: 1.03 }, onClick: handleSpotifyConnect, style: {
                                            padding: '12px 32px',
                                            borderRadius: 999, border: 'none',
                                            background: 'linear-gradient(135deg, #1DB954, #17a348)',
                                            color: '#fff', cursor: 'pointer',
                                            fontSize: 14, fontWeight: 700,
                                            boxShadow: '0 0 24px rgba(29,185,84,0.35)',
                                            width: '100%'
                                        }, children: "\uD83C\uDFB5 Connecter" })] })), spotifyStatus === 'connecting' && (_jsxs("div", { style: {
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', gap: 12, padding: '16px 0'
                                }, children: [_jsx(motion.div, { animate: { rotate: 360 }, transition: { repeat: Infinity, duration: 1, ease: 'linear' }, style: { fontSize: 32 }, children: "\uD83D\uDD04" }), _jsx("p", { style: {
                                            color: 'rgba(255,255,255,0.5)',
                                            fontSize: 13, margin: 0
                                        }, children: "Connexion en cours..." })] })), spotifyStatus === 'connected' && (_jsxs("div", { style: {
                                    display: 'flex', flexDirection: 'column', gap: 12
                                }, children: [_jsxs("div", { style: {
                                            display: 'flex', alignItems: 'center',
                                            gap: 10, padding: '10px 14px',
                                            background: 'rgba(29,185,84,0.1)',
                                            border: '1px solid rgba(29,185,84,0.25)',
                                            borderRadius: 12
                                        }, children: [_jsx("div", { style: {
                                                    width: 8, height: 8, borderRadius: '50%',
                                                    background: '#1DB954',
                                                    boxShadow: '0 0 8px rgba(29,185,84,0.8)'
                                                } }), _jsx("span", { style: {
                                                    color: '#fff', fontSize: 13, fontWeight: 600
                                                }, children: "Spotify connect\u00E9" }), _jsx(motion.button, { whileTap: { scale: 0.9 }, onClick: () => {
                                                    setSpotifyStatus('disconnected');
                                                    setSpotifyUrl('');
                                                }, style: {
                                                    marginLeft: 'auto',
                                                    background: 'none', border: 'none',
                                                    color: 'rgba(255,255,255,0.3)',
                                                    cursor: 'pointer', fontSize: 12
                                                }, children: "D\u00E9connecter" })] }), spotifyUrl && (_jsx("iframe", { src: spotifyUrl.replace('open.spotify.com', 'open.spotify.com/embed'), width: "100%", height: "200", allow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture", loading: "lazy", style: {
                                            borderRadius: 16,
                                            border: 'none',
                                        } }))] }))] }, "spotify"))] }), _jsxs("div", { style: {
                    display: 'flex', alignItems: 'center', gap: 10,
                    borderTop: '1px solid rgba(255,255,255,0.07)',
                    paddingTop: 12
                }, children: [_jsx("span", { style: { color: '#fff', fontSize: 14, opacity: 0.5 }, children: "\uD83D\uDD08" }), _jsx("input", { type: "range", min: 0, max: 1, step: 0.05, value: volume, onChange: handleVolume, style: { flex: 1, accentColor: '#EF4444' } }), _jsx("span", { style: { color: '#fff', fontSize: 14, opacity: 0.5 }, children: "\uD83D\uDD0A" }), _jsxs("span", { style: {
                            color: 'rgba(255,255,255,0.3)',
                            fontSize: 11, minWidth: 28,
                            textAlign: 'right'
                        }, children: [Math.round(volume * 100), "%"] })] })] }));
}
