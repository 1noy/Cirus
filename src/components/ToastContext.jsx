import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import Toast from './Toast';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  const showToast = useCallback(({ message, severity = 'info' }) => {
    if (mounted) {
      setToast({ open: true, message, severity });
    }
  }, [mounted]);

  const handleClose = useCallback(() => {
    if (mounted) {
      setToast(t => ({ ...t, open: false }));
    }
  }, [mounted]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast 
        open={toast.open} 
        message={toast.message} 
        severity={toast.severity} 
        onClose={handleClose} 
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
} 