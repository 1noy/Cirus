import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();
  
  const handleGoHome = () => {
    try {
      navigate('/');
    } catch (error) {
      window.location.href = '/';
    }
  };

  const handleGoBack = () => {
    try {
      navigate(-1);
    } catch (error) {
      window.history.back();
    }
  };

  const handleRetry = () => {
    try {
      resetErrorBoundary();
    } catch (error) {
      window.location.reload();
    }
  };

  // S'assurer que les messages d'erreur sont des chaînes
  const errorMessage = error?.message || 'Erreur inconnue';
  const errorStack = error?.stack || '';

  return (
    <div className="error-fallback">
      <div className="error-container">
        <div className="error-icon">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        
        <h1 className="error-title">Oups ! Quelque chose s'est mal passé</h1>
        
        <p className="error-message">
          Une erreur inattendue s'est produite. Ne vous inquiétez pas, nous travaillons pour résoudre ce problème.
        </p>

        <div className="error-details">
          <details>
            <summary>Détails techniques</summary>
            <div className="error-stack">
              <strong>Message d'erreur :</strong>
              <pre>{errorMessage}</pre>
              
              {errorStack && (
                <>
                  <strong>Stack trace :</strong>
                  <pre>{errorStack}</pre>
                </>
              )}
            </div>
          </details>
        </div>

        <div className="error-actions">
          <button onClick={handleRetry} className="btn btn-primary">
            <i className="fas fa-redo"></i>
            Réessayer
          </button>
          
          <button onClick={handleGoHome} className="btn btn-secondary">
            <i className="fas fa-home"></i>
            Accueil
          </button>
          
          <button onClick={handleGoBack} className="btn btn-outline">
            <i className="fas fa-arrow-left"></i>
            Retour
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
