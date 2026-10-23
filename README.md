# Sofia Muñoz — Portafolio Profesional & Creativo

> Guía técnica de arquitectura, mapa de interconexiones y matriz de resolución rápida de incidencias (Troubleshooting).

---

## 1. Visión General del Proyecto

- **Titular:** Sofia Muñoz (Asesora Comercial | Estrategia de Ventas | Embajadora de Marca).
- **Stack:** React 19, Vite 6, Framer Motion 12, Lenis Smooth Scroll, Lucide React.
- **Estética:** Awwwards / Godly.website con tipografía editorial (*Playfair Display* + *Plus Jakarta Sans*), microinteracciones sonoras sintetizadas por Web Audio y físicas de resorte.
- **Regla Fundamental:** No verificar en navegador salvo requerimiento explícito. La integridad se valida mediante `npm run build` en terminal.

---

## 2. Mapa de Estructura de Directorios

```
Sofia portafolio/
├── .agents/skills/                    # Habilidades operativas del agente
├── public/assets/                     # Activos fotográficos locales
│   ├── meraki/                        # Evidencias fotográficas de Meraki
│   │   ├── clothing.jpg
│   │   ├── querida_sofia.jpg
│   │   └── unboxing.jpg
│   └── mova/                          # Evidencias fotográficas de MOVA
│       ├── detection.jpg
│       ├── interface.png
│       ├── languages.png
│       ├── preview.png
│       └── revista.jpg
├── src/
│   ├── components/                    # Componentes modulares desacoplados
│   │   ├── About.jsx                  # Manifiesto, timeline y pilares comerciales
│   │   ├── CompetitionsSection.jsx    # Torneos nacionales, 2do lugar Marketplace y pitchdays
│   │   ├── ContactSection.jsx         # Formulario de alta conversión y enlaces WhatsApp/Email
│   │   ├── CustomCursor.jsx           # Cursor contextual con blend mode difference
│   │   ├── ErrorBoundary.jsx          # Límite de error con interfaz de recuperación
│   │   ├── Footer.jsx                 # Pie de página y scroll inercial al tope
│   │   ├── Hero.jsx                   # Sección de aterrizaje, métricas y CTAs
│   │   ├── InteractiveReveal.jsx      # Formas geométricas interactivas que revelan fotos al tocarlas
│   │   ├── Navbar.jsx                 # Menú flotante con ScrollSpy y hora de Caracas
│   │   ├── NoiseOverlay.jsx           # Textura de grano cinematográfico SVG
│   │   ├── PortfolioPDF.jsx           # Dossier ejecutivo y exportación en PDF (A4)
│   │   ├── Preloader.jsx              # Contador 0-100% y telón con curva Bézier
│   │   ├── ProjectModal.jsx           # Modal de proyectos con navegación y lightbox
│   │   ├── Projects.jsx               # Galería Bento + Índice con Spotlight reactivo
│   │   └── SkillsGrid.jsx             # Matriz de competencias comerciales
│   ├── context/
│   │   └── PortfolioContext.jsx       # Única fuente de verdad y despachador de estado
│   ├── data/
│   │   └── portfolioData.js           # Datos estáticos tipados (perfil, proyectos, habilidades)
│   ├── hooks/                         # Lógica reactiva reutilizable
│   │   ├── useCaracasTime.js          # Hora oficial en vivo (VET, UTC-4) y disponibilidad
│   │   ├── useClipboard.js            # Copiado al portapapeles con fallback y timeout
│   │   ├── useScrollSpy.js            # Detección de sección activa en el scroll
│   │   ├── useSoundFeedback.js        # Síntesis Web Audio para clics y confirmaciones
│   │   └── useSpotlight.js            # Cálculo de coordenadas del cursor en tarjetas Bento
│   ├── App.jsx                        # Orquestador raíz con Lenis y ErrorBoundary
│   ├── index.css                      # Variables CSS, tokens tipográficos y bento styles
│   └── main.jsx                       # Montaje de ReactDOM
├── AGENTS.md                          # Directrices maestras, identidad y reglas de negocio
├── index.html                         # Plantilla HTML con fuentes web pre-cargadas
├── package.json                       # Dependencias y scripts de compilación
├── PROMPTS_LOG.md                     # Registro cronológico sistemático de prompts
└── vite.config.js                     # Configuración de empaquetado de Vite
```

---

## 3. Grafo de Interconexiones del Código

El siguiente esquema representa cómo interactúan los componentes, el contexto y los hooks:

