/**
 * @file CompetitionsSection.jsx
 * @description Sección de competencias nacionales, torneos de innovación y pitch days en 2026.
 * Exhibe:
 * - 2do Lugar Nacional en División Marketplace (Torneo de Robótica y Tecnología Kurios & BNC).
 * - Pitchday de Innovación en el campus de la Universidad Metropolitana (UNIMET).
 * - Visor interactivo de evidencias fotográficas en alta definición (podio, diplomas y pitch en vivo).
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, MapPin, CheckCircle2, Maximize2, X, ExternalLink, Sparkles } from 'lucide-react';
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
    <section id="competencias-premios" style={{ padding: '6.5rem 0', position: 'relative' }}>
      <div className="site-container">
        {/* Cabecera de la Sección */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="badge-pill" style={{ marginBottom: '0.85rem' }}>
            <Trophy size={13} style={{ color: 'var(--accent-gold)' }} />
            Validación Competitiva & Premios 2026
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h2)',
              lineHeight: 1.15,
              fontWeight: 500,
              maxWidth: '850px'
            }}
          >
            Competencias de innovación y{' '}
            <span className="italic-serif" style={{ color: 'var(--accent-gold)' }}>
              reconocimientos
            </span>{' '}
            nacionales.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', maxWidth: '680px', marginTop: '0.75rem' }}>
            Evidencias reales de desempeño en torneos de tecnología, defensa de modelos comerciales ante jurados ejecutivos y validación de mercado.
          </p>
        </div>

        {/* Grilla Bento de Competencias */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2rem'
          }}
        >
          {competitions.map((comp, idx) => (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="spotlight-card"
              onMouseMove={handleMouseMove}
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '520px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div>
                {/* Badges superiores */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span
                    className="badge-pill"
                    style={{
                      borderColor: comp.id.includes('kurios') ? 'var(--accent-gold)' : 'var(--accent-blue)',
                      color: comp.id.includes('kurios') ? '#0b1528' : '#ffffff',
                      backgroundColor: comp.id.includes('kurios') ? 'var(--accent-gold)' : 'var(--accent-blue)',
                      fontWeight: 700
                    }}
                  >
                    <Award size={13} />
                    {comp.badge}
                  </span>

                  <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {comp.year}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.65rem',
                    fontWeight: 500,
                    lineHeight: 1.25,
                    marginBottom: '0.4rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  {comp.title}
                </h3>

                <div style={{ fontSize: '0.92rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {comp.award}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  <MapPin size={14} style={{ color: 'var(--accent-blue)' }} />
                  <span>{comp.organization} • {comp.location}</span>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {comp.summary}
                </p>

                {/* Rol comercial específico */}
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    marginBottom: '1.5rem',
                    fontSize: '0.84rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <strong style={{ color: 'var(--text-primary)' }}>Defensa de Sofia: </strong>
                  {comp.defense}
                </div>
              </div>

              {/* Galería de Evidencias Reales */}
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                  Evidencias Fotográficas ({comp.gallery.length})
                </div>

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
                        height: '110px',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden',
                        cursor: 'zoom-in',
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: '#000'
                      }}
                      data-cursor="Zoom"
                    >
                      <img
                        src={img.src}
                        alt={img.caption}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => (e.target.style.transform = 'scale(1.08)')}
                        onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)',
                          display: 'flex',
                          alignItems: 'flex-end',
                          padding: '0.4rem'
                        }}
                      >
                        <Maximize2 size={12} style={{ color: '#fff' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal de Alta Definición */}
      <AnimatePresence>
        {activeImage && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              backgroundColor: 'rgba(5, 8, 15, 0.94)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
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
                borderRadius: '2px',
                backgroundColor: 'var(--accent-gold)',
                border: '1px solid var(--accent-gold)',
                color: '#0b1528',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={activeImage.src}
              alt={activeImage.caption}
              style={{
                maxWidth: '90vw',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.95)',
                border: '1px solid var(--border-gold)'
              }}
              onClick={(e) => e.stopPropagation()}
            />

            <p
              style={{
                marginTop: '1.25rem',
                fontSize: '0.95rem',
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
                maxWidth: '720px',
                lineHeight: 1.5
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
