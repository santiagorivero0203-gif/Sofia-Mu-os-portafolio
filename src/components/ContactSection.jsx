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

  // Opciones de tipo de propuesta comercial
  const opportunityTypes = [
    'Asesoría Comercial & Ventas',
    'Embajadora de Marca & Social Selling',
    'Alianza Estratégica & Marketing',
    'Consultoría o Charla'
  ];

  const [selectedOpportunity, setSelectedOpportunity] = useState(opportunityTypes[0]);
  const [senderName, setSenderName] = useState('');
  const [senderNote, setSenderNote] = useState('');

  // Generador de mensaje profesional pre-formateado
  const buildMessage = () => {
    const greeting = caracasTime.greeting || 'Hola';
    const author = senderName.trim() ? `en nombre de ${senderName.trim()}` : '';
    const note = senderNote.trim() ? ` Detalle: "${senderNote.trim()}".` : '';
    return `${greeting} Sofia, te contacto desde tu portafolio web ${author} para evaluar una oportunidad en "${selectedOpportunity}".${note} ¿Podríamos coordinar una breve llamada?`;
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
            background: 'linear-gradient(135deg, rgba(15, 21, 36, 0.96), rgba(10, 14, 23, 0.98))',
            borderColor: 'var(--border-gold)',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.7), 0 0 35px rgba(59, 130, 246, 0.08)'
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
                <span>Caracas {caracasTime.timeString} (VET)</span>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-h1)',
                  lineHeight: 1.1,
                  fontWeight: 500,
                  marginBottom: '1.25rem'
                }}
              >
                ¿Construimos la próxima{' '}
                <span className="italic-serif" style={{ color: 'var(--accent-gold)' }}>
                  oportunidad
                </span>{' '}
                juntos?
              </h2>

              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 auto', maxWidth: '680px' }}>
                Conéctate directamente conmigo para evaluar asesorías comerciales, representación de marca, alianzas o liderazgo en proyectos.
              </p>
            </div>

            {/* Selector de Tipo de Oportunidad */}
            <div style={{ marginBottom: '2rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '0.75rem',
                  textAlign: 'center'
                }}
              >
                1. Selecciona el Tipo de Propuesta
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
                        padding: '0.55rem 1.1rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.86rem',
                        fontWeight: isSelected ? 600 : 400,
                        backgroundColor: isSelected ? 'rgba(212, 175, 55, 0.16)' : 'rgba(255, 255, 255, 0.03)',
                        border: `1px solid ${isSelected ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                        color: isSelected ? 'var(--accent-gold)' : 'var(--text-secondary)',
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
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
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
                    placeholder="Ej. María Pérez / Startup Inc."
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.9rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
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
                    Nota o Asunto Específico
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Campaña Q3 / Prospección de ventas..."
                    value={senderNote}
                    onChange={(e) => setSenderNote(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.9rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
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
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: '1px dashed var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  fontSize: '0.84rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                  lineHeight: 1.5,
                  marginBottom: '1.25rem'
                }}
              >
                <span style={{ color: 'var(--accent-gold)' }}>Mensaje preparado: </span>
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
                  className="btn-magnetic"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    padding: '0.9rem 1.5rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: '#22c55e',
                    color: '#000',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)'
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
                  className="btn-magnetic"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    padding: '0.9rem 1.5rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '0.92rem',
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
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: copiedEmail ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${copiedEmail ? 'rgba(34, 197, 94, 0.4)' : 'var(--border-subtle)'}`,
                  color: copiedEmail ? '#86efac' : 'var(--text-primary)',
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                data-cursor="Copiar"
              >
                <Mail size={15} style={{ color: 'var(--accent-gold)' }} />
                <span style={{ fontFamily: 'var(--font-mono)' }}>{personalInfo.contact.email}</span>
                {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                <span style={{ fontSize: '0.78rem', color: copiedEmail ? '#86efac' : 'var(--text-muted)' }}>
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
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '0.86rem',
                    textDecoration: 'none'
                  }}
                  data-cursor="Llamar"
                >
                  <Phone size={15} />
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
                    backgroundColor: copiedPhone ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    border: `1px solid ${copiedPhone ? 'rgba(34, 197, 94, 0.4)' : 'var(--border-subtle)'}`,
                    color: copiedPhone ? '#86efac' : 'var(--text-primary)',
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
