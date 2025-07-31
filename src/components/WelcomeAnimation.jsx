import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const WelcomeAnimation = ({ onComplete }) => {
  const welcomeRef = useRef(null);
  const cityRef = useRef(null);

  useEffect(() => {
    createNeonCity();
  }, []);

  const createNeonCity = () => {
    const cityContainer = cityRef.current;
    if (!cityContainer) return;

    // Créer la skyline avec des bâtiments sur toute la largeur
    const screenWidth = window.innerWidth;
    const buildingCount = Math.floor(screenWidth / 60); // Un bâtiment tous les 60px
    
    for (let i = 0; i < buildingCount; i++) {
      const building = document.createElement('div');
      building.className = 'building';
      
      const width = Math.random() * 80 + 40;
      const height = Math.random() * 200 + 100;
      const left = (i * 60) + Math.random() * 40;
      
      building.style.cssText = `
        width: ${width}px;
        height: ${height}px;
        left: ${left}px;
      `;
      
      // Ajouter des fenêtres néon
      const windowCount = Math.floor(height / 30);
      for (let j = 0; j < windowCount; j++) {
        const window = document.createElement('div');
        window.className = 'neon-window';
        
        const windowWidth = Math.random() * 8 + 4;
        const windowHeight = Math.random() * 8 + 4;
        const windowLeft = Math.random() * (width - windowWidth);
        const windowTop = j * 30 + Math.random() * 20;
        
        window.style.cssText = `
          width: ${windowWidth}px;
          height: ${windowHeight}px;
          left: ${windowLeft}px;
          top: ${windowTop}px;
        `;
        
        building.appendChild(window);
      }
      
      cityContainer.appendChild(building);
    }
  };

  const handleEnterClick = () => {
    const welcomeScreen = welcomeRef.current;
    
    // Animation de sortie
    gsap.to(welcomeScreen, {
      opacity: 0,
      scale: 1.1,
      duration: 1,
      ease: "power2.inOut"
    });

    // Effet de particules de décomposition
    for (let i = 0; i < 50; i++) {
      createExplosionParticle();
    }

    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  const createExplosionParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'explosion-particle';
    
    // Position par rapport au bouton
    const rect = welcomeRef.current.getBoundingClientRect();
    const x = rect.left + rect.width/2;
    const y = rect.top + rect.height/2;
    
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 8 + 2}px;
      height: ${Math.random() * 8 + 2}px;
      left: ${x}px;
      top: ${y}px;
      background-color: hsl(${Math.random() * 60 + 200}, 100%, 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 1000;
    `;
    
    document.body.appendChild(particle);
    
    // Animation avec GSAP
    const angle = Math.random() * Math.PI * 2;
    gsap.to(particle, {
      x: Math.cos(angle) * 100,
      y: Math.sin(angle) * 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => particle.remove()
    });
  };

  return (
    <div ref={welcomeRef} className="welcome-screen">
      {/* Neon City Skyline Background */}
      <div className="neon-city">
        <div ref={cityRef} className="city-skyline"></div>
      </div>

      <div className="welcome-content">
        <h1 className="welcome-title">
          Cirus<span style={{ color: '#4facfe' }}>Chat</span>
        </h1>
        
        <p className="welcome-subtitle">
          Votre communication, simplifiée
        </p>
        
        <div className="welcome-divider"></div>
        
        <button
          className="btn btn-primary btn-lg btn-glow"
          onClick={handleEnterClick}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
            Commencer <i className="fas fa-arrow-right" style={{ marginLeft: '0.75rem', transition: 'transform 0.3s ease' }}></i>
          </span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeAnimation; 