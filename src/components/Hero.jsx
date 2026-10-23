/**
 * @file Hero.jsx
 * @description Sección de aterrizaje editorial y cinematográfica para Sofia Muñoz.
 * Aplica:
 * - Revelado kinetic por máscaras de texto (editorial-typography-kinetic-text).
 * - Tarjeta insignia con física de inclinación 3D perspectivada (3D Tilt / webgl-shader-image-effects).
 * - Físicas de resortes (motion-spring-architecture) en botones magnéticos.
 * - Marquesina infinita editorial (infinite ticker ribbon) no sobrecargada.
 */

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  MessageCircle,
  Sparkles,
  Award,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  FileDown
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { personalInfo } from '../data/portfolioData';

export const Hero = ({ lenisInstance }) => {
  const { sound, trackEvent, openPdfModal } = usePortfolio();
  const cardRef = useRef(null);

  // Estado para la inclinación 3D (Tilt) interactiva
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });

  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 6;
    const rotY = ((x - centerX) / centerX) * 6;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`
    });

    setGlareStyle({
      opacity: 0
    });
  };

  const handleCardMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    });
    setGlareStyle({ opacity: 0 });
  };

  const scrollToProjects = (e) => {
    e.preventDefault();
    sound.playClick();
    trackEvent('hero_explore_click');

    if (lenisInstance) {
      lenisInstance.scrollTo('#proyectos', { offset: -60, duration: 1.2 });
    } else {
      const el = document.querySelector('#proyectos');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppClick = () => {
    sound.playClick();
    trackEvent('hero_whatsapp_click');
  };

  // Palabras clave directas para la cinta inferior
  const tickerItems = [
    'ASESORÍA COMERCIAL',
    'VENTAS EN REDES',
    'MOVA — TRADUCTOR DE SEÑAS',
    'EMBAJADORA MERAKI',
    '2DO LUGAR NACIONAL KURIOS 2026',
    'ATENCIÓN AL CLIENTE',
    'CREACIÓN DE CONTENIDO'
  ];

  return (
    <section
      id="inicio"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: '8rem',
        paddingBottom: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="site-container" style={{ width: '100%', margin: 'auto 0', paddingBottom: '3rem' }}>
        <div className="editorial-grid" style={{ alignItems: 'center' }}>
          {/* COLUMNA IZQUIERDA: Mensaje Claro y Directo */}
          <div style={{ gridColumn: 'span 7' }}>
            {/* Etiquetas de Estado */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                marginBottom: '1.5rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.65rem',
                alignItems: 'center'
              }}
            >
              <div className="badge-pill status-active">
                <span className="status-dot"></span>
                <span>{personalInfo.contact.availability}</span>
              </div>

              <div className="badge-pill">
                <Award size={13} style={{ color: 'var(--accent-gold)' }} />
                <span>Co-fundadora de MOVA & Embajadora Meraki</span>
              </div>
            </motion.div>

            {/* Título Principal Claro, Bien Espaciado y sin Cortes */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              style={{
                fontSize: 'var(--text-hero)',
                lineHeight: 1.16,
                fontWeight: 600,
                letterSpacing: '-0.02em',
                marginBottom: '1.35rem',
                maxWidth: '640px'
              }}
            >
              Hago que las marcas conecten con personas y logren{' '}
              <span
                className="italic-serif"
                style={{
                  color: 'var(--accent-gold)',
                  fontWeight: 400
                }}
              >
                ventas reales.
              </span>
            </motion.h1>

            {/* Resumen Breve y Directo */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontSize: 'var(--text-body)',
                color: 'var(--text-secondary)',
                maxWidth: '560px',
                lineHeight: 1.65,
                marginBottom: '2.25rem'
              }}
            >
              {personalInfo.statement}
            </motion.p>

            {/* Botones de Acción Directos */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.85rem',
                alignItems: 'center',
                marginBottom: '2.25rem'
              }}
            >
              <a
                href={personalInfo.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="btn-magnetic btn-gold"
                data-cursor="WhatsApp"
              >
                <MessageCircle size={17} />
                <span>Hablar por WhatsApp</span>
                <ArrowUpRight size={15} />
              </a>

              <a
                href="#proyectos"
                onClick={scrollToProjects}
                className="btn-magnetic btn-outline"
                data-cursor="Ver"
              >
                <span>Ver Proyectos</span>
                <ArrowDown size={15} />
              </a>

              <button
                type="button"
                onClick={() => {
                  sound.playModalOpen();
                  trackEvent('pdf_modal_open', { origin: 'hero' });
                  openPdfModal();
                }}
                className="btn-magnetic btn-primary"
                data-cursor="PDF"
              >
                <FileDown size={15} style={{ color: 'var(--accent-gold)' }} />
                <span>Descargar PDF</span>
              </button>
            </motion.div>

            {/* Puntos Clave Cortos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                alignItems: 'center'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                <ShieldCheck size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                <span>2do Lugar Nacional Kurios 2026</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                <TrendingUp size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                <span>Ventas y Contenido en Redes</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                <Zap size={16} style={{ color: 'var(--accent-blue-sky)', flexShrink: 0 }} />
                <span>App MOVA Activa en Web</span>
              </div>
            </motion.div>
          </div>

          {/* COLUMNA DERECHA: Tarjeta Insignia Editorial con 3D Tilt Perspectivado */}
          <div style={{ gridColumn: 'span 5', display: 'flex', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                ...tiltStyle,
                position: 'relative',
                width: '100%',
                maxWidth: '420px',
                borderRadius: '2px',
                backgroundColor: '#101e38',
                border: '1px solid var(--accent-gold)',
                boxShadow: '8px 8px 0px #060b16',
                padding: '2rem',
                transition: 'transform 0.15s ease-out, box-shadow 0.25s ease',
                cursor: 'pointer'
              }}
              data-cursor="Sofia"
            >
              {/* Encabezado de la Tarjeta */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '2px',
                      backgroundColor: 'var(--accent-gold)',
                      color: '#0b1528',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.15rem',
                      border: '1px solid var(--accent-gold)'
                    }}
                  >
                    SM
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600 }}>
                      Sofia Muñoz
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      Asesora Comercial
                    </div>
                  </div>
                </div>

                <span className="badge-pill" style={{ fontSize: '0.7rem', borderColor: 'var(--accent-blue)', color: '#fff' }}>
                  '26
                </span>
              </div>

              {/* Preview Visual Editorial con Cortina */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '220px',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: '#060b16'
                }}
              >
                <img
                  src="/assets/mova/revista.jpg"
                  alt="Sofia Muñoz — Innovación y Portada Editorial"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.05)'
                  }}
                  loading="eager"
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(11, 21, 40, 0.92)',
                    borderTop: '1px solid var(--border-subtle)',
                    padding: '0.55rem 0.75rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 600 }}>
                    Caso Destacado: MOVA
                  </span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#0b1528',
                      backgroundColor: 'var(--accent-gold)',
                      fontWeight: 700,
                      padding: '0.15rem 0.5rem',
                      borderRadius: '0px'
                    }}
                  >
                    Portada Prensa
                  </span>
                </div>
              </div>

              {/* Fila de Métricas Clave de Sofia */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '1.25rem'
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    2do Lugar
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                    Torneo Kurios & BNC 2026
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                    3 Idiomas
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                    Señas LSV / ASL / LSE
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* MARQUESINA INFINITA EDITORIAL (TICKER) */}
      <div
        className="marquee-container"
        style={{
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '0.85rem 0',
          backgroundColor: 'rgba(255, 255, 255, 0.015)'
        }}
      >
        <div className="marquee-content">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1.25rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                color: idx % 2 === 0 ? 'var(--text-secondary)' : 'var(--accent-gold)',
                textTransform: 'uppercase'
              }}
            >
              <span>{item}</span>
              <span style={{ fontSize: '0.6rem', opacity: 0.5 }}>✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
