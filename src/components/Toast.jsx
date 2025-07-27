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
        style={{
          marginLeft: 'auto',
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: 22,
          cursor: 'pointer',
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = '0.8';
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = '1';
        }}
        aria-label="Fermer la notification"
      >
        ×
      </button>
    </div>
  );
} 