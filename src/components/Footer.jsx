/**
 * @file Footer.jsx
 * @description Pie de página compacto con acceso rápido al PDF y retorno al inicio.
 */

import React from 'react';
import { ArrowUp, FileDown } from './Icons';
import { usePortfolio } from '../context/PortfolioContext';
import { personalInfo } from '../data/portfolioData';

export const Footer = ({ lenisInstance }) => {
  const { caracasTime, openPdfModal } = usePortfolio();

  const scrollToTop = () => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer style={{ padding: '1.5rem 0 2.5rem 0' }}>
      <div className="site-container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {personalInfo.name}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              © 2026 — Portafolio Profesional • Caracas: {caracasTime.timeString}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button
              onClick={openPdfModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 1.05rem',
                borderRadius: '999px',
                backgroundColor: 'var(--accent-yellow-fill)',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              data-cursor="PDF"
            >
              <FileDown size={14} />
              <span>Descargar PDF</span>
            </button>

            <button
              onClick={scrollToTop}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0.95rem',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              data-cursor="Arriba"
            >
              <span>Subir</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
