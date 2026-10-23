---
name: webgl-shader-image-effects
description: Efectos de distorsión líquida mediante filtros SVG feDisplacementMap, inclinación 3D perspectivada sin sobrecargar contextos WebGL y reflejos especulares de luz.
---

# WebGL & Shader Image Effects

Define el enriquecimiento visual avanzado sin comprometer el rendimiento:

## 1. Distorsión Líquida con SVG Displacement
- Alternativa liviana a WebGL completo para distorsionar imágenes en hover o arrastre:
  ```html
  <svg class="sr-only">
    <filter id="liquid-distortion">
      <feTurbulence type="turbulence" baseFrequency="0.05 0.95" numOctaves="2" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
  ```

## 2. Inclinación Tridimensional Perspectivada (3D Tilt)
- Contenedores con `perspective: 1000px`.
- En mousemove, cálculo de rotación sutil:
  $$\text{rotX} = -((y / \text{height}) - 0.5) \times 12^\circ$$
  $$\text{rotY} = ((x / \text{width}) - 0.5) \times 12^\circ$$
- Acabado con brillo de gradiente que simula la reflexión física del material.
