/**
 * @file ContactSection.jsx
 * @description Sección de contacto limpia, sin cajas anidadas y con elementos suavemente redondeados.
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
    copyPhone,
    sound,
    trackEvent
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

  const handleWhatsAppSubmit = () => {
    trackEvent('contact_submit_whatsapp', {
      opportunity: selectedOpportunity,
      hasSenderName: Boolean(senderName.trim())
    });
    sound.playSuccess();
  };

  const handleEmailSubmit = () => {
    trackEvent('contact_submit_email', {
      opportunity: selectedOpportunity,
      hasSenderName: Boolean(senderName.trim())
    });
    sound.playSuccess();
  };

  return (
    <section id="contacto" style={{ padding: '4.5rem 0', position: 'relative' }}>
      <div className="site-container">
        <div
          className="spotlight-card"
          style={{
            padding: 'clamp(2rem, 5vw, 3.75rem)',
            borderRadius: '32px',
            backgroundColor: 'rgba(255, 255, 255, 0.88)'
          }}
        >
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            {/* Disponibilidad */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div className="badge-pill status-active">
                <span className="status-dot"></span>
                <span>{personalInfo.contact.availability}</span>
              </div>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h1)',
                lineHeight: 1.18,
                fontWeight: 600,
                marginBottom: '0.75rem',
                color: 'var(--text-primary)'
              }}
            >
              ¿Trabajamos{' '}
              <span className="italic-serif" style={{ color: 'var(--accent-blue)' }}>
                juntos?
              </span>
            </h2>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 auto 2rem auto', maxWidth: '520px' }}>
              Elige un tema y escríbeme directo por WhatsApp o correo electrónico.
            </p>

            {/* Píldoras de Tema */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.55rem',
                justifyContent: 'center',
                marginBottom: '1.75rem'
              }}
            >
              {opportunityTypes.map((type) => {
                const isSelected = selectedOpportunity === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedOpportunity(type);
                    }}
                    style={{
                      padding: '0.58rem 1.15rem',
                      borderRadius: '999px',
                      fontSize: '0.86rem',
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

            {/* Inputs Redondeados Directos (Sin caja contenedora extra) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '0.9rem',
                marginBottom: '1.5rem',
                textAlign: 'left'
              }}
            >
              <input
                type="text"
                placeholder="Tu nombre o marca (opcional)"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1.15rem',
                  borderRadius: '16px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid transparent',
                  color: 'var(--text-primary)',
                  fontSize: '0.92rem',
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
                  padding: '0.85rem 1.15rem',
                  borderRadius: '16px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid transparent',
                  color: 'var(--text-primary)',
                  fontSize: '0.92rem',
                  outline: 'none',
                  fontFamily: 'var(--font-sans)'
                }}
              />
            </div>

            {/* Botones Principales Redondeados */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.9rem',
                marginBottom: '2rem'
              }}
            >
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppSubmit}
                className="btn-magnetic btn-gold"
                style={{ minWidth: '220px' }}
                data-cursor="WhatsApp"
              >
                <MessageCircle size={18} />
                <span>Enviar por WhatsApp</span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href={generateMailtoUrl()}
                onClick={handleEmailSubmit}
                className="btn-magnetic btn-primary"
                style={{ minWidth: '220px' }}
                data-cursor="Email"
              >
                <Mail size={18} />
                <span>Abrir en Correo</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Copiado Rápido de Correo y Teléfono */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.85rem'
              }}
            >
              <button
                type="button"
                onClick={copyEmail}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.55rem 1.1rem',
                  borderRadius: '999px',
                  backgroundColor: copiedEmail ? 'var(--accent-yellow-fill)' : 'var(--bg-secondary)',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Mail size={14} />
                <span>{personalInfo.contact.email}</span>
                {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
              </button>

              <button
                type="button"
                onClick={copyPhone}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.55rem 1.1rem',
                  borderRadius: '999px',
                  backgroundColor: copiedPhone ? 'var(--accent-yellow-fill)' : 'var(--bg-secondary)',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Phone size={14} />
                <span>{personalInfo.contact.phoneFormatted}</span>
                {copiedPhone ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
