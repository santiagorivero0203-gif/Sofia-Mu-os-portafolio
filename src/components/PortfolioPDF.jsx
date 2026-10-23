/**
 * @file PortfolioPDF.jsx
 * @description Vista previa y descarga directa en 1 clic del Portafolio en PDF con la foto real de Sofia Muñoz.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  X,
  FileText,
  Check,
  Loader2,
  Mail,
  Phone
} from 'lucide-react';
import { personalInfo, projects, skillCategories, competitions } from '../data/portfolioData';
import { generateStyledPortfolioPDF } from '../utils/generateStyledPDF';

export const PortfolioPDF = ({ isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDirectDownload = async () => {
    try {
      setIsGenerating(true);
      await generateStyledPortfolioPDF();
      setIsGenerating(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3500);
    } catch (err) {
      console.error('Error generando PDF:', err);
      setIsGenerating(false);
      window.print();
    }
  };

  const StyledSheetContent = () => (
    <div
      style={{
        backgroundColor: '#d9eafa',
        color: '#142c4c',
        padding: '1.35rem',
        borderRadius: '24px',
        fontFamily: 'var(--font-sans)'
      }}
    >
      {/* 1. Cabecera Blanca Redondeada con Foto de Sofia */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '1.2rem',
          marginBottom: '1rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          boxShadow: '0 8px 24px rgba(20, 44, 76, 0.05)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.95rem', flex: '1 1 280px' }}>
          <img
            src="/assets/sofia_perfil.jpg"
            alt={personalInfo.name}
            style={{
              width: '58px',
              height: '58px',
              borderRadius: '16px',
              objectFit: 'cover',
              objectPosition: 'center 22%',
              border: '2px solid #ffe047',
              flexShrink: 0
            }}
          />
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.45rem',
                fontWeight: 700,
                margin: 0,
                lineHeight: 1.15,
                color: '#142c4c'
              }}
            >
              {personalInfo.name}
            </h2>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#2563eb',
                marginTop: '0.15rem'
              }}
            >
              Asesora de Ventas • Creadora de Contenido • Embajadora de Marca
            </div>
            <p style={{ fontSize: '0.84rem', color: '#345278', margin: '0.25rem 0 0 0', lineHeight: 1.4 }}>
              {personalInfo.statement}
            </p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#eaf3fd',
            borderRadius: '16px',
            padding: '0.75rem 1rem',
            fontSize: '0.78rem',
            minWidth: '210px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem', color: '#142c4c', fontWeight: 600 }}>
            <Mail size={13} style={{ color: '#2563eb' }} />
            <span>{personalInfo.contact.email}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', color: '#142c4c', fontWeight: 600 }}>
            <Phone size={13} style={{ color: '#2563eb' }} />
            <span>WhatsApp: {personalInfo.contact.phoneFormatted}</span>
          </div>
          <div
            style={{
              backgroundColor: '#ffe047',
              color: '#142c4c',
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

      {/* 2. Proyectos Destacados */}
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', margin: '0 0 0.6rem 0', color: '#142c4c' }}>
          Proyectos Destacados (2026)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.85rem' }}>
          {projects.map((proj) => (
            <div
              key={proj.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '18px',
                padding: '0.9rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                boxShadow: '0 6px 18px rgba(20, 44, 76, 0.04)'
              }}
            >
              <div style={{ position: 'relative', height: '110px', borderRadius: '12px', overflow: 'hidden' }}>
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
                    backgroundColor: '#ffe047',
                    color: '#142c4c',
                    fontSize: '0.66rem',
                    fontWeight: 700,
                    padding: '0.18rem 0.55rem',
                    borderRadius: '999px'
                  }}
                >
                  {proj.category}
                </span>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.08rem', fontWeight: 700, color: '#142c4c' }}>
                  {proj.title}
                </div>
                <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#2563eb', marginBottom: '0.25rem' }}>
                  {proj.role} • {proj.year}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#345278', lineHeight: 1.4, margin: '0 0 0.4rem 0' }}>
                  {proj.overview}
                </p>
                <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.76rem', color: '#142c4c', lineHeight: 1.4 }}>
                  {proj.achievements.map((ach, i) => (
                    <li key={i} style={{ marginBottom: '0.1rem' }}>
                      {ach}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Premios y Competencias */}
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', margin: '0 0 0.6rem 0', color: '#142c4c' }}>
          Premios y Competencias (2026)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.85rem' }}>
          {competitions.map((comp) => (
            <div
              key={comp.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '18px',
                padding: '0.8rem',
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'center',
                boxShadow: '0 6px 18px rgba(20, 44, 76, 0.04)'
              }}
            >
              <img
                src={comp.coverImage}
                alt={comp.title}
                style={{
                  width: '76px',
                  height: '76px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  flexShrink: 0
                }}
              />
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#ffe047',
                    color: '#142c4c',
                    fontSize: '0.64rem',
                    fontWeight: 700,
                    padding: '0.12rem 0.5rem',
                    borderRadius: '999px',
                    marginBottom: '0.2rem'
                  }}
                >
                  {comp.badge}
                </span>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#142c4c', lineHeight: 1.2 }}>
                  {comp.title}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#2563eb', fontWeight: 700, margin: '0.1rem 0' }}>
                  {comp.award}
                </div>
                <p style={{ fontSize: '0.74rem', color: '#345278', lineHeight: 1.35, margin: 0 }}>
                  {comp.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Habilidades Principales */}
      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', margin: '0 0 0.6rem 0', color: '#142c4c' }}>
          Habilidades Principales
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '0.8rem',
                boxShadow: '0 6px 18px rgba(20, 44, 76, 0.04)'
              }}
            >
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2563eb', marginBottom: '0.4rem' }}>
                {cat.title}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                {cat.skills.map((s, si) => (
                  <span
                    key={si}
                    style={{
                      fontSize: '0.72rem',
                      backgroundColor: '#eaf3fd',
                      color: '#142c4c',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '999px',
                      fontWeight: 600
                    }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="print-only pdf-dossier">
        <StyledSheetContent />
      </div>

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
              backgroundColor: 'rgba(20, 44, 76, 0.45)',
              backdropFilter: 'blur(10px)'
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
                maxWidth: '900px',
                maxHeight: '92vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#eaf3fd',
                border: '1px solid rgba(255, 255, 255, 0.95)',
                borderRadius: '28px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(20, 44, 76, 0.25)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 1.4rem',
                  backgroundColor: '#ffffff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <FileText size={19} style={{ color: 'var(--accent-blue)' }} />
                  <div>
                    <h3 style={{ fontSize: '1.02rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                      Portafolio en PDF — Sofia Muñoz
                    </h3>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                      Resumen ejecutivo en 1 página A4 listo para descargar
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <button
                    onClick={handleDirectDownload}
                    disabled={isGenerating}
                    className="btn-magnetic btn-gold"
                    style={{
                      padding: '0.5rem 1.15rem',
                      fontSize: '0.84rem',
                      opacity: isGenerating ? 0.8 : 1
                    }}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 size={15} />
                        <span>Generando PDF...</span>
                      </>
                    ) : downloaded ? (
                      <>
                        <Check size={15} />
                        <span>¡PDF Descargado!</span>
                      </>
                    ) : (
                      <>
                        <Download size={15} />
                        <span>Descargar PDF</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={onClose}
                    aria-label="Cerrar ventana"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-secondary)',
                      border: 'none',
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

              <div style={{ padding: '1.15rem', overflowY: 'auto', flex: 1 }}>
                <StyledSheetContent />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
