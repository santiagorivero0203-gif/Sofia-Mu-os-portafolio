/**
 * @file InteractiveReveal.jsx
 * @description Sistema de formas geométricas interactivas que revelan imágenes al tocarlas o hacer clic.
 * Diseñado con la paleta Azul Institucional MOVA (#0B1528 / #2E6FF2) y Amarillo Vibrante (#FFD60A),
 * bordes arquitectónicos rectos (2px) y animaciones de cortina clip-path a 60fps.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, Sparkles, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * 1. ShapeImageTag
 * Forma geométrica interactiva que se inserta junto a palabras clave.
 * Al tocarla (móvil o escritorio) o pasar el cursor, despliega una ventana arquitectónica
 * con revelado clip-path mostrando la imagen asociada.
 *
 * @param {{
 *   label: string,
 *   imageSrc: string,
 *   caption: string,
 *   shape?: 'diamond' | 'square' | 'triangle',
 *   accent?: 'gold' | 'blue'
 * }} props
 */
export const ShapeImageTag = ({
  label,
  imageSrc,
  caption,
  shape = 'diamond',
  accent = 'gold'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { sound, trackEvent } = usePortfolio();

  const isGold = accent === 'gold';
  const mainColor = isGold ? 'var(--accent-gold)' : 'var(--accent-blue)';
  const textColor = isGold ? '#0b1528' : '#ffffff';

  const handleToggle = (e) => {
    e.stopPropagation();
    sound.playClick();
    if (!isOpen) {
      trackEvent('shape_image_reveal', { label });
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        verticalAlign: 'middle',
        margin: '0 0.25rem'
      }}
      onMouseEnter={() => {
        if (window.matchMedia('(pointer: fine)').matches) {
          setIsOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (window.matchMedia('(pointer: fine)').matches) {
          setIsOpen(false);
        }
      }}
    >
      {/* Botón con Forma Geométrica Tocable */}
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.2rem 0.6rem',
          backgroundColor: isOpen ? mainColor : 'var(--bg-surface)',
          color: isOpen ? textColor : 'var(--text-primary)',
          border: `1px solid ${mainColor}`,
          borderRadius: '2px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: isOpen ? '3px 3px 0px #060b16' : 'none',
          transition: 'all 0.2s ease',
          lineHeight: 1.3
        }}
        data-cursor="Ver Foto"
      >
        {/* Figura geométrica que rota al activarse */}
        <motion.span
          animate={{ rotate: isOpen ? 135 : shape === 'diamond' ? 45 : 0, scale: isOpen ? 1.15 : 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 20 }}
          style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            backgroundColor: isOpen ? textColor : mainColor,
            clipPath:
              shape === 'triangle'
                ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
                : 'none'
          }}
        />
        <span>{label}</span>
        <Eye size={12} style={{ opacity: 0.85 }} />
      </button>

      {/* Tarjeta de Imagen que emerge con transición de cortina Clip-Path */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
              scale: 0.92,
              clipPath: 'inset(100% 0% 0% 0%)'
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              clipPath: 'inset(0% 0% 0% 0%)'
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.95,
              clipPath: 'inset(100% 0% 0% 0%)'
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 10px)',
              left: '0',
              width: '260px',
              backgroundColor: '#0b1528',
              border: `2px solid ${mainColor}`,
              borderRadius: '2px',
              boxShadow: '8px 8px 0px #060b16',
              zIndex: 80,
              overflow: 'hidden',
              cursor: 'pointer'
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '155px', backgroundColor: '#060b16' }}>
              <img
                src={imageSrc}
                alt={caption}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '0.4rem',
                  right: '0.4rem',
                  backgroundColor: mainColor,
                  color: textColor,
                  width: '22px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 800
                }}
              >
                <X size={13} />
              </span>
            </div>
            <div
              style={{
                padding: '0.6rem 0.75rem',
                fontSize: '0.76rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                lineHeight: 1.4,
                color: 'var(--text-primary)',
                borderTop: '1px solid var(--border-subtle)',
                textAlign: 'left',
                whiteSpace: 'normal'
              }}
            >
              {caption}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

/**
 * 2. ShapeDrawerReveal
 * Botón geométrico para líneas de tiempo o tarjetas que al tocarlo
 * abre un panel de imagen con efecto de obturador diagonal/horizontal.
 */
