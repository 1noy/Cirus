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
              msg = "Cet email est déjà utilisé. Connecte-toi à la place.";
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
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #181828 0%, #23234a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: window.innerWidth <= 768 ? '16px' : '40px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        borderRadius: window.innerWidth <= 768 ? '16px' : '24px',
        padding: window.innerWidth <= 768 ? '24px' : '40px',
        width: '100%',
        maxWidth: window.innerWidth <= 768 ? '100%' : '400px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#1cc6ff',
          fontSize: window.innerWidth <= 768 ? '24px' : '32px',
          fontWeight: '800',
          marginBottom: window.innerWidth <= 768 ? '20px' : '32px'
        }}>
          Cirus Chat
        </h1>
        
        {/* Onglets */}
        <div style={{
          display: 'flex',
          marginBottom: window.innerWidth <= 768 ? '20px' : '24px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: window.innerWidth <= 768 ? '12px' : '16px',
          padding: '4px'
        }}>
          <button
            type="button"
            onClick={() => setTab('login')}
            aria-label="Se connecter"
            role="tab"
            aria-selected={tab === 'login'}
            tabIndex={tab === 'login' ? 0 : -1}
            style={{
              flex: 1,
              padding: window.innerWidth <= 768 ? '10px 16px' : '12px 24px',
              border: 'none',
              borderRadius: window.innerWidth <= 768 ? '8px' : '12px',
              background: tab === 'login' 
                ? 'linear-gradient(135deg, #1cc6ff 0%, #009fff 100%)'
                : 'transparent',
              color: '#fff',
              fontSize: window.innerWidth <= 768 ? '14px' : '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minHeight: window.innerWidth <= 768 ? '44px' : 'auto'
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setTab('login');
              }
            }}
          >
            Connexion
          </button>
          
          <button
            type="button"
            onClick={() => setTab('register')}
            aria-label="S'inscrire"
            role="tab"
            aria-selected={tab === 'register'}
            tabIndex={tab === 'register' ? 0 : -1}
            style={{
              flex: 1,
              padding: window.innerWidth <= 768 ? '10px 16px' : '12px 24px',
              border: 'none',
              borderRadius: window.innerWidth <= 768 ? '8px' : '12px',
              background: tab === 'register' 
                ? 'linear-gradient(135deg, #1cc6ff 0%, #009fff 100%)'
                : 'transparent',
              color: '#fff',
              fontSize: window.innerWidth <= 768 ? '14px' : '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minHeight: window.innerWidth <= 768 ? '44px' : 'auto'
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setTab('register');
              }
            }}
          >
            Inscription
          </button>
        </div>
        
        {/* Formulaire */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: window.innerWidth <= 768 ? '16px' : '20px' }}>
          <div>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: window.innerWidth <= 768 ? '6px' : '8px',
              color: '#fff',
              fontSize: window.innerWidth <= 768 ? '14px' : '16px',
              fontWeight: '600'
            }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              aria-label="Adresse email"
              role="textbox"
              style={{
                width: '100%',
                padding: window.innerWidth <= 768 ? '12px 14px' : '12px 16px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: window.innerWidth <= 768 ? '12px' : '16px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: window.innerWidth <= 768 ? '14px' : '16px',
                outline: 'none',
                transition: 'all 0.2s ease',
                minHeight: window.innerWidth <= 768 ? '44px' : 'auto'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1cc6ff';
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            />
          </div>
          
          <div>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: window.innerWidth <= 768 ? '6px' : '8px',
              color: '#fff',
              fontSize: window.innerWidth <= 768 ? '14px' : '16px',
              fontWeight: '600'
            }}>
              Mot de passe
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Votre mot de passe"
                required
                aria-label="Mot de passe"
                role="textbox"
                style={{
                  width: '100%',
                  padding: window.innerWidth <= 768 ? '12px 14px' : '12px 16px',
                  paddingRight: window.innerWidth <= 768 ? '48px' : '48px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: window.innerWidth <= 768 ? '12px' : '16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontSize: window.innerWidth <= 768 ? '14px' : '16px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  minHeight: window.innerWidth <= 768 ? '44px' : 'auto'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#1cc6ff';
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                role="button"
                tabIndex={0}
                style={{
                  position: 'absolute',
                  right: window.innerWidth <= 768 ? '12px' : '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  fontSize: window.innerWidth <= 768 ? '16px' : '18px',
                  padding: '4px',
                  borderRadius: '4px',
                  transition: 'all 0.2s ease',
                  minWidth: window.innerWidth <= 768 ? '44px' : 'auto',
                  minHeight: window.innerWidth <= 768 ? '44px' : 'auto'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }
                }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loadingAuth}
            aria-label={tab === 'login' ? "Se connecter" : "S'inscrire"}
            role="button"
            tabIndex={0}
            style={{
              width: '100%',
              padding: window.innerWidth <= 768 ? '14px 20px' : '14px 24px',
              border: 'none',
              borderRadius: window.innerWidth <= 768 ? '12px' : '16px',
              background: 'linear-gradient(135deg, #1cc6ff 0%, #009fff 100%)',
              color: '#fff',
              fontSize: window.innerWidth <= 768 ? '16px' : '18px',
              fontWeight: '700',
              cursor: loadingAuth ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: loadingAuth ? 0.6 : 1,
              minHeight: window.innerWidth <= 768 ? '48px' : 'auto',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              if (!loadingAuth) {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 12px rgba(28, 198, 255, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !loadingAuth) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          >
            {loadingAuth ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '2px solid #fff',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                {tab === 'login' ? 'Connexion...' : 'Inscription...'}
              </div>
            ) : (
              tab === 'login' ? 'Se connecter' : "S'inscrire"
            )}
          </button>
          
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loadingAuth}
            aria-label="Se connecter avec Google"
            role="button"
            tabIndex={0}
            style={{
              width: '100%',
              padding: window.innerWidth <= 768 ? '14px 20px' : '14px 24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: window.innerWidth <= 768 ? '12px' : '16px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: window.innerWidth <= 768 ? '16px' : '18px',
              fontWeight: '600',
              cursor: loadingAuth ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: loadingAuth ? 0.6 : 1,
              minHeight: window.innerWidth <= 768 ? '48px' : 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              if (!loadingAuth) {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !loadingAuth) {
                e.preventDefault();
                handleGoogleSignIn();
              }
            }}
          >
            {loadingAuth ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '2px solid #fff',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Connexion...
              </div>
            ) : (
              <>
                <span style={{ fontSize: window.innerWidth <= 768 ? '18px' : '20px' }}>🔍</span>
                Se connecter avec Google
              </>
            )}
          </button>
          
          {tab === 'login' && (
            <button
              type="button"
              onClick={handleForgotPassword}
              aria-label="Mot de passe oublié"
              role="button"
              tabIndex={0}
              style={{
                background: 'none',
                border: 'none',
                color: '#1cc6ff',
                fontSize: window.innerWidth <= 768 ? '14px' : '16px',
                cursor: 'pointer',
                textDecoration: 'underline',
                transition: 'all 0.2s ease',
                padding: window.innerWidth <= 768 ? '8px' : '12px',
                minHeight: window.innerWidth <= 768 ? '44px' : 'auto'
              }}
              onMouseEnter={(e) => e.target.style.color = '#009fff'}
              onMouseLeave={(e) => e.target.style.color = '#1cc6ff'}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleForgotPassword();
                }
              }}
            >
              Mot de passe oublié ?
            </button>
          )}
        </form>
      </div>
    </div>
  );
} 