/**
 * @file useScrollSpy.js
 * @description Hook reactivo para detectar la sección activa en el viewport durante el scroll.
 * Monitorea los elementos con los identificadores especificados y notifica al contexto.
 */

import { useEffect } from 'react';

/**
 * Hook useScrollSpy
 * @param {string[]} sectionIds Lista de IDs de secciones a observar (sin el prefijo #)
 * @param {(activeId: string) => void} onSectionChange Callback invocado cuando cambia la sección activa
 * @param {number} offset Desplazamiento superior en píxeles para calcular la intersección
 */
export const useScrollSpy = (sectionIds, onSectionChange, offset = 180) => {
  useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      let currentSection = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = id;
            break;
          }
        }
      }

      onSectionChange(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Verificación inicial
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, onSectionChange, offset]);
};
