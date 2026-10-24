/**
 * @file Navbar.jsx
 * @description Barra de navegación superior limpia y suavemente redondeada.
 * Muestra el nombre de Sofia Muñoz y el índice directo de las 4 secciones clave.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from './Icons';
import { usePortfolio } from '../context/PortfolioContext';

export const Navbar = ({ lenisInstance }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { activeSection } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (lenisInstance) {
      lenisInstance.scrollTo(targetId, { offset: -65, duration: 1.1 });
    } else {
      const el = document.querySelector(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'competencias-premios', label: 'Premios' },
    { id: 'sobre-mi', label: 'Perfil y Habilidades' },
    { id: 'contacto', label: 'Contacto' }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: '0.9rem',
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
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          padding: '0.55rem 1.35rem',
          borderRadius: '999px',
          background: scrolled ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(255, 255, 255, 0.9)',
          boxShadow: scrolled
            ? '0 10px 28px rgba(20, 44, 76, 0.09)'
            : '0 4px 16px rgba(20, 44, 76, 0.05)',
          transition: 'background 0.25s ease, box-shadow 0.25s ease',
          maxWidth: '840px',
          width: '100%'
        }}
      >
        <a
          href="#inicio"
          onClick={(e) => handleNavClick(e, '#inicio')}
          style={{
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)',
            fontSize: '1.18rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            paddingLeft: '0.2rem'
          }}
          data-cursor="Inicio"
        >
          Sofia Muñoz
        </a>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
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
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--accent-yellow-fill)' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 700 : 500,
                  transition: 'all 0.2s ease',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '999px'
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Cerrar índice' : 'Abrir índice'}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)',
            border: 'none',
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
              top: '4.1rem',
              left: '1rem',
              right: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(16px)',
              borderRadius: '24px',
              padding: '1.1rem',
              boxShadow: '0 18px 40px rgba(20, 44, 76, 0.14)',
              zIndex: 49
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, `#${link.id}`)}
                    style={{
                      color: 'var(--text-primary)',
                      backgroundColor: isActive ? 'var(--accent-yellow-fill)' : 'transparent',
                      textDecoration: 'none',
                      fontSize: '0.96rem',
                      fontWeight: isActive ? 700 : 600,
                      padding: '0.6rem 0.95rem',
                      borderRadius: '14px'
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
