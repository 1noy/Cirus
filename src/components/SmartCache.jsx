import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import { LRUCache } from '../utils/advanced-optimizations';

// Contexte pour le cache global
const CacheContext = createContext();

// Actions pour le reducer
const CACHE_ACTIONS = {
  SET: 'SET',
  GET: 'GET',
  DELETE: 'DELETE',
  CLEAR: 'CLEAR',
  UPDATE: 'UPDATE'
};

// Reducer pour gérer l'état du cache
const cacheReducer = (state, action) => {
  switch (action.type) {
    case CACHE_ACTIONS.SET:
      return {
        ...state,
        data: {
          ...state.data,
          [action.key]: {
            value: action.value,
            timestamp: Date.now(),
            ttl: action.ttl || 5 * 60 * 1000 // 5 minutes par défaut
          }
        }
      };
    
    case CACHE_ACTIONS.GET:
      return state; // Pas de changement d'état pour GET
    
    case CACHE_ACTIONS.DELETE:
      const { [action.key]: deleted, ...rest } = state.data;
      return {
        ...state,
        data: rest
      };
    
    case CACHE_ACTIONS.CLEAR:
      return {
        ...state,
        data: {}
      };
    
    case CACHE_ACTIONS.UPDATE:
      return {
        ...state,
        data: {
          ...state.data,
          [action.key]: {
            ...state.data[action.key],
            value: action.value,
            timestamp: Date.now()
          }
        }
      };
    
    default:
      return state;
  }
};

// Provider du cache
export const CacheProvider = ({ children, maxSize = 100 }) => {
  const [state, dispatch] = useReducer(cacheReducer, {
    data: {},
    lruCache: new LRUCache(maxSize)
  });

  // Nettoyer les entrées expirées
  const cleanupExpired = useCallback(() => {
    const now = Date.now();
    Object.entries(state.data).forEach(([key, item]) => {
      if (now - item.timestamp > item.ttl) {
        dispatch({ type: CACHE_ACTIONS.DELETE, key });
      }
    });
  }, [state.data]);

  // Effectuer le nettoyage périodique
  React.useEffect(() => {
    const interval = setInterval(cleanupExpired, 60000); // Toutes les minutes
    return () => clearInterval(interval);
  }, [cleanupExpired]);

  const setCache = useCallback((key, value, ttl) => {
    dispatch({ type: CACHE_ACTIONS.SET, key, value, ttl });
    state.lruCache.set(key, { value, timestamp: Date.now(), ttl });
  }, [state.lruCache]);

  const getCache = useCallback((key) => {
    const item = state.data[key];
    if (item && Date.now() - item.timestamp < item.ttl) {
      dispatch({ type: CACHE_ACTIONS.GET, key });
      return item.value;
    }
    return null;
  }, [state.data]);

  const deleteCache = useCallback((key) => {
    dispatch({ type: CACHE_ACTIONS.DELETE, key });
    state.lruCache.clear(); // Nettoyer le cache LRU
  }, [state.lruCache]);

  const clearCache = useCallback(() => {
    dispatch({ type: CACHE_ACTIONS.CLEAR });
    state.lruCache.clear();
  }, [state.lruCache]);

  const updateCache = useCallback((key, value) => {
    dispatch({ type: CACHE_ACTIONS.UPDATE, key, value });
  }, []);

  const cacheStats = useMemo(() => {
    const now = Date.now();
    const validEntries = Object.entries(state.data).filter(([_, item]) => 
      now - item.timestamp < item.ttl
    );
    
    return {
      totalEntries: Object.keys(state.data).length,
      validEntries: validEntries.length,
      expiredEntries: Object.keys(state.data).length - validEntries.length,
      memoryUsage: JSON.stringify(state.data).length
    };
  }, [state.data]);

  const value = {
    setCache,
    getCache,
    deleteCache,
    clearCache,
    updateCache,
    cacheStats,
    cleanupExpired
  };

  return (
    <CacheContext.Provider value={value}>
      {children}
    </CacheContext.Provider>
  );
};

// Hook pour utiliser le cache
export const useCache = () => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCache must be used within a CacheProvider');
  }
  return context;
};

// Hook pour les données avec cache automatique
export const useCachedData = (key, fetchFn, ttl = 5 * 60 * 1000) => {
  const { getCache, setCache } = useCache();
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchFn();
      setData(result);
      setCache(key, result, ttl);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [key, fetchFn, ttl, setCache]);

  React.useEffect(() => {
    // Vérifier le cache d'abord
    const cached = getCache(key);
    if (cached) {
      setData(cached);
      return;
    }

    // Si pas en cache, récupérer les données
    fetchData();
  }, [key, getCache, fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

// Composant pour afficher les statistiques du cache
export const CacheStats = () => {
  const { cacheStats } = useCache();

  return (
    <div className="cache-stats">
      <h3>Statistiques du Cache</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Total:</span>
          <span className="stat-value">{cacheStats.totalEntries}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Valides:</span>
          <span className="stat-value">{cacheStats.validEntries}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Expirées:</span>
          <span className="stat-value">{cacheStats.expiredEntries}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Mémoire:</span>
          <span className="stat-value">{Math.round(cacheStats.memoryUsage / 1024)}KB</span>
        </div>
      </div>
    </div>
  );
}; 