export const ShapeDrawerReveal = ({
  buttonText = 'Toca la forma para ver foto',
  imageSrc,
  caption,
  accentColor = 'var(--accent-gold)'
}) => {
  const [revealed, setRevealed] = useState(false);
  const { sound, trackEvent } = usePortfolio();

  const toggleReveal = () => {
    sound.playClick();
    if (!revealed) {
      trackEvent('drawer_image_reveal', { caption });
    }
    setRevealed((prev) => !prev);
  };

  return (
    <div style={{ marginTop: '0.75rem' }}>
      <button
        type="button"
        onClick={toggleReveal}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.55rem',
          padding: '0.4rem 0.8rem',
          backgroundColor: revealed ? accentColor : 'var(--bg-secondary)',
          color: revealed ? '#0b1528' : 'var(--text-primary)',
          border: `1px solid ${revealed ? accentColor : 'var(--border-subtle)'}`,
          borderRadius: '2px',
          fontSize: '0.78rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        data-cursor="Revelar"
      >
        {/* Rombo geométrico animado */}
        <motion.span
          animate={{ rotate: revealed ? 225 : 45 }}
          transition={{ duration: 0.3 }}
          style={{
            width: '8px',
            height: '8px',
            backgroundColor: revealed ? '#0b1528' : accentColor,
            display: 'inline-block'
          }}
        />
        <span>{revealed ? 'Ocultar imagen' : buttonText}</span>
      </button>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ height: 0, opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            animate={{ height: 'auto', opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
            exit={{ height: 0, opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden', marginTop: '0.75rem' }}
          >
            <div
              style={{
                border: `1px solid ${accentColor}`,
                borderRadius: '2px',
                backgroundColor: '#060b16',
                overflow: 'hidden',
                boxShadow: '5px 5px 0px #060b16'
              }}
            >
              <img
                src={imageSrc}
                alt={caption}
                style={{
                  width: '100%',
                  maxHeight: '210px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div
                style={{
                  padding: '0.55rem 0.85rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--bg-secondary)',
                  borderTop: '1px solid var(--border-subtle)'
                }}
              >
                {caption}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * 3. ShutterShapeGallery
 * Mosaico interactivo de 4 formas geométricas numeradas.
 * Al tocar cualquiera de las formas, se expande con una transición de cortina
 * revelando la fotografía y el contexto del logro.
 */
export const ShutterShapeGallery = () => {
  const { sound, trackEvent } = usePortfolio();
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      id: '01',
      shapeLabel: '◆ FORMA 01',
      title: 'Portada de Revista MOVA',
      subtitle: 'Prensa & Innovación 2026',
      description: 'Reportaje central sobre traducción de lengua de señas en tiempo real.',
      image: '/assets/mova/revista.jpg',
      accent: 'var(--accent-gold)'
    },
    {
      id: '02',
      shapeLabel: '■ FORMA 02',
      title: '2do Lugar Nacional Kurios',
      subtitle: 'División Marketplace & BNC',
      description: 'Podio nacional defendiendo la viabilidad comercial y el modelo de negocio.',
      image: '/assets/competitions/kurios_podio_marketplace.jpg',
      accent: 'var(--accent-blue)'
    },
    {
      id: '03',
      shapeLabel: '▲ FORMA 03',
      title: 'Alianza "Querida Sofia"',
      subtitle: 'Embajadora @meraki_marka',
      description: 'Creación de contenido, modelaje y experiencia personalizada para clientas.',
      image: '/assets/meraki/querida_sofia.jpg',
      accent: 'var(--accent-gold)'
    },
    {
      id: '04',
      shapeLabel: '◆ FORMA 04',
      title: 'Pitch en Vivo UNIMET',
      subtitle: 'Universidad Metropolitana',
      description: 'Negociación y defensa directa del proyecto ante jurados empresariales.',
      image: '/assets/competitions/unimet_pitch_ejecutivo.jpg',
      accent: 'var(--accent-blue)'
    }
  ];

  const handleSelect = (idx) => {
    sound.playClick();
    trackEvent('shutter_shape_select', { id: items[idx].id, title: items[idx].title });
    setActiveIndex(idx);
  };

  return (
    <div
      style={{
        marginTop: '3.5rem',
        padding: '2rem',
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '2px',
        boxShadow: '8px 8px 0px #060b16'
      }}
    >
      {/* Cabecera explicativa simple */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--accent-gold)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '0.25rem'
            }}
          >
            Galería Interactiva
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 500 }}>
            Toca una figura para revelar cada momento clave
          </h3>
        </div>

        {/* Selector de Formas Geométricas */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {items.map((item, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(idx)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.5rem 0.9rem',
                  borderRadius: '2px',
                  backgroundColor: isSelected ? 'var(--accent-gold)' : 'var(--bg-surface)',
                  color: isSelected ? '#0b1528' : 'var(--text-secondary)',
                  border: `1px solid ${isSelected ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                data-cursor="Tocar"
              >
                <span>{item.shapeLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenedor de Revelado con Transición de Obturador (Clip-Path) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          alignItems: 'center'
        }}
      >
        {/* Imagen con Cortina Geométrica */}
        <div
          style={{
            position: 'relative',
            height: '290px',
            backgroundColor: '#060b16',
            border: '2px solid var(--accent-gold)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={items[activeIndex].image}
              src={items[activeIndex].image}
              alt={items[activeIndex].title}
              initial={{
                clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
                scale: 1.08
              }}
              animate={{
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                scale: 1
              }}
              exit={{
                clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
                scale: 1.04
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </AnimatePresence>

          <div
            style={{
              position: 'absolute',
              top: '0.75rem',
              left: '0.75rem',
              backgroundColor: 'var(--accent-gold)',
              color: '#0b1528',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '0.2rem 0.55rem',
              borderRadius: '2px'
            }}
          >
            {items[activeIndex].shapeLabel}
          </div>
        </div>

        {/* Texto de la Forma Seleccionada + Mini-Tarjetas Tocables */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={items[activeIndex].id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              style={{
                padding: '1.35rem',
                backgroundColor: 'var(--bg-surface)',
                borderLeft: '4px solid var(--accent-gold)',
                borderRadius: '2px'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--accent-gold)',
                  fontWeight: 700,
                  marginBottom: '0.3rem'
                }}
              >
                {items[activeIndex].subtitle}
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  color: 'var(--text-primary)'
                }}
              >
                {items[activeIndex].title}
              </h4>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {items[activeIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* 4 Figuras Geométricas Rápidas para Tocar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem' }}>
            {items.map((item, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  style={{
                    textAlign: 'left',
                    padding: '0.75rem',
                    borderRadius: '2px',
                    backgroundColor: isSelected ? 'var(--bg-surface-active)' : 'var(--bg-primary)',
                    border: `1px solid ${isSelected ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      color: isSelected ? 'var(--accent-gold)' : 'var(--text-muted)',
                      fontWeight: 700
                    }}
                  >
                    {item.shapeLabel}
                  </div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 600, marginTop: '0.15rem' }}>
                    {item.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
