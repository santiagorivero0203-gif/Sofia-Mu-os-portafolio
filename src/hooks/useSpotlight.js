/**
 * @file useSpotlight.js
 * @description Hook reactivo para calcular la posición relativa del cursor en tarjetas Bento.
 * Proporciona variables CSS dinámicas (--mouse-x, --mouse-y) para alimentar el gradiente radial de iluminación.
 */

import { useCallback } from 'react';

/**
 * Hook useSpotlight
 * @returns {{ handleMouseMove: (e: React.MouseEvent<HTMLElement>) => void }}
 */
export const useSpotlight = () => {
  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return { handleMouseMove };
};
