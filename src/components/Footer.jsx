/**
 * @file Footer.jsx
 * @description Pie de página minimalista con créditos editoriales, hora oficial y control de retorno inercial.
 */

import React from 'react';
import { ArrowUp, FileDown } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { personalInfo } from '../data/portfolioData';

export const Footer = ({ lenisInstance }) => {
  const { sound, caracasTime, openPdfModal, trackEvent } = usePortfolio();

  const scrollToTop = () => {
    sound.playClick();
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePdfClick = () => {
    sound.playModalOpen();
    trackEvent('pdf_modal_open', { origin: 'footer' });
    openPdfModal();
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '3rem 0',
        backgroundColor: 'var(--bg-primary)'
      }}
    >
      <div className="site-container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem'
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600 }}>
              {personalInfo.name}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              © {new Date().getFullYear()} — Portafolio Profesional & Comercial. Todos los derechos reservados.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)'
              }}
            >
              Caracas: {caracasTime.timeString}
            </span>

            <button
              onClick={handlePdfClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 1rem',
                borderRadius: '2px',
                backgroundColor: 'var(--accent-blue)',
                border: '1px solid var(--accent-blue)',
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <FileDown size={14} style={{ color: 'var(--accent-gold)' }} />
              <span>Dossier PDF</span>
            </button>

            <button
              onClick={scrollToTop}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '2px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#0b1528';
                e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
                e.currentTarget.style.borderColor = 'var(--accent-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
              data-cursor="Arriba"
            >
              <span>Volver arriba</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
