import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';
import { setDoc, doc } from 'firebase/firestore';
import { db, auth } from '../utils/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';

export default function LoginRegister({ mode = 'login' }) {
  const [tab, setTab] = useState(mode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  const handleGoogleSignIn = async () => {
    if (!mounted) return;

    setLoadingGoogle(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Créer ou mettre à jour le profil utilisateur
      await setDoc(doc(db, 'users', user.uid), {
        displayName: user.displayName || user.email.split('@')[0],
        email: user.email,
        avatar: user.photoURL || '',
        bio: '',
        phone: '',
        location: '',
        website: '',
        createdAt: new Date().toISOString(),
        online: true
      }, { merge: true });

      if (mounted) {
        navigate('/chat');
        showToast({ message: 'Connexion Google réussie !', severity: 'success' });
      }
    } catch (e) {
      if (mounted) {
        setLoadingGoogle(false);
        let msg = 'Erreur lors de la connexion Google';
        if (e.code === 'auth/popup-closed-by-user') {
          msg = 'Connexion annulée';
        } else if (e.code === 'auth/popup-blocked') {
          msg = 'Popup bloqué. Autorisez les popups pour ce site.';
        }
        showToast({ message: msg, severity: 'error' });
      }
    } finally {
      if (mounted) {
        setLoadingGoogle(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mounted) return;

    // Validation des champs
    if (!email.trim()) {
      showToast({ message: 'Veuillez entrer votre email', severity: 'error' });
      return;
    }

    if (!password.trim()) {
      showToast({ message: 'Veuillez entrer votre mot de passe', severity: 'error' });
      return;
    }

    setLoadingAuth(true);
    try {
      let userCred = null;
      if (tab === 'login') {
        userCred = await signInWithEmailAndPassword(auth, email.trim(), password);
      } else {
        userCred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      }

      const user = userCred?.user || auth.currentUser;
      if (!user) {
        if (mounted) {
          setLoadingAuth(false);
          showToast({ message: 'Erreur d\'authentification, réessaie.', severity: 'error' });
        }
        return;
      }

      // Créer ou mettre à jour le profil utilisateur
      if (tab === 'register') {
        await setDoc(doc(db, 'users', user.uid), {
          displayName: user.displayName || email.split('@')[0],
          email: user.email,
          avatar: '',
          bio: '',
          phone: '',
          location: '',
          website: '',
          createdAt: new Date().toISOString(),
          online: true
        });
      } else {
        // Pour la connexion, juste mettre à jour le statut en ligne
        await setDoc(doc(db, 'users', user.uid), {
          online: true,
          lastSeen: new Date().toISOString()
        }, { merge: true });
      }

      if (mounted) {
        navigate('/chat');
        showToast({ message: tab === 'login' ? 'Connexion réussie !' : 'Inscription réussie !', severity: 'success' });
      }
    } catch (e) {
      if (mounted) {
        setLoadingAuth(false);
        let msg = 'Une erreur est survenue';

        if (e.code) {
          switch (e.code) {
            case 'auth/email-already-in-use':
              msg = "Cet email est déjà utilisé. Essayez de vous connecter à la place.";
              break;
            case 'auth/invalid-email':
              msg = "L'email n'est pas valide. Vérifiez le format.";
              break;
            case 'auth/weak-password':
              msg = "Le mot de passe doit faire au moins 6 caractères.";
              break;
            case 'auth/wrong-password':
              msg = "Mot de passe incorrect. Vérifiez votre saisie.";
              break;
            case 'auth/user-not-found':
              msg = "Aucun compte trouvé avec cet email. Créez un compte d'abord.";
              break;
            case 'auth/invalid-credential':
              msg = "Email ou mot de passe incorrect. Vérifiez vos identifiants.";
              break;
            case 'auth/too-many-requests':
              msg = "Trop de tentatives. Attendez quelques minutes avant de réessayer.";
              break;
            case 'auth/network-request-failed':
              msg = "Erreur de connexion. Vérifiez votre internet.";
              break;
            default:
              msg = `Erreur: ${e.code}`;
          }
        } else if (e.message) {
          msg = e.message;
        }

        showToast({ message: msg, severity: 'error' });
      }
      return;
    }

    if (mounted) {
      setLoadingAuth(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      showToast({ message: "Entre d'abord ton email pour réinitialiser.", severity: 'error' });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      showToast({ message: 'Email de réinitialisation envoyé ! Vérifiez votre boîte mail.', severity: 'success' });
    } catch (e) {
      let msg = 'Erreur lors de l\'envoi';
      if (e.code === 'auth/user-not-found') {
        msg = "Aucun compte trouvé avec cet email.";
      } else if (e.code === 'auth/invalid-email') {
        msg = "L'email n'est pas valide.";
      } else if (e.code === 'auth/too-many-requests') {
        msg = "Trop de demandes. Attendez quelques minutes.";
      }
      showToast({ message: msg, severity: 'error' });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #23234a 0%, #181828 100%)',
      color: '#fff',
      padding: window.innerWidth <= 768 ? '16px' : '32px'
    }}>
      <div style={{
        maxWidth: window.innerWidth <= 768 ? '100%' : 420,
        width: '100%',
        background: 'linear-gradient(135deg, #23234a 0%, #181828 100%)',
        borderRadius: window.innerWidth <= 768 ? 16 : 24,
        boxShadow: '0 8px 48px #1cc6ff33',
        padding: window.innerWidth <= 768 ? 20 : 32,
        marginTop: window.innerWidth <= 768 ? 16 : 32,
        border: '1.5px solid #3ef2ff44'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: window.innerWidth <= 768 ? 24 : 32,
          flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
          gap: window.innerWidth <= 768 ? 8 : 0
        }}>
          <button
            onClick={() => setTab('login')}
            style={{
              flex: 1,
              padding: window.innerWidth <= 768 ? '12px 0' : '14px 0',
              fontSize: window.innerWidth <= 768 ? 18 : 22,
              fontWeight: 700,
              border: 'none',
              borderRadius: window.innerWidth <= 768 ? '16px' : '32px 0 0 32px',
              background: tab === 'login' ? 'linear-gradient(90deg, #1cc6ff 0%, #009fff 100%)' : 'transparent',
              color: tab === 'login' ? '#fff' : '#a0f0ff',
              boxShadow: tab === 'login' ? '0 2px 16px #1cc6ff44' : 'none',
              cursor: 'pointer',
              outline: 'none',
              transition: 'background 0.2s',
            }}
          >
            Connexion
          </button>
          <button
            onClick={() => setTab('register')}
            style={{
              flex: 1,
              padding: window.innerWidth <= 768 ? '12px 0' : '14px 0',
              fontSize: window.innerWidth <= 768 ? 18 : 22,
              fontWeight: 700,
              border: 'none',
              borderRadius: window.innerWidth <= 768 ? '16px' : '0 32px 32px 0',
              background: tab === 'register' ? 'linear-gradient(90deg, #fc5c7d 0%, #6a82fb 100%)' : 'transparent',
              color: tab === 'register' ? '#fff' : '#a0f0ff',
              boxShadow: tab === 'register' ? '0 2px 16px #fc5c7d44' : 'none',
              cursor: 'pointer',
              outline: 'none',
              transition: 'background 0.2s',
            }}
          >
            Inscription
          </button>
        </div>

        {/* Bouton Google */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loadingGoogle}
          style={{
            width: '100%',
            padding: window.innerWidth <= 768 ? '12px 0' : '14px 0',
            fontSize: window.innerWidth <= 768 ? 16 : 18,
            fontWeight: 600,
            border: 'none',
            borderRadius: window.innerWidth <= 768 ? 10 : 12,
            background: 'linear-gradient(90deg, #4285f4 0%, #34a853 100%)',
            color: '#fff',
            cursor: loadingGoogle ? 'not-allowed' : 'pointer',
            marginBottom: window.innerWidth <= 768 ? 20 : 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: window.innerWidth <= 768 ? 8 : 12,
            opacity: loadingGoogle ? 0.7 : 1,
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(66, 133, 244, 0.3)'
          }}
          onMouseEnter={(e) => {
            if (!loadingGoogle) {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(66, 133, 244, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(66, 133, 244, 0.3)';
          }}
        >
          <span style={{ fontSize: window.innerWidth <= 768 ? 18 : 20 }}>🔍</span>
          {loadingGoogle ? 'Connexion...' : 'Continuer avec Google'}
        </button>

        <div style={{
          textAlign: 'center',
          marginBottom: window.innerWidth <= 768 ? 20 : 24,
          color: '#a0f0ff',
          fontSize: window.innerWidth <= 768 ? 12 : 14,
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            background: 'rgba(160, 240, 255, 0.3)'
          }} />
          <span style={{
            background: 'linear-gradient(135deg, #23234a 0%, #181828 100%)',
            padding: '0 16px',
            position: 'relative',
            zIndex: 1
          }}>
            ou
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: window.innerWidth <= 768 ? 20 : 24 }}>
            <label style={{
              color: '#a0f0ff',
              fontWeight: 600,
              fontSize: window.innerWidth <= 768 ? 16 : 18,
              marginBottom: 8,
              display: 'block'
            }}>Adresse Email</label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#23234a',
              borderRadius: window.innerWidth <= 768 ? 10 : 12,
              padding: window.innerWidth <= 768 ? '10px 14px' : '8px 16px',
              marginBottom: 8
            }}>
              <span style={{
                color: '#a0f0ff',
                fontSize: window.innerWidth <= 768 ? 18 : 20,
                marginRight: 8
              }}>✉️</span>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.com"
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  color: '#f7f9fb',
                  fontSize: window.innerWidth <= 768 ? 16 : 18,
                  outline: 'none',
                  padding: 0,
                }}
                required
              />
            </div>
          </div>
          <div style={{ marginBottom: window.innerWidth <= 768 ? 12 : 16 }}>
            <label style={{
              color: '#a0f0ff',
              fontWeight: 600,
              fontSize: window.innerWidth <= 768 ? 16 : 18,
              marginBottom: 8,
              display: 'block'
            }}>Mot de passe</label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#23234a',
              borderRadius: window.innerWidth <= 768 ? 10 : 12,
              padding: window.innerWidth <= 768 ? '10px 14px' : '8px 16px'
            }}>
              <span style={{
                color: '#a0f0ff',
                fontSize: window.innerWidth <= 768 ? 18 : 20,
                marginRight: 8
              }}>🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  color: '#f7f9fb',
                  fontSize: window.innerWidth <= 768 ? 16 : 18,
                  outline: 'none',
                  padding: 0,
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#a0f0ff',
                  fontSize: window.innerWidth <= 768 ? 18 : 20,
                  cursor: 'pointer',
                  marginLeft: 8
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {tab === 'login' && (
              <div style={{ textAlign: 'right', marginTop: 8 }}>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#3ef2ff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: window.innerWidth <= 768 ? 14 : 16
                  }}
                  onClick={handleForgotPassword}
                >
                  Mot de passe oublié ?
                </button>
              </div>
            )}
          </div>
          {loadingAuth && (
            <div style={{
              color: '#3ef2ff',
              fontWeight: 700,
              fontSize: window.innerWidth <= 768 ? 16 : 18,
              textAlign: 'center',
              marginBottom: window.innerWidth <= 768 ? 12 : 16
            }}>
              {tab === 'login' ? 'Connexion en cours…' : 'Inscription en cours…'}
            </div>
          )}
          <button
            type="submit"
            disabled={loadingAuth}
            style={{
              width: '100%',
              padding: window.innerWidth <= 768 ? '12px 0' : '14px 0',
              fontSize: window.innerWidth <= 768 ? 18 : 22,
              fontWeight: 700,
              border: 'none',
              borderRadius: window.innerWidth <= 768 ? 12 : 16,
              background: tab === 'login'
                ? 'linear-gradient(90deg, #1cc6ff 0%, #009fff 100%)'
                : 'linear-gradient(90deg, #fc5c7d 0%, #6a82fb 100%)',
              color: '#fff',
              boxShadow: '0 2px 16px #1cc6ff44',
              cursor: loadingAuth ? 'not-allowed' : 'pointer',
              outline: 'none',
              marginTop: window.innerWidth <= 768 ? 12 : 16,
              transition: 'all 0.2s',
              opacity: loadingAuth ? 0.7 : 1,
            }}
          >
            {tab === 'login' ? 'Se connecter' : 'S\'inscrire'}
          </button>
          {!loadingAuth && retry > 0 && (
            <button
              type="button"
              onClick={() => {
                setRetry(r => r + 1);
                handleSubmit(new Event('submit'));
              }}
              style={{
                background: 'linear-gradient(90deg, #3ef2ff 0%, #2196f3 100%)',
                color: '#23234a',
                border: 'none',
                borderRadius: 8,
                padding: window.innerWidth <= 768 ? '8px 20px' : '10px 28px',
                fontSize: window.innerWidth <= 768 ? 15 : 17,
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: 12
              }}
            >
              Réessayer
            </button>
          )}
        </form>
      </div>
    </div>
  );
} 