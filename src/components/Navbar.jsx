/**
 * @file Navbar.jsx
 * @description Barra de navegación superior limpia y minimalista.
 * Muestra exclusivamente el nombre de Sofia Muñoz y el índice de navegación
 * (con menú desplegable para pantallas móviles), manteniendo las acciones secundarias en el pie de página.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Navbar = ({ lenisInstance }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { activeSection, sound, trackEvent } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    sound.playClick();
    setMobileMenuOpen(false);
    trackEvent('nav_click', { targetId });

    if (lenisInstance) {
      lenisInstance.scrollTo(targetId, { offset: -70, duration: 1.2 });
    } else {
      const el = document.querySelector(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'competencias-premios', label: 'Premios' },
    { id: 'sobre-mi', label: 'Sobre Mí' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'contacto', label: 'Contacto' }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: '1rem',
        left: 0,
        right: 0,
        zIndex: 50,
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        padding: '0 1rem'
      }}
    >
      <motion.nav
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          padding: '0.75rem 1.5rem',
          borderRadius: '14px',
          background: scrolled ? 'rgba(43, 78, 122, 0.94)' : 'rgba(62, 104, 156, 0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid var(--border-subtle)',
          boxShadow: scrolled ? '0 10px 28px rgba(24, 48, 82, 0.28)' : 'none',
          transition: 'background 0.25s ease, box-shadow 0.25s ease',
          maxWidth: '960px',
          width: '100%'
        }}
      >
        {/* Nombre Limpio de Sofia Muñoz */}
        <a
          href="#inicio"
          onClick={(e) => handleNavClick(e, '#inicio')}
          style={{
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 600,
            letterSpacing: '-0.02em'
          }}
          data-cursor="Inicio"
        >
          Sofia Muñoz
        </a>

        {/* Índice de Navegación (Desktop) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }}
          className="desktop-nav-links"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, `#${link.id}`)}
                style={{
                  position: 'relative',
                  color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'color 0.2s ease',
                  padding: '0.2rem 0'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.target.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.target.style.color = 'var(--text-secondary)';
                }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: 'var(--accent-gold)',
                      borderRadius: '0px'
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Botón para abrir el Índice en Móviles */}
        <button
          onClick={() => {
            sound.playClick();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          aria-label={mobileMenuOpen ? 'Cerrar índice' : 'Abrir índice'}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          className="mobile-nav-trigger"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.nav>

      {/* Índice Desplegable para Móviles */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              pointerEvents: 'auto',
              position: 'absolute',
              top: '4.2rem',
              left: '1rem',
              right: '1rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--accent-gold)',
              borderRadius: '14px',
              padding: '1.25rem 1.5rem',
              boxShadow: '0 18px 40px rgba(24, 48, 82, 0.45)',
              zIndex: 49
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, `#${link.id}`)}
                  style={{
                    color: activeSection === link.id ? 'var(--accent-gold)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    padding: '0.4rem 0',
                    borderBottom: '1px solid var(--border-subtle)'
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
