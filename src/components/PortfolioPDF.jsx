/**
 * @file PortfolioPDF.jsx
 * @description Vista previa y descarga directa del Portafolio en PDF con estilo editorial.
 * Combina:
 * - Descarga directa en 1 clic mediante jsPDF (`generateStyledPortfolioPDF`) con la paleta Azul Pastel y Amarillo,
 *   fotos incrustadas, enlaces activos y toda la información sintetizada en una sola hoja A4.
 * - Vista previa interactiva fiel al documento PDF y soporte de impresión directa (`@media print`).
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Printer,
  X,
  FileText,
  Check,
  Loader2,
  Award,
  Mail,
  Phone,
  Sparkles
} from 'lucide-react';
import { personalInfo, projects, skillCategories, competitions } from '../data/portfolioData';
import { generateStyledPortfolioPDF } from '../utils/generateStyledPDF';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * Componente PortfolioPDF
 * @param {{ isOpen: boolean, onClose: () => void }} props
 */
export const PortfolioPDF = ({ isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const { sound, trackEvent } = usePortfolio();

  const handleDirectDownload = async () => {
    try {
      setIsGenerating(true);
      sound.playClick();
      trackEvent('pdf_direct_download');
      await generateStyledPortfolioPDF();
      setIsGenerating(false);
      setDownloaded(true);
      sound.playSuccess();
      setTimeout(() => setDownloaded(false), 3500);
    } catch (err) {
      console.error('Error generando PDF:', err);
      setIsGenerating(false);
      window.print();
    }
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  /**
   * Hoja visual sintetizada (usada tanto en la vista previa del modal como en @media print)
   */
  const StyledSheetContent = () => (
    <div
      style={{
        backgroundColor: '#345b8c',
        color: '#ffffff',
        padding: '1.5rem',
        borderRadius: '14px',
        border: '2px solid #ffe135',
        fontFamily: 'var(--font-sans)',
        boxShadow: '0 16px 40px rgba(20, 40, 68, 0.4)'
      }}
    >
      {/* 1. Cabecera con Monograma SM, Nombre y Contacto */}
      <div
        style={{
          backgroundColor: '#2b4e7a',
          border: '1px solid #ffe135',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.1rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 300px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              backgroundColor: '#ffe135',
              color: '#1c3557',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: 800,
              flexShrink: 0
            }}
          >
            SM
          </div>
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 700,
                margin: 0,
                lineHeight: 1.15,
                color: '#ffffff'
              }}
            >
              {personalInfo.name}
            </h2>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#ffe135',
                letterSpacing: '0.03em',
                marginTop: '0.2rem'
              }}
            >
              ASESORA DE VENTAS | CREADORA DE CONTENIDO | EMBAJADORA DE MARCA
            </div>
            <p style={{ fontSize: '0.84rem', color: '#e6f0fd', margin: '0.35rem 0 0 0', lineHeight: 1.45 }}>
              {personalInfo.statement}
            </p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#3e689c',
            border: '1px solid rgba(190, 220, 255, 0.4)',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            fontSize: '0.8rem',
            minWidth: '210px'
          }}
        >
          <div style={{ color: '#ffe135', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            Contacto Directo
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <Mail size={13} style={{ color: '#ffe135' }} />
            <span>{personalInfo.contact.email}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
            <Phone size={13} style={{ color: '#ffe135' }} />
            <span>WhatsApp: {personalInfo.contact.phoneFormatted}</span>
          </div>
          <div
            style={{
              backgroundColor: '#ffe135',
              color: '#1c3557',
              fontWeight: 700,
              fontSize: '0.7rem',
              padding: '0.2rem 0.6rem',
              borderRadius: '999px',
              textAlign: 'center'
            }}
          >
            Disponible para proyectos (2026)
          </div>
        </div>
      </div>

      {/* 2. Fila de 4 Indicadores Sintetizados */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '0.65rem',
          marginBottom: '1.25rem'
        }}
      >
        {personalInfo.stats.map((stat, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#3e689c',
              border: '1px solid rgba(190, 220, 255, 0.35)',
              borderRadius: '10px',
              padding: '0.6rem 0.75rem',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffe135' }}>
              {stat.value}
              <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{stat.suffix}</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#e6f0fd', textTransform: 'uppercase', marginTop: '0.15rem' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Proyectos Destacados (MOVA & Meraki) con Fotos */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', margin: 0, color: '#ffffff' }}>
            Proyectos Destacados (2026)
          </h3>
          <div style={{ flex: 1, height: '2px', backgroundColor: '#ffe135' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.9rem' }}>
          {projects.map((proj) => (
            <div
              key={proj.id}
              style={{
                backgroundColor: '#3e689c',
                border: '1px solid #a6ceff',
                borderRadius: '12px',
                padding: '0.9rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.55rem'
              }}
            >
              <div style={{ position: 'relative', height: '115px', borderRadius: '8px', overflow: 'hidden' }}>
                <img
                  src={proj.featuredCover}
                  alt={proj.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '0.45rem',
                    left: '0.45rem',
                    backgroundColor: '#ffe135',
                    color: '#1c3557',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '0.15rem 0.55rem',
                    borderRadius: '999px'
                  }}
                >
                  {proj.category}
                </span>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
                  {proj.title}
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ffe135', marginBottom: '0.3rem' }}>
                  {proj.role} • {proj.year}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#e6f0fd', lineHeight: 1.45, margin: '0 0 0.45rem 0' }}>
                  {proj.overview}
                </p>
                <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.76rem', color: '#ffffff', lineHeight: 1.45 }}>
                  {proj.achievements.map((ach, i) => (
                    <li key={i} style={{ marginBottom: '0.15rem' }}>
                      {ach}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Premios y Competencias (2026) */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', margin: 0, color: '#ffffff' }}>
            Premios y Competencias (2026)
          </h3>
          <div style={{ flex: 1, height: '2px', backgroundColor: '#ffe135' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.9rem' }}>
          {competitions.map((comp) => (
            <div
              key={comp.id}
              style={{
                backgroundColor: '#2b4e7a',
                border: '1px solid rgba(190, 220, 255, 0.38)',
                borderRadius: '12px',
                padding: '0.85rem',
                display: 'flex',
                gap: '0.85rem',
                alignItems: 'center'
              }}
            >
              <img
                src={comp.coverImage}
                alt={comp.title}
                style={{
                  width: '84px',
                  height: '84px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '1px solid #ffe135',
                  flexShrink: 0
                }}
              />
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#ffe135',
                    color: '#1c3557',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '0.12rem 0.5rem',
                    borderRadius: '999px',
                    marginBottom: '0.25rem'
                  }}
                >
                  {comp.badge}
                </span>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
                  {comp.title}
                </div>
                <div style={{ fontSize: '0.76rem', color: '#ffe135', fontWeight: 700, margin: '0.15rem 0' }}>
                  {comp.award}
                </div>
                <p style={{ fontSize: '0.75rem', color: '#e6f0fd', lineHeight: 1.4, margin: 0 }}>
                  {comp.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Habilidades Principales Sintetizadas */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', margin: 0, color: '#ffffff' }}>
            Habilidades Principales
          </h3>
          <div style={{ flex: 1, height: '2px', backgroundColor: '#ffe135' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.75rem' }}>
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#3e689c',
                border: '1px solid rgba(190, 220, 255, 0.35)',
                borderRadius: '10px',
                padding: '0.8rem'
              }}
            >
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#ffe135', marginBottom: '0.45rem' }}>
                {cat.title}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.76rem', color: '#ffffff' }}>
                {cat.skills.map((s, si) => (
                  <li key={si} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#ffe135', flexShrink: 0 }} />
                    <span>{s.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. VERSIÓN IMPRIMIBLE CON ESTILO (@media print) */}
      <div className="print-only pdf-dossier">
        <StyledSheetContent />
      </div>

      {/* 2. MODAL DE VISTA PREVIA Y DESCARGA DIRECTA DEL PDF */}
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
              backgroundColor: 'rgba(30, 56, 91, 0.88)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
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
                maxWidth: '920px',
                maxHeight: '92vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--accent-gold)',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(20, 40, 68, 0.55)'
              }}
            >
              {/* Barra Superior del Modal */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1.1rem 1.5rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-secondary)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <FileText size={20} style={{ color: 'var(--accent-gold)' }} />
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
                      Portafolio en PDF — Sofia Muñoz
                    </h3>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                      Diseño resumido en 1 página con los colores y fotos del portafolio
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {/* Botón Principal: Descarga Directa con jsPDF */}
                  <button
                    onClick={handleDirectDownload}
                    disabled={isGenerating}
                    className="btn-magnetic btn-gold"
                    style={{
                      padding: '0.55rem 1.15rem',
                      fontSize: '0.84rem',
                      opacity: isGenerating ? 0.8 : 1
                    }}
                    data-cursor="Descargar"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Creando PDF...</span>
                      </>
                    ) : downloaded ? (
                      <>
                        <Check size={15} />
                        <span>¡PDF Descargado!</span>
                      </>
                    ) : (
                      <>
                        <Download size={15} />
                        <span>Descargar PDF Directo</span>
                      </>
                    )}
                  </button>

                  {/* Botón Secundario: Imprimir */}
                  <button
                    onClick={handlePrint}
                    className="btn-magnetic btn-outline"
                    style={{
                      padding: '0.55rem 0.95rem',
                      fontSize: '0.82rem'
                    }}
                    title="Abrir vista de impresión"
                  >
                    <Printer size={15} />
                    <span>Imprimir</span>
                  </button>

                  {/* Cerrar Modal */}
                  <button
                    onClick={onClose}
                    aria-label="Cerrar ventana"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
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

              {/* Vista previa en vivo de la hoja estilizada */}
              <div style={{ padding: '1.25rem', overflowY: 'auto', flex: 1 }}>
                <StyledSheetContent />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
