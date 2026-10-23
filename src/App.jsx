/**
 * @file App.jsx
 * @description Componente raíz de la aplicación para el portafolio de Sofia Muñoz.
 * Sincroniza el scroll suave inercial de Lenis, físicas de resortes con Motion,
 * preloader cinematográfico y control de modales sin desbordamiento.
 */

import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { NoiseOverlay } from './components/NoiseOverlay';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { SkillsGrid } from './components/SkillsGrid';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [lenis, setLenis] = useState(null);
  const lenisRef = useRef(null);

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

  // Control de scroll cuando se abre/cierra un modal
  useEffect(() => {
    if (lenisRef.current) {
      if (selectedProject) {
        lenisRef.current.stop();
        document.body.style.overflow = 'hidden';
      } else {
        lenisRef.current.start();
        document.body.style.overflow = '';
      }
    }
  }, [selectedProject]);

  return (
    <div className="relative min-h-screen bg-[#0b0c10] text-[#f5f4f0]">
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
        <Projects onSelectProject={(project) => setSelectedProject(project)} />
        <About />
        <SkillsGrid />
        <ContactSection />
      </main>

      {/* Pie de Página */}
      <Footer lenisInstance={lenis} />

      {/* Modal Detallado de Proyecto */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default App;
