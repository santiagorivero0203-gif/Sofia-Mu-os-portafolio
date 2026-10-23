/**
 * @file SkillsGrid.jsx
 * @description Matriz de competencias comerciales, habilidades duras y blandas
 * organizadas en categorías claras para evaluadores de talento y reclutadores comerciales.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Briefcase, BarChart3, Wrench } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { useSpotlight } from '../hooks/useSpotlight';

export const SkillsGrid = () => {
  const { handleMouseMove } = useSpotlight();

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
        <div style={{ marginBottom: '3rem', textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
          <div className="badge-pill" style={{ marginBottom: '0.85rem' }}>
            <Star size={13} style={{ color: 'var(--accent-gold)' }} />
            Habilidades
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h2)',
              lineHeight: 1.2,
              fontWeight: 500,
              marginBottom: '0.65rem'
            }}
          >
            En qué puedo{' '}
            <span className="italic-serif" style={{ color: 'var(--accent-gold)' }}>
              aportar valor
            </span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.6 }}>
            Ventas directas, creación de contenido para redes y manejo de herramientas digitales.
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
              onMouseMove={handleMouseMove}
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
                      borderRadius: '10px',
                      backgroundColor: 'var(--bg-secondary)',
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
                          padding: '0.2rem 0.65rem',
                          borderRadius: '999px',
                          backgroundColor: 'var(--bg-secondary)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--accent-gold)',
                          fontWeight: 600
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
