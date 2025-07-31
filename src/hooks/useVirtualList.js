import { useState, useEffect, useCallback, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

export const useVirtualList = (items, itemHeight, containerHeight, overscan = 5) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerRef, setContainerRef] = useState(null);

  // Calculer les éléments visibles
  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    return {
      startIndex,
      endIndex,
      visibleItems: items.slice(startIndex, endIndex),
      totalHeight: items.length * itemHeight,
      offsetY: startIndex * itemHeight
    };
  }, [items, itemHeight, containerHeight, scrollTop, overscan]);

  // Gestionnaire de scroll optimisé
  const handleScroll = useCallback((event) => {
    const newScrollTop = event.target.scrollTop;
    setScrollTop(newScrollTop);
  }, []);

  // Observer pour détecter quand le conteneur est visible
  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
    rootMargin: '100px'
  });

  // Effet pour ajouter l'écouteur de scroll
  useEffect(() => {
    if (containerRef && inView) {
      containerRef.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        containerRef.removeEventListener('scroll', handleScroll);
      };
    }
  }, [containerRef, handleScroll, inView]);

  return {
    ...visibleRange,
    containerRef: setContainerRef,
    inViewRef,
    inView,
    scrollTop
  };
};

// Hook pour optimiser les listes avec pagination
export const useInfiniteList = (fetchItems, pageSize = 20) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newItems = await fetchItems(page, pageSize);
      
      if (newItems.length < pageSize) {
        setHasMore(false);
      }
      
      setItems(prev => [...prev, ...newItems]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchItems, page, pageSize, loading, hasMore]);

  const reset = useCallback(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    setLoading(false);
  }, []);

  return {
    items,
    loading,
    hasMore,
    loadMore,
    reset
  };
};

// Hook pour optimiser les recherches
export const useDebouncedSearch = (searchFunction, delay = 300) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      try {
        const searchResults = await searchFunction(searchTerm);
        setResults(searchResults);
      } catch (error) {
        console.error('Erreur de recherche:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchFunction, delay]);

  return {
    searchTerm,
    setSearchTerm,
    results,
    loading
  };
};

// Hook pour optimiser les animations
export const useOptimizedAnimation = (animationFunction, dependencies = []) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    try {
      await animationFunction();
    } finally {
      setIsAnimating(false);
    }
  }, [animationFunction, isAnimating]);

  return {
    isAnimating,
    startAnimation
  };
}; 