/**
 * @file Projects.jsx
 * @description Sección de proyectos con selector interactivo:
 * 1. Vista Galería Bento (tarjetas inmersivas con spotlight e iluminación reactiva).
 * 2. Vista Índice / Tabla editorial (con preview visual flotante en hover).
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, List, ArrowUpRight, Award, ExternalLink } from 'lucide-react';
import { projects } from '../data/portfolioData';

export const Projects = ({ onSelectProject }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [hoveredProject, setHoveredProject] = useState(null);

  // Manejo de Spotlight reactivo en tarjetas individuales
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="proyectos" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="site-container">
        {/* Cabecera de la Sección con Selector de Vista */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            marginBottom: '3rem',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '1.5rem'
          }}
        >
          <div>
            <div className="badge-pill" style={{ marginBottom: '0.75rem' }}>
              <Award size={13} style={{ color: 'var(--accent-gold)' }} />
              Casos Reales & Evidencias
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                lineHeight: 1.1,
                fontWeight: 500
              }}
            >
              Proyectos{' '}
              <span className="italic-serif" style={{ color: 'var(--accent-gold)' }}>
                Destacados
              </span>
            </h2>
          </div>

          {/* Switch de Modo Galería / Lista */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '0.25rem'
            }}
          >
            <button
              onClick={() => setViewMode('grid')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: viewMode === 'grid' ? 'var(--text-primary)' : 'transparent',
                color: viewMode === 'grid' ? 'var(--bg-primary)' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <LayoutGrid size={15} />
              <span>Galería</span>
            </button>

            <button
              onClick={() => setViewMode('table')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: viewMode === 'table' ? 'var(--text-primary)' : 'transparent',
                color: viewMode === 'table' ? 'var(--bg-primary)' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <List size={15} />
              <span>Índice</span>
            </button>
          </div>
        </div>

        {/* MODO 1: VISTA GALERÍA BENTO (Tarjetas Inmersivas) */}
        {viewMode === 'grid' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '2rem'
            }}
          >
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                className="spotlight-card"
                onMouseMove={handleMouseMove}
                onClick={() => onSelectProject(project)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                data-cursor="Explorar"
              >
                {/* Contenedor de Imagen con Efecto Curtain / Clip-path y Parallax */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/10',
                    overflow: 'hidden',
                    borderBottom: '1px solid var(--border-subtle)',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <img
                    src={project.featuredCover}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s var(--ease-editorial)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />

                  {/* Badge de Rol sobre la foto */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      zIndex: 2
                    }}
                  >
                    <span
                      className="badge-pill"
                      style={{
                        backgroundColor: 'rgba(11, 12, 16, 0.85)',
                        backdropFilter: 'blur(10px)',
                        borderColor: project.accentColor,
                        color: '#f5f4f0'
                      }}
                    >
                      {project.role}
                    </span>
                  </div>

                  {/* Icono de expansión en hover */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(11, 12, 16, 0.75)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.15)'
                    }}
                  >
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* Contenido de la Tarjeta */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: project.accentColor, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {project.category}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {project.year}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.65rem',
                        fontWeight: 600,
                        lineHeight: 1.2,
                        marginBottom: '0.5rem',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {project.title}
                    </h3>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                      {project.overview}
                    </p>
                  </div>

                  {/* Logros destacados */}
                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                        {project.achievements[0]}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        Ver Caso <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* MODO 2: VISTA ÍNDICE / TABLA EDITORIAL */}
        {viewMode === 'table' && (
          <div
            style={{
              borderTop: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)'
            }}
          >
            {projects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 2fr 1.5fr 1fr 60px',
                  alignItems: 'center',
                  padding: '1.75rem 1rem',
                  borderBottom: idx !== projects.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                className="table-row-hover"
                data-cursor="Abrir"
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  0{idx + 1}
                </span>

                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                    {project.title}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {project.role}
                  </div>
                </div>

                <div style={{ fontSize: '0.88rem', color: project.accentColor }}>
                  {project.category}
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {project.year}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', color: 'var(--accent-gold)' }}>
                  <ArrowUpRight size={20} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
