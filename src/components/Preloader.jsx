/**
 * @file Preloader.jsx
 * @description Pantalla de carga coreografiada con contador numérico 00% - 100%
 * y levantamiento de cortina vertical hacia arriba con curva Bézier pronunciada.
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
          }, 400);
          return 100;
        }
        // Incremento no lineal para mayor sensación orgánica
        const jump = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + jump, 100);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!isCompleted && (
        <motion.div
          className="fixed inset-0 z-[100000] flex flex-col justify-between p-8 md:p-16 bg-[#0b1528] text-[#f4f7fc]"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2.5rem',
            backgroundColor: '#0b1528',
            color: '#f4f7fc',
            borderBottom: '2px solid var(--accent-gold)'
          }}
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1]
            }
          }}
        >
          {/* Cabecera del preloader */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.12em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Sofia Muñoz — Portafolio '26
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.08em', color: 'var(--accent-gold)', fontWeight: 700 }}>
              Iniciando Experiencia
            </span>
          </div>

          {/* Centro: Nombre editorial y rol */}
          <div style={{ textAlign: 'center' }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                marginBottom: '0.5rem'
              }}
            >
              Sofia Muñoz
            </motion.h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', letterSpacing: '0.05em' }}>
              Asesora Comercial <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>&</span> Estrategia de Ventas
            </p>
          </div>

          {/* Pie: Contador numérico y barra de progreso fina */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Cargando proyectos y activos visuales
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                  color: 'var(--accent-gold)'
                }}
              >
                {count.toString().padStart(3, '0')}%
              </span>
            </div>

            <div style={{ width: '100%', height: '3px', backgroundColor: '#182b52', borderRadius: '0px', overflow: 'hidden' }}>
              <motion.div
                style={{
                  height: '100%',
                  backgroundColor: 'var(--accent-gold)',
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
