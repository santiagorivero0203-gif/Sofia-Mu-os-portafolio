/**
 * @file ProjectModal.jsx
 * @description Modal interactivo y visor de evidencias para los proyectos de Sofia Muñoz.
 * Incluye:
 * - Navegación secuencial entre proyectos (Anterior / Siguiente) y control por teclado.
 * - Visor de evidencias fotográficas en alta definición (lightbox expandible).
 * - Desglose de impacto comercial, retos superados y enlaces verificados en vivo.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Award,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Layers,
  Target,
  Eye,
  Maximize2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ProjectModal = () => {
  const {
    selectedProject,
    closeProjectModal,
    nextProject,
    prevProject,
    currentProjectIndex,
    totalProjects,
    trackEvent
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
          padding: '1.5rem',
          backgroundColor: 'rgba(5, 6, 9, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)'
        }}
        onClick={closeProjectModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1020px',
            maxHeight: '90vh',
            overflowY: 'auto',
            backgroundColor: '#0f1015',
            border: '1px solid var(--border-hover)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.25rem',
            color: 'var(--text-primary)',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.85)'
          }}
        >
          {/* Barra Superior de Control: Navegación de Proyectos + Botón Cerrar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.75rem',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '1.25rem'
            }}
          >
            {/* Controles Anterior / Siguiente */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <button
                onClick={prevProject}
                aria-label="Proyecto anterior"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.4rem 0.8rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
                data-cursor="Anterior"
              >
                <ChevronLeft size={16} />
                <span>Anterior</span>
              </button>

              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {currentProjectIndex + 1} / {totalProjects}
              </span>

              <button
                onClick={nextProject}
                aria-label="Proyecto siguiente"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.4rem 0.8rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
                data-cursor="Siguiente"
              >
                <span>Siguiente</span>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Botón de Cerrar */}
            <button
              onClick={closeProjectModal}
              aria-label="Cerrar modal (Esc)"
              title="Cerrar (Esc)"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease, transform 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              data-cursor="Cerrar"
            >
              <X size={18} />
            </button>
          </div>

          {/* Encabezado del Proyecto */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span
                className="badge-pill"
                style={{
                  borderColor: selectedProject.accentColor,
                  color: selectedProject.accentColor
                }}
              >
                {selectedProject.category}
              </span>
              <span className="badge-pill">{selectedProject.year}</span>
              <span className="badge-pill status-active">
                <span className="status-dot"></span>
                {selectedProject.role}
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 500,
                lineHeight: 1.15,
                marginBottom: '0.5rem'
              }}
            >
              {selectedProject.title}
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', fontStyle: 'italic', marginBottom: '1.25rem' }}>
              "{selectedProject.tagline}"
            </p>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '840px' }}>
              {selectedProject.overview}
            </p>

            {/* Enlace de Validación Externa */}
            {selectedProject.link && (
              <div style={{ marginTop: '1.5rem' }}>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 1.4rem',
                    fontSize: '0.88rem'
                  }}
                  onClick={() => trackEvent('external_link_click', { project: selectedProject.id, url: selectedProject.link })}
                  data-cursor="Visitar"
                >
                  <ExternalLink size={16} />
                  <span>
                    {selectedProject.id === 'mova' ? 'Ver Plataforma Web en Vivo (Vercel)' : 'Visitar Perfil Oficial en Instagram'}
                  </span>
                </a>
              </div>
            )}
          </div>

          {/* Retos y Soluciones Comerciales */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2.5rem'
            }}
          >
            {/* Retos Identificados */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--accent-gold)' }}>
                <Target size={18} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>El Desafío Comercial</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {selectedProject.challenges.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.6rem',
                      marginBottom: '0.75rem',
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5
                    }}
                  >
                    <span style={{ color: 'var(--accent-gold)', marginTop: '0.2rem' }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Logros Clave */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#22c55e' }}>
                <Award size={18} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Impacto & Resultados</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {selectedProject.achievements.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.6rem',
                      marginBottom: '0.75rem',
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5
                    }}
                  >
                    <CheckCircle size={15} style={{ color: '#22c55e', flexShrink: 0, marginTop: '0.2rem' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Desglose de Aportes Comerciales */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 500,
                marginBottom: '1.25rem',
                borderLeft: '3px solid var(--accent-gold)',
                paddingLeft: '0.75rem'
              }}
            >
              Contribución Estratégica & Liderazgo de Sofia
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem'
              }}
            >
              {selectedProject.commercialContribution.map((contrib, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem'
                  }}
                >
                  <h4 style={{ fontSize: '0.96rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    {contrib.title}
                  </h4>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                    {contrib.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Galería de Evidencias Reales */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 500,
                marginBottom: '1rem',
                borderLeft: '3px solid var(--accent-gold)',
                paddingLeft: '0.75rem'
              }}
            >
              Evidencias Visuales & Validación en Medios ({selectedProject.gallery.length})
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '1rem'
              }}
            >
              {selectedProject.gallery.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImageZoom(img)}
                  style={{
                    position: 'relative',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'zoom-in',
                    aspectRatio: '16/10'
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
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.06)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '0.75rem'
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 500, lineHeight: 1.25 }}>
                      {img.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Modal de Zoom para Imagen en Alta Definición */}
        <AnimatePresence>
          {activeImageZoom && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                backgroundColor: 'rgba(0, 0, 0, 0.94)',
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
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={22} />
              </button>

              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={activeImageZoom.src}
                alt={activeImageZoom.caption}
                style={{
                  maxWidth: '90vw',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 20px 80px rgba(0,0,0,0.9)'
                }}
                onClick={(e) => e.stopPropagation()}
              />
              <p
                style={{
                  marginTop: '1.25rem',
                  fontSize: '0.95rem',
                  color: 'rgba(255,255,255,0.85)',
                  textAlign: 'center',
                  maxWidth: '700px'
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