```
[main.jsx]
   │
   └── [App.jsx]
         ├── <ErrorBoundary>  (Captura de excepciones en tiempo de ejecución)
         └── <PortfolioProvider> (src/context/PortfolioContext.jsx)
               │
               ├── Hooks Integrados en Contexto:
               │     ├── useCaracasTime.js
               │     ├── useClipboard.js
               │     └── useSoundFeedback.js
               │
               └── <AppContent> (src/App.jsx)
                     │
                     ├── Hook: useScrollSpy.js -> Monitorea scroll y notifica a setActiveSection()
                     ├── Instancia: Lenis -> Sincroniza scroll inercial y bloqueo en modales
                     │
                     ├── <NoiseOverlay />       (Efecto visual independiente)
                     ├── <CustomCursor />       (Escucha mousemove global)
                     ├── <Preloader />          (Contador inicial 0% - 100%)
                     ├── <Navbar />             (Consume: activeSection, caracasTime, soundEnabled, toggleSound)
                     ├── <Hero />               (Consume: sound, trackEvent, datos de portfolioData.js)
                     ├── <Projects />           (Consume: filteredProjects, viewMode, useSpotlight, openProjectModal)
                     ├── <About />              (Consume: datos biográficos de portfolioData.js)
                     ├── <SkillsGrid />         (Consume: useSpotlight, skillCategories de portfolioData.js)
                     ├── <ContactSection />     (Consume: caracasTime, copyEmail, copyPhone, sound, trackEvent)
                     ├── <Footer />             (Consume: sound, caracasTime, Lenis scrollToTop)
                     └── <ProjectModal />       (Consume: selectedProject, nextProject, prevProject, closeProjectModal)
```

---

## 4. Matriz de Dependencias por Componente

| Componente / Archivo | Depende de (Imports directos) | Proporciona / Responsabilidad |
| :--- | :--- | :--- |
| **`PortfolioContext.jsx`** | `portfolioData.js`, `useCaracasTime`, `useClipboard`, `useSoundFeedback` | Estado central: proyectos filtrados, modal activo, navegación de proyectos, hora VET, sonido, métricas. |
| **`App.jsx`** | `Lenis`, `PortfolioContext`, `ErrorBoundary`, `useScrollSpy`, Componentes UI | Inicializa Lenis, bloquea scroll cuando se abre un modal, renderiza el árbol envuelto en context. |
| **`Navbar.jsx`** | `usePortfolio()`, `portfolioData.js` | Muestra enlaces, resalta sección activa vía `activeSection`, botón de sonido y WhatsApp. |
| **`Hero.jsx`** | `usePortfolio()`, `portfolioData.js`, `InteractiveReveal.jsx` | Título editorial, formas tocables en texto (`ShapeImageTag`) y tarjeta con selector geométrico de imágenes. |
| **`InteractiveReveal.jsx`** | `framer-motion`, `usePortfolio()` | Provee `ShapeImageTag`, `ShapeDrawerReveal` y `ShutterShapeGallery` con transiciones `clip-path`. |
| **`CompetitionsSection.jsx`** | `portfolioData.js`, `useSpotlight`, `usePortfolio()` | Exhibe el 2do Lugar Nacional en Kurios & BNC 2026 y el Pitchday UNIMET con visor de fotos. |
| **`PortfolioPDF.jsx`** | `portfolioData.js`, `framer-motion` | Genera el dossier ejecutivo imprimible en A4 (`@media print`) y modal de exportación PDF. |
| **`Projects.jsx`** | `usePortfolio()`, `useSpotlight` | Muestra proyectos en Bento o Índice, gestiona filtros por categoría y barra de búsqueda. |
| **`ProjectModal.jsx`** | `usePortfolio()` | Muestra caso completo, retos, soluciones, enlaces en vivo, navegación (`←`/`→`/`Esc`) y lightbox de fotos. |
| **`ContactSection.jsx`** | `usePortfolio()`, `portfolioData.js` | Genera enlaces de WhatsApp y mailto pre-redactados según el tipo de oportunidad seleccionado; copia datos. |
| **`SkillsGrid.jsx`** | `portfolioData.js`, `useSpotlight` | Muestra competencias comerciales en 3 columnas Bento con halo de luz reactivo. |
| **`About.jsx`** | `portfolioData.js` | Narrativa de Sofia, filosofía de trabajo y pilares estratégicos. |
| **`CustomCursor.jsx`** | `framer-motion` | Sigue el puntero con `mix-blend-mode: difference` y escala en elementos con `data-cursor`. |
| **`Preloader.jsx`** | `framer-motion` | Animación inicial de entrada antes de revelar el contenido. |
| **`ErrorBoundary.jsx`** | `lucide-react` | Atrapa errores de renderizado y muestra botón de restablecimiento. |

---

## 5. Matriz de Diagnóstico Rápido de Errores (Troubleshooting)

Utiliza esta tabla para identificar de inmediato qué archivo revisar ante cualquier síntoma:

