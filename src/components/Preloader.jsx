/**
 * @file Preloader.jsx
 * @description Pantalla de carga inicial en Azul Pastel Claro (#D9EAFA) con barra redondeada.
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = ({ onFinish }) => {
  const [count, setCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsCompleted(true);
            if (onFinish) onFinish();
          }, 350);
          return 100;
        }
        const jump = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + jump, 100);
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!isCompleted && (
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2.5rem',
            backgroundColor: '#d9eafa',
            color: 'var(--text-primary)'
          }}
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.75,
              ease: [0.76, 0, 0.24, 1]
            }
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Sofia Muñoz — Portafolio 2026
            </span>
            <span
              style={{
                fontSize: '0.78rem',
                backgroundColor: 'var(--accent-yellow-fill)',
                color: 'var(--text-primary)',
                padding: '0.3rem 0.85rem',
                borderRadius: '999px',
                fontWeight: 700
              }}
            >
              Cargando
            </span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                marginBottom: '0.4rem',
                color: 'var(--text-primary)'
              }}
            >
              Sofia Muñoz
            </motion.h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
              Asesora Comercial & Creadora de Contenido
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.85rem' }}>
              <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                Preparando portafolio
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  color: 'var(--text-primary)'
                }}
              >
                {count}%
              </span>
            </div>

            <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '999px', overflow: 'hidden' }}>
              <motion.div
                style={{
                  height: '100%',
                  backgroundColor: 'var(--accent-yellow-fill)',
                  borderRadius: '999px',
                  width: `${count}%`,
                  transition: 'width 0.1s ease'
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
