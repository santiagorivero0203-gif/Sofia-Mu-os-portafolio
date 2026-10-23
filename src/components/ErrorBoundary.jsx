/**
 * @file ErrorBoundary.jsx
 * @description Límite de error de React con diseño refinado acorde a la estética del portafolio.
 * Captura excepciones imprevistas en el árbol de componentes y ofrece una acción de recuperación.
 */

import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[Portfolio ErrorBoundary]:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0b0c10',
            color: '#f5f4f0',
            padding: '2rem',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              maxWidth: '520px',
              padding: '2.5rem',
              borderRadius: '24px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)'
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#f87171',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}
            >
              <AlertTriangle size={28} />
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: '1.75rem',
                marginBottom: '0.75rem',
                fontWeight: 500
              }}
            >
              Interrupción Temporal
            </h2>

            <p
              style={{
                fontSize: '0.95rem',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.6,
                marginBottom: '2rem'
              }}
            >
              Ha ocurrido un detalle inesperado al procesar la vista. Puedes reiniciar la interfaz de forma segura.
            </p>

            <button
              onClick={this.handleReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.8rem 1.75rem',
                borderRadius: '9999px',
                backgroundColor: '#d4af37',
                color: '#000',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={16} />
              <span>Restablecer Portafolio</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
