/**
 * @file ProjectModal.jsx
 * @description Modal expandido con transiciones de diseño fluido,
 * visualizador de evidencias visuales de alta resolución y desglose estratégico para reclutadores comerciales.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Award, CheckCircle, ChevronRight, Layers, Target, Eye } from 'lucide-react';

export const ProjectModal = ({ project, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!project) return null;

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
          backgroundColor: 'rgba(5, 6, 9, 0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1000px',
            maxHeight: '90vh',
            overflowY: 'auto',
            backgroundColor: '#0f1015',
            border: '1px solid var(--border-hover)',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            color: 'var(--text-primary)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)'
          }}
        >
          {/* Botón de Cerrar */}
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              zIndex: 10,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
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
          >
            <X size={20} />
          </button>

          {/* Encabezado del Proyecto */}
          <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span className="badge-pill" style={{ borderColor: project.accentColor, color: project.accentColor }}>
                {project.category}
              </span>
              <span className="badge-pill">{project.year}</span>
              <span className="badge-pill status-active">
                <span className="status-dot"></span>
                {project.role}
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
              {project.title}
            </h2>

            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              {project.tagline}
            </p>

            {project.link && (
              <div style={{ marginTop: '1rem' }}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic btn-primary"
                  style={{ padding: '0.5rem 1.15rem', fontSize: '0.85rem' }}
                >
                  <span>Visitar Plataforma / Enlace</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            )}
          </div>

          {/* Sección de Visión General */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={18} />
              Visión General del Caso
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>
              {project.overview}
            </p>
          </div>

          {/* Galería de Evidencias */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Eye size={18} />
              Galería de Evidencias y Materiales de Respaldo
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem'
              }}
            >
              {project.gallery.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(item)}
                  style={{
                    cursor: 'pointer',
                    position: 'relative',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    aspectRatio: '16/10'
                  }}
                  data-cursor="Ampliar"
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s var(--ease-editorial)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '0.5rem 0.75rem',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                      fontSize: '0.75rem',
                      color: '#ffffff'
                    }}
                  >
                    {item.caption}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desglose del Aporte Comercial de Sofía */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} />
              Aporte Comercial & Estratégico de Sofía
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {project.commercialContribution.map((contrib, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <ChevronRight size={16} style={{ color: project.accentColor }} />
                    {contrib.title}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {contrib.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logros Clave */}
          <div
            style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'rgba(212, 175, 55, 0.04)',
              border: '1px solid var(--border-gold)'
            }}
          >
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={17} />
              Resultados e Impacto Demostrable
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {project.achievements.map((achieve, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-gold)' }}></span>
                  {achieve}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Visor de Imagen a Pantalla Completa si se selecciona */}
        {selectedImage && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100005,
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.caption}
              style={{
                maxWidth: '90%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            />
            <p style={{ marginTop: '1.25rem', color: '#f5f4f0', fontSize: '1rem', textAlign: 'center', maxWidth: '700px' }}>
              {selectedImage.caption}
            </p>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
