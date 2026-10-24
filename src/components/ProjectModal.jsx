/**
 * @file ProjectModal.jsx
 * @description Modal limpio, luminoso y suavemente redondeado para explorar cada proyecto y sus fotografías.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Award,
  CheckCircle,
  ChevronRight,
  ChevronLeft
} from './Icons';
import { usePortfolio } from '../context/PortfolioContext';

export const ProjectModal = () => {
  const {
    selectedProject,
    closeProjectModal,
    nextProject,
    prevProject,
    currentProjectIndex,
    totalProjects
  } = usePortfolio();

  const [activeImageZoom, setActiveImageZoom] = useState(null);

  if (!selectedProject) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99990,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem',
          backgroundColor: 'rgba(20, 44, 76, 0.45)',
          backdropFilter: 'blur(10px)'
        }}
        onClick={closeProjectModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '900px',
            maxHeight: '90vh',
            overflowY: 'auto',
            backgroundColor: '#eaf3fd',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            borderRadius: '28px',
            padding: '2rem',
            color: 'var(--text-primary)',
            boxShadow: '0 25px 60px rgba(20, 44, 76, 0.22)'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <button
                onClick={prevProject}
                aria-label="Proyecto anterior"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '999px',
                  backgroundColor: '#ffffff',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(20, 44, 76, 0.06)'
                }}
              >
                <ChevronLeft size={16} />
                <span>Anterior</span>
              </button>

              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, padding: '0 0.3rem' }}>
                {currentProjectIndex + 1} / {totalProjects}
              </span>

              <button
                onClick={nextProject}
                aria-label="Proyecto siguiente"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '999px',
                  backgroundColor: '#ffffff',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(20, 44, 76, 0.06)'
                }}
              >
                <span>Siguiente</span>
                <ChevronRight size={16} />
              </button>
            </div>

            <button
              onClick={closeProjectModal}
              aria-label="Cerrar ventana"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: 'none',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(20, 44, 76, 0.08)'
              }}
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ marginBottom: '1.65rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span className="badge-pill status-active">{selectedProject.category}</span>
              <span className="badge-pill">{selectedProject.role}</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 2.8vw, 2.4rem)',
                fontWeight: 600,
                lineHeight: 1.18,
                marginBottom: '0.55rem'
              }}
            >
              {selectedProject.title}
            </h2>

            <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: '760px' }}>
              {selectedProject.overview}
            </p>

            {selectedProject.link && (
              <div style={{ marginTop: '1.1rem' }}>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic btn-gold"
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.84rem' }}
                >
                  <ExternalLink size={16} />
                  <span>
                    {selectedProject.id === 'mova' ? 'Ir a la página web de MOVA' : 'Ver Instagram de Meraki'}
                  </span>
                </a>
              </div>
            )}
          </div>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              borderRadius: '22px',
              padding: '1.5rem',
              marginBottom: '1.65rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', color: 'var(--text-primary)' }}>
              <Award size={18} style={{ color: 'var(--accent-gold)' }} />
              <h3 style={{ fontSize: '1.08rem', fontWeight: 700 }}>Aportes y resultados logrados</h3>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
              {selectedProject.achievements.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.55rem',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5
                  }}
                >
                  <CheckCircle size={15} style={{ color: 'var(--accent-blue)', flexShrink: 0, marginTop: '0.2rem' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '0.85rem'
              }}
            >
              Fotos del proyecto ({selectedProject.gallery.length})
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '0.85rem'
              }}
            >
              {selectedProject.gallery.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImageZoom(img)}
                  style={{
                    position: 'relative',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    backgroundColor: '#ffffff',
                    cursor: 'zoom-in',
                    aspectRatio: '16/10',
                    boxShadow: '0 6px 16px rgba(20, 44, 76, 0.07)'
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {activeImageZoom && (
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
                padding: '2rem'
              }}
              onClick={() => setActiveImageZoom(null)}
            >
              <button
                onClick={() => setActiveImageZoom(null)}
                aria-label="Cerrar imagen"
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  width: '42px',
                  height: '42px',
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
                src={activeImageZoom.src}
                alt={activeImageZoom.caption}
                style={{
                  maxWidth: '90vw',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: '24px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
                }}
                onClick={(e) => e.stopPropagation()}
              />
              <p
                style={{
                  marginTop: '1rem',
                  fontSize: '0.94rem',
                  color: '#ffffff',
                  textAlign: 'center',
                  maxWidth: '680px'
                }}
              >
                {activeImageZoom.caption}
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
