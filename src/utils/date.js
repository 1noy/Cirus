const toDate = (ts) => {
  if (!ts) return null;
  if (ts?.toDate) return ts.toDate();
  if (typeof ts === 'number') return new Date(ts);
  return new Date(ts);
};

export const isSameDay = (a, b) => {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};

export const formatTime = (ts) => {
  const d = toDate(ts);
  if (!d) return '';
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

export const formatDayLabel = (ts) => {
  const d = toDate(ts);
  if (!d) return '';
  const now = new Date();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  if (isSameDay(d, now)) return 'Aujourd\'hui';
  if (isSameDay(d, yesterday)) return 'Hier';
  return d.toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
};

export const formatLastSeen = (online, lastActive) => {
  if (online) return 'En ligne';
  const d = toDate(lastActive);
  if (!d) return 'Hors ligne';
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return 'Vu à l\'instant';
  if (diff < 3600) return `Vu il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `Vu il y a ${Math.floor(diff / 3600)} h`;
  return `Vu le ${d.toLocaleDateString('fr-FR')} à ${d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
};


