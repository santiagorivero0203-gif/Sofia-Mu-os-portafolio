/**
 * @file Projects.jsx
 * @description Módulo de exhibición de proyectos estratégicos de Sofia Muñoz.
 * Integra:
 * - Filtros por categoría y barra de búsqueda en tiempo real.
 * - Conmutador interactivo: Galería Bento (con Spotlight radial) vs. Índice Editorial.
 * - Despliegue de modal deep-dive sin recarga de página.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  List,
  ArrowUpRight,
  Award,
  ExternalLink,
  Search,
  X,
  Filter,
  Sparkles
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useSpotlight } from '../hooks/useSpotlight';

export const Projects = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filteredProjects,
    viewMode,
    setViewMode,
    openProjectModal,
    sound,
    trackEvent
  } = usePortfolio();

  const { handleMouseMove } = useSpotlight();
  const [hoveredProject, setHoveredProject] = useState(null);

  const handleSelect = (project) => {
    trackEvent('project_open', { projectId: project.id, title: project.title });
    openProjectModal(project);
  };

  return (
    <section id="proyectos" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="site-container">
        {/* Cabecera de la Sección */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            marginBottom: '2.5rem',
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
              data-cursor="Bento"
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
              data-cursor="Índice"
            >
              <List size={15} />
              <span>Índice</span>
            </button>
          </div>
        </div>

        {/* Barra de Filtros y Búsqueda Reactiva */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2.5rem'
          }}
        >
          {/* Categorías */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.4rem 0.9rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.82rem',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: isActive ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    border: `1px solid ${isActive ? 'var(--accent-gold)' : 'var(--border-subtle)'}`
                  }}
                  data-cursor="Filtro"
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Input de Búsqueda Rápida */}
          <div
            style={{
              position: 'relative',
              minWidth: '240px',
              maxWidth: '320px',
              width: '100%'
            }}
          >
            <Search
              size={15}
              style={{
                position: 'absolute',
                left: '0.85rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }}
            />
            <input
              type="text"
              placeholder="Buscar por rol, reto o tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.45rem 2rem 0.45rem 2.25rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '0.84rem',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent-gold)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Limpiar búsqueda"
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Estado Vacío si ningún proyecto coincide */}
        {filteredProjects.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              borderRadius: 'var(--radius-lg)',
              border: '1px dashed var(--border-subtle)'
            }}
          >
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '1rem' }}>
              No se encontraron proyectos con el criterio "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                setSearchQuery('');
              }}
              className="btn-magnetic"
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              Restablecer filtros
            </button>
          </div>
        )}

        {/* 1. MODO GALERÍA BENTO CON SPOTLIGHT */}
        {viewMode === 'grid' && filteredProjects.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2rem'
            }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layoutId={`card-${project.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="spotlight-card"
                onMouseMove={handleMouseMove}
                onClick={() => handleSelect(project)}
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '520px',
                  cursor: 'pointer'
                }}
                data-cursor="Ver Caso"
              >
                {/* Cabecera de la Tarjeta */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1.25rem'
                    }}
                  >
                    <span
                      className="badge-pill"
                      style={{
                        borderColor: project.accentColor ? `${project.accentColor}55` : 'var(--border-subtle)',
                        color: project.accentColor || 'var(--text-primary)'
                      }}
                    >
                      {project.category}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)'
                      }}
                    >
                      {project.year}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.75rem',
                      fontWeight: 500,
                      lineHeight: 1.2,
                      marginBottom: '0.5rem'
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--accent-gold)',
                      fontWeight: 500,
                      marginBottom: '0.85rem'
                    }}
                  >
                    {project.role}
                  </p>

                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '1.5rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {project.tagline}
                  </p>
                </div>

                {/* Vista previa visual del caso con clip-path reveal */}
                <div style={{ position: 'relative', marginTop: 'auto' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '240px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      src={project.featuredCover}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      loading="lazy"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(11,12,16,0.9) 0%, transparent 60%)'
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '1rem',
                        right: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-secondary)',
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px'
                        }}
                      >
                        {project.gallery.length} Evidencias
                      </span>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255,255,255,0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 2. MODO ÍNDICE EDITORIAL CON PREVIEW EN HOVER */}
        {viewMode === 'table' && filteredProjects.length > 0 && (
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderTop: '1px solid var(--border-subtle)',
                marginTop: '1rem'
              }}
            >
              {filteredProjects.map((project, idx) => (
                <div
                  key={project.id}
                  onClick={() => handleSelect(project)}
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(200px, 1.5fr) minmax(180px, 1.2fr) minmax(140px, 1fr) auto',
                    alignItems: 'center',
                    gap: '1.5rem',
                    padding: '1.75rem 0',
                    borderBottom: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'padding-left 0.2s ease, background 0.2s ease'
                  }}
                  data-cursor="Explorar"
                >
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        color: 'var(--accent-gold)',
                        marginRight: '0.75rem'
                      }}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.35rem',
                        fontWeight: 500
                      }}
                    >
                      {project.title}
                    </span>
                  </div>

                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {project.role}
                  </div>

                  <div style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                    {project.category}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {project.year}
                    </span>
                    <ArrowUpRight size={18} style={{ color: 'var(--accent-gold)' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Preview Flotante en Modo Tabla */}
            <AnimatePresence>
              {hoveredProject && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'fixed',
                    right: '15%',
                    bottom: '20%',
                    width: '320px',
                    height: '200px',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    zIndex: 40,
                    boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
                    border: '1px solid var(--border-gold)'
                  }}
                >
                  <img
                    src={hoveredProject.featuredCover}
                    alt={hoveredProject.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
