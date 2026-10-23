/**
 * @file portfolioData.js
 * @description Datos principales del portafolio de Sofia Muñoz redactados con lenguaje claro,
 * directo y natural, sin tecnicismos confusos.
 */

export const personalInfo = {
  name: "Sofia Muñoz",
  headline: "Asesora de Ventas & Creadora de Contenido",
  subheadline: "Ventas | Creación de Contenido | Embajadora de Marca",
  statement: "Ayudo a las marcas a comunicarse mejor, conectar con las personas y lograr más ventas.",
  bio: "Soy Sofia Muñoz. Me dedico a las ventas, la creación de contenido para redes sociales y el impulso de marcas. Trabajo para que cada proyecto se dé a conocer de forma cercana, clara y atractiva para sus clientes.",
  contact: {
    email: "sofiamunozvale@gmail.com",
    phone: "04242674572",
    phoneFormatted: "+58 424 2674572",
    whatsappUrl: "https://wa.me/584242674572?text=Hola%20Sofia,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar%20contigo",
    location: "Venezuela",
    availability: "Disponible para trabajar con marcas y proyectos"
  },
  stats: [
    { label: "Premio Nacional 2026", value: "2do Lugar", suffix: " (Torneo Kurios)" },
    { label: "Proyectos Destacados", value: "2", suffix: "" },
    { label: "Idiomas en MOVA", value: "3", suffix: " lenguas de señas" },
    { label: "Enfoque", value: "100%", suffix: " en ventas" }
  ]
};

export const projects = [
  {
    id: "mova",
    title: "MOVA — Traductor de Señas",
    subtitle: "Aplicación para Traducir Lengua de Señas",
    tagline: "Traduce señas a texto y voz usando la cámara para ayudar a comunicarse a personas sordas y oyentes.",
    role: "Co-fundadora & Encargada de Marketing",
    category: "Inclusión y Tecnología",
    year: "2026",
    link: "https://app-lemon.vercel.app",
    featuredCover: "/assets/mova/revista.jpg",
    accentColor: "#2e6ff2",
    overview: "MOVA es una página web que usa la cámara para traducir la lengua de señas a texto y voz al instante. Nació para que las personas sordas y oyentes puedan conversar fácilmente en su día a día.",
    challenges: [
      "Facilitar la comunicación diaria para las personas con discapacidad auditiva.",
      "Explicar cómo funciona la aplicación de forma sencilla para todo el público.",
      "Dar a conocer el proyecto en medios e instituciones para llegar a más personas."
    ],
    commercialContribution: [
      {
        title: "Mensaje e Imagen de la Marca",
        description: "Creé el lema principal ('Rompiendo el silencio') y la presentación visual del proyecto para transmitir cercanía y confianza."
      },
      {
        title: "Aparición en Revista",
        description: "Gestioné la difusión del proyecto en medios, logrando ser portada de una revista sobre innovación juvenil."
      },
      {
        title: "Traducción en 3 Idiomas",
        description: "Impulsé que la aplicación incluyera 3 lenguas de señas (venezolana, estadounidense y española) para ayudar a más personas."
      },
      {
        title: "Presentación del Proyecto",
        description: "Presenté y expliqué el proyecto frente a jurados, colegios e instituciones para demostrar su utilidad."
      }
    ],
    achievements: [
      "Página web de la aplicación terminada y disponible para usar en internet.",
      "Portada y reportaje principal en revista de innovación.",
      "Traducción disponible en 3 lenguas de señas (Venezuela, EE. UU. y España)."
    ],
    gallery: [
      {
        src: "/assets/mova/revista.jpg",
        caption: "Portada de Revista — '¡MOVA dijo presente! El camino de la innovación'",
        type: "press"
      },
      {
        src: "/assets/mova/interface.png",
        caption: "Pantalla principal de la aplicación MOVA",
        type: "ui"
      },
      {
        src: "/assets/mova/languages.png",
        caption: "Menú para elegir entre las 3 lenguas de señas",
        type: "ui"
      },
      {
        src: "/assets/mova/detection.jpg",
        caption: "Reconocimiento de las manos con la cámara para traducir las señas",
        type: "tech"
      },
      {
        src: "/assets/mova/preview.png",
        caption: "Pantalla de bienvenida de MOVA",
        type: "ui"
      }
    ]
  },
  {
    id: "meraki",
    title: "Meraki — Marca de Ropa",
    subtitle: "Marca Venezolana de Moda",
    tagline: "Creación de videos, fotos y atención cercana en redes sociales para impulsar las ventas de ropa.",
    role: "Embajadora de Marca & Creadora de Contenido",
    category: "Moda y Ventas",
    year: "2026",
    link: "https://www.instagram.com/meraki_marka",
    featuredCover: "/assets/meraki/clothing.jpg",
    accentColor: "#ffd60a",
    overview: "Meraki es una marca venezolana de ropa. Como embajadora y creadora de contenido, modelo las prendas, grabo videos para Instagram y asesoro a las clientas para ayudarlas a elegir y comprar.",
    challenges: [
      "Llamar la atención en redes sociales con videos naturales y cercanos.",
      "Lograr que las personas que ven los videos se animen a comprar las prendas.",
      "Brindar una atención especial para que cada clienta quiera volver a comprar."
    ],
    commercialContribution: [
      {
        title: "Imagen de la Marca",
        description: "Represento a Meraki en fotos y videos mostrando el estilo de la ropa con naturalidad."
      },
      {
        title: "Videos y Fotos para Redes",
        description: "Grabo videos mostrando combinaciones de ropa y cómo quedan las prendas para motivar las compras."
      },
      {
        title: "Atención a Clientas",
        description: "Respondo dudas sobre tallas, colores y combinaciones por Instagram para facilitar cada venta."
      },
      {
        title: "Detalles Personalizados ('Querida Sofia')",
        description: "Participé en la creación de entregas con cartas y detalles especiales que hacen sentir única a cada compradora."
      }
    ],
    achievements: [
      "Aumento de mensajes y consultas de compra en cada nueva colección de ropa.",
      "Trabajo continuo como imagen principal de @meraki_marka.",
      "Entregas personalizadas que hacen que las clientas recomienden la marca."
    ],
    gallery: [
      {
        src: "/assets/meraki/clothing.jpg",
        caption: "Colección y prendas de ropa de Meraki",
        type: "lifestyle"
      },
      {
        src: "/assets/meraki/querida_sofia.jpg",
        caption: "Carta personalizada de la marca — 'Querida Sofia'",
        type: "branding"
      },
      {
        src: "/assets/meraki/unboxing.jpg",
        caption: "Presentación y empaque de entrega de @meraki_marka",
        type: "unboxing"
      }
    ]
  }
];

