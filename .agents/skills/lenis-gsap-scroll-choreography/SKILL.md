---
name: lenis-gsap-scroll-choreography
description: Implementación y sincronización de desplazamiento suave inercial (Smooth Scroll) con Lenis, interacción con el render loop y control de anclajes accesibles.
---

# Lenis Smooth Scroll Choreography

Esta skill regula el comportamiento del scroll inercial en el portafolio:

## 1. Configuración de Lenis
- Instanciación en el ciclo de vida principal de la aplicación (`useEffect` en React o inicializador de layout).
- Parámetros recomendados:
  ```javascript
  import Lenis from 'lenis';

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  ```

## 2. Prevención de Conflictos
- **Modales abiertos:** Cuando se despliegue un modal o menú a pantalla completa, invocar `lenis.stop()` para fijar el fondo y reactivar con `lenis.start()` al cerrar.
- **Scroll horizontal o anclajes:** Utilizar `lenis.scrollTo('#seccion', { offset: -60, duration: 1.4 })` para navegación fluida sin saltos secos.
