/**
 * @file SkillsGrid.jsx
 * @description Habilidades comerciales y creativas presentadas en 3 tarjetas limpias,
 * suavemente redondeadas y sin líneas divisorias internas.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Briefcase, BarChart3, Wrench } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { useSpotlight } from '../hooks/useSpotlight';

export const SkillsGrid = () => {
  const { handleMouseMove } = useSpotlight();

  const getCategoryIcon = (index) => {
    switch (index) {
      case 0:
        return <BarChart3 size={19} />;
      case 1:
        return <Briefcase size={19} />;
      case 2:
        return <Wrench size={19} />;
      default:
        return <Star size={19} />;
    }
  };

  return (
    <section id="habilidades" style={{ padding: '4.5rem 0' }}>
      <div className="site-container">
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="badge-pill status-active" style={{ marginBottom: '0.75rem' }}>
            <Star size={14} />
            <span>Habilidades</span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h2)',
              lineHeight: 1.2,
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}
          >
            En qué puedo{' '}
            <span className="italic-serif" style={{ color: 'var(--accent-blue)' }}>
              aportar valor
            </span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={catIdx}
              className="spotlight-card"
              onMouseMove={handleMouseMove}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: catIdx * 0.12 }}
              style={{
                padding: '2rem',
                borderRadius: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.25rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: catIdx % 2 === 0 ? 'var(--accent-yellow-fill)' : '#cfe4fc',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {getCategoryIcon(catIdx)}
                  </div>
                  <h3 style={{ fontSize: '1.22rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {cat.title}
                  </h3>
                </div>

                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  {cat.description}
                </p>

                {/* Píldoras Suaves y Limpias en lugar de filas con bordes */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.48rem 0.95rem',
                        borderRadius: '999px',
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.86rem',
                        fontWeight: 600
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
