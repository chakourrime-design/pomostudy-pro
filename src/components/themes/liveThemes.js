export function getLiveTheme() {
    const hour = new Date().getHours();
    // Matin 6h-12h
    if (hour >= 6 && hour < 12)
        return {
            id: 'live-morning',
            name: 'Matin',
            type: 'live',
            background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
            primaryColor: '#F59E0B',
            accentColor: '#D97706',
            isDark: false
        };
    // Après-midi 12h-18h
    if (hour >= 12 && hour < 18)
        return {
            id: 'live-afternoon',
            name: 'Après-midi',
            type: 'live',
            background: 'linear-gradient(135deg, #DBEAFE, #BFDBFE)',
            primaryColor: '#3B82F6',
            accentColor: '#1D4ED8',
            isDark: false
        };
    // Soir 18h-22h
    if (hour >= 18 && hour < 22)
        return {
            id: 'live-evening',
            name: 'Soir',
            type: 'live',
            background: 'linear-gradient(135deg, #1E1B4B, #312E81)',
            primaryColor: '#818CF8',
            accentColor: '#C7D2FE',
            isDark: true
        };
    // Nuit 22h-6h
    return {
        id: 'live-night',
        name: 'Nuit',
        type: 'live',
        background: 'linear-gradient(135deg, #0a0a0a, #111827)',
        primaryColor: '#6366F1',
        accentColor: '#A5B4FC',
        isDark: true
    };
}
