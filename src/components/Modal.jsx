import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

/**
 * Composant de modal professionnel avec gestion des clés et accessibilité
 * @component
 * @param {Object} props - Propriétés du composant
 * @param {boolean} props.isOpen - Si le modal est ouvert
 * @param {Function} props.onClose - Fonction de fermeture
 * @param {string} props.title - Titre du modal
 * @param {ReactNode} props.children - Contenu du modal
 * @param {string} props.size - Taille du modal (sm, md, lg, xl, full)
 * @param {boolean} props.closeOnOverlayClick - Si le modal se ferme en cliquant sur l'overlay
 * @param {boolean} props.closeOnEscape - Si le modal se ferme avec la touche Escape
 * @param {boolean} props.showCloseButton - Si le bouton de fermeture est visible
 * @param {string} props.overlayClassName - Classe CSS pour l'overlay
 * @param {string} props.contentClassName - Classe CSS pour le contenu
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  overlayClassName = '',
  contentClassName = '',
  ...props
}) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Gestion de la fermeture avec Escape
  const handleEscape = useCallback((event) => {
    if (event.key === 'Escape' && closeOnEscape) {
      onClose();
    }
  }, [closeOnEscape, onClose]);

  // Gestion du clic sur l'overlay
  const handleOverlayClick = useCallback((event) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  // Gestion de la fermeture
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Gestion du focus et de l'accessibilité
  useEffect(() => {
    if (isOpen) {
      // Sauvegarder l'élément actuellement focalisé
      previousActiveElement.current = document.activeElement;
      
      // Ajouter l'écouteur d'événements pour Escape
      document.addEventListener('keydown', handleEscape);
      
      // Empêcher le scroll du body
      document.body.style.overflow = 'hidden';
      
      // Focus sur le modal
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      // Restaurer le scroll du body
      document.body.style.overflow = '';
      
      // Restaurer le focus
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  // Empêcher la propagation des clics dans le contenu
  const handleContentClick = useCallback((event) => {
    event.stopPropagation();
  }, []);

  // Configuration des animations
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50 
    }
  };

  // Classes CSS dynamiques
  const modalClasses = [
    'modal',
    `modal--${size}`,
    contentClassName
  ].filter(Boolean).join(' ');

  const overlayClasses = [
    'modal-overlay',
    overlayClassName
  ].filter(Boolean).join(' ');

  // Rendu du modal
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        className={overlayClasses}
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.2 }}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby="modal-content"
      >
        <motion.div
          ref={modalRef}
          className={modalClasses}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ 
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
          onClick={handleContentClick}
          tabIndex={-1}
          {...props}
        >
          {/* En-tête du modal */}
          {(title || showCloseButton) && (
            <div className="modal__header">
              {title && (
                <h2 
                  id="modal-title" 
                  className="modal__title"
                >
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className="modal__close"
                  onClick={handleClose}
                  aria-label="Fermer le modal"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Contenu du modal */}
          <div 
            id="modal-content"
            className="modal__content"
          >
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
  closeOnOverlayClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  overlayClassName: PropTypes.string,
  contentClassName: PropTypes.string
};

Modal.defaultProps = {
  size: 'md',
  closeOnOverlayClick: true,
  closeOnEscape: true,
  showCloseButton: true
};

Modal.displayName = 'Modal';

export default Modal;
