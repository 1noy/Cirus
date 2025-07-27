import React from 'react';

// Spinner de chargement principal
export const LoadingSpinner = ({ size = 40, color = '#1cc6ff' }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #23234a 0%, #181828 100%)'
  }}>
    <div style={{
      width: size,
      height: size,
      border: `3px solid rgba(255, 255, 255, 0.1)`,
      borderTop: `3px solid ${color}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      position: 'relative'
    }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

// Skeleton loader pour les messages
export const MessageSkeleton = () => (
  <div style={{
    display: 'flex',
    marginBottom: '12px',
    padding: '0 16px',
    animation: 'pulse 1.5s ease-in-out infinite'
  }}>
    <div style={{
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
      marginRight: '12px',
      flexShrink: 0
    }} />
    <div style={{ flex: 1 }}>
      <div style={{
        height: '16px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        marginBottom: '8px',
        width: '60%'
      }} />
      <div style={{
        height: '12px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '6px',
        width: '40%'
      }} />
    </div>
    <style>{`
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `}</style>
  </div>
);

// Skeleton pour la liste des contacts
export const ContactSkeleton = () => (
  <div style={{
    padding: '12px 16px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    animation: 'pulse 1.5s ease-in-out infinite'
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        marginRight: '12px',
        flexShrink: 0
      }} />
      <div style={{ flex: 1 }}>
        <div style={{
          height: '16px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          marginBottom: '6px',
          width: '70%'
        }} />
        <div style={{
          height: '12px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '6px',
          width: '50%'
        }} />
      </div>
    </div>
  </div>
);

// Loading pour les composants lazy
export const LazyLoadingSpinner = ({ message = 'Chargement...' }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    color: '#fff',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    margin: '20px'
  }}>
    <div style={{
      width: '32px',
      height: '32px',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      borderTop: '2px solid #1cc6ff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '12px'
    }} />
    <div style={{
      fontSize: '14px',
      opacity: 0.8,
      textAlign: 'center'
    }}>
      {message}
    </div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Loading pour les actions (boutons, etc.)
export const ActionLoadingSpinner = ({ size = 16, color = '#fff' }) => (
  <div style={{
    width: size,
    height: size,
    border: `2px solid rgba(255, 255, 255, 0.2)`,
    borderTop: `2px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    display: 'inline-block'
  }}>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Loading pour les images
export const ImageSkeleton = ({ width = 100, height = 100, borderRadius = '8px' }) => (
  <div style={{
    width,
    height,
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius,
    animation: 'pulse 1.5s ease-in-out infinite',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <div style={{
      fontSize: '24px',
      opacity: 0.5
    }}>
      📷
    </div>
  </div>
);

// Loading pour les formulaires
export const FormSkeleton = () => (
  <div style={{
    padding: '20px',
    animation: 'pulse 1.5s ease-in-out infinite'
  }}>
    <div style={{
      height: '20px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '4px',
      marginBottom: '16px',
      width: '40%'
    }} />
    <div style={{
      height: '48px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      marginBottom: '16px'
    }} />
    <div style={{
      height: '20px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '4px',
      marginBottom: '16px',
      width: '30%'
    }} />
    <div style={{
      height: '48px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      marginBottom: '24px'
    }} />
    <div style={{
      height: '48px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      width: '100%'
    }} />
  </div>
);

// Hook pour gérer les états de loading
export const useLoadingState = (initialState = false) => {
  const [loading, setLoading] = React.useState(initialState);
  const [error, setError] = React.useState(null);

  const startLoading = React.useCallback(() => {
    setLoading(true);
    setError(null);
  }, []);

  const stopLoading = React.useCallback(() => {
    setLoading(false);
  }, []);

  const setLoadingError = React.useCallback((error) => {
    setLoading(false);
    setError(error);
  }, []);

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setLoadingError
  };
}; 