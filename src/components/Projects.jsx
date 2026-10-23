/**
 * @file Projects.jsx
 * @description Exhibición interactiva de los proyectos principales de Sofia Muñoz (MOVA y Meraki).
 * Incluye:
 * - Experiencias vivas en cada tarjeta (Simulador de señas MOVA con nodos SVG y Abanico/Tarjeta Meraki).
 * - Selector de vista: "Vista Visual" (interactiva) vs. "Vista Rápida (CV)" (ultracompacta para reclutadores).
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { projects } from '../data/portfolioData';
import { useSpotlight } from '../hooks/useSpotlight';
import {
  MovaInteractiveShowcase,
  MerakiInteractiveShowcase,
  DiagonalArrowIcon
} from './ProjectShowcases';

export const Projects = () => {
  const { openProjectModal } = usePortfolio();
  const { handleMouseMove } = useSpotlight();
  const [viewMode, setViewMode] = useState('visual'); // 'visual' | 'cv'

  return (
    <section id="proyectos" style={{ padding: '2.5rem 0', position: 'relative' }}>
      <div className="site-container">
        {/* Cabecera con Selector de Vista Rápida para Reclutadores */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}
        >
          <div>
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

          {/* Selector de Vista Visual vs Vista Rápida CV */}
          <div
            style={{
              display: 'inline-flex',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              padding: '0.25rem',
              borderRadius: '999px',
              boxShadow: '0 4px 14px rgba(20, 44, 76, 0.06)'
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode('visual')}
              style={{
                padding: '0.42rem 0.95rem',
                borderRadius: '999px',
                border: 'none',
                backgroundColor: viewMode === 'visual' ? 'var(--accent-yellow-fill)' : 'transparent',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Vista Interactiva
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cv')}
              style={{
                padding: '0.42rem 0.95rem',
                borderRadius: '999px',
                border: 'none',
                backgroundColor: viewMode === 'cv' ? 'var(--accent-yellow-fill)' : 'transparent',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Vista Rápida (CV)
            </button>
          </div>
        </div>

        {viewMode === 'visual' ? (
          /* 1. VISTA INTERACTIVA CON SIMULADOR MOVA Y ABANICO MERAKI */
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
                {/* Experiencia Interactiva Viva según el Proyecto */}
                {project.id === 'mova' ? (
                  <MovaInteractiveShowcase />
                ) : (
                  <MerakiInteractiveShowcase />
                )}

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

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
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
                      <DiagonalArrowIcon size={15} />
                    </div>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.48rem 0.95rem',
                          borderRadius: '999px',
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--text-primary)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          textDecoration: 'none'
                        }}
                      >
                        <ExternalLink size={13} />
                        <span>{project.id === 'mova' ? 'Abrir Web' : 'Ver Instagram'}</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* 2. VISTA RÁPIDA EJECUTIVA (CV) PARA LECTURA EN 5 SEGUNDOS */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                layoutId={`card-${project.id}`}
                onClick={() => openProjectModal(project)}
                className="spotlight-card"
                onMouseMove={handleMouseMove}
                style={{
                  padding: '1.25rem 1.5rem',
                  borderRadius: '22px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  cursor: 'pointer'
                }}
                data-cursor="Ver"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 300px' }}>
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-yellow-fill)',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      flexShrink: 0
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
                      {project.role} • {project.category}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.28rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
                      {project.tagline}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.48rem 1rem',
                    borderRadius: '999px',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}
                >
                  <span>Ver {project.gallery.length} fotos y logros</span>
                  <DiagonalArrowIcon size={15} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
