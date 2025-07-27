import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Supprimer les avertissements React Router
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  const message = args[0];
  if (typeof message === 'string' && (
    message.includes('React Router Future Flag Warning') ||
    message.includes('v7_startTransition') ||
    message.includes('v7_relativeSplatPath')
  )) {
    return; // Ignorer les avertissements React Router
  }
  originalConsoleWarn.apply(console, args);
};

export default function CustomRouter({ children }) {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
} 