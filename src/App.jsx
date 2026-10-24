/**
 * @file App.jsx
 * @description Orquestador raíz optimizado del portafolio de Sofia Muñoz.
 * Carga instantánea sin pantallas de bloqueo artificiales, sin filtros pesados de pantalla completa
 * y con carga diferida (lazy loading) de modales y motor PDF.
 */

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { CompetitionsSection } from './components/CompetitionsSection';
import { About } from './components/About';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { useScrollSpy } from './hooks/useScrollSpy';

// Carga diferida de modales secundarios para acelerar el renderizado inicial
const ProjectModal = lazy(() => import('./components/ProjectModal'));
const PortfolioPDF = lazy(() => import('./components/PortfolioPDF'));

const AppContent = () => {
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
      duration: 1.0,
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
      <Navbar lenisInstance={lenis} />

      <main>
        <Hero lenisInstance={lenis} />
        <Projects />
        <CompetitionsSection />
        <About />
        <ContactSection />
      </main>

      <Footer lenisInstance={lenis} />

      <Suspense fallback={null}>
        {selectedProject && <ProjectModal />}
        {isPdfOpen && <PortfolioPDF isOpen={isPdfOpen} onClose={closePdfModal} />}
      </Suspense>
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
