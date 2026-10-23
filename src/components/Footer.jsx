/**
 * @file Footer.jsx
 * @description Pie de página completo con las acciones de descarga en PDF, contacto rápido,
 * control opcional de sonido de interfaz y botón de retorno arriba.
 */

import React from 'react';
import { ArrowUp, FileDown, MessageCircle, Volume2, VolumeX } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { personalInfo } from '../data/portfolioData';

export const Footer = ({ lenisInstance }) => {
  const { sound, soundEnabled, toggleSound, caracasTime, openPdfModal, trackEvent } = usePortfolio();

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
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600 }}>
              {personalInfo.name}
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              © 2026 — Portafolio Profesional & Comercial • Hora local en Caracas: {caracasTime.timeString}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Botón opcional de efectos de sonido al tocar botones */}
            <button
              onClick={toggleSound}
              title="Activa o silencia los pequeños sonidos al tocar botones"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0.9rem',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                color: soundEnabled ? 'var(--accent-gold)' : 'var(--text-muted)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span>{soundEnabled ? 'Sonido: Activo' : 'Sonido: Silencio'}</span>
            </button>

            {/* Botón de WhatsApp */}
            <a
              href={personalInfo.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { origin: 'footer' })}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                backgroundColor: 'var(--accent-gold)',
                border: '1px solid var(--accent-gold)',
                color: '#1c3557',
                fontSize: '0.8rem',
                fontWeight: 700,
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
            </a>

            {/* Botón Descargar PDF */}
            <button
              onClick={handlePdfClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-blue)',
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <FileDown size={14} style={{ color: 'var(--accent-gold)' }} />
              <span>Descargar PDF</span>
            </button>

            {/* Volver arriba */}
            <button
              onClick={scrollToTop}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#1c3557';
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
              <span>Subir</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
