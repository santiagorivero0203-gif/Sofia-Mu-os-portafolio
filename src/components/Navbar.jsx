/**
 * @file Navbar.jsx
 * @description Barra de navegación flotante con estética editorial y desenfoque glassmorphism.
 * Integra:
 * - Soporte responsivo para móviles con menú desplegable táctil.
 * - Acceso directo para descargar el portafolio en PDF (Dossier Ejecutivo).
 * - Indicador de sección activa sincronizado mediante ScrollSpy.
 * - Conmutador de audio sintetizado (Web Audio) y hora oficial de Caracas (VET).
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  ArrowUpRight,
  Volume2,
  VolumeX,
  FileDown,
  Menu,
  X,
  Clock
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { personalInfo } from '../data/portfolioData';

export const Navbar = ({ lenisInstance }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    activeSection,
    caracasTime,
    soundEnabled,
    toggleSound,
    sound,
    openPdfModal,
    trackEvent
  } = usePortfolio();

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

  const handlePdfClick = () => {
    sound.playModalOpen();
    setMobileMenuOpen(false);
    trackEvent('pdf_modal_open', { origin: 'navbar' });
    openPdfModal();
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
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '0.65rem 1.25rem',
          borderRadius: '2px',
          background: scrolled ? '#0b1528' : '#101e38',
          border: '1px solid var(--border-subtle)',
          boxShadow: scrolled ? '4px 4px 0px #060b16' : 'none',
          transition: 'background 0.25s ease, box-shadow 0.25s ease',
          maxWidth: '1120px',
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
              padding: '0.2rem 0.55rem',
              fontSize: '0.7rem',
              gap: '0.35rem'
            }}
            title={`Hora oficial en Caracas: ${caracasTime.timeString}`}
          >
            <span className="status-dot"></span>
            <span>VET</span>
          </span>
        </a>

        {/* Enlaces de Navegación Desktop */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem'
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

        {/* Acciones de la Cabecera */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Botón Descargar Dossier PDF */}
          <button
            onClick={handlePdfClick}
            aria-label="Descargar portafolio en PDF"
            title="Descargar portafolio en PDF"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '2px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--accent-blue)',
              color: '#ffffff',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.02em',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            data-cursor="PDF"
          >
            <FileDown size={14} style={{ color: 'var(--accent-gold)' }} />
            <span className="desktop-nav-text">PDF</span>
          </button>

          {/* Toggle de Micro-Sonido */}
          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Silenciar interfaz' : 'Activar sonido'}
            title={soundEnabled ? 'Sonidos activos' : 'Sonidos desactivados'}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '2px',
              backgroundColor: 'var(--bg-surface)',
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
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Botón directo de WhatsApp (Desktop) */}
          <a
            href={personalInfo.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic btn-gold desktop-nav-links"
            style={{
              padding: '0.45rem 0.95rem',
              fontSize: '0.78rem'
            }}
            onClick={() => trackEvent('whatsapp_click', { origin: 'navbar' })}
            data-cursor="Chat"
          >
            <MessageCircle size={14} />
            <span>Contactar</span>
            <ArrowUpRight size={13} />
          </a>

          {/* Disparador de Menú Móvil */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '2px',
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
        </div>
      </motion.nav>

      {/* Menú Desplegable Móvil */}
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
              backgroundColor: '#0b1528',
              border: '1px solid var(--accent-gold)',
              borderRadius: '2px',
              padding: '1.5rem',
              boxShadow: '8px 8px 0px #060b16',
              zIndex: 49
            }}
          >
            {/* Lista de enlaces móviles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, `#${link.id}`)}
                  style={{
                    color: activeSection === link.id ? 'var(--accent-gold)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    padding: '0.4rem 0',
                    borderBottom: '1px solid var(--border-subtle)'
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Acciones en Menú Móvil */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={handlePdfClick}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: '2px',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--accent-blue)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                <FileDown size={16} style={{ color: 'var(--accent-gold)' }} />
                <span>Descargar Portafolio (PDF)</span>
              </button>

              <a
                href={personalInfo.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: '2px',
                  backgroundColor: 'var(--accent-gold)',
                  color: '#0b1528',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  textTransform: 'uppercase',
                  textDecoration: 'none'
                }}
              >
                <MessageCircle size={16} />
                <span>Contactar por WhatsApp</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            <div
              style={{
                marginTop: '1.25rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: 'var(--text-muted)'
              }}
            >
              <span>Caracas, Venezuela (VET)</span>
              <span>{caracasTime.timeString}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
