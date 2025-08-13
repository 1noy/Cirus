import { useState, useCallback, useRef, useEffect, useMemo } from 'react';

/**
 * Hook de cache intelligent avec fonctionnalités avancées
 * @param {Object} options - Options de configuration du cache
 * @param {number} options.maxSize - Taille maximale du cache en MB
 * @param {number} options.ttl - Temps de vie par défaut en ms
 * @param {boolean} options.compression - Activer la compression
 * @param {boolean} options.persistent - Persister le cache dans localStorage
 * @param {Function} options.serializer - Fonction de sérialisation personnalisée
 * @param {Function} options.deserializer - Fonction de désérialisation personnalisée
 */
export const useSmartCache = (options = {}) => {
  const {
    maxSize = 50, // 50MB par défaut
    ttl = 5 * 60 * 1000, // 5 minutes par défaut
    compression = true,
    persistent = false,
    serializer = JSON.stringify,
    deserializer = JSON.parse
  } = options;

  // État du cache
  const [cacheStats, setCacheStats] = useState({
    hits: 0,
    misses: 0,
    size: 0,
    entries: 0
  });

  // Références
  const cacheRef = useRef(new Map());
  const timersRef = useRef(new Map());
  const compressionWorkerRef = useRef(null);

  // Initialisation du cache persistant
  useEffect(() => {
    if (persistent) {
      try {
        const savedCache = localStorage.getItem('smart-cache');
        if (savedCache) {
          const parsed = deserializer(savedCache);
          cacheRef.current = new Map(parsed);
          updateStats();
        }
      } catch (error) {
        console.warn('Erreur lors du chargement du cache persistant:', error);
      }
    }
  }, [persistent, deserializer]);

  // Sauvegarde périodique du cache persistant
  useEffect(() => {
    if (!persistent) return;

    const interval = setInterval(() => {
      try {
        const cacheData = Array.from(cacheRef.current.entries());
        const serialized = serializer(cacheData);
        localStorage.setItem('smart-cache', serialized);
      } catch (error) {
        console.warn('Erreur lors de la sauvegarde du cache:', error);
      }
    }, 30000); // Sauvegarde toutes les 30 secondes

    return () => clearInterval(interval);
  }, [persistent, serializer]);

  // Nettoyage automatique du cache
  useEffect(() => {
    const cleanup = () => {
      const now = Date.now();
      const expiredKeys = [];

      for (const [key, entry] of cacheRef.current.entries()) {
        if (entry.expiry && entry.expiry < now) {
          expiredKeys.push(key);
        }
      }

      expiredKeys.forEach(key => {
        cacheRef.current.delete(key);
        if (timersRef.current.has(key)) {
          clearTimeout(timersRef.current.get(key));
          timersRef.current.delete(key);
        }
      });

      if (expiredKeys.length > 0) {
        updateStats();
      }
    };

    const interval = setInterval(cleanup, 10000); // Nettoyage toutes les 10 secondes
    return () => clearInterval(interval);
  }, []);

  // Calcul de la taille du cache
  const calculateSize = useCallback((data) => {
    try {
      const serialized = serializer(data);
      return new Blob([serialized]).size;
    } catch {
      return 0;
    }
  }, [serializer]);

  // Mise à jour des statistiques
  const updateStats = useCallback(() => {
    let totalSize = 0;
    let entries = 0;

    for (const entry of cacheRef.current.values()) {
      totalSize += entry.size || 0;
      entries++;
    }

    setCacheStats(prev => ({
      ...prev,
      size: totalSize,
      entries
    }));
  }, []);

  // Compression des données
  const compressData = useCallback(async (data) => {
    if (!compression) return data;

    try {
      // Utilisation de l'API Compression Stream si disponible
      if ('CompressionStream' in window) {
        const stream = new CompressionStream('gzip');
        const writer = stream.writable.getWriter();
        const reader = stream.readable.getReader();
        
        const dataBlob = new Blob([serializer(data)]);
        await writer.write(dataBlob);
        await writer.close();
        
        const chunks = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }
        
        return new Blob(chunks);
      }
      
      // Fallback : compression simple
      return data;
    } catch (error) {
      console.warn('Erreur de compression:', error);
      return data;
    }
  }, [compression, serializer]);

  // Décompression des données
  const decompressData = useCallback(async (compressedData) => {
    if (!compression) return compressedData;

    try {
      if ('DecompressionStream' in window) {
        const stream = new DecompressionStream('gzip');
        const writer = stream.writable.getWriter();
        const reader = stream.readable.getReader();
        
        await writer.write(compressedData);
        await writer.close();
        
        const chunks = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }
        
        const decompressed = new Blob(chunks);
        const text = await decompressed.text();
        return deserializer(text);
      }
      
      return compressedData;
    } catch (error) {
      console.warn('Erreur de décompression:', error);
      return compressedData;
    }
  }, [compression, deserializer]);

  // Mise en cache avec TTL
  const set = useCallback(async (key, value, customTtl = ttl) => {
    try {
      // Vérification de la taille maximale
      const dataSize = calculateSize(value);
      const maxSizeBytes = maxSize * 1024 * 1024;
      
      if (dataSize > maxSizeBytes) {
        console.warn(`Données trop volumineuses pour le cache: ${dataSize} bytes`);
        return false;
      }

      // Nettoyage si nécessaire
      if (cacheStats.size + dataSize > maxSizeBytes) {
        await cleanup();
      }

      // Compression des données
      const compressedValue = await compressData(value);
      
      // Création de l'entrée
      const entry = {
        value: compressedValue,
        timestamp: Date.now(),
        expiry: customTtl ? Date.now() + customTtl : null,
        size: dataSize,
        compressed: compression,
        hits: 0
      };

      // Mise en cache
      cacheRef.current.set(key, entry);
      
      // Configuration du TTL
      if (customTtl) {
        const timer = setTimeout(() => {
          cacheRef.current.delete(key);
          timersRef.current.delete(key);
          updateStats();
        }, customTtl);
        
        timersRef.current.set(key, timer);
      }

      updateStats();
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise en cache:', error);
      return false;
    }
  }, [ttl, maxSize, compression, cacheStats.size, calculateSize, compressData, updateStats]);

  // Récupération depuis le cache
  const get = useCallback(async (key) => {
    try {
      const entry = cacheRef.current.get(key);
      
      if (!entry) {
        setCacheStats(prev => ({ ...prev, misses: prev.misses + 1 }));
        return null;
      }

      // Vérification de l'expiration
      if (entry.expiry && entry.expiry < Date.now()) {
        cacheRef.current.delete(key);
        if (timersRef.current.has(key)) {
          clearTimeout(timersRef.current.get(key));
          timersRef.current.delete(key);
        }
        setCacheStats(prev => ({ ...prev, misses: prev.misses + 1 }));
        return null;
      }

      // Mise à jour des statistiques
      entry.hits++;
      setCacheStats(prev => ({ ...prev, hits: prev.hits + 1 }));

      // Décompression si nécessaire
      if (entry.compressed) {
        return await decompressData(entry.value);
      }

      return entry.value;
    } catch (error) {
      console.error('Erreur lors de la récupération du cache:', error);
      setCacheStats(prev => ({ ...prev, misses: prev.misses + 1 }));
      return null;
    }
  }, [decompressData]);

  // Vérification de l'existence
  const has = useCallback((key) => {
    const entry = cacheRef.current.get(key);
    if (!entry) return false;
    
    if (entry.expiry && entry.expiry < Date.now()) {
      cacheRef.current.delete(key);
      return false;
    }
    
    return true;
  }, []);

  // Suppression d'une clé
  const deleteKey = useCallback((key) => {
    const deleted = cacheRef.current.delete(key);
    if (deleted) {
      if (timersRef.current.has(key)) {
        clearTimeout(timersRef.current.get(key));
        timersRef.current.delete(key);
      }
      updateStats();
    }
    return deleted;
  }, [updateStats]);

  // Nettoyage du cache
  const cleanup = useCallback(async () => {
    // Suppression des entrées expirées
    const now = Date.now();
    const expiredKeys = [];

    for (const [key, entry] of cacheRef.current.entries()) {
      if (entry.expiry && entry.expiry < now) {
        expiredKeys.push(key);
      }
    }

    expiredKeys.forEach(key => deleteKey(key));

    // Si encore trop volumineux, supprimer les moins utilisés
    if (cacheStats.size > maxSize * 1024 * 1024) {
      const entries = Array.from(cacheRef.current.entries())
        .sort((a, b) => a[1].hits - b[1].hits);
      
      const toDelete = Math.ceil(entries.length * 0.2); // Supprimer 20% des moins utilisés
      entries.slice(0, toDelete).forEach(([key]) => deleteKey(key));
    }
  }, [cacheStats.size, maxSize, deleteKey]);

  // Vider complètement le cache
  const clear = useCallback(() => {
    // Nettoyage des timers
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current.clear();
    
    // Vider le cache
    cacheRef.current.clear();
    
    // Réinitialiser les stats
    setCacheStats({
      hits: 0,
      misses: 0,
      size: 0,
      entries: 0
    });
  }, []);

  // Récupération de plusieurs clés
  const getMultiple = useCallback(async (keys) => {
    const results = {};
    const missingKeys = [];
    
    for (const key of keys) {
      const value = await get(key);
      if (value !== null) {
        results[key] = value;
      } else {
        missingKeys.push(key);
      }
    }
    
    return { results, missingKeys };
  }, [get]);

  // Mise en cache de plusieurs clés
  const setMultiple = useCallback(async (entries, customTtl = ttl) => {
    const results = {};
    
    for (const [key, value] of Object.entries(entries)) {
      results[key] = await set(key, value, customTtl);
    }
    
    return results;
  }, [set, ttl]);

  // Statistiques détaillées
  const getDetailedStats = useCallback(() => {
    const now = Date.now();
    let expiredEntries = 0;
    let totalHits = 0;
    let oldestEntry = null;
    let newestEntry = null;

    for (const entry of cacheRef.current.values()) {
      if (entry.expiry && entry.expiry < now) {
        expiredEntries++;
      }
      totalHits += entry.hits;
      
      if (!oldestEntry || entry.timestamp < oldestEntry.timestamp) {
        oldestEntry = entry;
      }
      if (!newestEntry || entry.timestamp > newestEntry.timestamp) {
        newestEntry = entry;
      }
    }

    return {
      ...cacheStats,
      expiredEntries,
      totalHits,
      hitRate: cacheStats.hits / (cacheStats.hits + cacheStats.misses) || 0,
      averageHits: totalHits / cacheStats.entries || 0,
      oldestEntry: oldestEntry?.timestamp,
      newestEntry: newestEntry?.timestamp,
      compressionRatio: compression ? 0.7 : 1, // Estimation
      memoryUsage: `${(cacheStats.size / (1024 * 1024)).toFixed(2)} MB`
    };
  }, [cacheStats, compression]);

  // Hook de cache avec pattern de callback
  const useCachedCallback = useCallback((key, callback, dependencies = [], customTtl = ttl) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = useCallback(async (...args) => {
      try {
        setLoading(true);
        setError(null);

        // Vérifier le cache d'abord
        let result = await get(key);
        
        if (result === null) {
          // Exécuter le callback
          result = await callback(...args);
          
          // Mettre en cache
          await set(key, result, customTtl);
        }

        setData(result);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    }, [key, callback, customTtl, get, set]);

    // Exécution automatique si pas de dépendances
    useEffect(() => {
      if (dependencies.length === 0) {
        execute();
      }
    }, [execute, dependencies]);

    return { data, loading, error, execute };
  }, [get, set, ttl]);

  // Valeurs mémorisées
  const memoizedStats = useMemo(() => cacheStats, [cacheStats]);
  const memoizedDetailedStats = useMemo(() => getDetailedStats(), [getDetailedStats]);

  return {
    // Méthodes principales
    get,
    set,
    has,
    delete: deleteKey,
    clear,
    cleanup,
    
    // Méthodes avancées
    getMultiple,
    setMultiple,
    
    // Hook spécialisé
    useCachedCallback,
    
    // Statistiques
    stats: memoizedStats,
    detailedStats: memoizedDetailedStats,
    
    // État du cache
    size: cacheStats.size,
    entries: cacheStats.entries,
    hitRate: cacheStats.hits / (cacheStats.hits + cacheStats.misses) || 0
  };
};

export default useSmartCache;
