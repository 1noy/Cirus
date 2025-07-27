import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: 0 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log l'erreur pour debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Envoyer l'erreur à un service de monitoring (optionnel)
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error, errorInfo) => {
    // Ici on pourrait envoyer l'erreur à Sentry, LogRocket, etc.
    try {
      // Exemple d'envoi à un service de monitoring
      if (window.gtag) {
        window.gtag('event', 'exception', {
          description: error.toString(),
          fatal: true
        });
      }
    } catch (e) {
      console.warn('Failed to log error to service:', e);
    }
  };

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #23234a 0%, #181828 100%)',
          color: '#fff',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '500px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '32px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px'
            }}>
              🚨
            </div>
            
            <h1 style={{
              fontSize: '24px',
              marginBottom: '16px',
              color: '#ff6b6b'
            }}>
              Oups ! Quelque chose s'est mal passé
            </h1>
            
            <p style={{
              fontSize: '16px',
              marginBottom: '24px',
              opacity: 0.8,
              lineHeight: '1.5'
            }}>
              Une erreur inattendue s'est produite. Ne t'inquiète pas, 
              nous avons été notifiés et nous travaillons à la résoudre.
            </p>

            {this.state.retryCount < 3 && (
              <button
                onClick={this.handleRetry}
                style={{
                  background: 'linear-gradient(135deg, #1cc6ff 0%, #009fff 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginRight: '12px',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                Réessayer
              </button>
            )}

            <button
              onClick={this.handleReload}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Recharger la page
            </button>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{
                marginTop: '24px',
                textAlign: 'left',
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '8px',
                padding: '16px'
              }}>
                <summary style={{
                  cursor: 'pointer',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  Détails de l'erreur (Développement)
                </summary>
                <pre style={{
                  fontSize: '12px',
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 