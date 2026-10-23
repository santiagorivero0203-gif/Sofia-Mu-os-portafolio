/**
 * @file Hero.jsx
 * @description Sección principal limpia, luminosa y sin subdivisiones innecesarias.
 * Combina la paleta Azul Pastel Claro (#D9EAFA) con tarjetas blancas redondeadas,
 * píldoras interactivas que revelan fotos y acentos en amarillo cálido (#FFE047).
 */

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDown,
  MessageCircle,
  ArrowUpRight,
  FileDown
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { personalInfo } from '../data/portfolioData';
import { ShapeImageTag } from './InteractiveReveal';

export const Hero = ({ lenisInstance }) => {
  const { sound, trackEvent, openPdfModal } = usePortfolio();
  const cardRef = useRef(null);

  const heroSlides = [
    {
      shortLabel: 'MOVA',
      title: 'Proyecto MOVA — Portada de Revista',
      src: '/assets/mova/revista.jpg'
    },
    {
      shortLabel: 'Meraki',
      title: 'Embajadora Meraki — Moda y Ventas',
      src: '/assets/meraki/clothing.jpg'
    },
    {
      shortLabel: 'Premio 2026',
      title: '2do Lugar Nacional — Torneo Kurios',
      src: '/assets/competitions/kurios_podio_marketplace.jpg'
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });

  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 4;
    const rotY = ((x - centerX) / centerX) * 4;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`
    });
  };

  const handleCardMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    });
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

  return (
    <section
      id="inicio"
      style={{
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '7.5rem',
        paddingBottom: '3rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="site-container" style={{ width: '100%' }}>
        <div className="editorial-grid" style={{ alignItems: 'center' }}>
          {/* COLUMNA IZQUIERDA: Mensaje Principal Limpio y Abierto */}
          <div style={{ gridColumn: 'span 7' }}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ marginBottom: '1.35rem' }}
            >
              <div className="badge-pill status-active">
                <span className="status-dot"></span>
                <span>{personalInfo.contact.availability}</span>
              </div>
            </motion.div>

            {/* Título Principal */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              style={{
                fontSize: 'var(--text-hero)',
                lineHeight: 1.15,
                fontWeight: 600,
                letterSpacing: '-0.02em',
                marginBottom: '1.35rem',
                maxWidth: '640px',
                color: 'var(--text-primary)'
              }}
            >
              Hago que las marcas conecten con personas y logren{' '}
              <span
                className="italic-serif"
                style={{
                  backgroundColor: 'var(--accent-yellow-fill)',
                  padding: '0 0.35rem',
                  borderRadius: '12px',
                  color: 'var(--text-primary)',
                  fontWeight: 400
                }}
              >
                ventas reales.
              </span>
            </motion.h1>

            {/* Resumen con Píldoras Interactivas que Revelan Fotos */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontSize: 'var(--text-body)',
                color: 'var(--text-secondary)',
                maxWidth: '580px',
                lineHeight: 1.85,
                marginBottom: '2.25rem'
              }}
            >
              Conecto marcas con personas reales a través de ventas y contenido. Co-fundadora de{' '}
              <ShapeImageTag
                label="MOVA"
                imageSrc="/assets/mova/interface.png"
                caption="Aplicación MOVA — Traductor de lengua de señas"
                shape="diamond"
                accent="blue"
              />
              , embajadora de{' '}
              <ShapeImageTag
                label="Meraki"
                imageSrc="/assets/meraki/querida_sofia.jpg"
                caption="Imagen y contenido para la marca de ropa Meraki"
                shape="square"
                accent="gold"
              />{' '}
              y ganadora del{' '}
              <ShapeImageTag
                label="2do Lugar Nacional"
                imageSrc="/assets/competitions/kurios_diplomas_2do_lugar.jpg"
                caption="2do Lugar Nacional en el Torneo Kurios 2026"
                shape="triangle"
                accent="gold"
              />
              .
            </motion.div>

            {/* Botones Redondeados */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.85rem',
                alignItems: 'center'
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
                <FileDown size={16} />
                <span>Descargar PDF</span>
              </button>

              <a
                href="#proyectos"
                onClick={scrollToProjects}
                className="btn-magnetic btn-outline"
                data-cursor="Ver"
              >
                <span>Ver Proyectos</span>
                <ArrowDown size={15} />
              </a>
            </motion.div>
          </div>

          {/* COLUMNA DERECHA: Tarjeta Visual Única, Limpia y Redondeada */}
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
                maxWidth: '410px',
                borderRadius: '28px',
                backgroundColor: 'rgba(255, 255, 255, 0.86)',
                backdropFilter: 'blur(14px)',
                border: '1px solid rgba(255, 255, 255, 0.95)',
                boxShadow: '0 20px 45px rgba(20, 44, 76, 0.08)',
                padding: '1.35rem',
                transition: 'transform 0.15s ease-out, box-shadow 0.25s ease'
              }}
            >
              {/* Cabecera Simple sin cajas anidadas */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-yellow-fill)',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1.05rem'
                    }}
                  >
                    SM
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Sofia Muñoz
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                      Ventas & Contenido
                    </div>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-secondary)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '999px'
                  }}
                >
                  2026
                </span>
              </div>

              {/* Imagen Redondeada con Transición Clip-Path al tocar */}
              <div
                onClick={() => {
                  sound.playClick();
                  setActiveSlide((prev) => (prev + 1) % heroSlides.length);
                }}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '250px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  marginBottom: '1rem',
                  cursor: 'pointer',
                  backgroundColor: 'var(--bg-secondary)'
                }}
                title="Toca para ver la siguiente foto"
                data-cursor="Cambiar"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={heroSlides[activeSlide].src}
                    src={heroSlides[activeSlide].src}
                    alt={heroSlides[activeSlide].title}
                    initial={{ clipPath: 'inset(0 100% 0 0)', scale: 1.06 }}
                    animate={{ clipPath: 'inset(0 0% 0 0)', scale: 1 }}
                    exit={{ clipPath: 'inset(0 0 0 100%)', scale: 1.03 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    loading="eager"
                  />
                </AnimatePresence>

                {/* Píldora flotante limpia en lugar de barra pesada */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    left: '0.75rem',
                    right: '0.75rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.5rem 0.9rem',
                    borderRadius: '999px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 6px 18px rgba(20, 44, 76, 0.12)'
                  }}
                >
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                    {heroSlides[activeSlide].title}
                  </span>
                </div>
              </div>

              {/* Píldoras suaves para cambiar la foto */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {heroSlides.map((slide, idx) => {
                  const isCurrent = activeSlide === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playClick();
                        setActiveSlide(idx);
                      }}
                      style={{
                        flex: 1,
                        padding: '0.5rem 0.6rem',
                        borderRadius: '999px',
                        backgroundColor: isCurrent ? 'var(--accent-yellow-fill)' : 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        border: 'none',
                        fontSize: '0.78rem',
                        fontWeight: isCurrent ? 700 : 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {slide.shortLabel}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
