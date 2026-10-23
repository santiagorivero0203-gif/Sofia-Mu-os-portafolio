/**
 * @file App.jsx
 * @description Orquestador raíz del portafolio de Sofia Muñoz.
 * Estructura compacta de 4 secciones clave para lectura ágil de reclutadores.
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
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { PortfolioPDF } from './components/PortfolioPDF';
import { useScrollSpy } from './hooks/useScrollSpy';

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const [lenis, setLenis] = useState(null);
  const lenisRef = useRef(null);

  const { selectedProject, isPdfOpen, closePdfModal, setActiveSection } = usePortfolio();

  useScrollSpy(
    ['inicio', 'proyectos', 'competencias-premios', 'sobre-mi', 'contacto'],
    setActiveSection,
    160
  );

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
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
    <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <NoiseOverlay />
      <CustomCursor />
      {loading && <Preloader onFinish={() => setLoading(false)} />}

      <Navbar lenisInstance={lenis} />

      <main>
        <Hero lenisInstance={lenis} />
        <Projects />
        <CompetitionsSection />
        <About />
        <ContactSection />
      </main>

      <Footer lenisInstance={lenis} />
      <ProjectModal />
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
