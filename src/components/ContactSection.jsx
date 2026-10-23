/**
 * @file ContactSection.jsx
 * @description Sección de contacto directo de alto impacto.
 * Ofrece accesos directos por WhatsApp, llamada y correo electrónico oficial,
 * con confirmación de copiado interactivo en un clic.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, Copy, Check, ArrowUpRight, Send } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const ContactSection = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contacto" style={{ padding: '7rem 0 5rem 0', position: 'relative' }}>
      <div className="site-container">
        <div
          className="spotlight-card"
          style={{
            padding: 'clamp(2.5rem, 5vw, 4.5rem)',
            background: 'linear-gradient(135deg, rgba(18, 19, 25, 0.95), rgba(11, 12, 16, 0.95))',
            borderColor: 'var(--border-gold)',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.6)'
          }}
        >
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div className="badge-pill status-active" style={{ marginBottom: '1.25rem' }}>
              <span className="status-dot"></span>
              {personalInfo.contact.availability}
            </div>

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

            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '3rem' }}>
              Estoy abierta a evaluar propuestas para roles de Asesora Comercial, Alianzas Estratégicas, Embajadora de Marca o Dirección de Ventas.
            </p>

            {/* Accesos de Comunicación Rápida */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.25rem',
                marginBottom: '2.5rem'
              }}
            >
              {/* WhatsApp Directo */}
              <a
                href={personalInfo.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.4rem 1.75rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'rgba(34, 197, 94, 0.08)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                data-cursor="WhatsApp"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: '#22c55e',
                      color: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#86efac', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                      Chat Inmediato
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 600 }}>
                      WhatsApp Directo
                    </div>
                  </div>
                </div>
                <ArrowUpRight size={20} style={{ color: '#86efac' }} />
              </a>

              {/* Teléfono / Llamada */}
              <a
                href={`tel:${personalInfo.contact.phone}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.4rem 1.75rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                data-cursor="Llamar"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                      Llamada Telefónica
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 600 }}>
                      {personalInfo.contact.phoneFormatted}
                    </div>
                  </div>
                </div>
                <ArrowUpRight size={20} style={{ color: 'var(--text-muted)' }} />
              </a>
            </div>

            {/* Fila de Correo con botón de copiado rápido */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.8rem 1.5rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <Mail size={17} style={{ color: 'var(--accent-gold)' }} />
              <span style={{ fontSize: '0.95rem', fontFamily: 'var(--font-mono)' }}>
                {personalInfo.contact.email}
              </span>
              <button
                onClick={handleCopyEmail}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: copiedEmail ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                  color: copiedEmail ? '#86efac' : 'var(--text-primary)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {copiedEmail ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedEmail ? '¡Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
