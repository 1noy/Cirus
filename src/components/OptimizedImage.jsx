import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/icon-192x192.png',
  fallback = '/icon-192x192.png',
  lazy = true,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!lazy) {
      setImageSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, src]);

  useEffect(() => {
    if (isInView && src) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.onerror = () => {
        setImageSrc(fallback);
        setHasError(true);
        setIsLoaded(true);
      };
      img.src = src;
    }
  }, [isInView, src, fallback]);

  return (
    <div 
      ref={imgRef}
      className={`optimized-image-container ${className}`}
      {...props}
    >
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="image-placeholder"
          >
            <div className="placeholder-content">
              <i className="fas fa-image"></i>
            </div>
          </motion.div>
        )}
        
        {isLoaded && (
          <motion.img
            key="image"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={imageSrc}
            alt={alt}
            className={`optimized-image ${hasError ? 'error' : ''}`}
            loading={lazy ? 'lazy' : 'eager'}
            onError={() => {
              if (!hasError) {
                setImageSrc(fallback);
                setHasError(true);
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OptimizedImage; 