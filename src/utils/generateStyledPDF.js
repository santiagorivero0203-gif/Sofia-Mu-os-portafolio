/**
 * @file generateStyledPDF.js
 * @description Motor de generación y edición vectorial de PDF con jsPDF.
 * Construye un documento A4 de alta gama ("Portafolio_Sofia_Munoz_2026.pdf")
 * utilizando la paleta exacta de la web (Azul Pastel #345B8C / #2B4E7A / #3E689C y Amarillo Luminoso #FFE135),
 * incrustando fotografías reales y sintetizando toda la información clave en una sola vista ejecutiva.
 */

import { personalInfo, projects, skillCategories, competitions } from '../data/portfolioData';

/**
 * Convierte una imagen local en un DataURL JPEG optimizado con recorte "cover"
 * para incrustarla limpiamente en el PDF sin deformaciones.
 *
 * @param {string} url Ruta de la imagen
 * @param {number} targetWidth Ancho deseado en px
 * @param {number} targetHeight Alto deseado en px
 * @returns {Promise<string|null>} DataURL en formato image/jpeg
 */
const loadImageAsCoverDataUrl = (url, targetWidth = 600, targetHeight = 340) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');

        // Fondo de respaldo azul pastel
        ctx.fillStyle = '#2b4e7a';
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        // Cálculo de recorte proporcional (object-fit: cover)
        const imgRatio = img.width / img.height;
        const targetRatio = targetWidth / targetHeight;
        let drawWidth = targetWidth;
        let drawHeight = targetHeight;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > targetRatio) {
          drawWidth = targetHeight * imgRatio;
          offsetX = -(drawWidth - targetWidth) / 2;
        } else {
          drawHeight = targetWidth / imgRatio;
          offsetY = -(drawHeight - targetHeight) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        resolve(canvas.toDataURL('image/jpeg', 0.88));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
};

/**
 * Genera y descarga directamente el portafolio estilizado en PDF (A4 Vertical)
 * @returns {Promise<void>}
 */
