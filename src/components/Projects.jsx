/**
 * @file Projects.jsx
 * @description Exhibición compacta y directa de los proyectos principales de Sofia Muñoz (MOVA y Meraki).
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { projects } from '../data/portfolioData';
import { useSpotlight } from '../hooks/useSpotlight';

export const Projects = () => {
  const { openProjectModal } = usePortfolio();
  const { handleMouseMove } = useSpotlight();

  return (
    <section id="proyectos" style={{ padding: '2.5rem 0', position: 'relative' }}>
      <div className="site-container">
        <div style={{ marginBottom: '1.5rem' }}>
          <div className="badge-pill status-active" style={{ marginBottom: '0.5rem' }}>
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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layoutId={`card-${project.id}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="spotlight-card"
              onMouseMove={handleMouseMove}
              onClick={() => openProjectModal(project)}
              style={{
                padding: '1.35rem',
                borderRadius: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.1rem',
                cursor: 'pointer'
              }}
              data-cursor="Ver"
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '205px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-secondary)'
                }}
              >
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
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
                    top: '0.75rem',
                    left: '0.75rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--text-primary)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '999px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(20, 44, 76, 0.08)'
                  }}
                >
                  {project.category}
                </span>
              </div>

              <div style={{ padding: '0 0.25rem 0.15rem 0.25rem' }}>
                <div
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--accent-blue)',
                    fontWeight: 700,
                    marginBottom: '0.25rem'
                  }}
                >
                  {project.role} • {project.year}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.45rem',
                    fontWeight: 600,
                    lineHeight: 1.2,
                    marginBottom: '0.45rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                    marginBottom: '1rem'
                  }}
                >
                  {project.tagline}
                </p>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.48rem 1.05rem',
                    borderRadius: '999px',
                    backgroundColor: 'var(--accent-yellow-fill)',
                    color: 'var(--text-primary)',
                    fontSize: '0.82rem',
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
