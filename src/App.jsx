/**
 * @file App.jsx
 * @description Orquestador raíz de la aplicación para el portafolio de Sofia Muñoz.
 * Integra:
 * - Capa de ErrorBoundary para tolerancia ante fallos de renderizado.
 * - Proveedor de contexto global PortfolioProvider.
 * - Desplazamiento inercial ultra-fluido con Lenis y sincronización de ScrollSpy.
 * - Preloader cinematográfico inicial y cursor contextual.
 */

import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NoiseOverlay } from './components/NoiseOverlay';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { CompetitionsSection } from './components/CompetitionsSection';
import { About } from './components/About';
import { SkillsGrid } from './components/SkillsGrid';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { PortfolioPDF } from './components/PortfolioPDF';
import { useScrollSpy } from './hooks/useScrollSpy';

/**
 * Componente interno conectado al contexto para coordinar scroll inercial y navegación activa
 */
const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const [lenis, setLenis] = useState(null);
  const lenisRef = useRef(null);

  const { selectedProject, isPdfOpen, closePdfModal, setActiveSection } = usePortfolio();

  // ScrollSpy para detectar la sección activa en el menú
  useScrollSpy(
    ['inicio', 'proyectos', 'competencias-premios', 'sobre-mi', 'habilidades', 'contacto'],
    setActiveSection,
    180
  );

  // Inicialización de Lenis Smooth Scroll
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      infinite: false
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

    let animationFrameId;
    function raf(time) {
      lenisInstance.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenisInstance.destroy();
    };
  }, []);

  // Bloqueo del scroll suave cuando el modal de proyecto o de PDF se encuentra activo
  useEffect(() => {
    if (lenisRef.current) {
      if (selectedProject || isPdfOpen) {
        lenisRef.current.stop();
        document.body.style.overflow = 'hidden';
      } else {
        lenisRef.current.start();
        document.body.style.overflow = '';
      }
    }
  }, [selectedProject, isPdfOpen]);

  return (
    <div className="relative min-h-screen bg-[#0b1528] text-[#f4f7fc]">
      {/* Capa de Grano Analógico SVG */}
      <NoiseOverlay />

      {/* Cursor Contextual Personalizado */}
      <CustomCursor />

      {/* Pantalla de Carga Inicial Cinematográfica */}
      {loading && <Preloader onFinish={() => setLoading(false)} />}

      {/* Navegación Flotante */}
      <Navbar lenisInstance={lenis} />

      {/* Contenido Principal */}
      <main>
        <Hero lenisInstance={lenis} />
        <Projects />
        <CompetitionsSection />
        <About />
        <SkillsGrid />
        <ContactSection />
      </main>

      {/* Pie de Página */}
      <Footer lenisInstance={lenis} />

      {/* Modal Detallado de Proyecto con Controles y Lightbox */}
      <ProjectModal />

      {/* Dossier Ejecutivo Imprimible y Modal de Exportación en PDF */}
      <PortfolioPDF isOpen={isPdfOpen} onClose={closePdfModal} />
    </div>
  );
};

export const App = () => {
  return (
    <ErrorBoundary>
      <PortfolioProvider>
        <AppContent />
      </PortfolioProvider>
    </ErrorBoundary>
  );
};

export default App;
