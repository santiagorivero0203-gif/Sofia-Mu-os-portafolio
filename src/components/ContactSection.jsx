/**
 * @file ContactSection.jsx
 * @description Sección de contacto compacta y directa para escribir a Sofia Muñoz en 1 clic.
 */

import React, { useState } from 'react';
import {
  MessageCircle,
  Mail,
  Phone,
  Copy,
  Check,
  ArrowUpRight
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { personalInfo } from '../data/portfolioData';

export const ContactSection = () => {
  const {
    caracasTime,
    copiedEmail,
    copyEmail,
    copiedPhone,
    copyPhone
  } = usePortfolio();

  const opportunityTypes = [
    'Ventas & Asesoría Comercial',
    'Embajadora de Marca & Contenido',
    'Alianzas & Proyectos',
    'Consulta General'
  ];

  const [selectedOpportunity, setSelectedOpportunity] = useState(opportunityTypes[0]);
  const [senderName, setSenderName] = useState('');
  const [senderNote, setSenderNote] = useState('');

  const buildMessage = () => {
    const greeting = caracasTime.greeting || 'Hola';
    const author = senderName.trim() ? `, soy ${senderName.trim()}` : '';
    const note = senderNote.trim() ? ` ${senderNote.trim()}` : '';
    return `${greeting} Sofia${author}. Vi tu portafolio y me gustaría hablarte sobre "${selectedOpportunity}".${note}`;
  };

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(buildMessage());
    return `https://wa.me/584242674572?text=${text}`;
  };

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`Propuesta Comercial — ${selectedOpportunity} [Sofia Muñoz]`);
    const body = encodeURIComponent(buildMessage());
    return `mailto:${personalInfo.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contacto" style={{ padding: '2.5rem 0 2rem 0', position: 'relative' }}>
      <div className="site-container">
        <div
          className="spotlight-card"
          style={{
            padding: 'clamp(1.75rem, 4vw, 2.75rem)',
            borderRadius: '30px',
            backgroundColor: 'rgba(255, 255, 255, 0.88)'
          }}
        >
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ marginBottom: '0.85rem' }}>
              <div className="badge-pill status-active">
                <span className="status-dot"></span>
                <span>{personalInfo.contact.availability}</span>
              </div>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                lineHeight: 1.18,
                fontWeight: 600,
                marginBottom: '0.5rem',
                color: 'var(--text-primary)'
              }}
            >
              ¿Trabajamos{' '}
              <span className="italic-serif" style={{ color: 'var(--accent-blue)' }}>
                juntos?
              </span>
            </h2>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 auto 1.35rem auto', maxWidth: '500px' }}>
              Elige un tema y escríbeme directo por WhatsApp o correo electrónico.
            </p>

            {/* Píldoras de Tema */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.45rem',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}
            >
              {opportunityTypes.map((type) => {
                const isSelected = selectedOpportunity === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedOpportunity(type)}
                    style={{
                      padding: '0.48rem 1rem',
                      borderRadius: '999px',
                      fontSize: '0.82rem',
                      fontWeight: isSelected ? 700 : 600,
                      backgroundColor: isSelected ? 'var(--accent-yellow-fill)' : 'var(--bg-secondary)',
                      border: 'none',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {type}
                  </button>
                );
              })}
            </div>

            {/* Campos Opcionales Redondeados */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '0.75rem',
                marginBottom: '1.25rem',
                textAlign: 'left'
              }}
            >
              <input
                type="text"
                placeholder="Tu nombre o empresa (opcional)"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1.05rem',
                  borderRadius: '16px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid transparent',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  fontFamily: 'var(--font-sans)'
                }}
              />

              <input
                type="text"
                placeholder="Nota breve (opcional)"
                value={senderNote}
                onChange={(e) => setSenderNote(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1.05rem',
                  borderRadius: '16px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid transparent',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  fontFamily: 'var(--font-sans)'
                }}
              />
            </div>

            {/* Botones Principales */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.75rem',
                marginBottom: '1.35rem'
              }}
            >
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-magnetic btn-gold"
                style={{ minWidth: '210px' }}
                data-cursor="WhatsApp"
              >
                <MessageCircle size={17} />
                <span>Enviar por WhatsApp</span>
                <ArrowUpRight size={15} />
              </a>

              <a
                href={generateMailtoUrl()}
                className="btn-magnetic btn-primary"
                style={{ minWidth: '210px' }}
                data-cursor="Email"
              >
                <Mail size={17} />
                <span>Abrir en Correo</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            {/* Copiado Rápido de Correo y Teléfono */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <button
                type="button"
                onClick={copyEmail}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.48rem 0.95rem',
                  borderRadius: '999px',
                  backgroundColor: copiedEmail ? 'var(--accent-yellow-fill)' : 'var(--bg-secondary)',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Mail size={13} />
                <span>{personalInfo.contact.email}</span>
                {copiedEmail ? <Check size={13} /> : <Copy size={13} />}
              </button>

              <button
                type="button"
                onClick={copyPhone}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.48rem 0.95rem',
                  borderRadius: '999px',
                  backgroundColor: copiedPhone ? 'var(--accent-yellow-fill)' : 'var(--bg-secondary)',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Phone size={13} />
                <span>{personalInfo.contact.phoneFormatted}</span>
                {copiedPhone ? <Check size={13} /> : <Copy size={13} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
