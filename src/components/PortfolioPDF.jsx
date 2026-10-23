/**
 * @file PortfolioPDF.jsx
 * @description Módulo de generación y exportación del portafolio en PDF estructurado.
 * Genera un dossier ejecutivo imprimible con vectorización nativa (A4),
 * tipografía editorial de alto contraste, enlaces verificados y diseño corporativo limpio.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Printer, X, FileText, CheckCircle2, Mail, Phone, ExternalLink, Trophy } from 'lucide-react';
import { personalInfo, projects, skillCategories, competitions } from '../data/portfolioData';

/**
 * Componente PortfolioPDF
 * @param {{ isOpen: boolean, onClose: () => void }} props
 */
export const PortfolioPDF = ({ isOpen, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* 1. DOCUMENTO IMPRIMIBLE ESTRUCTURADO (@media print) */}
      <div className="print-only pdf-dossier" style={{ padding: '0.5cm', color: '#0f172a' }}>
        {/* Cabecera del Dossier A4 */}
        <div
          style={{
            borderBottom: '2.5px solid #2563eb',
            paddingBottom: '1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '26pt',
                fontWeight: 700,
                color: '#0f172a',
                lineHeight: 1.1,
                margin: 0
              }}
            >
              {personalInfo.name}
            </h1>
            <p
              style={{
                fontSize: '12pt',
                fontWeight: 600,
                color: '#2563eb',
                marginTop: '0.3rem',
                marginBottom: '0.4rem'
              }}
            >
              Asesora Comercial | Estrategia de Ventas | Creadora de Contenido & Embajadora de Marca
            </p>
            <p style={{ fontSize: '9pt', color: '#475569', maxWidth: '580px', fontStyle: 'italic', margin: 0 }}>
              "{personalInfo.statement}"
            </p>
          </div>

          <div
            style={{
              textAlign: 'right',
              fontSize: '8.5pt',
              color: '#334155',
              borderLeft: '1px solid #cbd5e1',
              paddingLeft: '1rem'
            }}
          >
            <div style={{ fontWeight: 600, color: '#0f172a' }}>Contacto Directo:</div>
            <div>{personalInfo.contact.email}</div>
            <div>{personalInfo.contact.phoneFormatted}</div>
            <div>Caracas, Venezuela</div>
            <div style={{ color: '#16a34a', fontWeight: 600, marginTop: '0.2rem' }}>
              Disponible para alianzas & ventas
            </div>
          </div>
        </div>

        {/* Resumen Ejecutivo */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '12pt',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#1e293b',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '0.3rem',
              marginBottom: '0.6rem'
            }}
          >
            Perfil & Propuesta de Valor
          </h2>
          <p style={{ fontSize: '9.5pt', color: '#334155', lineHeight: 1.6, margin: 0 }}>
            {personalInfo.bio}
          </p>
        </div>

        {/* Casos de Estudio Reales (2026) */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '12pt',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#1e293b',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '0.3rem',
              marginBottom: '1rem'
            }}
          >
            Casos de Estudio & Proyectos Clave (2026)
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {projects.map((proj) => (
              <div
                key={proj.id}
                style={{
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '1rem',
                  backgroundColor: '#f8fafc'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <h3 style={{ fontSize: '11pt', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                    {proj.title}
                  </h3>
                  <span style={{ fontSize: '8.5pt', fontWeight: 600, color: '#2563eb' }}>
                    {proj.role} • 2026
                  </span>
                </div>

                <p style={{ fontSize: '9pt', color: '#475569', fontStyle: 'italic', marginBottom: '0.6rem' }}>
                  "{proj.tagline}"
                </p>

                <p style={{ fontSize: '9pt', color: '#334155', lineHeight: 1.5, marginBottom: '0.6rem' }}>
                  {proj.overview}
                </p>

                {/* Aporte Comercial */}
                <div style={{ marginBottom: '0.6rem' }}>
                  <div style={{ fontSize: '8.5pt', fontWeight: 700, color: '#0f172a', marginBottom: '0.3rem' }}>
                    Aporte Comercial & Estratégico:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '8.5pt', color: '#334155' }}>
                    {proj.commercialContribution.map((c, i) => (
                      <li key={i} style={{ marginBottom: '0.2rem' }}>
                        <strong>{c.title}:</strong> {c.description}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Logros */}
                <div>
                  <div style={{ fontSize: '8.5pt', fontWeight: 700, color: '#16a34a', marginBottom: '0.2rem' }}>
                    Logros Verificados:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '8pt' }}>
                    {proj.achievements.map((ach, i) => (
                      <span
                        key={i}
                        style={{
                          backgroundColor: '#e2e8f0',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          color: '#0f172a'
                        }}
                      >
                        ✓ {ach}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competencias y Premios Nacionales (2026) */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '12pt',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#1e293b',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '0.3rem',
              marginBottom: '1rem'
            }}
          >
            Validación en Competencias & Premios Nacionales (2026)
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {competitions.map((c) => (
              <div
                key={c.id}
                style={{
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '0.85rem',
                  backgroundColor: '#f8fafc'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '10pt', color: '#0f172a', marginBottom: '0.2rem' }}>
                  {c.award}
                </div>
                <div style={{ fontSize: '8.5pt', color: '#2563eb', fontWeight: 600, marginBottom: '0.4rem' }}>
                  {c.title} ({c.organization})
                </div>
                <p style={{ fontSize: '8pt', color: '#334155', lineHeight: 1.45, margin: 0 }}>
                  {c.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Salto de página para A4 */}
        <div style={{ pageBreakBefore: 'always', paddingTop: '1rem' }}>
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '12pt',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#1e293b',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '0.3rem',
              marginBottom: '1rem'
            }}
          >
            Matriz de Competencias Profesionales
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            {skillCategories.map((cat, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '0.85rem',
                  backgroundColor: '#ffffff'
                }}
              >
                <h4 style={{ fontSize: '9.5pt', fontWeight: 700, color: '#2563eb', marginBottom: '0.4rem' }}>
                  {cat.title}
                </h4>
                <p style={{ fontSize: '8pt', color: '#64748b', marginBottom: '0.6rem' }}>
                  {cat.description}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '8pt' }}>
                  {cat.skills.map((s, si) => (
                    <li
                      key={si}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.2rem 0',
                        borderBottom: '1px dotted #e2e8f0'
                      }}
                    >
                      <span style={{ color: '#1e293b' }}>{s.name}</span>
                      <span style={{ fontWeight: 600, color: '#64748b' }}>{s.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Pie del Dossier */}
          <div
            style={{
              borderTop: '1px solid #cbd5e1',
              paddingTop: '0.75rem',
              fontSize: '8pt',
              color: '#64748b',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>Sofia Muñoz — Portafolio Profesional & Comercial (Edición 2026)</div>
            <div>Contacto: sofiamunozvale@gmail.com | WhatsApp: +58 424 2674572</div>
          </div>
        </div>
      </div>

      {/* 2. MODAL DE VISTA PREVIA Y DESCARGA EN PANTALLA */}
      <AnimatePresence>
        {isOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99995,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              backgroundColor: 'rgba(7, 10, 18, 0.88)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)'
            }}
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '820px',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--accent-gold)',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(20, 40, 68, 0.5)'
              }}
            >
              {/* Barra Superior del Modal */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.25rem 1.75rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-secondary)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <FileText size={18} style={{ color: 'var(--accent-gold)' }} />
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
                      Portafolio en PDF — Sofia Muñoz
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Listo para guardar en PDF o imprimir (Tamaño A4)
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button
                    onClick={handlePrint}
                    className="btn-magnetic btn-gold"
                    style={{
                      padding: '0.55rem 1.15rem',
                      fontSize: '0.82rem'
                    }}
                    data-cursor="Imprimir"
                  >
                    <Download size={15} />
                    <span>Guardar PDF / Imprimir</span>
                  </button>

                  <button
                    onClick={onClose}
                    aria-label="Cerrar modal"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '2px',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Vista previa scrollable del contenido */}
              <div style={{ padding: '2rem', overflowY: 'auto', flex: 1, color: 'var(--text-primary)' }}>
                {/* Resumen del documento */}
                <div
                  style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.08)',
                    border: '1px solid var(--border-blue)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <Printer size={26} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    Al hacer clic en <strong style={{ color: 'var(--accent-gold)' }}>Guardar PDF / Imprimir</strong>, el navegador abrirá el cuadro de diálogo oficial donde podrás seleccionar <em>"Guardar como PDF"</em> con diseño ejecutivo, tipografía nítida y sin fondos oscuros innecesarios.
                  </div>
                </div>

                {/* Tarjeta Visual de Información */}
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.5rem',
                    marginBottom: '1.25rem'
                  }}
                >
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '0.35rem' }}>
                    {personalInfo.name}
                  </h4>
                  <p style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    {personalInfo.headline} • 2026
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Correo</span>
                      <div style={{ fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>{personalInfo.contact.email}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>WhatsApp</span>
                      <div style={{ fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>{personalInfo.contact.phoneFormatted}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Disponibilidad</span>
                      <div style={{ fontSize: '0.9rem', color: '#86efac' }}>Activa para roles comerciales</div>
                    </div>
                  </div>
                </div>

                {/* Proyectos incluidos */}
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  <strong>Contenido incluido en el PDF:</strong>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem', lineHeight: 1.65 }}>
                    <li>
                      <strong style={{ color: 'var(--text-primary)' }}>MOVA — Traductor de Señas:</strong> Co-fundadora y encargada de marketing, traducción en 3 lenguas de señas y portada de revista (2026).
                    </li>
                    <li>
                      <strong style={{ color: 'var(--text-primary)' }}>Meraki — Marca de Ropa:</strong> Embajadora de marca y creadora de contenido, videos para redes y atención a clientas (2026).
                    </li>
                    <li>
                      <strong style={{ color: 'var(--accent-gold)' }}>Premios y Competencias 2026:</strong> 2do Lugar Nacional en el Torneo Kurios y presentación en la Universidad Metropolitana (UNIMET).
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
