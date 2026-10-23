/**
 * @file About.jsx
 * @description Sección ejecutiva compacta que integra la foto de presentación de Sofia Muñoz,
 * su perfil, Habilidades Clave y Recorrido 2026 en una sola vista de dos columnas.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Star } from 'lucide-react';
import { personalInfo, skillCategories } from '../data/portfolioData';
import { useSpotlight } from '../hooks/useSpotlight';
import { ShapeDrawerReveal } from './InteractiveReveal';

export const About = () => {
  const { handleMouseMove } = useSpotlight();

  const timelineMilestones = [
    {
      title: 'Co-fundadora y Marketing en MOVA',
      description:
        'Mensaje de marca, portada de revista y lanzamiento web con traducción en 3 lenguas de señas.',
      imageSrc: '/assets/mova/detection.jpg',
      imageCaption: 'Reconocimiento de las manos con la cámara en MOVA'
    },
    {
      title: 'Embajadora y Creadora de Contenido en Meraki',
      description:
        'Videos para Instagram (@meraki_marka), asesoría a clientas y entregas personalizadas ("Querida Sofia").',
      imageSrc: '/assets/meraki/unboxing.jpg',
      imageCaption: 'Empaque y presentación de entrega de @meraki_marka'
    },
    {
      title: '2do Lugar Nacional en Torneo Kurios',
      description:
        'Premio nacional en la categoría comercial defendiendo la utilidad y propuesta de ventas del proyecto.',
      imageSrc: '/assets/competitions/kurios_celebracion.jpg',
      imageCaption: 'Celebración del 2do Lugar Nacional en el Torneo Kurios 2026'
    }
  ];

  return (
    <section id="sobre-mi" style={{ padding: '2.5rem 0', position: 'relative' }}>
      <div className="site-container">
        <div style={{ marginBottom: '1.5rem' }}>
          <div className="badge-pill status-active" style={{ marginBottom: '0.5rem' }}>
            <Sparkles size={14} />
            <span>Perfil & Habilidades</span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h2)',
              lineHeight: 1.18,
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}
          >
            Sobre mí, habilidades y{' '}
            <span className="italic-serif" style={{ color: 'var(--accent-blue)' }}>
              recorrido 2026
            </span>
          </h2>
        </div>

        <div className="editorial-grid" style={{ alignItems: 'stretch', gap: '1.75rem' }}>
          {/* COLUMNA IZQUIERDA: Foto de Presentación + Perfil + Habilidades Clave */}
          <div style={{ gridColumn: 'span 6', display: 'flex' }}>
            <div
              className="spotlight-card"
              onMouseMove={handleMouseMove}
              style={{
                padding: '1.75rem',
                borderRadius: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.25rem',
                width: '100%'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <img
                    src="/assets/sofia_perfil.jpg"
                    alt="Sofia Muñoz"
                    style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '20px',
                      objectFit: 'cover',
                      objectPosition: 'center 22%',
                      border: '2px solid var(--accent-yellow-fill)',
                      flexShrink: 0,
                      boxShadow: '0 6px 16px rgba(20, 44, 76, 0.08)'
                    }}
                  />
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {personalInfo.bio}
                  </p>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    color: 'var(--text-primary)',
                    lineHeight: 1.45,
                    fontSize: '1.12rem',
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '0.9rem 1.15rem',
                    borderRadius: '18px',
                    margin: 0
                  }}
                >
                  "{personalInfo.statement}"
                </p>
              </div>

              {/* Habilidades Clave */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
                  <Star size={16} style={{ color: 'var(--accent-blue)' }} />
                  <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Habilidades principales
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {skillCategories.map((cat, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-blue)', marginBottom: '0.3rem' }}>
                        {cat.title}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.38rem' }}>
                        {cat.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            style={{
                              padding: '0.3rem 0.72rem',
                              borderRadius: '999px',
                              backgroundColor: 'var(--bg-secondary)',
                              color: 'var(--text-primary)',
                              fontSize: '0.78rem',
                              fontWeight: 600
                            }}
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Recorrido en 2026 con Fotos */}
          <div style={{ gridColumn: 'span 6', display: 'flex' }}>
            <div
              className="spotlight-card"
              onMouseMove={handleMouseMove}
              style={{
                padding: '1.75rem',
                borderRadius: '28px',
                width: '100%'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '1.15rem' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-yellow-fill)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)'
                  }}
                >
                  <Calendar size={16} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.28rem', fontWeight: 600 }}>
                  Recorrido en 2026
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                {timelineMilestones.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                  >
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                      {item.title}
                    </h4>

                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
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