| Síntoma o Fallo | Archivo(s) Responsable(s) | Causa Probable y Solución |
| :--- | :--- | :--- |
| **El scroll inercial no funciona o no se detiene al abrir el modal** | [`src/App.jsx`](file:///c:/Users/user/Desktop/video%20proyectos/Sofia%20portafolio/src/App.jsx) | Revisar `useEffect` con `lenisRef.current.stop()` / `.start()`. Asegurar que Lenis no tenga conflictos con `overflow: hidden`. |
| **El modal de proyectos no abre, no cierra o no avanza al siguiente caso** | [`src/context/PortfolioContext.jsx`](file:///c:/Users/user/Desktop/video%20proyectos/Sofia%20portafolio/src/context/PortfolioContext.jsx) y [`src/components/ProjectModal.jsx`](file:///c:/Users/user/Desktop/video%20proyectos/Sofia%20portafolio/src/components/ProjectModal.jsx) | Verificar `selectedProjectId`, `openProjectModal`, `nextProject` y `prevProject`. Asegurar que el id exista en `portfolioData.js`. |
| **Los filtros o la búsqueda de proyectos no devuelven resultados** | [`src/context/PortfolioContext.jsx`](file:///c:/Users/user/Desktop/video%20proyectos/Sofia%20portafolio/src/context/PortfolioContext.jsx) | Verificar la lógica de `filteredProjects` (líneas de búsqueda case-insensitive y categorías coincidentes). |
| **El botón de copiar correo o teléfono no copia o no muestra confirmación** | [`src/hooks/useClipboard.js`](file:///c:/Users/user/Desktop/video%20proyectos/Sofia%20portafolio/src/hooks/useClipboard.js) y [`src/components/ContactSection.jsx`](file:///c:/Users/user/Desktop/video%20proyectos/Sofia%20portafolio/src/components/ContactSection.jsx) | Comprobar permisos del portapapeles o fallback `document.execCommand`. Revisar la llamada a `copyEmail` o `copyPhone`. |
| **La hora de Caracas muestra valores incorrectos o no actualiza** | [`src/hooks/useCaracasTime.js`](file:///c:/Users/user/Desktop/video%20proyectos/Sofia%20portafolio/src/hooks/useCaracasTime.js) | Verificar la zona horaria `'America/Caracas'` en `Intl.DateTimeFormat` y el intervalo de 1000ms. |
| **El mensaje de WhatsApp o Correo en contacto no se genera bien** | [`src/components/ContactSection.jsx`](file:///c:/Users/user/Desktop/video%20proyectos/Sofia%20portafolio/src/components/ContactSection.jsx) | Revisar la función `buildMessage()` y los enlaces codificados con `encodeURIComponent()`. |
| **El halo de luz reactivo (Spotlight) no sigue el ratón en las tarjetas** | [`src/hooks/useSpotlight.js`](file:///c:/Users/user/Desktop/video%20proyectos/Sofia%20portafolio/src/hooks/useSpotlight.js) y [`src/index.css`](file:///c:/Users/user/Desktop/video%20proyectos/Sofia%20portafolio/src/index.css) | Verificar que la tarjeta tenga la clase `.spotlight-card`, el handler `onMouseMove={handleMouseMove}` y las variables `--mouse-x`, `--mouse-y`. |
| **No se escuchan los micro-sonidos de interfaz al hacer clic** | [`src/hooks/useSoundFeedback.js`](file:///c:/Users/user/Desktop/video%20proyectos/Sofia%20portafolio/src/hooks/useSoundFeedback.js) | Verificar si `soundEnabled` está en `true` en la cabecera. Recordar que los navegadores exigen una primera interacción del usuario para activar `AudioContext`. |
| **Fallo en textos, métricas, imágenes o descripciones de proyectos** | [`src/data/portfolioData.js`](file:///c:/Users/user/Desktop/video%20proyectos/Sofia%20portafolio/src/data/portfolioData.js) | Todos los datos de Sofia, MOVA y Meraki se editan exclusivamente en este archivo central. |
| **Error visual de fuentes, colores o espaciados** | [`src/index.css`](file:///c:/Users/user/Desktop/video%20proyectos/Sofia%20portafolio/src/index.css) | Revisar los tokens CSS (`--bg-primary`, `--accent-gold`, `--font-display`, `--font-body`). |
| **Pantalla en blanco o excepción crítica no controlada** | [`src/components/ErrorBoundary.jsx`](file:///c:/Users/user/Desktop/video%20proyectos/Sofia%20portafolio/src/components/ErrorBoundary.jsx) | El componente capturará el error en consola y desplegará la interfaz de recuperación. |

---

## 6. Comandos de Verificación (Sin Navegador)

Para comprobar la integridad del código en cualquier momento:

```powershell
# Comprobar que no existen errores de sintaxis, imports o empaquetado
npm run build

# Comprobar el estado del repositorio
git status
```
