/**
 * @file InteractiveReveal.jsx
 * @description Píldoras interactivas suaves que revelan fotografías con transición clip-path.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X } from './Icons';

/**
 * 1. ShapeImageTag
 * Píldora interactiva junto a palabras clave que muestra su foto asociada al tocarla o pasar el cursor.
 */
export const ShapeImageTag = ({
  label,
  imageSrc,
  caption,
  shape = 'diamond',
  accent = 'gold'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const isGold = accent === 'gold';
  const activeBg = isGold ? 'var(--accent-yellow-fill)' : '#bdd8fa';

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        verticalAlign: 'middle',
        margin: '0 0.2rem'
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
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.38rem',
          padding: '0.2rem 0.7rem',
          backgroundColor: isOpen ? activeBg : 'rgba(255, 255, 255, 0.85)',
          color: 'var(--text-primary)',
          border: '1px solid rgba(45, 85, 135, 0.16)',
          borderRadius: '999px',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.84rem',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: isOpen ? '0 6px 16px rgba(20, 44, 76, 0.12)' : '0 2px 8px rgba(20, 44, 76, 0.04)',
          transition: 'all 0.2s ease',
          lineHeight: 1.3
        }}
        data-cursor="Ver Foto"
      >
        <motion.span
          animate={{ rotate: isOpen ? 135 : shape === 'diamond' ? 45 : 0, scale: isOpen ? 1.15 : 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 20 }}
          style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: shape === 'square' ? '2px' : '0px',
            backgroundColor: isGold ? '#d98a00' : 'var(--accent-blue)',
            clipPath:
              shape === 'triangle'
                ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
                : 'none'
          }}
        />
        <span>{label}</span>
        <Eye size={13} style={{ opacity: 0.7 }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.94,
              clipPath: 'inset(100% 0% 0% 0% round 20px)'
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              clipPath: 'inset(0% 0% 0% 0% round 20px)'
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.95,
              clipPath: 'inset(100% 0% 0% 0% round 20px)'
            }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 10px)',
              left: '0',
              width: '250px',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 20px 45px rgba(20, 44, 76, 0.18)',
              padding: '0.45rem',
              zIndex: 80,
              overflow: 'hidden',
              cursor: 'pointer'
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '145px', borderRadius: '14px', overflow: 'hidden' }}>
              <img
                src={imageSrc}
                alt={caption}
                loading="lazy"
                decoding="async"
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
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: 'var(--text-primary)',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={12} />
              </span>
            </div>
            <div
              style={{
                padding: '0.5rem 0.4rem 0.2rem 0.4rem',
                fontSize: '0.76rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                lineHeight: 1.38,
                color: 'var(--text-primary)',
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
 * Botón en forma de píldora suave para revelar una fotografía dentro del recorrido 2026.
 */
export const ShapeDrawerReveal = ({
  buttonText = 'Ver foto',
  imageSrc,
  caption
}) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <button
        type="button"
        onClick={() => setRevealed((prev) => !prev)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.32rem 0.85rem',
          backgroundColor: revealed ? 'var(--accent-yellow-fill)' : 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          border: 'none',
          borderRadius: '999px',
          fontSize: '0.76rem',
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        data-cursor="Foto"
      >
        <Eye size={13} />
        <span>{revealed ? 'Ocultar foto' : buttonText}</span>
      </button>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ height: 0, opacity: 0, clipPath: 'inset(0 100% 0 0 round 16px)' }}
            animate={{ height: 'auto', opacity: 1, clipPath: 'inset(0 0% 0 0 round 16px)' }}
            exit={{ height: 0, opacity: 0, clipPath: 'inset(0 100% 0 0 round 16px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden', marginTop: '0.55rem' }}
          >
            <div
              style={{
                borderRadius: '16px',
                backgroundColor: '#ffffff',
                padding: '0.4rem',
                boxShadow: '0 8px 20px rgba(20, 44, 76, 0.08)'
              }}
            >
              <img
                src={imageSrc}
                alt={caption}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  maxHeight: '175px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  display: 'block'
                }}
              />
              <div
                style={{
                  padding: '0.4rem 0.35rem 0.1rem 0.35rem',
                  fontSize: '0.76rem',
                  color: 'var(--text-secondary)',
                  fontWeight: 500
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
