/**
 * @file Projects.jsx
 * @description Exhibición limpia y directa de los proyectos principales de Sofia Muñoz (MOVA y Meraki).
 * Sin barras de búsqueda ni subdivisiones innecesarias: tarjetas redondeadas, aireadas y fáciles de explorar.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { projects } from '../data/portfolioData';
import { useSpotlight } from '../hooks/useSpotlight';

export const Projects = () => {
  const { openProjectModal, trackEvent } = usePortfolio();
  const { handleMouseMove } = useSpotlight();

  const handleSelect = (project) => {
    trackEvent('project_open', { projectId: project.id, title: project.title });
    openProjectModal(project);
  };

  return (
    <section id="proyectos" style={{ padding: '4.5rem 0', position: 'relative' }}>
      <div className="site-container">
        {/* Cabecera Limpia sin líneas divisorias */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="badge-pill status-active" style={{ marginBottom: '0.75rem' }}>
            <Award size={14} />
            <span>Proyectos Destacados</span>
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
            Trabajo real en{' '}
            <span className="italic-serif" style={{ color: 'var(--accent-blue)' }}>
              tecnología y moda
            </span>
          </h2>
        </div>

        {/* Grilla Limpia de 2 Tarjetas Redondeadas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '2rem'
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layoutId={`card-${project.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="spotlight-card"
              onMouseMove={handleMouseMove}
              onClick={() => handleSelect(project)}
              style={{
                padding: '1.5rem',
                borderRadius: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.35rem',
                cursor: 'pointer'
              }}
              data-cursor="Ver"
            >
              {/* Fotografía Principal Redondeada sin barras superpuestas */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '250px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-secondary)'
                }}
              >
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  src={project.featuredCover}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  loading="lazy"
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '0.85rem',
                    left: '0.85rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--text-primary)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '999px',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(20, 44, 76, 0.08)'
                  }}
                >
                  {project.category}
                </span>
              </div>

              {/* Contenido Unificado sin Cajas Internas */}
              <div style={{ padding: '0 0.35rem 0.25rem 0.35rem' }}>
                <div
                  style={{
                    fontSize: '0.84rem',
                    color: 'var(--accent-blue)',
                    fontWeight: 700,
                    marginBottom: '0.35rem'
                  }}
                >
                  {project.role} • {project.year}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.6rem',
                    fontWeight: 600,
                    lineHeight: 1.22,
                    marginBottom: '0.6rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.96rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    marginBottom: '1.25rem'
                  }}
                >
                  {project.tagline}
                </p>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.55rem 1.15rem',
                    borderRadius: '999px',
                    backgroundColor: 'var(--accent-yellow-fill)',
                    color: 'var(--text-primary)',
                    fontSize: '0.84rem',
                    fontWeight: 700
                  }}
                >
                  <span>Ver detalles y {project.gallery.length} fotos</span>
                  <ArrowUpRight size={15} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
