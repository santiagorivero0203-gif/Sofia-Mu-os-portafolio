/**
 * @file CompetitionsSection.jsx
 * @description Sección de competencias nacionales y presentaciones en 2026.
 * Estructura limpia, sin cajas anidadas y con fotografías suavemente redondeadas.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, MapPin, X } from 'lucide-react';
import { competitions } from '../data/portfolioData';
import { useSpotlight } from '../hooks/useSpotlight';
import { usePortfolio } from '../context/PortfolioContext';

export const CompetitionsSection = () => {
  const { handleMouseMove } = useSpotlight();
  const { sound, trackEvent } = usePortfolio();
  const [activeImage, setActiveImage] = useState(null);

  const handleImageClick = (img) => {
    sound.playModalOpen();
    trackEvent('competition_image_zoom', { caption: img.caption });
    setActiveImage(img);
  };

  return (
    <section id="competencias-premios" style={{ padding: '4.5rem 0', position: 'relative' }}>
      <div className="site-container">
        {/* Cabecera Limpia */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="badge-pill status-active" style={{ marginBottom: '0.75rem' }}>
            <Trophy size={14} />
            <span>Premios 2026</span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h2)',
              lineHeight: 1.18,
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}
          >
            Competencias y{' '}
            <span className="italic-serif" style={{ color: 'var(--accent-blue)' }}>
              logros nacionales
            </span>
          </h2>
        </div>

        {/* Grilla de Competencias sin Cajas Internas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '2rem'
          }}
        >
          {competitions.map((comp, idx) => (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="spotlight-card"
              onMouseMove={handleMouseMove}
              style={{
                padding: '1.85rem',
                borderRadius: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.35rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span
                    className="badge-pill"
                    style={{
                      backgroundColor: comp.id.includes('kurios') ? 'var(--accent-yellow-fill)' : '#cfe4fc',
                      color: 'var(--text-primary)',
                      fontWeight: 700,
                      border: 'none'
                    }}
                  >
                    <Award size={14} />
                    <span>{comp.badge}</span>
                  </span>

                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    {comp.year}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    lineHeight: 1.25,
                    marginBottom: '0.35rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  {comp.title}
                </h3>

                <div style={{ fontSize: '0.94rem', color: 'var(--accent-blue)', fontWeight: 700, marginBottom: '0.45rem' }}>
                  {comp.award}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.9rem' }}>
                  <MapPin size={14} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
                  <span>{comp.organization}</span>
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  {comp.summary} {comp.defense}
                </p>
              </div>

              {/* Galería Redondeada de Fotos del Evento */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${comp.gallery.length}, 1fr)`,
                  gap: '0.75rem'
                }}
              >
                {comp.gallery.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => handleImageClick(img)}
                    style={{
                      position: 'relative',
                      height: '125px',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      cursor: 'zoom-in',
                      backgroundColor: 'var(--bg-secondary)',
                      boxShadow: '0 6px 16px rgba(20, 44, 76, 0.06)'
                    }}
                    title="Toca para ampliar"
                    data-cursor="Ampliar"
                  >
                    <img
                      src={img.src}
                      alt={img.caption}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                        display: 'block'
                      }}
                      onMouseEnter={(e) => (e.target.style.transform = 'scale(1.06)')}
                      onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal Suave */}
      <AnimatePresence>
        {activeImage && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              backgroundColor: 'rgba(20, 44, 76, 0.88)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setActiveImage(null)}
          >
            <button
              onClick={() => setActiveImage(null)}
              aria-label="Cerrar visor"
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: 'none',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <motion.img
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              src={activeImage.src}
              alt={activeImage.caption}
              style={{
                maxWidth: '90vw',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '24px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)'
              }}
              onClick={(e) => e.stopPropagation()}
            />

            <p
              style={{
                marginTop: '1rem',
                fontSize: '0.95rem',
                color: '#ffffff',
                textAlign: 'center',
                maxWidth: '680px'
              }}
            >
              {activeImage.caption}
            </p>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
