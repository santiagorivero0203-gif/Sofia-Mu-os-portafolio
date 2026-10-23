---
name: editorial-typography-kinetic-text
description: Emparejamiento de fuentes editoriales de alto contraste, tipografía cinética con clamp(), máscaras de texto con overflow hidden y legibilidad para narrativa comercial.
---

# Editorial Typography & Kinetic Text

Define los estándares tipográficos y de animación de texto para el portafolio:

## 1. Emparejamiento Tipográfico
- **Títulos & Acentos de Alta Personalidad:** *Playfair Display* o *Instrument Serif* en cursiva (italic) para aportar elegancia, prestigio y calidez humana.
- **Cuerpo & Navegación:** *Plus Jakarta Sans* o *Syne* para lectura clara, geométrica y contemporánea.
- **Etiquetas y Metadatos:** Tipografía monoespaciada o sans en mayúsculas pequeñas con `letter-spacing: 0.08em` o `0.1em`.

## 2. Escala Tipográfica Fluida con `clamp()`
```css
:root {
  --font-display: 'Playfair Display', serif;
  --font-sans: 'Plus Jakarta Sans', sans-serif;
  
  --text-hero: clamp(2.5rem, 6vw + 1rem, 5.5rem);
  --text-h2: clamp(2rem, 3.5vw + 0.5rem, 3.75rem);
  --text-h3: clamp(1.4rem, 2vw + 0.3rem, 2.2rem);
  --text-body: clamp(0.95rem, 0.8vw + 0.5rem, 1.125rem);
}
```

## 3. Revelado por Máscaras (Mask Reveal)
- Envolver cada línea en un contenedor con `overflow: hidden; display: inline-block;`.
- El texto asciende desde `translateY(110%)` hasta `translateY(0)` con una curva Bézier `[0.22, 1, 0.36, 1]` para dar sensación de imprenta de lujo.
