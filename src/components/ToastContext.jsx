import React, { createContext, useContext } from 'react';
import toast from 'react-hot-toast';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const showToast = (message, type = 'default') => {
    switch (type) {
      case 'success':
        toast.success(message, {
          duration: 4000,
          style: {
            background: '#00d4ff',
            color: '#000',
            border: '1px solid #00d4ff',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500'
          }
        });
        break;
      case 'error':
        toast.error(message, {
          duration: 5000,
          style: {
            background: '#ff4757',
            color: '#fff',
            border: '1px solid #ff4757',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500'
          }
        });
        break;
      case 'loading':
        toast.loading(message, {
          style: {
            background: '#ffa502',
            color: '#000',
            border: '1px solid #ffa502',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500'
          }
        });
        break;
      case 'info':
        toast(message, {
          duration: 3000,
          style: {
            background: '#3742fa',
            color: '#fff',
            border: '1px solid #3742fa',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500'
          }
        });
        break;
      case 'auto-added':
        toast.success(message, {
          duration: 6000,
          icon: '✨',
          style: {
            background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
            color: '#fff',
            border: '1px solid #ff6b35',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)'
          }
        });
        break;
      default:
        toast(message, {
          duration: 3000,
          style: {
            background: '#2f3542',
            color: '#fff',
            border: '1px solid #2f3542',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500'
          }
        });
    }
  };

  const showContactAdded = (contactName) => {
    showToast(`✅ ${contactName} ajouté à vos contacts`, 'success');
  };

  const showContactAutoAdded = (contactName) => {
    showToast(`✨ ${contactName} ajouté automatiquement à vos contacts`, 'auto-added');
  };

  const showMessageSent = () => {
    showToast('📤 Message envoyé', 'success');
  };

  const showMessageReceived = (senderName) => {
    showToast(`📥 Nouveau message de ${senderName}`, 'info');
  };

  const showError = (message) => {
    showToast(`❌ ${message}`, 'error');
  };

  const showLoading = (message) => {
    showToast(message, 'loading');
  };

  const value = {
    showToast,
    showContactAdded,
    showContactAutoAdded,
    showMessageSent,
    showMessageReceived,
    showError,
    showLoading
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};
