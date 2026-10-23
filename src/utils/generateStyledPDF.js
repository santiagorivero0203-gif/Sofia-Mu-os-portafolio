/**
 * @file generateStyledPDF.js
 * @description Motor de generación y edición vectorial de PDF con jsPDF.
 * Construye un documento A4 limpio y luminoso ("Portafolio_Sofia_Munoz_2026.pdf")
 * utilizando la paleta Azul Pastel Claro (#D9EAFA / #FFFFFF), Amarillo Cálido (#FFE047)
 * y tipografía Azul Marino (#142C4C), con tarjetas redondeadas y fotografías reales.
 */

import { personalInfo, projects, skillCategories, competitions } from '../data/portfolioData';

/**
 * Convierte una imagen local en un DataURL JPEG optimizado con recorte "cover"
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

        ctx.fillStyle = '#eaf3fd';
        ctx.fillRect(0, 0, targetWidth, targetHeight);

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
 */
export const generateStyledPortfolioPDF = async () => {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  // Paleta Azul Pastel Claro, Tarjetas Blancas y Amarillo Cálido (RGB)
  const COLORS = {
    bgPastelBlue: [217, 234, 250],  // #D9EAFA (Fondo Azul Pastel Claro)
    bgSoftCloud: [234, 243, 253],   // #EAF3FD (Azul Nube Suave)
    cardWhite: [255, 255, 255],     // #FFFFFF (Tarjetas Limpias)
    yellowFill: [255, 224, 71],     // #FFE047 (Amarillo Cálido)
    accentBlue: [37, 99, 235],      // #2563EB (Azul Destacado)
    textNavy: [20, 44, 76],         // #142C4C (Texto Principal)
    textSecondary: [52, 82, 120],   // #345278 (Texto Secundario)
    borderSoft: [195, 218, 244]     // #C3DAF4 (Borde Suave)
  };

  const [movaImg, merakiImg, kuriosImg, unimetImg] = await Promise.all([
    loadImageAsCoverDataUrl('/assets/mova/revista.jpg', 560, 260),
    loadImageAsCoverDataUrl('/assets/meraki/clothing.jpg', 560, 260),
    loadImageAsCoverDataUrl('/assets/competitions/kurios_podio_marketplace.jpg', 480, 220),
    loadImageAsCoverDataUrl('/assets/competitions/unimet_pitch_ejecutivo.jpg', 480, 220)
  ]);

  // 1. FONDO COMPLETO A4 EN AZUL PASTEL CLARO (#D9EAFA)
  doc.setFillColor(...COLORS.bgPastelBlue);
  doc.rect(0, 0, 210, 297, 'F');

  // 2. CABECERA PRINCIPAL REDONDEADA (TARJETA BLANCA)
  doc.setFillColor(...COLORS.cardWhite);
  doc.roundedRect(10, 10, 190, 38, 6, 6, 'F');

  // Círculo Amarillo con Monograma "SM"
  doc.setFillColor(...COLORS.yellowFill);
  doc.circle(23, 23, 8, 'F');
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.textNavy);
  doc.text('SM', 23, 24.8, { align: 'center' });

  // Nombre y Rol
  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...COLORS.textNavy);
  doc.text(personalInfo.name, 35, 20);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.2);
  doc.setTextColor(...COLORS.accentBlue);
  doc.text('Asesora de Ventas  •  Creadora de Contenido  •  Embajadora de Marca', 35, 26);

  // Resumen
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...COLORS.textSecondary);
  const bioLines = doc.splitTextToSize(
    `${personalInfo.statement} Conecto marcas con personas a través de comunicación cercana, contenido y ventas reales.`,
    116
  );
  doc.text(bioLines, 15, 36);

  // Píldora Suave de Contacto Directo (Derecha)
  doc.setFillColor(...COLORS.bgSoftCloud);
  doc.roundedRect(138, 14, 57, 30, 5, 5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.accentBlue);
  doc.text('CONTACTO DIRECTO', 143, 19.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.textNavy);
  doc.text(personalInfo.contact.email, 143, 25);
  doc.link(143, 21.5, 48, 5, { url: `mailto:${personalInfo.contact.email}` });

  doc.text(`WhatsApp: ${personalInfo.contact.phoneFormatted}`, 143, 30.5);
  doc.link(143, 27, 48, 5, { url: personalInfo.contact.whatsappUrl });

  doc.setFillColor(...COLORS.yellowFill);
  doc.roundedRect(143, 34, 47, 6.2, 3, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.textNavy);
  doc.text('Disponible para proyectos 2026', 166.5, 38.2, { align: 'center' });

  // 3. PROYECTOS DESTACADOS (2 TARJETAS BLANCAS REDONDEADAS)
  const projSectionY = 56;
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...COLORS.textNavy);
  doc.text('Proyectos Destacados (2026)', 10, projSectionY);

  const cardWidth = 92.5;
  const cardHeight = 104;
  const projCardsY = 60;

  projects.slice(0, 2).forEach((proj, idx) => {
    const x = 10 + idx * (cardWidth + 5);
    const imgData = idx === 0 ? movaImg : merakiImg;

    doc.setFillColor(...COLORS.cardWhite);
    doc.roundedRect(x, projCardsY, cardWidth, cardHeight, 6, 6, 'F');

    if (imgData) {
      doc.addImage(imgData, 'JPEG', x + 4, projCardsY + 4, cardWidth - 8, 35);
    }

    // Píldora de Categoría
    doc.setFillColor(...COLORS.yellowFill);
    doc.roundedRect(x + 6, projCardsY + 6, 36, 5.8, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(...COLORS.textNavy);
    doc.text(proj.category.toUpperCase(), x + 24, projCardsY + 9.9, { align: 'center' });

    let curY = projCardsY + 46;
    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...COLORS.textNavy);
    doc.text(proj.title, x + 5, curY);

    curY += 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.accentBlue);
    doc.text(`${proj.role}  •  ${proj.year}`, x + 5, curY);

    curY += 5.2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(...COLORS.textSecondary);
    const descLines = doc.splitTextToSize(proj.overview, cardWidth - 10);
    doc.text(descLines.slice(0, 3), x + 5, curY);

    curY += 13.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...COLORS.textNavy);
    doc.text('Logros principales:', x + 5, curY);

    curY += 4.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.4);
    doc.setTextColor(...COLORS.textSecondary);

    proj.achievements.slice(0, 3).forEach((ach) => {
      const achLines = doc.splitTextToSize(`• ${ach}`, cardWidth - 10);
      doc.text(achLines[0], x + 5, curY);
      curY += 4.5;
    });

    if (proj.link) {
      const btnY = projCardsY + cardHeight - 10.5;
      doc.setFillColor(...COLORS.yellowFill);
      doc.roundedRect(x + 5, btnY, cardWidth - 10, 6.8, 3.4, 3.4, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.4);
      doc.setTextColor(...COLORS.textNavy);
      const linkLabel = proj.id === 'mova' ? 'Abrir página web de MOVA ↗' : 'Ver Instagram @meraki_marka ↗';
      doc.text(linkLabel, x + cardWidth / 2, btnY + 4.6, { align: 'center' });
      doc.link(x + 5, btnY, cardWidth - 10, 6.8, { url: proj.link });
    }
  });

  // 4. PREMIOS Y COMPETENCIAS (2026)
  const compSectionY = 173;
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...COLORS.textNavy);
  doc.text('Premios y Competencias (2026)', 10, compSectionY);

  const compCardsY = 177;
  const compHeight = 46;

  competitions.slice(0, 2).forEach((comp, idx) => {
    const x = 10 + idx * (cardWidth + 5);
    const compImg = idx === 0 ? kuriosImg : unimetImg;

    doc.setFillColor(...COLORS.cardWhite);
    doc.roundedRect(x, compCardsY, cardWidth, compHeight, 6, 6, 'F');

    if (compImg) {
      doc.addImage(compImg, 'JPEG', x + 4, compCardsY + 4, 32, compHeight - 8);
    }

    const textX = x + 39;
    const maxTextW = cardWidth - 43;

    doc.setFillColor(...COLORS.yellowFill);
    doc.roundedRect(textX, compCardsY + 4.5, 34, 5.2, 2.6, 2.6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.4);
    doc.setTextColor(...COLORS.textNavy);
    doc.text(comp.badge.toUpperCase(), textX + 17, compCardsY + 8.1, { align: 'center' });

    doc.setFont('times', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...COLORS.textNavy);
    const titleLines = doc.splitTextToSize(comp.title, maxTextW);
    doc.text(titleLines.slice(0, 2), textX, compCardsY + 14.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...COLORS.accentBlue);
    doc.text(comp.award, textX, compCardsY + 23.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.3);
    doc.setTextColor(...COLORS.textSecondary);
    const sumLines = doc.splitTextToSize(comp.summary, maxTextW);
    doc.text(sumLines.slice(0, 4), textX, compCardsY + 28.5);
  });

  // 5. HABILIDADES PRINCIPALES (3 TARJETAS LIMPIAS)
  const skillsSectionY = 232;
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...COLORS.textNavy);
  doc.text('Habilidades Principales', 10, skillsSectionY);

  const skillColW = 60.6;
  const skillsY = 236;

  skillCategories.slice(0, 3).forEach((cat, idx) => {
    const x = 10 + idx * (skillColW + 4);
    doc.setFillColor(...COLORS.cardWhite);
    doc.roundedRect(x, skillsY, skillColW, 43, 6, 6, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.6);
    doc.setTextColor(...COLORS.accentBlue);
    doc.text(cat.title, x + 5, skillsY + 7.5);

    let sy = skillsY + 13.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...COLORS.textNavy);

    cat.skills.slice(0, 5).forEach((s) => {
      doc.setFillColor(...COLORS.yellowFill);
      doc.circle(x + 6, sy - 1, 1, 'F');
      doc.text(s.name, x + 9, sy);
      sy += 5.5;
    });
  });

  // 6. PIE DE PÁGINA
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(...COLORS.textNavy);
  doc.text('Sofia Muñoz — Portafolio Profesional (2026)', 10, 289);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.textSecondary);
  doc.text(
    `Correo: ${personalInfo.contact.email}   |   WhatsApp: ${personalInfo.contact.phoneFormatted}`,
    200,
    289,
    { align: 'right' }
  );

  doc.save('Portafolio_Sofia_Munoz_2026.pdf');
};
