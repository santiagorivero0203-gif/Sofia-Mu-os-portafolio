/**
 * @file Footer.jsx
 * @description Pie de página limpio y suavemente redondeado con botones en formato píldora.
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
        padding: '2.5rem 0 3.5rem 0'
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
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {personalInfo.name}
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              © 2026 — Portafolio Profesional • Caracas: {caracasTime.timeString}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            {/* Botón opcional de efectos de sonido */}
            <button
              onClick={toggleSound}
              title="Activa o silencia los sonidos al tocar botones"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1rem',
                borderRadius: '999px',
                backgroundColor: soundEnabled ? 'var(--accent-yellow-fill)' : 'rgba(255, 255, 255, 0.8)',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
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
                padding: '0.55rem 1.1rem',
                borderRadius: '999px',
                backgroundColor: 'var(--accent-yellow-fill)',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
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
                padding: '0.55rem 1.1rem',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <FileDown size={14} />
              <span>Descargar PDF</span>
            </button>

            {/* Volver arriba */}
            <button
              onClick={scrollToTop}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1rem',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
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
