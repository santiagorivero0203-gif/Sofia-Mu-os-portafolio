/**
 * @file ContactSection.jsx
 * @description Módulo de conversión comercial y contacto directo sin fricción.
 * Incluye:
 * - Selector interactivo de tipo de oportunidad (Asesoría Comercial, Embajada de Marca, Alianzas).
 * - Generador inteligente de mensajes estructurados para WhatsApp y correo electrónico.
 * - Copiado rápido con confirmación háptica/sonora para correo y teléfono.
 * - Indicador de disponibilidad horaria oficial en Caracas (VET).
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  Mail,
  Phone,
  Copy,
  Check,
  ArrowUpRight,
  Send,
  Sparkles,
  Building2,
  Clock
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

  // Opciones simples de contacto
  const opportunityTypes = [
    'Ventas & Asesoría Comercial',
    'Embajadora de Marca & Contenido',
    'Alianzas & Proyectos',
    'Consulta General'
  ];

  const [selectedOpportunity, setSelectedOpportunity] = useState(opportunityTypes[0]);
  const [senderName, setSenderName] = useState('');
  const [senderNote, setSenderNote] = useState('');

  // Generador de mensaje directo y natural
  const buildMessage = () => {
    const greeting = caracasTime.greeting || 'Hola';
    const author = senderName.trim() ? `, soy ${senderName.trim()}` : '';
    const note = senderNote.trim() ? ` ${senderNote.trim()}` : '';
    return `${greeting} Sofia${author}. Vi tu portafolio y me gustaría hablarte sobre "${selectedOpportunity}".${note}`;
  };

  // Enlace codificado para WhatsApp
  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(buildMessage());
    return `https://wa.me/584242674572?text=${text}`;
  };

  // Enlace codificado para Email
  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`Propuesta Comercial — ${selectedOpportunity} [Sofia Muñoz]`);
    const body = encodeURIComponent(buildMessage());
    return `mailto:${personalInfo.contact.email}?subject=${subject}&body=${body}`;
  };

  const handleWhatsAppSubmit = (e) => {
    trackEvent('contact_submit_whatsapp', {
      opportunity: selectedOpportunity,
      hasSenderName: Boolean(senderName.trim())
    });
    sound.playSuccess();
  };

  const handleEmailSubmit = (e) => {
    trackEvent('contact_submit_email', {
      opportunity: selectedOpportunity,
      hasSenderName: Boolean(senderName.trim())
    });
    sound.playSuccess();
  };

  return (
    <section id="contacto" style={{ padding: '7rem 0 5rem 0', position: 'relative' }}>
      <div className="site-container">
        <div
          className="spotlight-card"
          style={{
            padding: 'clamp(2rem, 5vw, 4.5rem)',
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--accent-gold)',
            boxShadow: '0 20px 50px rgba(24, 48, 82, 0.35)'
          }}
        >
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            {/* Estado de Disponibilidad y Hora Local */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}
            >
              <div className="badge-pill status-active">
                <span className="status-dot"></span>
                <span>{personalInfo.contact.availability}</span>
              </div>
              <div
                className="badge-pill"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--text-secondary)'
                }}
              >
                <Clock size={13} style={{ color: 'var(--accent-gold)' }} />
                <span>Caracas, Venezuela ({caracasTime.timeString})</span>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-h1)',
                  lineHeight: 1.18,
                  fontWeight: 500,
                  marginBottom: '1rem'
                }}
              >
                ¿Trabajamos{' '}
                <span className="italic-serif" style={{ color: 'var(--accent-gold)' }}>
                  juntos?
                </span>
              </h2>

              <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 auto', maxWidth: '560px' }}>
                Escríbeme por WhatsApp o correo para hablar sobre ventas, creación de contenido o representación de tu marca.
              </p>
            </div>

            {/* Selector de Tema */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '0.75rem',
                  textAlign: 'center'
                }}
              >
                Elige el tema de tu mensaje:
              </label>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.6rem',
                  justifyContent: 'center'
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
                        padding: '0.55rem 1.15rem',
                        borderRadius: '999px',
                        fontSize: '0.84rem',
                        fontWeight: isSelected ? 700 : 500,
                        backgroundColor: isSelected ? 'var(--accent-gold)' : 'var(--bg-surface)',
                        border: `1px solid ${isSelected ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                        color: isSelected ? '#1c3557' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      data-cursor="Opción"
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generador de Mensaje Rápido */}
            <div
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '1.5rem',
                marginBottom: '2.5rem'
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}
              >
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Tu Nombre o Empresa (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. María Pérez / Mi Marca"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.9rem',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Mensaje adicional (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Quiero conversar sobre videos o ventas..."
                    value={senderNote}
                    onChange={(e) => setSenderNote(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.9rem',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Vista Previa del Mensaje Estructurado */}
              <div
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '0.85rem 1rem',
                  fontSize: '0.84rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                  lineHeight: 1.5,
                  marginBottom: '1.25rem'
                }}
              >
                <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>Mensaje preparado: </span>
                "{buildMessage()}"
              </div>

              {/* Botones de Envío Inmediato */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1rem'
                }}
              >
                {/* Enviar vía WhatsApp */}
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppSubmit}
                  className="btn-magnetic btn-gold"
                  style={{
                    padding: '0.9rem 1.5rem',
                    fontSize: '0.9rem',
                    textDecoration: 'none'
                  }}
                  data-cursor="WhatsApp"
                >
                  <MessageCircle size={18} />
                  <span>Enviar por WhatsApp</span>
                  <ArrowUpRight size={16} />
                </a>

                {/* Enviar vía Correo Electrónico */}
                <a
                  href={generateMailtoUrl()}
                  onClick={handleEmailSubmit}
                  className="btn-magnetic btn-primary"
                  style={{
                    padding: '0.9rem 1.5rem',
                    fontSize: '0.9rem',
                    textDecoration: 'none'
                  }}
                  data-cursor="Email"
                >
                  <Mail size={18} style={{ color: 'var(--accent-gold)' }} />
                  <span>Abrir en Correo</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            {/* Accesos Rápidos de Copiado Directo */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1.25rem'
              }}
            >
              {/* Copiar Correo Oficial */}
              <button
                type="button"
                onClick={copyEmail}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '999px',
                  backgroundColor: copiedEmail ? 'var(--accent-gold)' : 'var(--bg-surface)',
                  border: `1px solid ${copiedEmail ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                  color: copiedEmail ? '#1c3557' : 'var(--text-primary)',
                  fontSize: '0.86rem',
                  fontWeight: copiedEmail ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                data-cursor="Copiar"
              >
                <Mail size={15} style={{ color: copiedEmail ? '#1c3557' : 'var(--accent-gold)' }} />
                <span style={{ fontFamily: 'var(--font-mono)' }}>{personalInfo.contact.email}</span>
                {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                <span style={{ fontSize: '0.78rem', color: copiedEmail ? '#1c3557' : 'var(--text-muted)' }}>
                  {copiedEmail ? '¡Copiado!' : 'Copiar'}
                </span>
              </button>

              {/* Copiar / Llamar Teléfono */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <a
                  href={`tel:${personalInfo.contact.phone}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 1.1rem',
                    borderRadius: '999px',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '0.86rem',
                    textDecoration: 'none'
                  }}
                  data-cursor="Llamar"
                >
                  <Phone size={15} style={{ color: 'var(--accent-gold)' }} />
                  <span>{personalInfo.contact.phoneFormatted}</span>
                </a>

                <button
                  type="button"
                  onClick={copyPhone}
                  aria-label="Copiar número de teléfono"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: copiedPhone ? 'var(--accent-gold)' : 'var(--bg-surface)',
                    border: `1px solid ${copiedPhone ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                    color: copiedPhone ? '#1c3557' : 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  data-cursor="Copiar"
                >
                  {copiedPhone ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
