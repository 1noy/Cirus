import React from 'react';
import { useToast } from './ToastContext';

export default function Settings({ open, onClose, onThemeChange, theme }) {
  const { showToast } = useToast();
  if (!open) return null;
  const handleTheme = () => {
    onThemeChange();
    showToast({ message: 'Thème activé !', severity: 'info' });
  };
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(30,34,60,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#23234a', borderRadius: 18, padding: 36, minWidth: 340, boxShadow: '0 8px 32px #0008',
        color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <h2 style={{ margin: 0, marginBottom: 18, color: '#3ef2ff', fontWeight: 800 }}>Paramètres</h2>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontWeight: 600, fontSize: 18, marginRight: 12 }}>Thème :</label>
          <button
            onClick={handleTheme}
            style={{
              padding: '8px 24px', borderRadius: 12, border: 'none',
              background: theme === 'dark'
                ? 'linear-gradient(90deg, #1cc6ff 0%, #009fff 100%)'
                : 'linear-gradient(90deg, #fc5c7d 0%, #6a82fb 100%)',
              color: '#fff', fontWeight: 700, fontSize: 16, cursor: 'pointer'
            }}
          >
            {theme === 'dark' ? 'Sombre' : 'Clair'}
          </button>
        </div>
        <button
          onClick={onClose}
          style={{
            marginTop: 12, padding: '10px 32px', borderRadius: 12, border: 'none',
            background: '#3ef2ff', color: '#23234a', fontWeight: 700, fontSize: 18, cursor: 'pointer'
          }}
        >
          Fermer
        </button>
      </div>
    </div>
  );
} 