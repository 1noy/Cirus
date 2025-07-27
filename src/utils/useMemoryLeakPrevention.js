import { useEffect, useRef } from 'react';

// Hook pour prévenir les memory leaks
export const useMemoryLeakPrevention = () => {
  const mountedRef = useRef(true);
  const cleanupRefs = useRef(new Set());

  useEffect(() => {
    mountedRef.current = true;
    
    return () => {
      mountedRef.current = false;
      
      // Nettoyer tous les listeners enregistrés
      cleanupRefs.current.forEach(cleanup => {
        try {
          if (typeof cleanup === 'function') {
            cleanup();
          }
        } catch (error) {
          console.warn('Erreur lors du nettoyage:', error);
        }
      });
      
      cleanupRefs.current.clear();
    };
  }, []);

  const addCleanup = (cleanup) => {
    if (cleanup && typeof cleanup === 'function') {
      cleanupRefs.current.add(cleanup);
    }
  };

  const removeCleanup = (cleanup) => {
    if (cleanup) {
      cleanupRefs.current.delete(cleanup);
    }
  };

  const isMounted = () => mountedRef.current;

  return {
    isMounted,
    addCleanup,
    removeCleanup
  };
};

// Hook pour les timers avec cleanup automatique
export const useSafeTimer = () => {
  const timersRef = useRef(new Set());
  const { isMounted, addCleanup } = useMemoryLeakPrevention();

  const setTimeout = (callback, delay) => {
    if (!isMounted()) return null;
    
    const timerId = window.setTimeout(() => {
      if (isMounted()) {
        callback();
      }
      timersRef.current.delete(timerId);
    }, delay);
    
    timersRef.current.add(timerId);
    return timerId;
  };

  const setInterval = (callback, delay) => {
    if (!isMounted()) return null;
    
    const timerId = window.setInterval(() => {
      if (isMounted()) {
        callback();
      } else {
        window.clearInterval(timerId);
        timersRef.current.delete(timerId);
      }
    }, delay);
    
    timersRef.current.add(timerId);
    return timerId;
  };

  const clearTimer = (timerId) => {
    if (timerId) {
      window.clearTimeout(timerId);
      window.clearInterval(timerId);
      timersRef.current.delete(timerId);
    }
  };

  const clearAllTimers = () => {
    timersRef.current.forEach(timerId => {
      window.clearTimeout(timerId);
      window.clearInterval(timerId);
    });
    timersRef.current.clear();
  };

  // Cleanup automatique
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  return {
    setTimeout,
    setInterval,
    clearTimer,
    clearAllTimers,
    isMounted
  };
};

// Hook pour les listeners avec cleanup automatique
export const useSafeListener = () => {
  const listenersRef = useRef(new Set());
  const { isMounted, addCleanup } = useMemoryLeakPrevention();

  const addEventListener = (target, event, handler, options) => {
    if (!isMounted()) return;
    
    const wrappedHandler = (...args) => {
      if (isMounted()) {
        handler(...args);
      }
    };
    
    target.addEventListener(event, wrappedHandler, options);
    listenersRef.current.add({ target, event, handler: wrappedHandler, options });
  };

  const removeEventListener = (target, event, handler, options) => {
    const listener = Array.from(listenersRef.current).find(
      l => l.target === target && l.event === event
    );
    
    if (listener) {
      target.removeEventListener(event, listener.handler, options);
      listenersRef.current.delete(listener);
    }
  };

  const clearAllListeners = () => {
    listenersRef.current.forEach(({ target, event, handler, options }) => {
      target.removeEventListener(event, handler, options);
    });
    listenersRef.current.clear();
  };

  // Cleanup automatique
  useEffect(() => {
    return () => {
      clearAllListeners();
    };
  }, []);

  return {
    addEventListener,
    removeEventListener,
    clearAllListeners,
    isMounted
  };
}; 