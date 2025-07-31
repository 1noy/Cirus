import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeAnimation from './WelcomeAnimation';
import CyberpunkLogin from './CyberpunkLogin';

const CyberpunkAuth = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleGetStarted = () => {
    setShowLogin(true);
  };

  return (
    <div className="auth-container">
      <AnimatePresence mode="wait">
        {!showLogin ? (
          <WelcomeAnimation key="welcome" onGetStarted={handleGetStarted} />
        ) : (
          <CyberpunkLogin key="login" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CyberpunkAuth; 