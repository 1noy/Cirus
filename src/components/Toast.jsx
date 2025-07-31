import React, { useEffect, useState, useCallback } from 'react';

const severityConfig = {
  success: {
    icon: '✅',
    color: '#10b981',
    bgColor: '#ecfdf5',
    borderColor: '#10b981',
    textColor: '#065f46',
  },
  error: {
    icon: '❌',
    color: '#ef4444',
    bgColor: '#fef2f2',
    borderColor: '#ef4444',
    textColor: '#991b1b',
  },
  warning: {
    icon: '⚠️',
    color: '#f59e0b',
    bgColor: '#fffbeb',
    borderColor: '#f59e0b',
    textColor: '#92400e',
  },
  info: {
    icon: 'ℹ️',
    color: '#3b82f6',
    bgColor: '#eff6ff',
    borderColor: '#3b82f6',
    textColor: '#1e40af',
  },
  loading: {
    icon: '⏳',
    color: '#8b5cf6',
    bgColor: '#f3f4f6',
    borderColor: '#8b5cf6',
    textColor: '#5b21b6',
  },
};

export default function Toast({
  id,
  message,
  severity = 'info',
  action,
  onClose,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const config = severityConfig[severity] || severityConfig.info;

  useEffect(() => {
    // Animation d'entrée
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleAction = useCallback(() => {
    if (action && action.onClick) {
      action.onClick();
      handleClose();
    }
  }, [action, handleClose]);

  return (
    <div
      className={`toast ${isVisible ? 'toast-visible' : ''} ${isExiting ? 'toast-exiting' : ''}`}
      style={{
        backgroundColor: config.bgColor,
        border: `1px solid ${config.borderColor}`,
        color: config.textColor,
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '12px',
        boxShadow:
          '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        minWidth: '300px',
        maxWidth: '400px',
        transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
      }}
      role="alert"
      aria-live="polite"
      aria-describedby={`toast-message-${id}`}
    >
      {/* Icône */}
      <div
        style={{
          fontSize: '20px',
          flexShrink: 0,
          animation:
            severity === 'loading' ? 'spin 1s linear infinite' : 'none',
        }}
      >
        {config.icon}
      </div>

      {/* Contenu */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          id={`toast-message-${id}`}
          style={{
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: '1.4',
            wordBreak: 'break-word',
          }}
        >
          {message}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {action && (
          <button
            onClick={handleAction}
            style={{
              background: 'none',
              border: 'none',
              color: config.color,
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '6px',
              transition: 'background-color 0.2s ease',
              textDecoration: 'underline',
            }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = `${config.color}20`;
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = 'transparent';
            }}
            aria-label={action.label || 'Action'}
          >
            {action.label}
          </button>
        )}

        {/* Bouton fermer */}
        <button
          onClick={handleClose}
          style={{
            background: 'none',
            border: 'none',
            color: config.textColor,
            fontSize: '16px',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            transition: 'background-color 0.2s ease',
            opacity: 0.7,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={e => {
            e.target.style.backgroundColor = `${config.color}20`;
            e.target.style.opacity = '1';
          }}
          onMouseLeave={e => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.opacity = '0.7';
          }}
          aria-label="Fermer la notification"
        >
          ✕
        </button>
      </div>

      {/* Barre de progression pour les toasts non-persistants */}
      {severity !== 'loading' && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '3px',
            backgroundColor: config.color,
            width: '100%',
            transformOrigin: 'left',
            animation: 'toast-progress 4s linear forwards',
          }}
        />
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes toast-progress {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
}
