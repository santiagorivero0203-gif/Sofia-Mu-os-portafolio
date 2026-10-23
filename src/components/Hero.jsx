/**
 * @file Hero.jsx
 * @description Sección de aterrizaje editorial de alto impacto para Sofia Muñoz.
 * Presenta el valor comercial, tipografía kinetic contrastada y enlaces de acción inmediata.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, MessageCircle, Sparkles, Award, TrendingUp, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Hero = ({ lenisInstance }) => {
  const scrollToProjects = (e) => {
    e.preventDefault();
    if (lenisInstance) {
      lenisInstance.scrollTo('#proyectos', { offset: -60, duration: 1.2 });
    } else {
      const el = document.querySelector('#proyectos');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '8rem',
        paddingBottom: '5rem',
        position: 'relative'
      }}
    >
      <div className="site-container">
        {/* Badge de Disponibilidad y Autoridad */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: '1.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}
        >
          <div className="badge-pill status-active">
            <span className="status-dot"></span>
            <span>{personalInfo.contact.availability}</span>
          </div>

          <div className="badge-pill">
            <Award size={13} style={{ color: 'var(--accent-gold)' }} />
            <span>Co-fundadora MOVA & Embajadora Meraki</span>
          </div>
        </motion.div>

        {/* Título Principal Editorial de Alto Contraste */}
        <div style={{ maxWidth: '1050px', marginBottom: '2.5rem' }}>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'var(--text-hero)',
              lineHeight: 1.05,
              fontWeight: 500,
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem'
            }}
          >
            Impulsando el valor de marcas mediante{' '}
            <span className="italic-serif" style={{ color: 'var(--accent-gold)', fontWeight: 400 }}>
              estrategia comercial
            </span>{' '}
            y narrativa de impacto.
          </motion.h1>

          {/* Declaración Profesional de Sofía */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--text-secondary)',
              maxWidth: '780px',
              lineHeight: 1.65
            }}
          >
            "{personalInfo.statement}"
          </motion.p>
        </div>

        {/* Botones de Conversión Rápida */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            marginBottom: '4rem'
          }}
        >
          <a
            href={personalInfo.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic btn-gold"
            data-cursor="WhatsApp"
          >
            <MessageCircle size={18} />
            <span>Iniciar Conversación Comercial</span>
          </a>

          <a
            href="#proyectos"
            onClick={scrollToProjects}
            className="btn-magnetic btn-outline"
            data-cursor="Explorar"
          >
            <span>Ver Casos de Estudio</span>
            <ArrowDown size={16} />
          </a>
        </motion.div>

        {/* Métricas y Pilares Resumidos (Mini Bento) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '2.5rem'
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div
              style={{
                padding: '0.65rem',
                borderRadius: '12px',
                background: 'var(--accent-blue-soft)',
                color: 'var(--accent-blue)'
              }}
            >
              <TrendingUp size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Social Selling & Ventas
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Generación de demanda, prospección B2B/B2C y fidelización.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div
              style={{
                padding: '0.65rem',
                borderRadius: '12px',
                background: 'var(--accent-gold-soft)',
                color: 'var(--accent-gold)'
              }}
            >
              <Sparkles size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Embajadora de Marca
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Creación de contenido audiovisual con enfoque directo a conversión.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div
              style={{
                padding: '0.65rem',
                borderRadius: '12px',
                background: 'rgba(34, 197, 94, 0.15)',
                color: '#4ade80'
              }}
            >
              <CheckCircle2 size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Innovación & Liderazgo
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Co-fundación y validación de tecnología social validada en Vercel.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
