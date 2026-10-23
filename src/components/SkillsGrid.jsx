/**
 * @file SkillsGrid.jsx
 * @description Matriz de competencias comerciales, habilidades duras y blandas
 * organizadas en categorías claras para evaluadores de talento y reclutadores comerciales.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Briefcase, BarChart3, Wrench } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

export const SkillsGrid = () => {
  const getCategoryIcon = (index) => {
    switch (index) {
      case 0:
        return <BarChart3 size={20} style={{ color: 'var(--accent-gold)' }} />;
      case 1:
        return <Briefcase size={20} style={{ color: 'var(--accent-blue)' }} />;
      case 2:
        return <Wrench size={20} style={{ color: 'var(--accent-rose)' }} />;
      default:
        return <Star size={20} />;
    }
  };

  return (
    <section id="habilidades" style={{ padding: '6rem 0', backgroundColor: 'rgba(255, 255, 255, 0.01)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="site-container">
        <div style={{ marginBottom: '3.5rem', textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-pill" style={{ marginBottom: '1rem' }}>
            <Star size={13} style={{ color: 'var(--accent-gold)' }} />
            Competencias de Alto Rendimiento
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h2)',
              lineHeight: 1.15,
              fontWeight: 500,
              marginBottom: '0.75rem'
            }}
          >
            Habilidades para el{' '}
            <span className="italic-serif" style={{ color: 'var(--accent-gold)' }}>
              rol comercial
            </span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Un equilibrio sólido entre técnica comercial, desarrollo de audiencias y herramientas de gestión digital.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={catIdx}
              className="spotlight-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.15 }}
              style={{
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getCategoryIcon(catIdx)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {cat.title}
                    </h3>
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
                  {cat.description}
                </p>

                {/* Lista de Habilidades */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cat.skills.map((skill, sIdx) => (
                    <li
                      key={sIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: '0.75rem',
                        borderBottom: sIdx !== cat.skills.length - 1 ? '1px solid rgba(255, 255, 255, 0.04)' : 'none'
                      }}
                    >
                      <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Check size={14} style={{ color: 'var(--accent-gold)' }} />
                        {skill.name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {skill.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
