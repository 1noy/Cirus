import React, { useEffect, useState, useCallback } from 'react';

const colors = {
  success: '#4caf50',
  error: '#f44336',
  info: '#2196f3',
  warning: '#ff9800',
};

export default function Toast({ open, message, severity = 'info', onClose }) {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (open) {
      const timer = setTimeout(() => {
        if (mounted && onClose) {
          onClose();
        }
      }, 3200);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [open, onClose, mounted]);

  const handleClose = useCallback(() => {
    if (mounted && onClose) {
      onClose();
    }
  }, [onClose, mounted]);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        right: 32,
        bottom: open ? 32 : -80,
        minWidth: 240,
        maxWidth: 360,
        background: colors[severity] || colors.info,
        color: '#fff',
        borderRadius: 12,
        boxShadow: '0 4px 24px #0003',
        padding: '16px 28px',
        fontSize: 17,
        fontWeight: 500,
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        zIndex: 9999,
        transition: 'all 0.4s cubic-bezier(.4,2,.6,1)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        transform: open ? 'translateY(0)' : 'translateY(20px)',
      }}
      role="alert"
      aria-live="polite"
    >
      <span style={{ fontSize: 22 }}>
        {severity === 'success' && '✔️'}
        {severity === 'error' && '❌'}
        {severity === 'info' && 'ℹ️'}
        {severity === 'warning' && '⚠️'}
      </span>
      <span>{message}</span>
      <button
        onClick={handleClose}
        aria-label="Fermer la notification"
        role="button"
        tabIndex={0}
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.8)',
          cursor: 'pointer',
          fontSize: '20px',
          marginLeft: '12px',
          padding: '4px',
          borderRadius: '4px',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#fff';
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = 'rgba(255, 255, 255, 0.8)';
          e.target.style.background = 'none';
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClose();
          }
        }}
      >
        ✕
      </button>
    </div>
  );
} 