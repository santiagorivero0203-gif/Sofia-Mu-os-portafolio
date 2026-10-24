/**
 * @file ErrorBoundary.jsx
 * @description Límite de error de React acorde a la paleta Azul Pastel Claro y Amarillo Cálido.
 */

import React from 'react';
import { RefreshCw, AlertTriangle } from './Icons';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[Portfolio ErrorBoundary]:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
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
            backgroundColor: '#d9eafa',
            color: '#142c4c',
            padding: '2rem',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              maxWidth: '480px',
              padding: '2.25rem',
              borderRadius: '28px',
              backgroundColor: '#ffffff',
              boxShadow: '0 20px 50px rgba(20, 44, 76, 0.12)'
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: '#ffe047',
                color: '#142c4c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}
            >
              <AlertTriangle size={24} />
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: '1.6rem',
                marginBottom: '0.6rem',
                fontWeight: 600
              }}
            >
              Recarga necesaria
            </h2>

            <p
              style={{
                fontSize: '0.94rem',
                color: '#345278',
                lineHeight: 1.6,
                marginBottom: '1.5rem'
              }}
            >
              Ocurrió un inconveniente temporal al mostrar la vista. Haz clic abajo para recargar la página.
            </p>

            <button
              onClick={this.handleReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                backgroundColor: '#ffe047',
                color: '#142c4c',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={16} />
              <span>Recargar Portafolio</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