export const generateStyledPortfolioPDF = async () => {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  // Paleta de Colores Oficial de la Página (RGB)
  const COLORS = {
    bgPrimary: [52, 91, 140],     // #345B8C (Azul Pastel Principal)
    bgSecondary: [43, 78, 122],   // #2B4E7A (Azul Pastel Profundo)
    bgCard: [62, 104, 156],       // #3E689C (Azul Pastel Superficie)
    borderSubtle: [130, 178, 235],// #82B2EB (Borde Azul Cielo)
    yellow: [255, 225, 53],       // #FFE135 (Amarillo Luminoso)
    skyBlue: [166, 206, 255],     // #A6CEFF (Azul Cielo Pastel)
    white: [255, 255, 255],       // #FFFFFF (Texto Principal)
    iceBlue: [230, 240, 253],     // #E6F0FD (Texto Secundario)
    darkNavyText: [28, 53, 87]    // #1C3557 (Texto Oscuro sobre Amarillo)
  };

  // Cargar imágenes reales en paralelo para incrustarlas en las tarjetas del PDF
  const [movaImg, merakiImg, kuriosImg, unimetImg] = await Promise.all([
    loadImageAsCoverDataUrl('/assets/mova/revista.jpg', 560, 260),
    loadImageAsCoverDataUrl('/assets/meraki/clothing.jpg', 560, 260),
    loadImageAsCoverDataUrl('/assets/competitions/kurios_podio_marketplace.jpg', 480, 220),
    loadImageAsCoverDataUrl('/assets/competitions/unimet_pitch_ejecutivo.jpg', 480, 220)
  ]);

  // 1. FONDO COMPLETO A4 EN AZUL PASTEL (#345B8C)
  doc.setFillColor(...COLORS.bgPrimary);
  doc.rect(0, 0, 210, 297, 'F');

  // Franja superior decorativa en Amarillo Luminoso (#FFE135)
  doc.setFillColor(...COLORS.yellow);
  doc.rect(0, 0, 210, 3.5, 'F');

  // 2. CABECERA PRINCIPAL (TARJETA SUPERIOR)
  doc.setFillColor(...COLORS.bgSecondary);
  doc.setDrawColor(...COLORS.yellow);
  doc.setLineWidth(0.45);
  doc.roundedRect(10, 8, 190, 38, 3.5, 3.5, 'FD');

  // Monograma "SM" en cuadro amarillo con esquinas suaves
  doc.setFillColor(...COLORS.yellow);
  doc.roundedRect(15, 13, 16, 16, 2.5, 2.5, 'F');
  doc.setFont('times', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(...COLORS.darkNavyText);
  doc.text('SM', 23, 23, { align: 'center' });

  // Nombre y Titular de Sofia
  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...COLORS.white);
  doc.text(personalInfo.name, 35, 19);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...COLORS.yellow);
  doc.text('ASESORA DE VENTAS  |  CREADORA DE CONTENIDO  |  EMBAJADORA DE MARCA', 35, 25);

  // Bio sintetizada en la cabecera
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...COLORS.iceBlue);
  const bioLines = doc.splitTextToSize(
    `${personalInfo.statement} Especialista en impulsar proyectos de tecnología y moda mediante comunicación clara y trato cercano.`,
    118
  );
  doc.text(bioLines, 15, 35);

  // Caja de Contacto Directo (Derecha de la cabecera)
  doc.setFillColor(...COLORS.bgCard);
  doc.setDrawColor(...COLORS.borderSubtle);
  doc.setLineWidth(0.3);
  doc.roundedRect(138, 12, 57, 30, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.yellow);
  doc.text('CONTACTO DIRECTO', 142, 17.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.white);
  doc.text(personalInfo.contact.email, 142, 23.5);
  doc.link(142, 20, 50, 5, { url: `mailto:${personalInfo.contact.email}` });

  doc.text(`WhatsApp: ${personalInfo.contact.phoneFormatted}`, 142, 29);
  doc.link(142, 26, 50, 5, { url: personalInfo.contact.whatsappUrl });

  // Píldora de disponibilidad
  doc.setFillColor(...COLORS.yellow);
  doc.roundedRect(142, 32.5, 49, 6, 3, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.darkNavyText);
  doc.text('Disponible para proyectos (2026)', 166.5, 36.5, { align: 'center' });

  // 3. FILA DE 4 INDICADORES SINTETIZADOS
  const statsY = 50;
  const statWidth = 45.2;
  personalInfo.stats.forEach((stat, idx) => {
    const x = 10 + idx * (statWidth + 3);
    doc.setFillColor(...COLORS.bgCard);
    doc.setDrawColor(...COLORS.borderSubtle);
    doc.setLineWidth(0.25);
    doc.roundedRect(x, statsY, statWidth, 14, 2.5, 2.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...COLORS.yellow);
    doc.text(`${stat.value}${stat.suffix}`, x + statWidth / 2, statsY + 6.5, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.iceBlue);
    doc.text(stat.label.toUpperCase(), x + statWidth / 2, statsY + 11.5, { align: 'center' });
  });

  // 4. SECCIÓN: PROYECTOS DESTACADOS (2 COLUMNAS CON FOTOS E INFORMACIÓN SINTETIZADA)
  const projSectionY = 70;
  doc.setFont('times', 'bold');
  doc.setFontSize(12.5);
  doc.setTextColor(...COLORS.white);
  doc.text('Proyectos Destacados (2026)', 10, projSectionY);

  doc.setFillColor(...COLORS.yellow);
  doc.rect(68, projSectionY - 1.5, 132, 0.5, 'F');

  const cardWidth = 92.5;
  const cardHeight = 96;
  const projCardsY = 74;

  projects.slice(0, 2).forEach((proj, idx) => {
    const x = 10 + idx * (cardWidth + 5);
    const imgData = idx === 0 ? movaImg : merakiImg;

    // Contenedor de la tarjeta
    doc.setFillColor(...COLORS.bgCard);
    doc.setDrawColor(...(idx === 0 ? COLORS.skyBlue : COLORS.yellow));
    doc.setLineWidth(0.4);
    doc.roundedRect(x, projCardsY, cardWidth, cardHeight, 3, 3, 'FD');

    // Imagen de portada del proyecto
    if (imgData) {
      doc.addImage(imgData, 'JPEG', x + 3, projCardsY + 3, cardWidth - 6, 32);
    }

    // Etiqueta de categoría sobre la tarjeta
    doc.setFillColor(...COLORS.yellow);
    doc.roundedRect(x + 5, projCardsY + 5, 36, 5.5, 2.5, 2.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(...COLORS.darkNavyText);
    doc.text(proj.category.toUpperCase(), x + 23, projCardsY + 8.8, { align: 'center' });

    // Título y Rol
    let curY = projCardsY + 41;
    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...COLORS.white);
    doc.text(proj.title, x + 4, curY);

    curY += 4.8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.yellow);
    doc.text(`${proj.role}  •  ${proj.year}`, x + 4, curY);

    // Resumen sintetizado
    curY += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(...COLORS.iceBlue);
    const descLines = doc.splitTextToSize(proj.overview, cardWidth - 8);
    doc.text(descLines.slice(0, 3), x + 4, curY);

    // Puntos clave de aporte y resultados
    curY += 13;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...COLORS.white);
    doc.text('Aportes y logros principales:', x + 4, curY);

    curY += 4.2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.3);
    doc.setTextColor(...COLORS.iceBlue);

    proj.achievements.slice(0, 3).forEach((ach) => {
      const achLines = doc.splitTextToSize(`• ${ach}`, cardWidth - 8);
      doc.text(achLines[0], x + 4, curY);
      curY += 4.3;
    });

    // Botón con enlace clicable al proyecto
    if (proj.link) {
      const btnY = projCardsY + cardHeight - 9.5;
      doc.setFillColor(...COLORS.bgSecondary);
      doc.setDrawColor(...COLORS.yellow);
      doc.setLineWidth(0.3);
      doc.roundedRect(x + 4, btnY, cardWidth - 8, 6.5, 2, 2, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.2);
      doc.setTextColor(...COLORS.yellow);
      const linkLabel = proj.id === 'mova' ? 'Abrir página web de MOVA ↗' : 'Ver Instagram @meraki_marka ↗';
      doc.text(linkLabel, x + cardWidth / 2, btnY + 4.4, { align: 'center' });
      doc.link(x + 4, btnY, cardWidth - 8, 6.5, { url: proj.link });
    }
  });

  // 5. SECCIÓN: PREMIOS Y COMPETENCIAS NACIONALES (2026)
  const compSectionY = 177;
  doc.setFont('times', 'bold');
  doc.setFontSize(12.5);
  doc.setTextColor(...COLORS.white);
  doc.text('Premios y Competencias (2026)', 10, compSectionY);

  doc.setFillColor(...COLORS.yellow);
  doc.rect(72, compSectionY - 1.5, 128, 0.5, 'F');

  const compCardsY = 181;
  const compHeight = 46;

  competitions.slice(0, 2).forEach((comp, idx) => {
    const x = 10 + idx * (cardWidth + 5);
    const compImg = idx === 0 ? kuriosImg : unimetImg;

    doc.setFillColor(...COLORS.bgSecondary);
    doc.setDrawColor(...COLORS.borderSubtle);
    doc.setLineWidth(0.35);
    doc.roundedRect(x, compCardsY, cardWidth, compHeight, 3, 3, 'FD');

    // Miniatura fotográfica a la izquierda de la tarjeta
    if (compImg) {
      doc.addImage(compImg, 'JPEG', x + 3, compCardsY + 3, 32, compHeight - 6);
    }

    const textX = x + 38;
    const maxTextW = cardWidth - 41;

    // Badge de premio
    doc.setFillColor(...COLORS.yellow);
    doc.roundedRect(textX, compCardsY + 4, 34, 5, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.3);
    doc.setTextColor(...COLORS.darkNavyText);
    doc.text(comp.badge.toUpperCase(), textX + 17, compCardsY + 7.5, { align: 'center' });

    // Título y Premio
    doc.setFont('times', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...COLORS.white);
    const titleLines = doc.splitTextToSize(comp.title, maxTextW);
    doc.text(titleLines.slice(0, 2), textX, compCardsY + 14);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...COLORS.yellow);
    doc.text(comp.award, textX, compCardsY + 23);

    // Resumen corto
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(...COLORS.iceBlue);
    const sumLines = doc.splitTextToSize(comp.summary, maxTextW);
    doc.text(sumLines.slice(0, 4), textX, compCardsY + 28);
  });

  // 6. SECCIÓN: HABILIDADES PRINCIPALES (3 COLUMNAS SINTETIZADAS)
  const skillsSectionY = 234;
  doc.setFont('times', 'bold');
  doc.setFontSize(12.5);
  doc.setTextColor(...COLORS.white);
  doc.text('Habilidades Principales', 10, skillsSectionY);

  doc.setFillColor(...COLORS.yellow);
  doc.rect(58, skillsSectionY - 1.5, 142, 0.5, 'F');

  const skillColW = 60.6;
  const skillsY = 238;

  skillCategories.slice(0, 3).forEach((cat, idx) => {
    const x = 10 + idx * (skillColW + 4);
    doc.setFillColor(...COLORS.bgCard);
    doc.setDrawColor(...COLORS.borderSubtle);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, skillsY, skillColW, 42, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...COLORS.yellow);
    doc.text(cat.title, x + 4, skillsY + 6.5);

    let sy = skillsY + 12.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.4);
    doc.setTextColor(...COLORS.white);

    cat.skills.slice(0, 5).forEach((s) => {
      doc.setFillColor(...COLORS.yellow);
      doc.circle(x + 5.2, sy - 1, 0.8, 'F');
      doc.text(s.name, x + 8, sy);
      sy += 5.5;
    });
  });

  // 7. PIE DE PÁGINA DEL PDF
  doc.setDrawColor(...COLORS.borderSubtle);
  doc.setLineWidth(0.25);
  doc.line(10, 285, 200, 285);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.yellow);
  doc.text('Sofia Muñoz — Portafolio Profesional & Creativo (2026)', 10, 290);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.iceBlue);
  doc.text(
    `Correo: ${personalInfo.contact.email}   |   WhatsApp: ${personalInfo.contact.phoneFormatted}`,
    200,
    290,
    { align: 'right' }
  );

  // Descargar archivo PDF con nombre limpio
  doc.save('Portafolio_Sofia_Munoz_2026.pdf');
};
