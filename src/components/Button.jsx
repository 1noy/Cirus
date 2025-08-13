import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Composant de bouton professionnel avec variantes et états
 * @component
 * @param {Object} props - Propriétés du composant
 * @param {string} props.variant - Variante du bouton (primary, secondary, success, warning, danger, info, dark, light)
 * @param {string} props.size - Taille du bouton (sm, md, lg, xl)
 * @param {boolean} props.loading - Si le bouton est en cours de chargement
 * @param {boolean} props.disabled - Si le bouton est désactivé
 * @param {boolean} props.fullWidth - Si le bouton prend toute la largeur
 * @param {boolean} props.rounded - Si le bouton a des coins arrondis
 * @param {string} props.icon - Icône du bouton
 * @param {string} props.iconPosition - Position de l'icône (left, right)
 * @param {Function} props.onClick - Fonction de clic
 * @param {string} props.type - Type du bouton (button, submit, reset)
 * @param {Object} props.motionProps - Propriétés d'animation Framer Motion
 */
const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  rounded = false,
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  motionProps = {},
  className = '',
  ...props
}, ref) => {
  // Déterminer si le bouton est désactivé
  const isDisabled = disabled || loading;

  // Classes CSS dynamiques
  const buttonClasses = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full-width',
    rounded && 'btn--rounded',
    loading && 'btn--loading',
    isDisabled && 'btn--disabled',
    className
  ].filter(Boolean).join(' ');

  // Configuration des animations par défaut
  const defaultMotionProps = {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98, y: 0 },
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 17
    }
  };

  // Gestionnaire de clic
  const handleClick = (event) => {
    if (isDisabled) return;
    onClick?.(event);
  };

  // Rendu de l'icône
  const renderIcon = () => {
    if (!icon) return null;
    
    const iconElement = (
      <span className={`btn__icon btn__icon--${iconPosition}`}>
        {icon}
      </span>
    );

    return iconElement;
  };

  // Rendu du contenu
  const renderContent = () => {
    if (loading) {
      return (
        <>
          <motion.div
            className="btn__spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <span className="btn__loading-text">Chargement...</span>
        </>
      );
    }

    return (
      <>
        {iconPosition === 'left' && renderIcon()}
        <span className="btn__text">{children}</span>
        {iconPosition === 'right' && renderIcon()}
      </>
    );
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...defaultMotionProps}
      {...motionProps}
      {...props}
    >
      {renderContent()}
      
      {/* Effet de brillance au survol */}
      <motion.div
        className="btn__shine"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </motion.button>
  );
});

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'dark', 'light'
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  rounded: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  motionProps: PropTypes.object,
  className: PropTypes.string
};

Button.defaultProps = {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  fullWidth: false,
  rounded: false,
  iconPosition: 'left',
  type: 'button'
};

Button.displayName = 'Button';

export default Button;