export const skillCategories = [
  {
    title: "Ventas y Trato con Clientes",
    description: "Atención cercana, asesoría y cierre de ventas.",
    skills: [
      { name: "Atención al Cliente y Ventas", level: "Avanzado" },
      { name: "Ventas por Redes Sociales", level: "Especialista" },
      { name: "Negociación y Acuerdos", level: "Avanzado" },
      { name: "Exposición y Presentación de Ideas", level: "Avanzado" },
      { name: "Fidelización de Compradores", level: "Avanzado" }
    ]
  },
  {
    title: "Contenido y Redes Sociales",
    description: "Fotos, videos y comunicación para dar a conocer marcas.",
    skills: [
      { name: "Grabación de Videos y Fotos", level: "Especialista" },
      { name: "Imagen y Embajada de Marca", level: "Especialista" },
      { name: "Comunicación y Prensa", level: "Avanzado" },
      { name: "Ideas para Campañas", level: "Avanzado" },
      { name: "Comunidad en Instagram", level: "Avanzado" }
    ]
  },
  {
    title: "Organización y Herramientas",
    description: "Trabajo en equipo y manejo de plataformas digitales.",
    skills: [
      { name: "Liderazgo y Trabajo en Equipo", level: "Clave" },
      { name: "Empatía y Buena Comunicación", level: "Clave" },
      { name: "Instagram y WhatsApp", level: "Dominio" },
      { name: "Seguimiento de Clientes", level: "Dominio" },
      { name: "Diseño y Organización (Canva / Notion)", level: "Dominio" }
    ]
  }
];

export const competitions = [
  {
    id: "kurios-bnc-2026",
    title: "Torneo Nacional de Robótica y Tecnología 2026",
    organization: "Kurios Competition & Banco Nacional de Crédito (BNC)",
    award: "2do Lugar Nacional — Categoría Comercial",
    badge: "2do Lugar Nacional",
    team: "Equipo Consolación Caracas",
    location: "Caracas, Venezuela",
    year: "2026",
    accentColor: "var(--accent-gold)",
    summary: "Obtuvimos el 2do lugar nacional compitiendo contra colegios y equipos de todo el país, destacando por la utilidad del proyecto y su propuesta comercial.",
    defense: "Expliqué el valor del proyecto y defendí cómo funciona nuestro modelo de ventas frente a los jueces.",
    coverImage: "/assets/competitions/kurios_podio_marketplace.jpg",
    gallery: [
      {
        src: "/assets/competitions/kurios_podio_marketplace.jpg",
        caption: "Podio Nacional — 2do Lugar en el Torneo Kurios 2026"
      },
      {
        src: "/assets/competitions/kurios_diplomas_2do_lugar.jpg",
        caption: "Entrega de diplomas y medallas del 2do lugar nacional"
      },
      {
        src: "/assets/competitions/kurios_celebracion.jpg",
        caption: "Celebración del equipo al recibir el premio nacional"
      }
    ]
  },
  {
    id: "pitchday-unimet-2026",
    title: "Encuentro de Innovación y Emprendimiento UNIMET",
    organization: "Universidad Metropolitana (UNIMET)",
    award: "Exposición y Defensa del Proyecto",
    badge: "Presentación UNIMET",
    team: "Colegio Nuestra Señora de la Consolación",
    location: "Universidad Metropolitana, Caracas",
    year: "2026",
    accentColor: "var(--accent-blue)",
    summary: "Presentación del proyecto en la Universidad Metropolitana frente a profesores y jurados empresariales, mostrando cómo ayuda a las personas y cómo llevarlo al público.",
    defense: "Conversación y defensa directa frente a los evaluadores, respondiendo preguntas sobre el impacto y futuro de la aplicación.",
    coverImage: "/assets/competitions/unimet_pitch_ejecutivo.jpg",
    gallery: [
      {
        src: "/assets/competitions/unimet_pitch_ejecutivo.jpg",
        caption: "Sofia Muñoz explicando el proyecto a un evaluador en la UNIMET"
      },
      {
        src: "/assets/competitions/unimet_campus_letras.jpg",
        caption: "Equipo en el campus de la Universidad Metropolitana (UNIMET)"
      }
    ]
  }
];
