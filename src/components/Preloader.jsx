import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const simulateLoading = () => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsComplete(true);
            // Appeler onComplete immédiatement
            onComplete?.();
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 100);

      // Timeout de sécurité pour forcer la fin du chargement
      const timeout = setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        setIsComplete(true);
        onComplete?.();
      }, 3000); // Maximum 3 secondes

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    };

    simulateLoading();
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="preloader-content">
            <div className="preloader-logo">
              <div className="cirus-neon-text">CIRUS</div>
            </div>
            
            <div className="preloader-progress">
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="progress-text">
                Chargement... {Math.round(progress)}%
              </div>
            </div>

            <div className="preloader-status">
              <motion.div
                className="status-dot"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span>Initialisation de l'application</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader; 