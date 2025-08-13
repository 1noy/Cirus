import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { auth, googleProvider } from '../utils/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
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
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'Utilisateur',
          photoURL: user.photoURL || null,
        });
        await ensureUserDoc(user);
      } else {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'Utilisateur',
          photoURL: user.photoURL || null,
        });
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
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Utilisateur',
        photoURL: user.photoURL || null,
      });
      await ensureUserDoc(user);
      navigate('/');
    } catch (e) {
      setError('Google Sign-in échoué');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 380, margin: '10vh auto', padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>Connexion</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => setMode('login')} disabled={mode === 'login'}>Se connecter</button>
        <button onClick={() => setMode('register')} disabled={mode === 'register'}>Créer un compte</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 8 }}
        />
        {error && <div style={{ color: 'tomato', marginBottom: 8 }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? '...' : mode === 'login' ? 'Se connecter' : 'Créer un compte'}
        </button>
      </form>
      <div style={{ height: 12 }} />
      <button onClick={handleGoogle} disabled={loading} style={{ width: '100%' }}>
        Continuer avec Google
      </button>
    </div>
  );
};

export default AuthPage;


