/**
 * @file About.jsx
 * @description Sección "Sobre Mí" con narrativa comercial, propuesta de valor
 * y pilares estratégicos de Sofia Muñoz enfocados en generar tracción y confianza.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Users2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const About = () => {
  return (
    <section id="sobre-mi" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="site-container">
        <div className="editorial-grid">
          {/* Columna Izquierda: Introducción y Cita Editorial */}
          <div style={{ gridColumn: 'span 5' }}>
            <div className="badge-pill" style={{ marginBottom: '1rem' }}>
              <Sparkles size={13} style={{ color: 'var(--accent-gold)' }} />
              Perfil & Enfoque
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                lineHeight: 1.15,
                fontWeight: 500,
                marginBottom: '1.5rem'
              }}
            >
              Comercial por vocación,{' '}
              <span className="italic-serif" style={{ color: 'var(--accent-gold)' }}>
                estratega
              </span>{' '}
              por convicción.
            </h2>

            <div
              style={{
                padding: '1.75rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '2rem'
              }}
            >
              <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Filosofía de Trabajo
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.6, fontSize: '1.05rem' }}>
                "{personalInfo.statement}"
              </p>
            </div>
          </div>

          {/* Columna Derecha: Trayectoria y Pilares Estratégicos */}
          <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {personalInfo.bio}
            </p>

            {/* Pilares Comerciales */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ color: 'var(--accent-blue)', marginBottom: '0.75rem' }}>
                  <HeartHandshake size={24} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Empatía Comercial
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Entiendo las necesidades auténticas del cliente para construir propuestas de valor que cierren ventas y consoliden lealtad.
                </p>
              </div>

              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
                  <Target size={24} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Orientación a Resultados
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Definición clara de metas, gestión de embudo de prospección y seguimiento metódico hasta la conversión final.
                </p>
              </div>

              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ color: 'var(--accent-rose)', marginBottom: '0.75rem' }}>
                  <Users2 size={24} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Social Selling & Embajada
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Creación de contenido dinámico para conectar comunidades, humanizar marcas y dinamizar canales comerciales directos.
                </p>
              </div>

              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ color: '#4ade80', marginBottom: '0.75rem' }}>
                  <ShieldCheck size={24} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Liderazgo & Negociación
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Capacidad probada de representación institucional, pitches con patrocinadores y alianzas estratégicas duraderas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
