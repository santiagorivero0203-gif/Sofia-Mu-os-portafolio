# Sofia Muñoz — Portafolio Profesional & Creativo

> Documento de directrices maestras, arquitectura, estética y reglas del proyecto.

---

## 1. Perfil del Proyecto
- **Titular:** Sofia Muñoz
- **Especialidad:** Asesora Comercial | Estrategia de Ventas | Creadora de Contenido & Embajadora de Marca
- **Propuesta de Valor:** *"Conecto necesidades reales con soluciones innovadoras a través de la comunicación estratégica, la empatía comercial y el liderazgo enfocado en resultados."*
- **Contacto Oficial:**
  - Correo: `sofiamunozvale@gmail.com`
  - Teléfono / WhatsApp: `04242674572` (Internacional: `+58 424 2674572`)
  - *Nota:* No incluir perfil de LinkedIn (excluido expresamente por la usuaria).
- **Proyectos Clave:**
  1. **MOVA (Tecnología Social & Accesibilidad):**
     - Co-fundadora & Gerente de Marketing
     - Plataforma interactiva con visión artificial para traducción de lenguaje de señas en tiempo real (LSV, ASL, LSE).
     - Validación en Vercel (`app-lemon.vercel.app`) y portada de revista especial de innovación.
  2. **Meraki (Moda & Retail Venezolano):**
     - Embajadora de Marca & Creadora de Contenido (@meraki_marka).
     - Estrategia de Social Selling, unboxing personalizado ("Querida Sofia"), producción audiovisual y dinamización de ventas.

---

## 2. Reglas del Usuario (Obligatorias)
1. **Documenta todo el código:** Cada componente, función y hoja de estilo debe tener comentarios descriptivos y coherentes.
2. **Coherencia total:** La narrativa comercial debe alinearse con la estética de alta gama.
3. **Resolución proactiva de problemas:** Ofrecer soluciones completas y funcionales.
4. **Documenta los cambios:** Registrar cada evolución técnica y de diseño.
5. **Uso inteligente de código preexistente:** Evitar duplicidades y reutilizar componentes modulares.
6. **Recursos visuales de alto impacto:** Utilizar imágenes reales provistas y generar o refinar activos según amerite el diseño.
7. **Arquitectura escalable:** Estructura modular en Vite + React, diseño basado en tokens CSS y componentes desacoplados.
8. **Registro Sistemático de Prompts:** Guardar cada prompt que proporcione el usuario en `PROMPTS_LOG.md` con su fecha, hora y acciones asociadas.
9. **Verificación en Navegador Limitada:** Evitar abrir o verificar en Chrome/navegador a menos que sea estrictamente necesario o solicitado expresamente.

---

## 3. Estética & Sistema de Diseño
- **Nivel:** Awwwards / Godly.website.
- **Tipografías:**
  - *Playfair Display* / *Instrument Serif* (Display editorial en cursiva para elegancia y calidez).
  - *Plus Jakarta Sans* / *Syne* (Geométrica limpia para UI, metadatos y cuerpo).
- **Textura:** Grano analógico sutil de película (`feTurbulence`) a 3.8% de opacidad.
- **Físicas & Movimiento:**
  - Desplazamiento suave inercial con Lenis.
  - Animaciones basadas en resortes con Framer Motion (`stiffness: 260`, `damping: 24`).
  - Cursor magnético contextual con `mix-blend-mode: difference`.
  - Tarjetas Bento interactivas con iluminación radial reactiva al cursor (Spotlight).
  - Preloader cinematográfico inicial con contador numérico de 0 a 100%.
