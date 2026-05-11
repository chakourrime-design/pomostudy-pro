export async function requestNotificationPermission() {
    if (!('Notification' in window))
        return false;
    if (Notification.permission === 'granted')
        return true;
    if (Notification.permission === 'denied')
        return false;
    const result = await Notification.requestPermission();
    return result === 'granted';
}
export function sendPhaseEndNotification(phase) {
    if (Notification.permission !== 'granted')
        return;
    const isWork = phase === 'WORK';
    const title = isWork ? '⏰ Pause méritée !' : '🎯 C\'est reparti !';
    const body = isWork
        ? 'Ta session Pomodoro est terminée.'
        : 'La pause est finie, focus !';
    new Notification(title, { body, icon: '/logo.png' });
}
