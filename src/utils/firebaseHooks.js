import { useState, useEffect } from 'react';
import { firebaseDebouncer } from './firebase';

// Hook personnalisé pour les requêtes debounced
export const useDebouncedQuery = (queryFn, dependencies = [], debounceKey = '') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!debounceKey) return;

    setLoading(true);
    setError(null);

    firebaseDebouncer.debounce(debounceKey, async () => {
      try {
        const result = await queryFn();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      firebaseDebouncer.cancel(debounceKey);
    };
  }, dependencies);

  return { data, loading, error };
}; 