/**
 * @file portfolioData.js
 * @description Fuente de datos centralizada y estructurada para el portafolio de Sofia Muñoz.
 * Incluye perfil personal, métricas, proyectos destacados con galería de imágenes locales y habilidades.
 */

export const personalInfo = {
  name: "Sofia Muñoz",
  headline: "Asesora Comercial & Creadora de Contenido",
  subheadline: "Estrategia de Ventas | Social Selling | Embajadora de Marca",
  statement: "Conecto necesidades reales con soluciones innovadoras a través de la comunicación estratégica, la empatía comercial y el liderazgo enfocado en resultados.",
  bio: "Soy Sofia Muñoz, profesional orientada a objetivos con trayectoria en gerencia de marketing, prospección comercial, creación de contenido y liderazgo de proyectos tecnológicos y de retail. Combino visión analítica de negocio con sensibilidad comunicacional para acelerar la tracción comercial y fidelizar clientes a largo plazo.",
  contact: {
    email: "sofiamunozvale@gmail.com",
    phone: "04242674572",
    phoneFormatted: "+58 424 2674572",
    whatsappUrl: "https://wa.me/584242674572?text=Hola%20Sofia,%20me%20gustar%C3%ADa%20conversar%20sobre%20una%20oportunidad%20comercial",
    location: "Venezuela",
    availability: "Disponible para roles comerciales y alianzas estratégicas"
  },
  stats: [
    { label: "Premio Nacional 2026", value: "2do Lugar", suffix: " (Kurios & BNC)" },
    { label: "Proyectos Clave", value: "2", suffix: "" },
    { label: "Idiomas Traducidos en MOVA", value: "3", suffix: " (LSV/ASL/LSE)" },
    { label: "Enfoque Comercial", value: "100%", suffix: " orientado a metas" }
  ]
};

