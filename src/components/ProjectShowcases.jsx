/**
 * @file ProjectShowcases.jsx
 * @description Experiencias interactivas vivas para los dos casos de estudio principales de Sofia Muñoz:
 * 1. MovaInteractiveShowcase: Visualizador de nodos de articulación de la mano en SVG (PUL, ÍND, MED, ANU, MEÑ)
 *    con selector interactivo de idiomas (LSV, ASL, LSE), frases rápidas y conmutador de foto real.
 * 2. MerakiInteractiveShowcase: Tarjeta personalizada "¡HOLI! ya llegué!! — Querida Sofia" combinada con
 *    abanico fotográfico 3D interactivo de las 3 imágenes reales de @meraki_marka.
 * 3. DiagonalArrowIcon: Icono vectorial de doble flecha diagonal con transición suave.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Icono SVG de alta precisión con transición diagonal
 */
export const DiagonalArrowIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
    aria-hidden="true"
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

/**
 * CASO 01 — MOVA: Visualizador Interactivo de Nodos SVG + Foto Real
 */
export const MovaInteractiveShowcase = () => {
  const [activeTab, setActiveTab] = useState('photo'); // 'photo' | 'nodes'
  const [selectedLang, setSelectedLang] = useState('LSV');
  const [selectedPhrase, setSelectedPhrase] = useState('Hola');

  const languages = [
    { code: 'LSV', label: '🇻🇪 LSV', desc: 'Lengua de Señas Venezolana' },
    { code: 'ASL', label: '🇺🇸 ASL', desc: 'Lengua de Señas Estadounidense' },
    { code: 'LSE', label: '🇪🇸 LSE', desc: 'Lengua de Señas Española' }
  ];

  const phrases = [
    { key: 'Hola', label: '💬 Hola' },
    { key: 'Gracias', label: '❤️ Gracias' },
    { key: 'Ayuda', label: '⚠️ Ayuda' }
  ];

  const handNodes = [
    { cx: 100, cy: 175, color: '#10B981', r: 5.5 },
    { cx: 54, cy: 128, color: '#10B981', r: 4.5 },
    { cx: 36, cy: 90, color: '#f59e0b', r: 6 },
    { cx: 76, cy: 105, color: '#10B981', r: 4.5 },
    { cx: 70, cy: 50, color: '#2563eb', r: 5.5 },
    { cx: 100, cy: 100, color: '#10B981', r: 4.5 },
    { cx: 100, cy: 42, color: '#2563eb', r: 5.5 },
    { cx: 124, cy: 107, color: '#10B981', r: 4.5 },
    { cx: 130, cy: 54, color: '#2563eb', r: 5.5 },
    { cx: 146, cy: 124, color: '#10B981', r: 4.5 },
    { cx: 158, cy: 82, color: '#ec4899', r: 5.5 }
  ];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'relative',
        width: '100%',
        height: '240px',
        borderRadius: '20px',
        overflow: 'hidden',
        backgroundColor: '#e2effc',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* Selector Superior Flotante: Foto Real vs Simulador de Señas */}
      <div
        style={{
          position: 'absolute',
          top: '0.65rem',
          left: '0.65rem',
          right: '0.65rem',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(8px)',
            borderRadius: '999px',
            padding: '0.2rem',
            boxShadow: '0 4px 12px rgba(20, 44, 76, 0.08)'
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('photo')}
            style={{
              padding: '0.28rem 0.7rem',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: activeTab === 'photo' ? 'var(--accent-yellow-fill)' : 'transparent',
              color: 'var(--text-primary)',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Portada Real
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('nodes')}
            style={{
              padding: '0.28rem 0.7rem',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: activeTab === 'nodes' ? 'var(--accent-yellow-fill)' : 'transparent',
              color: 'var(--text-primary)',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            ✋ Simulador Señas
          </button>
        </div>

        <span
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            color: 'var(--text-primary)',
            padding: '0.28rem 0.7rem',
            borderRadius: '999px',
            fontSize: '0.7rem',
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(20, 44, 76, 0.06)'
          }}
        >
          LSV · ASL · LSE
        </span>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'photo' ? (
          <motion.div
            key="mova-photo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ width: '100%', height: '100%', position: 'relative' }}
          >
            <img
              src="/assets/mova/revista.jpg"
              alt="MOVA Portada de Revista"
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '0.65rem',
                left: '0.65rem',
                right: '0.65rem',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(8px)',
                borderRadius: '999px',
                padding: '0.38rem 0.85rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.74rem',
                fontWeight: 700,
                color: 'var(--text-primary)'
              }}
            >
              <span>“Rompiendo el silencio” — Portada de Revista</span>
              <button
                type="button"
                onClick={() => setActiveTab('nodes')}
                style={{
                  background: 'var(--accent-yellow-fill)',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '0.2rem 0.65rem',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                Probar mano ✋
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="mova-nodes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              width: '100%',
              height: '100%',
              padding: '2.9rem 0.85rem 0.65rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              background: 'linear-gradient(135deg, #d7e9fc 0%, #eaf4fe 100%)'
            }}
          >
            {/* Mano Vectorial con Nodos de Articulación Animados */}
            <div
              style={{
                position: 'relative',
                width: '45%',
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.78)',
                borderRadius: '16px',
                display: 'flex',
                 flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.35rem'
              }}
            >
              <svg viewBox="0 0 200 200" style={{ width: '115px', height: '115px' }} fill="none">
                <motion.path
                  d="M100 175 L54 128 L36 90 M100 175 L76 105 L70 50 M100 175 L100 100 L100 42 M100 175 L124 107 L130 54 M100 175 L146 124 L158 82 M54 128 L76 105 L100 100 L124 107 L146 124"
                  stroke="#2563eb"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0.2, opacity: 0.6 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut'
                  }}
                />
                {handNodes.map((node, i) => (
                  <circle key={i} cx={node.cx} cy={node.cy} r={node.r} fill={node.color} />
                ))}
              </svg>
              <div style={{ display: 'flex', gap: '0.3rem', fontSize: '0.62rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                {['PUL', 'ÍND', 'MED', 'ANU', 'MEÑ'].map((f) => (
                  <span key={f}>{f}</span>
                ))}
              </div>
            </div>

            {/* Panel Interactivo de Idiomas y Frases */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              {/* Selector de los 3 Mercados */}
              <div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                  Idioma activo:
                </div>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setSelectedLang(lang.code)}
                      style={{
                        padding: '0.25rem 0.55rem',
                        borderRadius: '999px',
                        border: 'none',
                        backgroundColor: selectedLang === lang.code ? 'var(--accent-yellow-fill)' : '#ffffff',
                        color: 'var(--text-primary)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector de Frases Rápidas */}
              <div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                  Prueba una seña rápida:
                </div>
                <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                  {phrases.map((p) => (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setSelectedPhrase(p.key)}
                      style={{
                        padding: '0.25rem 0.55rem',
                        borderRadius: '999px',
                        border: 'none',
                        backgroundColor: selectedPhrase === p.key ? '#2563eb' : '#ffffff',
                        color: selectedPhrase === p.key ? '#ffffff' : 'var(--text-primary)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resultado de Traducción en Tiempo Real */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '0.45rem 0.7rem',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>Traducción ({selectedLang}):</span>
                <span style={{ color: 'var(--accent-blue)' }}>“{selectedPhrase}” 🔊</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * CASO 02 — MERAKI: Abanico Fotográfico 3D + Nota Personalizada "Querida Sofia"
 */
export const MerakiInteractiveShowcase = () => {
  const [activeTab, setActiveTab] = useState('fan'); // 'fan' | 'card'
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const photos = [
    { src: '/assets/meraki/clothing.jpg', label: 'Colección' },
    { src: '/assets/meraki/querida_sofia.jpg', label: 'Querida Sofia' },
    { src: '/assets/meraki/unboxing.jpg', label: 'Entrega' }
  ];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'relative',
        width: '100%',
        height: '240px',
        borderRadius: '20px',
        overflow: 'hidden',
        backgroundColor: '#e2effc',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* Barra Superior */}
      <div
        style={{
          position: 'absolute',
          top: '0.65rem',
          left: '0.65rem',
          right: '0.65rem',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(8px)',
            borderRadius: '999px',
            padding: '0.2rem',
            boxShadow: '0 4px 12px rgba(20, 44, 76, 0.08)'
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('fan')}
            style={{
              padding: '0.28rem 0.7rem',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: activeTab === 'fan' ? 'var(--accent-yellow-fill)' : 'transparent',
              color: 'var(--text-primary)',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Fotos Reales
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('card')}
            style={{
              padding: '0.28rem 0.7rem',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: activeTab === 'card' ? 'var(--accent-yellow-fill)' : 'transparent',
              color: 'var(--text-primary)',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            💌 Tarjeta “Querida Sofia”
          </button>
        </div>

        <span
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            color: 'var(--text-primary)',
            padding: '0.28rem 0.7rem',
            borderRadius: '999px',
            fontSize: '0.7rem',
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(20, 44, 76, 0.06)'
          }}
        >
          @meraki_marka
        </span>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'fan' ? (
          <motion.div
            key="meraki-fan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ width: '100%', height: '100%', position: 'relative' }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={photos[selectedPhoto].src}
                src={photos[selectedPhoto].src}
                alt={photos[selectedPhoto].label}
                initial={{ clipPath: 'inset(0 100% 0 0)', scale: 1.05 }}
                animate={{ clipPath: 'inset(0 0% 0 0)', scale: 1 }}
                exit={{ clipPath: 'inset(0 0 0 100%)', scale: 1.02 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </AnimatePresence>

            {/* Selector de las 3 Fotos en la parte inferior */}
            <div
              style={{
                position: 'absolute',
                bottom: '0.65rem',
                left: '0.65rem',
                right: '0.65rem',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(8px)',
                borderRadius: '999px',
                padding: '0.3rem 0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              {photos.map((p, idx) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setSelectedPhoto(idx)}
                  style={{
                    flex: 1,
                    padding: '0.24rem 0.5rem',
                    borderRadius: '999px',
                    border: 'none',
                    backgroundColor: selectedPhoto === idx ? 'var(--accent-yellow-fill)' : 'transparent',
                    color: 'var(--text-primary)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="meraki-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              width: '100%',
              height: '100%',
              padding: '2.9rem 0.9rem 0.65rem 0.9rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, #d7e9fc 0%, #eaf4fe 100%)'
            }}
          >
            {/* Recreación Interactiva de la Nota Personalizada de Meraki */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '0.85rem 1.1rem',
                boxShadow: '0 8px 22px rgba(20, 44, 76, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <span style={{ fontWeight: 800, color: '#d98a00', fontSize: '0.95rem' }}>¡HOLI! ya llegué!!</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: '0.92rem',
                      color: 'var(--accent-blue)',
                      fontWeight: 600
                    }}
                  >
                    “Querida Sofia”
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                  “Todas nuestras prendas están hechas para que <strong>TÚ</strong> te sientas <strong>cómoda y segura</strong>.”
                </p>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.35rem',
                  color: 'var(--accent-blue)',
                  flexShrink: 0
                }}
              >
                meraki
              </div>
            </div>

            {/* Globos de Conversión de Historias ("Atentos a mis Redes / Hoy 5:30 PM") */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '999px',
                  backgroundColor: 'var(--accent-yellow-fill)',
                  color: 'var(--text-primary)',
                  fontSize: '0.74rem',
                  fontWeight: 700
                }}
              >
                Atentos a mis Redes ✨
              </span>
              <span
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '999px',
                  backgroundColor: '#ffffff',
                  color: 'var(--accent-blue)',
                  fontSize: '0.74rem',
                  fontWeight: 700
                }}
              >
                Lanzamiento · Hoy 5:30 PM
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
