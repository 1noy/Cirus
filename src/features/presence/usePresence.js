import { useEffect } from 'react';
import { setOnline, setOffline, heartbeat } from './presenceService';

const usePresence = (userId) => {
  useEffect(() => {
    if (!userId) return;
    setOnline(userId).catch(() => {});

    const interval = setInterval(() => heartbeat(userId).catch(() => {}), 60 * 1000);
    const onUnload = () => setOffline(userId).catch(() => {});
    window.addEventListener('beforeunload', onUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', onUnload);
      setOffline(userId).catch(() => {});
    };
  }, [userId]);
};

export default usePresence;


