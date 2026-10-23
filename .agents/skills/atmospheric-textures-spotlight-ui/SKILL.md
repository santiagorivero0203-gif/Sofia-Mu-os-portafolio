---
name: atmospheric-textures-spotlight-ui
description: Generación de atmósfera analógica con capa de ruido SVG feTurbulence, paletas cromáticas off-tone y tarjetas Bento con iluminación reactiva Spotlight.
---

# Atmospheric Textures & Spotlight UI

Esta skill guía la construcción sensorial de la interfaz:

## 1. Textura Analógica (Film Grain)
- Capa fija no interactiva sobre toda la ventana:
  ```css
  .noise-overlay {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 999;
    opacity: 0.038;
  }
  ```
- Patrón generado mediante filtro SVG `<feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>`.

## 2. Paleta Cromática Off-Tone
- Evita el negro `#000000` o blanco puro `#ffffff` plano.
- **Fondo Primario:** `#0d0e12` (obsidiana grafito cálido).
- **Superficie de Tarjetas:** `rgba(255, 255, 255, 0.03)` con bordes `rgba(255, 255, 255, 0.08)`.
- **Texto Principal:** `#f4f3ef` (alabastro suave).
- **Acentos:** `#d4af37` (oro champaña sutil), `#3b82f6` (azul cobalto tecnológico de MOVA) y `#e0a990` (terracota suave de Meraki).

## 3. Spotlight Bento Cards
- Al mover el cursor sobre una tarjeta, se capturan las coordenadas relativas `(e.clientX - rect.left)` y `(e.clientY - rect.top)` en variables CSS `--mouse-x` y `--mouse-y`.
- Un gradiente radial con `background: radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.08), transparent 40%)` ilumina con delicadeza el borde de la tarjeta activa.
