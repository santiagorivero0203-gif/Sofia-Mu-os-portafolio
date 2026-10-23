/**
 * @file Navbar.jsx
 * @description Barra de navegación flotante con estética editorial y desenfoque glassmorphism.
 * Integra:
 * - Indicador de sección activa sincronizado mediante ScrollSpy.
 * - Desplazamiento inercial suave con Lenis.
 * - Conmutador de retroalimentación sonora (Web Audio).
 * - Indicador de disponibilidad y hora local oficial de Caracas (VET).
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowUpRight, Volume2, VolumeX, Clock } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { personalInfo } from '../data/portfolioData';

export const Navbar = ({ lenisInstance }) => {
  const [scrolled, setScrolled] = useState(false);
  const {
    activeSection,
    caracasTime,
    soundEnabled,
    toggleSound,
    sound,
    trackEvent
  } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    sound.playClick();
    trackEvent('nav_click', { targetId });

    if (lenisInstance) {
      lenisInstance.scrollTo(targetId, { offset: -80, duration: 1.2 });
    } else {
      const el = document.querySelector(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'sobre-mi', label: 'Sobre Mí' },
    { id: 'habilidades', label: 'Competencias' },
    { id: 'contacto', label: 'Contacto' }
  ];

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
          gap: '1.25rem',
          padding: '0.65rem 1.25rem',
          borderRadius: 'var(--radius-full)',
          background: scrolled ? 'rgba(12, 13, 17, 0.88)' : 'rgba(18, 19, 25, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--border-subtle)',
          boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.4)' : 'none',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
          maxWidth: '1040px',
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
            gap: '0.6rem',
            textDecoration: 'none',
            color: 'var(--text-primary)'
          }}
          data-cursor="Inicio"
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              fontWeight: 600,
              letterSpacing: '-0.02em'
            }}
          >
            Sofia Muñoz
          </span>
          <span
            className="badge-pill status-active"
            style={{
              display: 'inline-flex',
              padding: '0.2rem 0.6rem',
              fontSize: '0.72rem',
              gap: '0.35rem'
            }}
            title={`Hora local: ${caracasTime.timeString}`}
          >
            <span className="status-dot"></span>
            <span>VET</span>
          </span>
        </a>

        {/* Enlaces de Navegación con ScrollSpy */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
          }}
          className="nav-links"
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
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'color 0.2s ease',
                  padding: '0.25rem 0'
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
                      borderRadius: '2px'
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Acciones de la Cabecera: Toggle de Sonido y Botón WhatsApp */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {/* Toggle de Micro-Sonido */}
          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Silenciar sonidos de interfaz' : 'Activar sonidos de interfaz'}
            title={soundEnabled ? 'Sonidos activos' : 'Sonidos desactivados'}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: soundEnabled ? 'var(--accent-gold)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            data-cursor="Audio"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Botón directo de WhatsApp */}
          <a
            href={personalInfo.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic btn-primary"
            style={{
              padding: '0.5rem 1.1rem',
              fontSize: '0.84rem'
            }}
            onClick={() => trackEvent('whatsapp_click', { origin: 'navbar' })}
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