export const projects = [
  {
    id: "mova",
    title: "MOVA — Tecnología Social",
    subtitle: "Aplicación de Traducción de Lenguaje de Señas",
    tagline: "Rompiendo el silencio a través de visión artificial y empatía",
    role: "Co-fundadora & Gerente de Marketing",
    category: "Tecnología Social / Accesibilidad",
    year: "2026",
    link: "https://app-lemon.vercel.app",
    featuredCover: "/assets/mova/revista.jpg",
    accentColor: "#2e6ff2",
    overview: "MOVA es una plataforma de impacto social que traduce en tiempo real el lenguaje de señas a texto y voz mediante algoritmos de visión por computadora. Creada para tender puentes directos de comunicación entre la comunidad no oyente y el entorno oyente.",
    challenges: [
      "Superar las barreras de comunicación e inserción cotidiana para personas sordas o hipoacúsicas.",
      "Introducir una tecnología innovadora y generar credibilidad ante usuarios, instituciones y potenciales patrocinadores.",
      "Posicionar la marca en medios de comunicación para atraer tracción y alianzas estratégicas."
    ],
    commercialContribution: [
      {
        title: "Estrategia de Marca & Posicionamiento",
        description: "Lideré la narrativa comercial, propuesta de valor ('Rompiendo el silencio') e identidad visual orientada a generar empatía y confianza institucional."
      },
      {
        title: "Relaciones Públicas & Prensa",
        description: "Gestión de presencia mediática que derivó en portada de revista especializada sobre innovación juvenil y liderazgo tecnológico."
      },
      {
        title: "Estrategia Multimercado",
        description: "Impulsé la cobertura técnica para 3 lenguas de señas (LSV venezolana, ASL estadounidense y LSE española), triplicando el mercado potencial internacional."
      },
      {
        title: "Pitch & Negociación Comercial",
        description: "Presentación ejecutiva del producto ante encuentros y eventos con aliados clave para validar tracción de usuarios."
      }
    ],
    achievements: [
      "Despliegue y validación de la versión BETA V2.0 en plataforma web Vercel.",
      "Reconocimiento en medios impresos e informativos con portada y reportaje central.",
      "Soporte validado para tres variantes del lenguaje de señas en vivo."
    ],
    gallery: [
      {
        src: "/assets/mova/revista.jpg",
        caption: "Portada de Revista Especial — '¡MOVA dijo presente! El camino de la innovación'",
        type: "press"
      },
      {
        src: "/assets/mova/interface.png",
        caption: "Interfaz Principal del Producto en su versión Beta V2.0",
        type: "ui"
      },
      {
        src: "/assets/mova/languages.png",
        caption: "Estrategia Multilingüe — Selección entre LSV, ASL y LSE",
        type: "ui"
      },
      {
        src: "/assets/mova/detection.jpg",
        caption: "Demostración de Visión Artificial — Detección de articulaciones manuales en tiempo real",
        type: "tech"
      },
      {
        src: "/assets/mova/preview.png",
        caption: "Pantalla de Bienvenida y Acceso a la Plataforma",
        type: "ui"
      }
    ]
  },
  {
    id: "meraki",
    title: "Meraki — Moda & Retail",
    subtitle: "Marca Venezolana de Ropa y Estilo de Vida",
    tagline: "Estrategia de social selling y embajada de marca con alta conversión",
    role: "Embajadora de Marca & Creadora de Contenido",
    category: "Moda & Retail / Comercio Nacional",
    year: "2026",
    link: "https://www.instagram.com/meraki_marka",
    featuredCover: "/assets/meraki/clothing.jpg",
    accentColor: "#ffd60a",
    overview: "Meraki es una firma venezolana de moda contemporánea. A través de mi rol como embajadora y creadora de contenido, he articulado una estrategia de comunicación enfocada en social selling, construcción de comunidad y dinamización de ventas.",
    challenges: [
      "Destacar en un mercado de retail altamente competitivo mediante autenticidad y cercanía.",
      "Convertir interacciones en redes sociales (reels, unboxings e historias) en compras efectivas.",
      "Fidelizar a las compradoras conectando estilo de vida y valor de marca."
    ],
    commercialContribution: [
      {
        title: "Embajadora de Marca & Representación",
        description: "Encarnación de la identidad y valores de la marca, transmitiendo sofisticación, calidez y estilo a través de presencia pública y medios digitales."
      },
      {
        title: "Creación de Contenido para Conversión",
        description: "Desarrollo y modelaje de formatos audiovisuales dinámicos (reels, styling tips, unboxings) diseñados para despertar deseo de compra."
      },
      {
        title: "Social Selling & Asesoría Directa",
        description: "Resolución de inquietudes sobre tallas, outfits y combinación de prendas directamente en canales sociales, canalizando clientes al checkout."
      },
      {
        title: "Fidelización & Imagen Personalizada",
        description: "Campañas personalizadas ('Querida Sofia') que humanizan la experiencia de unboxing y generan recomendación boca a boca."
      }
    ],
    achievements: [
      "Incremento sostenido del engagement e intención de compra en lanzamientos de temporada.",
      "Alianza comercial prolongada como imagen referencial de la marca.",
      "Experiencias de unboxing que refuerzan la exclusividad del producto."
    ],
    gallery: [
      {
        src: "/assets/meraki/clothing.jpg",
        caption: "Presentación Editorial de Colección y Prendas Meraki",
        type: "lifestyle"
      },
      {
        src: "/assets/meraki/querida_sofia.jpg",
        caption: "Unboxing Personalizado — Carta de Alianza Comercial 'Querida Sofia'",
        type: "branding"
      },
      {
        src: "/assets/meraki/unboxing.jpg",
        caption: "Packaging y Detalle de Entrega @meraki_marka",
        type: "unboxing"
      }
    ]
  }
];

