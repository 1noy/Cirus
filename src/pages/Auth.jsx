import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { auth, googleProvider } from '../utils/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { ensureUserDoc } from '../features/users/userService';

const AuthPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAppStore();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (mode === 'login') {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        setUser({ uid: user.uid, email: user.email, displayName: user.displayName || 'Utilisateur', photoURL: user.photoURL || null });
        await ensureUserDoc(user);
      } else {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        setUser({ uid: user.uid, email: user.email, displayName: user.displayName || 'Utilisateur', photoURL: user.photoURL || null });
        await ensureUserDoc(user);
      }
      navigate('/');
    } catch (e) {
      setError('Échec de l\'authentification');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      setUser({ uid: user.uid, email: user.email, displayName: user.displayName || 'Utilisateur', photoURL: user.photoURL || null });
      await ensureUserDoc(user);
      navigate('/');
    } catch (e) {
      setError('Google Sign-in échoué');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="facebook-auth-page">
      <div className="facebook-auth-container">
        <div className="facebook-hero">
          <h1 className="facebook-logo">ciruschat</h1>
          <h2>Connectez-vous pour rester en contact avec vos amis et communautés.</h2>
        </div>

        <div className="facebook-form-container">
          <div className="auth-tabs" role="tablist" aria-label="Modes d'authentification">
            <button className={`auth-tab ${mode === 'login' ? 'active' : ''}`} onClick={() => setMode('login')} role="tab" aria-selected={mode==='login'}>Connexion</button>
            <button className={`auth-tab ${mode === 'register' ? 'active' : ''}`} onClick={() => setMode('register')} role="tab" aria-selected={mode==='register'}>Inscription</button>
          </div>

          <form className="facebook-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Adresse e-mail</label>
              <div className="form-input">
                <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemple.com" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <div className="form-input password-input">
                <input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Votre mot de passe" required />
              </div>
            </div>

            {error && <div className="error-text" role="alert">{error}</div>}

            <div className="auth-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Chargement…' : (mode === 'login' ? 'Se connecter' : 'Créer un compte')}
              </button>
              <div className="divider"><span>ou</span></div>
              <button type="button" className="btn btn-google" onClick={handleGoogle} disabled={loading}>
                <i className="fab fa-google"></i>
                Continuer avec Google
              </button>
            </div>
          </form>

          <a className="forgot-link" href="#">Mot de passe oublié ?</a>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;


