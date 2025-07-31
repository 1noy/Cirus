import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';
import { auth } from '../utils/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import { useAppStore } from '../store';

const CyberpunkLogin = () => {
  const [tab, setTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { showToast } = useToast();
  const { setUser, addUser } = useAppStore(); // Ajout de addUser

  useEffect(() => {
    createNeonCity();
  }, []);

  const createNeonCity = () => {
    const cityContainer = document.getElementById('particles-js');
    if (!cityContainer) return;

    // Créer la skyline avec des bâtiments sur toute la largeur
    const screenWidth = window.innerWidth;
    const buildingCount = Math.floor(screenWidth / 50); // Un bâtiment tous les 50px
    
    for (let i = 0; i < buildingCount; i++) {
      const building = document.createElement('div');
      building.className = 'building';
      
      const width = Math.random() * 60 + 30;
      const height = Math.random() * 150 + 80;
      const left = (i * 50) + Math.random() * 20;
      
      building.style.cssText = `
        width: ${width}px;
        height: ${height}px;
        left: ${left}px;
      `;
      
      // Ajouter des fenêtres néon
      const windowCount = Math.floor(height / 25);
      for (let j = 0; j < windowCount; j++) {
        const window = document.createElement('div');
        window.className = 'neon-window';
        
        const windowWidth = Math.random() * 6 + 3;
        const windowHeight = Math.random() * 6 + 3;
        const windowLeft = Math.random() * (width - windowWidth);
        const windowTop = j * 25 + Math.random() * 15;
        
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (tab === 'register') {
      if (!formData.displayName) {
        newErrors.displayName = 'Pseudo requis';
      } else if (formData.displayName.length < 3) {
        newErrors.displayName = 'Pseudo trop court (min 3 caractères)';
      } else if (formData.displayName.length > 20) {
        newErrors.displayName = 'Pseudo trop long (max 20 caractères)';
      }
      
      if (!formData.email) {
        newErrors.email = 'Email requis pour l\'inscription';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email invalide';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    } else {
      // Pour la connexion, l'email est requis
      if (!formData.email) {
        newErrors.email = 'Email requis';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email invalide';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mot de passe trop court';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoadingAuth(true);
    try {
      if (tab === 'login') {
        const userCredential = await signInWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        );
        
        // Ajouter l'utilisateur au store s'il n'existe pas déjà
        const userData = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName || 'Utilisateur',
          photoURL: userCredential.user.photoURL
        };
        addUser(userData);
        
        showToast('Connexion réussie !', 'success');
        navigate('/');
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        );
        
        // Mettre à jour le nom d'affichage
        await userCredential.user.updateProfile({
          displayName: formData.displayName
        });
        
        // Ajouter le nouvel utilisateur au store
        const newUserData = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: formData.displayName,
          photoURL: userCredential.user.photoURL
        };
        addUser(newUserData);
        
        showToast('Compte créé avec succès !', 'success');
        navigate('/');
      }
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      let errorMessage = 'Une erreur est survenue';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Utilisateur non trouvé';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Mot de passe incorrect';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'Cet email est déjà utilisé';
          break;
        case 'auth/weak-password':
          errorMessage = 'Le mot de passe est trop faible';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email invalide';
          break;
      }
      
      showToast(errorMessage, 'error');
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoadingGoogle(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Ajouter l'utilisateur Google au store
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || 'Utilisateur',
        photoURL: result.user.photoURL
      };
      addUser(userData);
      
      showToast('Connexion Google réussie !', 'success');
      navigate('/');
    } catch (error) {
      console.error('Erreur Google:', error);
      showToast('Erreur lors de la connexion Google', 'error');
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      showToast('Veuillez entrer votre email', 'error');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, formData.email);
      showToast('Email de réinitialisation envoyé !', 'success');
    } catch (error) {
      console.error('Erreur reset password:', error);
      showToast('Erreur lors de l\'envoi de l\'email', 'error');
    }
  };

  return (
    <div className="cyberpunk-login">
      {/* Neon City Skyline Background */}
      <div id="particles-js" className="neon-city">
        <div className="city-skyline"></div>
      </div>
      
      {/* Grille cyberpunk */}
      <div className="cyber-grid"></div>
      
      {/* Ligne de scan */}
      <div className="scan-line"></div>

      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="cyber-title">CirusChat</h1>
        <p className="cyber-subtitle">
          {tab === 'login' ? 'Connexion à votre compte' : 'Créer un nouveau compte'}
        </p>

        {/* Onglets */}
        <div className="cyber-tabs">
          <button
            className={`cyber-tab ${tab === 'login' ? 'active' : ''}`}
            onClick={() => setTab('login')}
          >
            Connexion
          </button>
          <button
            className={`cyber-tab ${tab === 'register' ? 'active' : ''}`}
            onClick={() => setTab('register')}
          >
            Inscription
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="cyber-form">
          <AnimatePresence mode="wait">
            {tab === 'register' && (
              <motion.div
                key="displayName"
                className="cyber-form-group"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="cyber-label">Pseudo</label>
                <div className="cyber-input-container">
                  <i className="fas fa-user cyber-input-icon"></i>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    className={`cyber-input ${errors.displayName ? 'error' : ''}`}
                    placeholder="Choisissez votre pseudo"
                    autoFocus
                  />
                </div>
                {errors.displayName && <div className="cyber-error">{errors.displayName}</div>}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="cyber-form-group">
            <label className="cyber-label">Email (optionnel)</label>
            <div className="cyber-input-container">
              <i className="fas fa-envelope cyber-input-icon"></i>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`cyber-input ${errors.email ? 'error' : ''}`}
                placeholder="votre@email.com (pour la connexion)"
              />
            </div>
            {errors.email && <div className="cyber-error">{errors.email}</div>}
          </div>

          <div className="cyber-form-group">
            <label className="cyber-label">Mot de passe</label>
            <div className="cyber-input-container">
              <i className="fas fa-lock cyber-input-icon"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`cyber-input ${errors.password ? 'error' : ''}`}
                placeholder="Votre mot de passe"
              />
              <button
                type="button"
                className="cyber-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {errors.password && <div className="cyber-error">{errors.password}</div>}
          </div>

          <AnimatePresence mode="wait">
            {tab === 'register' && (
              <motion.div
                key="confirmPassword"
                className="cyber-form-group"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="cyber-label">Confirmer le mot de passe</label>
                <div className="cyber-input-container">
                  <i className="fas fa-lock cyber-input-icon"></i>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`cyber-input ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirmez votre mot de passe"
                  />
                  <button
                    type="button"
                    className="cyber-password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {errors.confirmPassword && <div className="cyber-error">{errors.confirmPassword}</div>}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loadingAuth}
          >
            {loadingAuth ? (
              <span>
                <i className="fas fa-spinner fa-spin"></i> Chargement...
              </span>
            ) : (
              tab === 'login' ? 'Se connecter' : 'Créer un compte'
            )}
          </button>
        </form>

        {/* Séparateur */}
        <div className="cyber-divider">
          <span>ou</span>
        </div>

        {/* Connexion Google */}
        <button
          className="btn btn-secondary btn-lg"
          onClick={handleGoogleSignIn}
          disabled={loadingGoogle}
        >
          <i className="fab fa-google"></i>
          {loadingGoogle ? 'Connexion...' : 'Continuer avec Google'}
        </button>

        {/* Lien mot de passe oublié */}
        {tab === 'login' && (
          <button
            type="button"
            className="cyber-forgot-link"
            onClick={handleForgotPassword}
          >
            Mot de passe oublié ?
          </button>
        )}

        {/* Footer */}
        <div className="cyber-footer">
          <span className="cyber-footer-text">
            {tab === 'login' ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
          </span>
          <button
            className="cyber-footer-link"
            onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
          >
            {tab === 'login' ? 'S\'inscrire' : 'Se connecter'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CyberpunkLogin; 