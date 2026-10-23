/**
 * @file Navbar.jsx
 * @description Barra de navegación flotante editorial con desenfoque de cristal (glassmorphism),
 * indicador de estado en vivo pulsante y navegación fluida con Lenis.
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Navbar = ({ lenisInstance }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (lenisInstance) {
      lenisInstance.scrollTo(targetId, { offset: -80, duration: 1.2 });
    } else {
      const el = document.querySelector(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: '1.25rem',
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
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          padding: '0.65rem 1.25rem',
          borderRadius: 'var(--radius-full)',
          background: scrolled ? 'rgba(12, 13, 17, 0.85)' : 'rgba(18, 19, 25, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--border-subtle)',
          boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.4)' : 'none',
          transition: 'all 0.3s ease',
          maxWidth: '980px',
          width: '100%'
        }}
      >
        {/* Identidad / Marca personal */}
        <a
          href="#inicio"
          onClick={(e) => handleNavClick(e, '#inicio')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            color: 'var(--text-primary)'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 600,
              letterSpacing: '-0.02em'
            }}
          >
            Sofia Muñoz
          </span>
          <span className="badge-pill status-active" style={{ display: 'none' }} id="nav-status-badge">
            <span className="status-dot"></span>
            Disponible
          </span>
        </a>

        {/* Enlaces de Navegación */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem'
          }}
          className="nav-links"
        >
          <a
            href="#proyectos"
            onClick={(e) => handleNavClick(e, '#proyectos')}
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.88rem',
              fontWeight: 500,
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
          >
            Proyectos
          </a>
          <a
            href="#sobre-mi"
            onClick={(e) => handleNavClick(e, '#sobre-mi')}
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.88rem',
              fontWeight: 500,
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
          >
            Sobre Mí
          </a>
          <a
            href="#habilidades"
            onClick={(e) => handleNavClick(e, '#habilidades')}
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.88rem',
              fontWeight: 500,
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
          >
            Competencias
          </a>
        </div>

        {/* Botón directo de WhatsApp / Contacto */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a
            href={personalInfo.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic btn-primary"
            style={{
              padding: '0.55rem 1.15rem',
              fontSize: '0.85rem'
            }}
            data-cursor="Chat"
          >
            <MessageCircle size={15} style={{ color: '#22c55e' }} />
            <span>Contactar</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </motion.nav>
    </header>
  );
};
