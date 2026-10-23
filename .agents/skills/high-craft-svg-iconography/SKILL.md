---
name: high-craft-svg-iconography
description: Directrices para iconografía vectorial personalizada de alta precisión estética, grillas ópticas de 24px, trazos editoriales limpios y microanimaciones con pathLength.
---

# High-Craft SVG Iconography

Esta skill establece la estética y optimización de iconos y elementos geométricos vectoriales:

## 1. Reglas de Trazado
- **Grosor coherente:** Emplea trazos finos de `strokeWidth="1.25"` o `strokeWidth="1.5"` con `strokeLinecap="round"` y `strokeLinejoin="round"`.
- **Grilla óptica:** Todos los iconos se diseñan sobre viewBox estándar `0 0 24 24`.
- **Colores heredados:** Usa `stroke="currentColor"` y `fill="none"` para respetar el tema y los estados de hover.

## 2. Elementos Vectoriales Emblemáticos
- **Flecha de enlace diagonal (`↗`):** Diseñada para duplicarse en hover (la primera sale hacia arriba a la derecha, la segunda entra fluidamente desde abajo a la izquierda).
- **Estrellas editoriales de cuatro o ocho puntas:** Utilizadas como viñetas de distinción y acentos visuales de calidad.
- **Líneas cinéticas con `pathLength`:** Animación de trazo con Motion:
  ```jsx
  <motion.path
    d="..."
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
  />
  ```
