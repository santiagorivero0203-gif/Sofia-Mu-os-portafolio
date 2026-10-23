/**
 * @file portfolioData.js
 * @description Datos principales del portafolio de Sofia Muñoz redactados de forma concisa,
 * directa y enfocada en lectura rápida para reclutadores y clientes.
 */

export const personalInfo = {
  name: "Sofia Muñoz",
  statement: "Ayudo a las marcas a comunicarse mejor, conectar con las personas y lograr más ventas.",
  bio: "Soy Sofia Muñoz. Me dedico a las ventas, la creación de contenido para redes sociales y el impulso de marcas, logrando que cada proyecto conecte con sus clientes de forma cercana y clara.",
  contact: {
    email: "sofiamunozvale@gmail.com",
    phone: "04242674572",
    phoneFormatted: "+58 424 2674572",
    whatsappUrl: "https://wa.me/584242674572?text=Hola%20Sofia,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar%20contigo",
    availability: "Disponible para trabajar con marcas y proyectos"
  }
};

export const projects = [
  {
    id: "mova",
    title: "MOVA — Traductor de Señas",
    tagline: "Aplicación web que traduce lengua de señas a texto y voz usando la cámara en tiempo real.",
    role: "Co-fundadora & Encargada de Marketing",
    category: "Inclusión y Tecnología",
    year: "2026",
    link: "https://app-lemon.vercel.app",
    featuredCover: "/assets/mova/revista.jpg",
    overview: "MOVA es una aplicación web que usa la cámara para traducir la lengua de señas a texto y voz al instante, facilitando la comunicación diaria entre personas sordas y oyentes.",
    achievements: [
      "Aplicación web publicada y disponible para usar en internet.",
      "Portada y reportaje principal en revista de innovación juvenil.",
      "Traducción activa en 3 lenguas de señas (Venezuela, EE. UU. y España)."
    ],
    gallery: [
      {
        src: "/assets/mova/revista.jpg",
        caption: "Portada de Revista — '¡MOVA dijo presente! El camino de la innovación'"
      },
      {
        src: "/assets/mova/interface.png",
        caption: "Pantalla principal de la aplicación MOVA"
      },
      {
        src: "/assets/mova/languages.png",
        caption: "Menú para elegir entre las 3 lenguas de señas"
      },
      {
        src: "/assets/mova/detection.jpg",
        caption: "Reconocimiento de las manos con la cámara para traducir las señas"
      },
      {
        src: "/assets/mova/preview.png",
        caption: "Pantalla de bienvenida de MOVA"
      }
    ]
  },
  {
    id: "meraki",
    title: "Meraki — Marca de Ropa",
    tagline: "Creación de videos, fotos y atención cercana en Instagram para impulsar las ventas de ropa.",
    role: "Embajadora de Marca & Creadora de Contenido",
    category: "Moda y Ventas",
    year: "2026",
    link: "https://www.instagram.com/meraki_marka",
    featuredCover: "/assets/meraki/clothing.jpg",
    overview: "Meraki es una marca venezolana de moda. Como embajadora y creadora de contenido, modelo las prendas, grabo videos para Instagram (@meraki_marka) y asesoro a las clientas en sus compras.",
    achievements: [
      "Aumento de consultas y cierres de venta en cada colección de ropa.",
      "Imagen principal en videos y fotografías de @meraki_marka.",
      "Entregas personalizadas ('Querida Sofia') que fidelizan a las clientas."
    ],
    gallery: [
      {
        src: "/assets/meraki/clothing.jpg",
        caption: "Colección y prendas de ropa de Meraki"
      },
      {
        src: "/assets/meraki/querida_sofia.jpg",
        caption: "Carta personalizada de la marca — 'Querida Sofia'"
      },
      {
        src: "/assets/meraki/unboxing.jpg",
        caption: "Presentación y empaque de entrega de @meraki_marka"
      }
    ]
  }
];

export const skillCategories = [
  {
    title: "Ventas y Clientes",
    skills: [
      { name: "Atención al Cliente y Cierre de Ventas" },
      { name: "Ventas por Redes Sociales" },
      { name: "Negociación y Acuerdos" },
      { name: "Exposición de Proyectos" }
    ]
  },
  {
    title: "Contenido y Marca",
    skills: [
      { name: "Grabación de Videos y Fotos" },
      { name: "Embajada de Marca" },
      { name: "Comunicación y Prensa" },
      { name: "Comunidad en Instagram" }
    ]
  },
  {
    title: "Organización y Herramientas",
    skills: [
      { name: "Liderazgo y Trabajo en Equipo" },
      { name: "Instagram y WhatsApp Comercial" },
      { name: "Seguimiento de Clientes" },
      { name: "Canva y Notion" }
    ]
  }
];

export const competitions = [
  {
    id: "kurios-bnc-2026",
    title: "Torneo Nacional de Robótica y Tecnología 2026",
    organization: "Kurios Competition & BNC",
    award: "2do Lugar Nacional — Categoría Comercial",
    badge: "2do Lugar Nacional",
    year: "2026",
    summary: "Obtuvimos el 2do lugar nacional compitiendo contra equipos de todo el país, defendiendo la utilidad del proyecto y su modelo de ventas frente al jurado.",
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
    organization: "Universidad Metropolitana, Caracas",
    award: "Exposición y Defensa del Proyecto",
    badge: "Presentación UNIMET",
    year: "2026",
    summary: "Presentación y defensa directa del proyecto en la Universidad Metropolitana frente a profesores y evaluadores empresariales.",
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
