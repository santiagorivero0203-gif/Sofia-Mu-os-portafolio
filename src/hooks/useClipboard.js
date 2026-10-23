/**
 * @file useClipboard.js
 * @description Hook utilitario para copiado al portapapeles con manejo de estados,
 * retroalimentación temporal y fallback para navegadores restrictivos.
 */

import { useState, useCallback } from 'react';

/**
 * Hook useClipboard
 * @param {number} resetTimeout Duración en ms para restaurar el estado copiado (default: 2500)
 * @returns {{ copied: boolean, copy: (text: string) => Promise<boolean> }}
 */
export const useClipboard = (resetTimeout = 2500) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text) => {
      if (!text) return false;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback legacy para contextos no seguros
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }

        setCopied(true);
        setTimeout(() => setCopied(false), resetTimeout);
        return true;
      } catch (error) {
        console.error('Error al copiar al portapapeles:', error);
        setCopied(false);
        return false;
      }
    },
    [resetTimeout]
  );

  return { copied, copy };
};
