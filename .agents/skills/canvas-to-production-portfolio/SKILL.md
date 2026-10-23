---
name: canvas-to-production-portfolio
description: Metodología para convertir maquetas preliminares de Gemini Canvas en aplicaciones web de producción escalables, con grillas editoriales asimétricas y selector de vista Galería/Índice.
---

# Canvas to Production Portfolio Methodology

Esta skill documenta la transición arquitectónica y estética:

## 1. De Prototipo Plano a Producción
- **Separación de responsabilidades:** Separar la lógica en componentes desacoplados (`Hero`, `Projects`, `ProjectModal`, `About`, `Skills`, `Contact`).
- **Datos centralizados:** Mantener los datos de los proyectos en un archivo o constante estructurada (`src/data/portfolioData.js`), con campos detallados para objetivos, rol comercial, métricas, evidencias y tags.

## 2. Doble Modo de Visualización (Galería vs. Índice)
- **Vista Galería:** Tarjetas Bento de gran escala con imágenes en alta resolución, ideales para impacto visual inmediato.
- **Vista Índice (Table / List View):** Tabla minimalista con columnas (*Año*, *Proyecto*, *Disciplina*, *Métricas*, *Enlace*), donde al pasar el cursor sobre una fila aparece una miniatura flotante seguidora.
