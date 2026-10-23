/**
 * @file portfolioData.js
 * @description Fuente de datos centralizada y estructurada para el portafolio de Sofia Muñoz.
 * Incluye perfil personal, métricas, proyectos destacados con galería de imágenes locales y habilidades.
 */

export const personalInfo = {
  name: "Sofia Muñoz",
  headline: "Asesora Comercial & Creadora de Contenido",
  subheadline: "Ventas | Contenido | Embajadora de Marca",
  statement: "Conecto marcas con personas reales a través de buena comunicación, empatía y enfoque directo en ventas.",
  bio: "Soy Sofia Muñoz. Me especializo en ventas, creación de contenido y marketing para proyectos de tecnología y moda. Trabajo para que las marcas se entiendan rápido, conecten con su público y vendan más.",
  contact: {
    email: "sofiamunozvale@gmail.com",
    phone: "04242674572",
    phoneFormatted: "+58 424 2674572",
    whatsappUrl: "https://wa.me/584242674572?text=Hola%20Sofia,%20me%20gustar%C3%ADa%20conversar%20sobre%20una%20oportunidad%20comercial",
    location: "Venezuela",
    availability: "Disponible para ventas y alianzas"
  },
  stats: [
    { label: "Premio Nacional 2026", value: "2do Lugar", suffix: " (Kurios & BNC)" },
    { label: "Proyectos Activos", value: "2", suffix: "" },
    { label: "Idiomas en MOVA", value: "3", suffix: " (LSV/ASL/LSE)" },
    { label: "Enfoque", value: "100%", suffix: " en resultados" }
  ]
};

export const projects = [
  {
    id: "mova",
    title: "MOVA — Tecnología Social",
    subtitle: "Traductor de Lenguaje de Señas en Tiempo Real",
    tagline: "Traduce señas a texto y voz con la cámara para conectar a personas sordas y oyentes.",
    role: "Co-fundadora & Marketing",
    category: "Tecnología Social",
    year: "2026",
    link: "https://app-lemon.vercel.app",
    featuredCover: "/assets/mova/revista.jpg",
    accentColor: "#2e6ff2",
    overview: "MOVA es una aplicación web que traduce el lenguaje de señas a texto y voz en vivo usando la cámara. Su meta es facilitar la comunicación diaria entre personas sordas y oyentes sin barreras.",
    challenges: [
      "Eliminar las barreras de comunicación diaria para personas sordas.",
      "Explicar una tecnología nueva de forma sencilla para usuarios y aliados.",
      "Dar a conocer el proyecto en medios y eventos para sumar apoyo."
    ],
    commercialContribution: [
      {
        title: "Mensaje e Identidad",
        description: "Creé el mensaje principal ('Rompiendo el silencio') y la imagen de la marca para transmitir cercanía y confianza."
      },
      {
        title: "Presencia en Prensa",
        description: "Logramos aparecer en portada de revista destacando el impacto social y tecnológico del proyecto."
      },
      {
        title: "Alcance en 3 Idiomas",
        description: "Impulsé la inclusión de 3 lenguas de señas (venezolana LSV, americana ASL y española LSE) para llegar a más personas."
      },
      {
        title: "Presentación y Ventas",
        description: "Presenté el proyecto frente a jurados, instituciones y aliados para validar su uso real."
      }
    ],
    achievements: [
      "Versión Beta V2.0 activa y funcionando en internet (Vercel).",
      "Portada y reportaje central en revista de innovación.",
      "Traducción en vivo para 3 lenguas de señas (LSV, ASL y LSE)."
    ],
    gallery: [
      {
        src: "/assets/mova/revista.jpg",
        caption: "Portada de Revista — '¡MOVA dijo presente! El camino de la innovación'",
        type: "press"
      },
      {
        src: "/assets/mova/interface.png",
        caption: "Pantalla principal de MOVA Beta V2.0",
        type: "ui"
      },
      {
        src: "/assets/mova/languages.png",
        caption: "Selección de idioma: LSV, ASL y LSE",
        type: "ui"
      },
      {
        src: "/assets/mova/detection.jpg",
        caption: "Lectura de manos en vivo mediante cámara",
        type: "tech"
      },
      {
        src: "/assets/mova/preview.png",
        caption: "Bienvenida y acceso rápido a la plataforma",
        type: "ui"
      }
    ]
  },
  {
    id: "meraki",
    title: "Meraki — Moda & Retail",
    subtitle: "Marca Venezolana de Ropa",
    tagline: "Contenido cercano, modelaje y atención directa para impulsar las ventas en redes.",
    role: "Embajadora de Marca & Creadora de Contenido",
    category: "Moda & Ventas",
    year: "2026",
    link: "https://www.instagram.com/meraki_marka",
    featuredCover: "/assets/meraki/clothing.jpg",
    accentColor: "#ffd60a",
    overview: "Meraki es una marca venezolana de moda. Como embajadora y creadora de contenido, muestro las prendas en uso real, conecto con la comunidad y ayudo a convertir seguidores en compradoras.",
    challenges: [
      "Destacar en redes sociales con contenido natural y cercano.",
      "Convertir vistas en reels e historias en ventas reales.",
      "Hacer que cada clienta sienta una experiencia especial al recibir su compra."
    ],
    commercialContribution: [
      {
        title: "Imagen de la Marca",
        description: "Represento el estilo de Meraki en fotos, videos y eventos con frescura y autenticidad."
      },
      {
        title: "Videos que Venden",
        description: "Grabo reels, ideas de outfits y unboxings pensados para mostrar cómo lucen las prendas y animar a comprar."
      },
      {
        title: "Asesoría por Redes",
        description: "Respondo dudas de tallas y combinaciones en Instagram para facilitar el cierre de cada venta."
      },
      {
        title: "Experiencia 'Querida Sofia'",
        description: "Impulsé detalles personalizados en las entregas que enamoran a las clientas y hacen que recomienden la marca."
      }
    ],
    achievements: [
      "Mayor interacción y mensajes de compra en cada nueva colección.",
      "Alianza continua como imagen principal de @meraki_marka.",
      "Unboxings personalizados que fortalecen la fidelidad de las clientas."
    ],
    gallery: [
      {
        src: "/assets/meraki/clothing.jpg",
        caption: "Colección y prendas de Meraki",
        type: "lifestyle"
      },
      {
        src: "/assets/meraki/querida_sofia.jpg",
        caption: "Detalle personalizado — Carta 'Querida Sofia'",
        type: "branding"
      },
      {
        src: "/assets/meraki/unboxing.jpg",
        caption: "Empaque y presentación de entrega @meraki_marka",
        type: "unboxing"
      }
    ]
  }
];

