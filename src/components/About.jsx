/**
 * @file About.jsx
 * @description Sección "Sobre Mí" con estructura visual limpia, sin subdivisiones excesivas
 * y con tarjetas suavemente redondeadas.
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Target,
  HeartHandshake,
  Calendar
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useSpotlight } from '../hooks/useSpotlight';
import { ShapeDrawerReveal } from './InteractiveReveal';

export const About = () => {
  const { handleMouseMove } = useSpotlight();

  const timelineMilestones = [
    {
      title: 'Co-fundadora y Marketing en MOVA',
      description:
        'Creación del mensaje de la marca, aparición en portada de revista y lanzamiento de la web con traducción en 3 lenguas de señas.',
      imageSrc: '/assets/mova/detection.jpg',
      imageCaption: 'Reconocimiento de las manos con la cámara en MOVA'
    },
    {
      title: 'Embajadora y Creadora de Contenido en Meraki',
      description:
        'Grabación de videos para Instagram (@meraki_marka), atención a clientas y entregas con detalles personalizados ("Querida Sofia").',
      imageSrc: '/assets/meraki/unboxing.jpg',
      imageCaption: 'Empaque y presentación de entrega de @meraki_marka'
    },
    {
      title: '2do Lugar Nacional en Torneo Kurios',
      description:
        'Ganadoras del 2do lugar nacional en la categoría comercial defendiendo la utilidad y propuesta de ventas del proyecto.',
      imageSrc: '/assets/competitions/kurios_celebracion.jpg',
      imageCaption: 'Celebración del 2do Lugar Nacional en el Torneo Kurios 2026'
    }
  ];

  return (
    <section id="sobre-mi" style={{ padding: '4.5rem 0', position: 'relative' }}>
      <div className="site-container">
        {/* Cabecera Limpia */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="badge-pill status-active" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} />
            <span>Sobre Mí</span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h2)',
              lineHeight: 1.2,
              fontWeight: 600,
              maxWidth: '680px',
              color: 'var(--text-primary)'
            }}
          >
            Comunicación clara, trato cercano y{' '}
            <span className="italic-serif" style={{ color: 'var(--accent-blue)' }}>
              enfoque en ventas
            </span>
          </h2>
        </div>

        {/* Dos Tarjetas Limpias y Redondeadas (Sin subdividir en múltiples sub-cajas) */}
        <div className="editorial-grid" style={{ alignItems: 'stretch' }}>
          {/* COLUMNA IZQUIERDA: Perfil Unificado */}
          <div style={{ gridColumn: 'span 6', display: 'flex' }}>
            <div
              className="spotlight-card"
              onMouseMove={handleMouseMove}
              style={{
                padding: '2.25rem',
                borderRadius: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.75rem',
                width: '100%'
              }}
            >
              <div>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  {personalInfo.bio}
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    color: 'var(--text-primary)',
                    lineHeight: 1.5,
                    fontSize: '1.3rem',
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '1.25rem 1.5rem',
                    borderRadius: '20px'
                  }}
                >
                  "{personalInfo.statement}"
                </p>
              </div>

              {/* Dos Pilares Integrados sin bordes pesados */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-yellow-fill)',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <HeartHandshake size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                      Trato Cercano
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      Escucho lo que el cliente necesita para ofrecer soluciones reales y generar confianza.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: '#cfe4fc',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Target size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                      Enfoque en Metas
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      Trabajo cada contenido y conversación con un objetivo claro: concretar ventas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Recorrido en 2026 */}
          <div style={{ gridColumn: 'span 6', display: 'flex' }}>
            <div
              className="spotlight-card"
              onMouseMove={handleMouseMove}
              style={{
                padding: '2.25rem',
                borderRadius: '28px',
                width: '100%'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-yellow-fill)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)'
                  }}
                >
                  <Calendar size={17} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 600 }}>
                  Recorrido en 2026
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {timelineMilestones.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.1 }}
                  >
                    <h4 style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                      {item.title}
                    </h4>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {item.description}
                    </p>

                    <ShapeDrawerReveal
                      buttonText="Ver foto"
                      imageSrc={item.imageSrc}
                      caption={item.imageCaption}
                    />
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
