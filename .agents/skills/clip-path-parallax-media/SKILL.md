---
name: clip-path-parallax-media
description: Técnicas de revelado de imágenes y videos con cortinas clip-path, contra-escala óptica para evitar bordes blancos y micro-parallax de profundidad.
---

# Clip-Path & Parallax Media

Esta skill define la presentación de contenido visual de alta fidelidad:

## 1. Revelado tipo Telón (Curtain Reveal)
- En lugar de desvanecer con `opacity: 0` a `1`, los medios se revelan usando `clipPath`:
  ```css
  /* Estado inicial oculto */
  clip-path: inset(100% 0 0 0);
  /* Estado revelado */
  clip-path: inset(0 0 0 0);
  ```
- Mientras el contenedor abre la máscara hacia abajo o hacia la derecha, la imagen interna realiza una contracción suave de `scale(1.15)` a `scale(1)` a lo largo de 1.1s con Bézier editorial `[0.16, 1, 0.3, 1]`.

## 2. Parallax Interno en Tarjetas
- El contenedor tiene `overflow: hidden; border-radius: var(--radius-lg);`.
- En scroll o hover, la imagen interior se desplaza verticalmente unos píxeles creando sensación de tridimensionalidad sin alterar el layout del documento.
