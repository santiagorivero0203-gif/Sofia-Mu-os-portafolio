---
name: magnetic-cursor-microinteractions
description: Implementación de cursor contextual personalizado con mix-blend-mode difference, efectos de atracción magnética en botones interactivos y badges de estado.
---

# Magnetic Cursor & Microinteractions

Esta skill cubre la implementación de cursores de diseño y respuesta física en botones:

## 1. Cursor Contextual
- Cursor estilizado compuesto por un punto central de precisión y un aro elástico seguidor mediante físicas de resorte.
- Emplea `mix-blend-mode: difference` para auto-ajustar su contraste tanto sobre fondos oscuros como claros.
- En hover sobre proyectos, se expande a un disco con texto legible (ej: *"Ver ↗"* o *"Explorar"*).
- En dispositivos táctiles (`@media (pointer: coarse)`), el cursor personalizado se desactiva de forma imperceptible y elegante.

## 2. Botones Magnéticos
- Capturan la posición del cursor respecto al centro del elemento:
  $$\Delta x = (e.clientX - rect.left - rect.width / 2) \times 0.25$$
  $$\Delta y = (e.clientY - rect.top - rect.height / 2) \times 0.25$$
- El botón se desplaza sutilmente hacia el puntero y el texto interior se desplaza en paralelo a menor o mayor velocidad (efecto parallax de profundidad).
