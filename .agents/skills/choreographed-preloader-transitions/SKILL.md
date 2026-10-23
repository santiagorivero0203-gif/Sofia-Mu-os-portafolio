---
name: choreographed-preloader-transitions
description: Preloader cinematográfico con contador numérico tabular (0% a 100%), levantamiento de telón con curva Bézier y sincronización de entrada para la cabecera y el hero.
---

# Choreographed Preloader & Transitions

Esta skill asegura un aterrizaje impecable y memorable al ingresar a la web:

## 1. Contador Numérico Tabular
- Incremento numérico fluido de `00%` a `100%` usando tipografía tabular (`font-variant-numeric: tabular-nums`).
- Acompañado del nombre editorial *"Sofia Muñoz"* o la rúbrica *"Portafolio Comercial '26"*.

## 2. Levantamiento de Cortina (Curtain Exit)
- Al llegar al 100%, el contenedor del preloader se traslada hacia arriba `y: "-100%"` con curva Bézier pronunciada `[0.76, 0, 0.24, 1]`.
- Duración óptima: 800ms - 900ms.

## 3. Disparo Coordinado de la Escena Principal
- Mediante un callback `onComplete` o estado `isLoaded`, se habilitan las animaciones escalonadas (`staggerChildren`) del Hero, la barra de navegación y el scroll inercial.
