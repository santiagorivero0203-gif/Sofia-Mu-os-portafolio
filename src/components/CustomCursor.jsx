/**
 * @file CustomCursor.jsx
 * @description Cursor contextual magnético con físicas de movimiento suave y mix-blend-mode.
 * Soporta estados dinámicos (hover sobre proyectos o botones) mostrando etiquetas legibles.
 */

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [cursorText, setCursorText] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Físicas de resorte para el anillo exterior seguidor
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detectar si el usuario está en móvil o pantalla táctil
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Configurar listeners para elementos interactivos con data-cursor
    const handleElementHover = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const text = target.getAttribute('data-cursor') || 'Ver';
        setCursorText(text);
        setIsHovering(true);
      } else {
        const clickable = e.target.closest('a, button, [role="button"]');
        if (clickable) {
          setCursorText('');
          setIsHovering(true);
        } else {
          setCursorText('');
          setIsHovering(false);
        }
      }
    };

    window.addEventListener('mouseover', handleElementHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleElementHover);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Punto de precisión central */}
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: isHovering ? 0 : 1
        }}
      />

      {/* Anillo elástico contextual con efecto de diferencia */}
      <motion.div
        className={`custom-cursor-ring ${isHovering ? 'is-hovering' : ''}`}
        style={{
          x: smoothX,
          y: smoothY
        }}
      >
        {cursorText && <span className="cursor-text">{cursorText}</span>}
      </motion.div>
    </>
  );
};
