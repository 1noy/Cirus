import React, { forwardRef, useId } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Composant de champ de formulaire professionnel avec validation
 * @component
 * @param {Object} props - Propriétés du composant
 * @param {string} props.label - Label du champ
 * @param {string} props.name - Nom du champ
 * @param {string} props.type - Type du champ (text, email, password, etc.)
 * @param {string} props.placeholder - Placeholder du champ
 * @param {string} props.value - Valeur du champ
 * @param {Function} props.onChange - Fonction de changement
 * @param {Function} props.onBlur - Fonction de perte de focus
 * @param {string} props.error - Message d'erreur
 * @param {boolean} props.touched - Si le champ a été touché
 * @param {boolean} props.required - Si le champ est requis
 * @param {boolean} props.disabled - Si le champ est désactivé
 * @param {string} props.helperText - Texte d'aide
 * @param {Object} props.inputProps - Propriétés supplémentaires pour l'input
 */
const FormField = forwardRef(({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  disabled = false,
  helperText,
  inputProps = {},
  ...props
}, ref) => {
  const id = useId();
  const inputId = `${name}-${id}`;
  const hasError = touched && error;
  const isRequired = required;

  // Configuration des animations
  const animationVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <motion.div
      className="form-field"
      variants={animationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      {...props}
    >
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={`form-field__label ${isRequired ? 'required' : ''}`}
        >
          {label}
          {isRequired && <span className="required-mark" aria-label="champ requis">*</span>}
        </label>
      )}

      {/* Conteneur de l'input */}
      <div className={`form-field__input-container ${hasError ? 'has-error' : ''}`}>
        {/* Input */}
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          value={value || ''}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={isRequired}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          className="form-field__input"
          {...inputProps}
        />

        {/* Icône de validation */}
        {touched && !hasError && value && (
          <motion.div
            className="form-field__valid-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            ✓
          </motion.div>
        )}

        {/* Icône d'erreur */}
        {hasError && (
          <motion.div
            className="form-field__error-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            ⚠
          </motion.div>
        )}
      </div>

      {/* Message d'erreur */}
      {hasError && (
        <motion.div
          id={`${inputId}-error`}
          className="form-field__error"
          role="alert"
          aria-live="polite"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.div>
      )}

      {/* Texte d'aide */}
      {helperText && !hasError && (
        <div
          id={`${inputId}-helper`}
          className="form-field__helper"
          aria-live="polite"
        >
          {helperText}
        </div>
      )}

      {/* Indicateur de force du mot de passe (pour les champs password) */}
      {type === 'password' && value && (
        <PasswordStrengthIndicator password={value} />
      )}
    </motion.div>
  );
});

/**
 * Composant d'indicateur de force du mot de passe
 */
const PasswordStrengthIndicator = ({ password }) => {
  const getPasswordStrength = (pwd) => {
    let score = 0;
    
    if (pwd.length >= 8) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    
    if (score <= 2) return { level: 'weak', color: '#ef4444', text: 'Faible' };
    if (score <= 3) return { level: 'medium', color: '#f59e0b', text: 'Moyen' };
    return { level: 'strong', color: '#10b981', text: 'Fort' };
  };

  const strength = getPasswordStrength(password);

  return (
    <motion.div
      className="password-strength"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="password-strength__bar">
        <div
          className="password-strength__fill"
          style={{
            width: `${(password.length / 12) * 100}%`,
            backgroundColor: strength.color
          }}
        />
      </div>
      <span
        className="password-strength__text"
        style={{ color: strength.color }}
      >
        {strength.text}
      </span>
    </motion.div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  touched: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  inputProps: PropTypes.object
};

PasswordStrengthIndicator.propTypes = {
  password: PropTypes.string.isRequired
};

FormField.displayName = 'FormField';

export default FormField;