export const skillCategories = [
  {
    title: "Gestión Comercial & Ventas",
    description: "Metodologías de prospección, cierre y retención de cuentas.",
    skills: [
      { name: "Prospección B2B / B2C", level: "Avanzado" },
      { name: "Social Selling & Conversión", level: "Especialista" },
      { name: "Negociación & Manejo de Objeciones", level: "Avanzado" },
      { name: "Pitch Comercial & Presentaciones", level: "Avanzado" },
      { name: "Fidelización & Customer Care", level: "Avanzado" }
    ]
  },
  {
    title: "Estrategia & Posicionamiento",
    description: "Creación de valor de marca, identidad y presencia de mercado.",
    skills: [
      { name: "Propuesta de Valor & Storytelling", level: "Especialista" },
      { name: "Embajada de Marca & Influencer Marketing", level: "Especialista" },
      { name: "Relaciones Públicas & Gestión de Prensa", level: "Avanzado" },
      { name: "Investigación de Mercados & Usuario", level: "Intermedio" },
      { name: "Estrategia Multimercado", level: "Intermedio" }
    ]
  },
  {
    title: "Herramientas & Habilidades Blandas",
    description: "Ecosistema digital y competencias interpersonales de liderazgo.",
    skills: [
      { name: "Liderazgo & Visión de Negocio", level: "Clave" },
      { name: "Comunicación Asertiva & Empatía", level: "Clave" },
      { name: "Canales Digitales (Instagram / WhatsApp)", level: "Dominio" },
      { name: "CRM & Seguimiento de Clientes", level: "Dominio" },
      { name: "Plataformas Web (Vercel, Notion, Canva)", level: "Dominio" }
    ]
  }
];

export const competitions = [
  {
    id: "kurios-bnc-2026",
    title: "Torneo Nacional de Robótica y Tecnología 2026",
    organization: "Kurios Competition & Banco Nacional de Crédito (BNC)",
    award: "2do Lugar — División Marketplace",
    badge: "Subcampeonas Nacionales",
    team: "Team Consolación Caracas",
    location: "Caracas, Venezuela",
    year: "2026",
    accentColor: "var(--accent-gold)",
    summary: "Subcampeonas nacionales en la división comercial y de mercado ante decenas de delegaciones de todo el país, validando la propuesta comercial, viabilidad de negocio y valor de impacto de la solución tecnológica.",
    defense: "Lideré la estructuración de la propuesta de valor comercial, el pitch ante el jurado calificador y la argumentación estratégica de mercado.",
    coverImage: "/assets/competitions/kurios_podio_marketplace.jpg",
    gallery: [
      {
        src: "/assets/competitions/kurios_podio_marketplace.jpg",
        caption: "Podio Nacional — 2do Lugar División Marketplace (Kurios Competition: 'Donde las cosas pasan')"
      },
      {
        src: "/assets/competitions/kurios_diplomas_2do_lugar.jpg",
        caption: "Entrega de Diplomas Oficiales y Medallas de Reconocimiento — Kurios & BNC 2026"
      },
      {
        src: "/assets/competitions/kurios_celebracion.jpg",
        caption: "Celebración del equipo tras el anuncio del 2do lugar nacional en la división Marketplace"
      }
    ]
  },
  {
    id: "pitchday-unimet-2026",
    title: "Pitchday de Innovación & Emprendimiento UNIMET",
    organization: "Universidad Metropolitana (UNIMET)",
    award: "Defensa Comercial Ejecutiva",
    badge: "Pitch & Negociación",
    team: "Delegación Nuestra Señora de la Consolación",
    location: "Campus UNIMET, Caracas",
    year: "2026",
    accentColor: "var(--accent-blue)",
    summary: "Jornada de pitch ejecutivo en el campus de la Universidad Metropolitana ante evaluadores corporativos, mentores de negocio e inversionistas del ecosistema de innovación.",
    defense: "Defensa presencial de la propuesta de valor comercial ante evaluadores del sector empresarial, resolviendo preguntas críticas de monetización y adopción de usuarios.",
    coverImage: "/assets/competitions/unimet_pitch_ejecutivo.jpg",
    gallery: [
      {
        src: "/assets/competitions/unimet_pitch_ejecutivo.jpg",
        caption: "Pitch Directo — Sofia Muñoz en plena defensa y negociación comercial con evaluador corporativo"
      },
      {
        src: "/assets/competitions/unimet_campus_letras.jpg",
        caption: "Delegación en el emblemático campus de la Universidad Metropolitana (UNIMET) en Caracas"
      }
    ]
  }
];
