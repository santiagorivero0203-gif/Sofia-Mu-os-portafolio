/**
 * @file About.jsx
 * @description Sección "Sobre Mí" y trayectoria profesional de Sofia Muñoz.
 * Diseñada como una doble página editorial:
 * - Columna de Manifiesto Comercial y Pilares Estratégicos.
 * - Línea de Tiempo Interactiva (Timeline de Hitos 2026).
 * - Spotlight reactivo en tarjetas Bento de autor.
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Target,
  HeartHandshake,
  TrendingUp,
  Compass,
  Calendar,
  CheckCircle2,
  Award
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useSpotlight } from '../hooks/useSpotlight';
import { ShapeDrawerReveal, ShutterShapeGallery } from './InteractiveReveal';

export const About = () => {
  const { handleMouseMove } = useSpotlight();

  // Hitos de la trayectoria profesional en 2026 con imagen asociada para revelar al tocar
  const timelineMilestones = [
    {
      year: '2026',
      badge: 'Tecnología Social',
      title: 'Co-fundadora & Marketing en MOVA',
      description:
        'Creación del mensaje de la marca, presencia en portada de revista y lanzamiento de la app web con soporte para 3 lenguas de señas.',
      accent: 'var(--accent-blue)',
      imageSrc: '/assets/mova/detection.jpg',
      imageCaption: 'Demostración en vivo de detección de manos en MOVA'
    },
    {
      year: '2026',
      badge: 'Moda & Ventas',
      title: 'Embajadora & Creadora de Contenido en Meraki',
      description:
        'Videos para redes (@meraki_marka), atención a clientas y detalles personalizados ("Querida Sofia") para impulsar las ventas.',
      accent: 'var(--accent-gold)',
      imageSrc: '/assets/meraki/unboxing.jpg',
      imageCaption: 'Empaque y experiencia de entrega @meraki_marka'
    },
    {
      year: '2026',
      badge: 'Premio Nacional',
      title: '2do Lugar Nacional en Kurios & BNC',
      description:
        'Subcampeonas nacionales en la división comercial (Marketplace) defendiendo el modelo de negocio y ventas.',
      accent: 'var(--accent-gold)',
      imageSrc: '/assets/competitions/kurios_celebracion.jpg',
      imageCaption: 'Celebración del 2do Lugar Nacional en Kurios Competition 2026'
    }
  ];

  return (
    <section id="sobre-mi" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="site-container">
        {/* Cabecera de la Sección */}
        <div style={{ marginBottom: '3rem' }}>
          <div className="badge-pill" style={{ marginBottom: '0.85rem' }}>
            <Sparkles size={13} style={{ color: 'var(--accent-gold)' }} />
            Sobre Mí
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h2)',
              lineHeight: 1.2,
              fontWeight: 500,
              maxWidth: '720px'
            }}
          >
            Comunicación clara, trato cercano y{' '}
            <span className="italic-serif" style={{ color: 'var(--accent-gold)' }}>
              enfoque en ventas.
            </span>
          </h2>
        </div>

        {/* Doble Columna con Buen Espaciado */}
        <div className="editorial-grid" style={{ alignItems: 'flex-start' }}>
          {/* COLUMNA IZQUIERDA: Perfil y Pilares */}
          <div style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <p style={{ fontSize: '1.04rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {personalInfo.bio}
            </p>

            {/* Tarjeta de Enfoque con Borde Amarillo */}
            <div
              className="spotlight-card"
              onMouseMove={handleMouseMove}
              style={{
                padding: '1.6rem',
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--accent-gold)'
              }}
            >
              <div
                style={{
                  fontSize: '0.76rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-gold)',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                Mi Enfoque
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  color: 'var(--text-primary)',
                  lineHeight: 1.55,
                  fontSize: '1.15rem'
                }}
              >
                "{personalInfo.statement}"
              </p>
            </div>

            {/* Pilares Clave */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: '2px',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ color: 'var(--accent-blue-sky)', marginBottom: '0.5rem' }}>
                  <HeartHandshake size={20} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                  Trato Cercano
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  Escucho lo que el cliente necesita para ofrecer soluciones reales y generar confianza.
                </p>
              </div>

              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: '2px',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
                  <Target size={20} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                  Enfoque en Metas
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  Trabajo cada contenido y conversación con un objetivo claro: concretar ventas.
                </p>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Línea de Tiempo de Hitos (Timeline) */}
          <div style={{ gridColumn: 'span 6' }}>
            <div
              className="spotlight-card"
              onMouseMove={handleMouseMove}
              style={{
                padding: '2rem',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Calendar size={18} style={{ color: 'var(--accent-gold)' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 500 }}>
                  Recorrido en 2026
                </h3>
              </div>

              {/* Items del Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', position: 'relative' }}>
                {/* Línea vertical decorativa */}
                <div
                  style={{
                    position: 'absolute',
                    top: '15px',
                    bottom: '15px',
                    left: '11px',
                    width: '1px',
                    backgroundColor: 'var(--border-subtle)'
                  }}
                />

                {timelineMilestones.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    style={{ display: 'flex', gap: '1.25rem', position: 'relative' }}
                  >
                    {/* Punto cuadrado arquitectónico del timeline */}
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '2px',
                        backgroundColor: 'var(--bg-primary)',
                        border: `2px solid ${item.accent}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        zIndex: 2,
                        marginTop: '2px'
                      }}
                    >
                      <div style={{ width: '8px', height: '8px', borderRadius: '0px', backgroundColor: item.accent }} />
                    </div>

                    {/* Contenido del hito */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            color: item.accent
                          }}
                        >
                          {item.year}
                        </span>
                        <span className="badge-pill" style={{ padding: '0.15rem 0.5rem', fontSize: '0.68rem' }}>
                          {item.badge}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                        {item.title}
                      </h4>

                      <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {item.description}
                      </p>

                      {/* Forma Geométrica Interactiva que al tocarla despliega la foto del hito */}
                      <ShapeDrawerReveal
                        buttonText="Toca para ver foto"
                        imageSrc={item.imageSrc}
                        caption={item.imageCaption}
                        accentColor={item.accent}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mosaico de Formas Geométricas Interactivas (Shutter Gallery) */}
        <ShutterShapeGallery />
      </div>
    </section>
  );
};
