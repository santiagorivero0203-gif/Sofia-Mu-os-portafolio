/**
 * @file About.jsx
 * @description Sección "Sobre Mí" y trayectoria profesional de Sofia Muñoz.
 * Diseñada como una doble página editorial:
 * - Columna de Manifiesto Comercial y Pilares Estratégicos.
 * - Línea de Tiempo Interactiva (Timeline de Hitos 2024-2026).
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

export const About = () => {
  const { handleMouseMove } = useSpotlight();

  // Hitos de la trayectoria profesional
  const timelineMilestones = [
    {
      year: '2024',
      badge: 'Tecnología Social',
      title: 'Co-fundadora & Gerente de Marketing en MOVA',
      description:
        'Liderazgo de la narrativa de valor ("Rompiendo el silencio"), estrategia de prensa con portada de revista y despliegue del producto Beta V2.0 en Vercel con soporte para 3 lenguas de señas.',
      accent: 'var(--accent-blue)'
    },
    {
      year: '2025',
      badge: 'Moda & Retail',
      title: 'Embajadora de Marca & Social Selling en Meraki',
      description:
        'Estrategia de social selling y modelaje audiovisual (@meraki_marka). Fidelización mediante unboxing personalizado ("Querida Sofia") y dinamización de ventas directa.',
      accent: 'var(--accent-rose)'
    },
    {
      year: '2026',
      badge: 'Presente',
      title: 'Asesora Comercial & Alianzas Estratégicas',
      description:
        'Consultoría de ventas, prospección de clientes de alto valor, marketing de influencia y desarrollo de oportunidades comerciales orientadas a metas cuantificables.',
      accent: 'var(--accent-gold)'
    }
  ];

  return (
    <section id="sobre-mi" style={{ padding: '6.5rem 0', position: 'relative' }}>
      <div className="site-container">
        {/* Cabecera de la Sección */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="badge-pill" style={{ marginBottom: '0.85rem' }}>
            <Sparkles size={13} style={{ color: 'var(--accent-gold)' }} />
            Perfil & Filosofía Profesional
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h2)',
              lineHeight: 1.15,
              fontWeight: 500,
              maxWidth: '850px'
            }}
          >
            Comercial por vocación,{' '}
            <span className="italic-serif" style={{ color: 'var(--accent-gold)' }}>
              estratega
            </span>{' '}
            por convicción.
          </h2>
        </div>

        {/* Doble Columna Asimétrica */}
        <div className="editorial-grid" style={{ alignItems: 'flex-start' }}>
          {/* COLUMNA IZQUIERDA: Manifiesto y Pilares */}
          <div style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <p style={{ fontSize: '1.08rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              {personalInfo.bio}
            </p>

            {/* Tarjeta de Filosofía de Trabajo con Borde Dorado */}
            <div
              className="spotlight-card"
              onMouseMove={handleMouseMove}
              style={{
                padding: '1.75rem',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderColor: 'var(--border-gold)',
                boxShadow: '0 15px 40px rgba(0,0,0,0.4)'
              }}
            >
              <div
                style={{
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-gold)',
                  marginBottom: '0.6rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                Manifiesto Comercial
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  color: 'var(--text-primary)',
                  lineHeight: 1.6,
                  fontSize: '1.15rem'
                }}
              >
                "{personalInfo.statement}"
              </p>
            </div>

            {/* Pilares Comerciales Clave */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ color: 'var(--accent-blue)', marginBottom: '0.6rem' }}>
                  <HeartHandshake size={22} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                  Empatía Comercial
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  Entiendo las necesidades auténticas del cliente para construir ofertas que cierren ventas y fidelicen.
                </p>
              </div>

              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ color: 'var(--accent-gold)', marginBottom: '0.6rem' }}>
                  <Target size={22} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                  Orientación a Metas
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  Gestión rigurosa del embudo de conversión, manejo de objeciones y aceleración del ciclo de compra.
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
                padding: '2.25rem',
                backgroundColor: 'rgba(18, 19, 25, 0.75)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}>
                <Calendar size={18} style={{ color: 'var(--accent-gold)' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 500 }}>
                  Evolución Profesional & Hitos
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
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
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
                    {/* Punto del timeline */}
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#0b0c10',
                        border: `2px solid ${item.accent}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        zIndex: 2,
                        marginTop: '2px'
                      }}
                    >
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: item.accent }} />
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
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
