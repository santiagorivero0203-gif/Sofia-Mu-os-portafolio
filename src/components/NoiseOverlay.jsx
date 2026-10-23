/**
 * @file NoiseOverlay.jsx
 * @description Componente que inyecta una capa de grano analógico sutil (Film Grain)
 * utilizando un filtro SVG feTurbulence a 3.8% de opacidad para eliminar la sensación de color plano.
 */

import React from 'react';

export const NoiseOverlay = () => {
  return (
    <div className="noise-overlay" aria-hidden="true">
      <svg width="100%" height="100%">
        <filter id="film-grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain-filter)" />
      </svg>
    </div>
  );
};
