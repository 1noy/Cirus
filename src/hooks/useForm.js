import { useState, useCallback, useMemo } from 'react';

/**
 * Hook personnalisé pour la gestion avancée des formulaires
 * @param {Object} initialValues - Valeurs initiales du formulaire
 * @param {Object} validationSchema - Schéma de validation
 * @param {Function} onSubmit - Fonction de soumission
 * @returns {Object} Objet contenant les méthodes et l'état du formulaire
 */
export const useForm = (initialValues = {}, validationSchema = {}, onSubmit = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  /**
   * Met à jour une valeur du formulaire
   * @param {string|Object} name - Nom du champ ou objet de valeurs
   * @param {*} value - Nouvelle valeur (optionnel si name est un objet)
   */
  const setValue = useCallback((name, value) => {
    if (typeof name === 'object') {
      setValues(prev => ({ ...prev, ...name }));
    } else {
      setValues(prev => ({ ...prev, [name]: value }));
    }
    
    // Effacer l'erreur du champ modifié
    if (typeof name === 'string' && errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  /**
   * Marque un champ comme touché
   * @param {string} name - Nom du champ
   */
  const setFieldTouched = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  /**
   * Valide un champ spécifique
   * @param {string} name - Nom du champ
   * @param {*} value - Valeur à valider
   * @returns {string|null} Message d'erreur ou null
   */
  const validateField = useCallback((name, value) => {
    const validator = validationSchema[name];
    if (!validator) return null;

    try {
      const result = validator(value, values);
      return typeof result === 'string' ? result : null;
    } catch (error) {
      console.error(`Erreur de validation pour ${name}:`, error);
      return 'Erreur de validation';
    }
  }, [validationSchema, values]);

  /**
   * Valide tous les champs du formulaire
   * @returns {Object} Objet des erreurs
   */
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    Object.keys(validationSchema).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    return newErrors;
  }, [validationSchema, values, validateField]);

  /**
   * Gère la soumission du formulaire
   * @param {Event} event - Événement de soumission
   */
  const handleSubmit = useCallback(async (event) => {
    if (event) {
      event.preventDefault();
    }

    setIsSubmitting(true);
    setSubmitCount(prev => prev + 1);

    try {
      // Valider le formulaire
      const formErrors = validateForm();
      
      if (Object.keys(formErrors).length > 0) {
        // Marquer tous les champs comme touchés
        const allTouched = {};
        Object.keys(validationSchema).forEach(field => {
          allTouched[field] = true;
        });
        setTouched(allTouched);
        
        throw new Error('Formulaire invalide');
      }

      // Appeler la fonction de soumission
      if (onSubmit) {
        await onSubmit(values, { setSubmitting: setIsSubmitting });
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, validationSchema, values, onSubmit]);

  /**
   * Gère le changement d'un champ
   * @param {Event} event - Événement de changement
   */
  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setValue(name, fieldValue);
  }, [setValue]);

  /**
   * Gère la perte de focus d'un champ
   * @param {Event} event - Événement de perte de focus
   */
  const handleBlur = useCallback((event) => {
    const { name, value } = event.target;
    setFieldTouched(name);
    
    // Valider le champ lors de la perte de focus
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [setFieldTouched, validateField]);

  /**
   * Réinitialise le formulaire
   * @param {Object} newValues - Nouvelles valeurs (optionnel)
   */
  const resetForm = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setSubmitCount(0);
  }, [initialValues]);

  /**
   * Vérifie si le formulaire est valide
   */
  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  /**
   * Vérifie si le formulaire a été modifié
   */
  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }, [values, initialValues]);

  /**
   * Vérifie si le formulaire peut être soumis
   */
  const canSubmit = useMemo(() => {
    return isValid && isDirty && !isSubmitting;
  }, [isValid, isDirty, isSubmitting]);

  return {
    // État
    values,
    errors,
    touched,
    isSubmitting,
    submitCount,
    isValid,
    isDirty,
    canSubmit,
    
    // Méthodes
    setValue,
    setFieldTouched,
    validateField,
    validateForm,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    
    // Getters pour les champs
    getFieldProps: (name) => ({
      name,
      value: values[name] || '',
      onChange: handleChange,
      onBlur: handleBlur,
      error: errors[name],
      touched: touched[name]
    })
  };
};

/**
 * Validateurs prédéfinis
 */
export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'Ce champ est requis';
    }
    return null;
  },
  
  email: (value) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Format d\'email invalide';
    }
    return null;
  },
  
  minLength: (min) => (value) => {
    if (!value) return null;
    if (value.length < min) {
      return `Minimum ${min} caractères requis`;
    }
    return null;
  },
  
  maxLength: (max) => (value) => {
    if (!value) return null;
    if (value.length > max) {
      return `Maximum ${max} caractères autorisés`;
    }
    return null;
  },
  
  password: (value) => {
    if (!value) return null;
    if (value.length < 8) {
      return 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (!/(?=.*[a-z])/.test(value)) {
      return 'Le mot de passe doit contenir au moins une minuscule';
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      return 'Le mot de passe doit contenir au moins une majuscule';
    }
    if (!/(?=.*\d)/.test(value)) {
      return 'Le mot de passe doit contenir au moins un chiffre';
    }
    return null;
  },
  
  confirmPassword: (password) => (value) => {
    if (!value) return null;
    if (value !== password) {
      return 'Les mots de passe ne correspondent pas';
    }
    return null;
  }
};

export default useForm;
