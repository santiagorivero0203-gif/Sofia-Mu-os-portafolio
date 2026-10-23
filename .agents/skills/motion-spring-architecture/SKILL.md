---
name: motion-spring-architecture
description: Reglas y patrones para animaciones fluidas con Motion / Framer Motion basadas en físicas de resortes (spring physics), transiciones de diseño compartido con layoutId y renderizado a 60fps sin cuellos de botella.
---

# Motion Spring Architecture

Esta skill define la arquitectura de animación interactiva para interfaces de alto nivel (Awwwards / Godly):

## 1. Principios Fundamentales
- **Físicas sobre tiempos lineales:** Nunca uses curvas de tiempo lineales o `ease-in-out` genéricos para microinteracciones. Emplea resortes con `stiffness`, `damping` y `mass`.
- **Configuración canónica de resorte:**
  ```javascript
  export const springTransition = {
    type: "spring",
    stiffness: 260,
    damping: 24,
    mass: 0.8
  };

  export const gentleSpring = {
    type: "spring",
    stiffness: 120,
    damping: 18
  };
  ```

## 2. Transiciones de Diseño Compartido (`layoutId`)
- Al expandir tarjetas a vistas de detalle o modales, utiliza `layoutId="project-card-${id}"` en la tarjeta y en el modal contenedor.
- Asegura que los elementos hijos con texto o imágenes también compartan su respectivo `layoutId` para evitar saltos bruscos.
- Usa `AnimatePresence mode="wait"` para transiciones limpias de entrada y salida.

## 3. Optimización a 60fps
- Anima únicamente `transform` (x, y, scale, rotate) y `opacity`.
- Evita animar `width`, `height`, `top` o `left` directamente.
- Para animaciones reactivas al cursor, utiliza `useMotionValue` y `useSpring` para actualizar propiedades CSS en tiempo real sin disparar ciclos de re-renderizado de React.
