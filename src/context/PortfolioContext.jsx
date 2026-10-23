/**
 * @file PortfolioContext.jsx
 * @description Contexto global limpio y sin estados ni funciones residuales.
 * Gestiona exclusivamente:
 * - Apertura y navegación del modal de proyectos (incluyendo soporte de teclado).
 * - Apertura del visor/descarga de PDF.
 * - Sección activa en el menú (ScrollSpy).
 * - Hora local de Caracas y copiado rápido de correo y teléfono.
 */

import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { projects as rawProjects, personalInfo } from '../data/portfolioData';
import { useCaracasTime } from '../hooks/useCaracasTime';
import { useClipboard } from '../hooks/useClipboard';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const caracasTime = useCaracasTime();

  const { copied: copiedEmail, copy: copyEmailAction } = useClipboard(2500);
  const { copied: copiedPhone, copy: copyPhoneAction } = useClipboard(2500);

  const copyEmail = useCallback(() => {
    return copyEmailAction(personalInfo.contact.email);
  }, [copyEmailAction]);

  const copyPhone = useCallback(() => {
    return copyPhoneAction(personalInfo.contact.phoneFormatted);
  }, [copyPhoneAction]);

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const openPdfModal = useCallback(() => {
    setIsPdfOpen(true);
  }, []);

  const closePdfModal = useCallback(() => {
    setIsPdfOpen(false);
  }, []);

  const selectedProject = useMemo(() => {
    if (!selectedProjectId) return null;
    return rawProjects.find((p) => p.id === selectedProjectId) || null;
  }, [selectedProjectId]);

  const currentProjectIndex = useMemo(() => {
    if (!selectedProjectId) return -1;
    return rawProjects.findIndex((p) => p.id === selectedProjectId);
  }, [selectedProjectId]);

  const openProjectModal = useCallback((projectOrId) => {
    const id = typeof projectOrId === 'string' ? projectOrId : projectOrId.id;
    setSelectedProjectId(id);
  }, []);

  const closeProjectModal = useCallback(() => {
    setSelectedProjectId(null);
  }, []);

  const nextProject = useCallback(() => {
    if (currentProjectIndex === -1) return;
    const nextIdx = (currentProjectIndex + 1) % rawProjects.length;
    setSelectedProjectId(rawProjects[nextIdx].id);
  }, [currentProjectIndex]);

  const prevProject = useCallback(() => {
    if (currentProjectIndex === -1) return;
    const prevIdx = (currentProjectIndex - 1 + rawProjects.length) % rawProjects.length;
    setSelectedProjectId(rawProjects[prevIdx].id);
  }, [currentProjectIndex]);

  useEffect(() => {
    if (!selectedProjectId) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeProjectModal();
      } else if (e.key === 'ArrowRight') {
        nextProject();
      } else if (e.key === 'ArrowLeft') {
        prevProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProjectId, closeProjectModal, nextProject, prevProject]);

  const value = {
    projects: rawProjects,
    selectedProject,
    openProjectModal,
    closeProjectModal,
    nextProject,
    prevProject,
    currentProjectIndex,
    totalProjects: rawProjects.length,
    isPdfOpen,
    openPdfModal,
    closePdfModal,
    activeSection,
    setActiveSection,
    caracasTime,
    copiedEmail,
    copyEmail,
    copiedPhone,
    copyPhone
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio debe ser utilizado dentro de un PortfolioProvider');
  }
  return context;
};