export const skillCategories = [
  {
    title: "Ventas & Clientes",
    description: "Trato directo con clientes, negociación y cierre de ventas.",
    skills: [
      { name: "Atención y Cierre de Ventas", level: "Avanzado" },
      { name: "Ventas por Redes (Social Selling)", level: "Especialista" },
      { name: "Negociación y Acuerdos", level: "Avanzado" },
      { name: "Presentación de Proyectos (Pitch)", level: "Avanzado" },
      { name: "Fidelización de Clientes", level: "Avanzado" }
    ]
  },
  {
    title: "Contenido & Marca",
    description: "Comunicación clara para dar visibilidad y atraer público.",
    skills: [
      { name: "Creación de Contenido (Reels / Fotos)", level: "Especialista" },
      { name: "Embajada de Marca", level: "Especialista" },
      { name: "Comunicación y Prensa", level: "Avanzado" },
      { name: "Ideas Comerciales", level: "Avanzado" },
      { name: "Crecimiento en Redes", level: "Avanzado" }
    ]
  },
  {
    title: "Herramientas & Liderazgo",
    description: "Organización diaria y trabajo en equipo.",
    skills: [
      { name: "Liderazgo de Equipos", level: "Clave" },
      { name: "Empatía y Comunicación", level: "Clave" },
      { name: "Instagram & WhatsApp Business", level: "Dominio" },
      { name: "Seguimiento de Clientes", level: "Dominio" },
      { name: "Canva, Notion & Web (Vercel)", level: "Dominio" }
    ]
  }
];

export const competitions = [
  {
    id: "kurios-bnc-2026",
    title: "Torneo Nacional de Robótica y Tecnología 2026",
    organization: "Kurios Competition & BNC",
    award: "2do Lugar — División Marketplace",
    badge: "2do Lugar Nacional",
    team: "Team Consolación Caracas",
    location: "Caracas, Venezuela",
    year: "2026",
    accentColor: "var(--accent-gold)",
    summary: "Ganamos el 2do lugar nacional en la categoría comercial (Marketplace), compitiendo contra equipos de todo el país y demostrando que el proyecto es útil, viable y rentable.",
    defense: "Presenté el modelo de negocio y defendí la propuesta de ventas frente al jurado.",
    coverImage: "/assets/competitions/kurios_podio_marketplace.jpg",
    gallery: [
      {
        src: "/assets/competitions/kurios_podio_marketplace.jpg",
        caption: "Podio Nacional — 2do Lugar División Marketplace (Kurios Competition)"
      },
      {
        src: "/assets/competitions/kurios_diplomas_2do_lugar.jpg",
        caption: "Diplomas y medallas del 2do lugar nacional — Kurios & BNC 2026"
      },
      {
        src: "/assets/competitions/kurios_celebracion.jpg",
        caption: "Celebración del equipo al recibir el 2do lugar nacional"
      }
    ]
  },
  {
    id: "pitchday-unimet-2026",
    title: "Pitchday de Innovación UNIMET",
    organization: "Universidad Metropolitana (UNIMET)",
    award: "Presentación Comercial",
    badge: "Pitch en Vivo",
    team: "Colegio Nuestra Señora de la Consolación",
    location: "Campus UNIMET, Caracas",
    year: "2026",
    accentColor: "var(--accent-blue)",
    summary: "Presentación en vivo del proyecto en la Universidad Metropolitana frente a jurados empresariales, explicando su valor comercial y cómo llevarlo al mercado.",
    defense: "Explicación directa cara a cara con evaluadores, respondiendo preguntas sobre ventas y alcance del producto.",
    coverImage: "/assets/competitions/unimet_pitch_ejecutivo.jpg",
    gallery: [
      {
        src: "/assets/competitions/unimet_pitch_ejecutivo.jpg",
        caption: "Sofia Muñoz presentando y defendiendo el proyecto ante el jurado en la UNIMET"
      },
      {
        src: "/assets/competitions/unimet_campus_letras.jpg",
        caption: "Equipo en el campus de la Universidad Metropolitana (UNIMET)"
      }
    ]
  }
];
