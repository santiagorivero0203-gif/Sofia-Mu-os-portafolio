/**
 * @file PortfolioContext.jsx
 * @description Contexto global unificado para la gestión del estado de la aplicación:
 * - Filtros, búsqueda y ordenación reactiva de proyectos.
 * - Navegación secuencial y atajos de teclado en el modal de proyectos.
 * - Sincronización de sección activa (ScrollSpy).
 * - Control de micro-sonido Web Audio y preferencias del usuario.
 * - Métricas de conversión y telemetría de eventos.
 */

import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { projects as rawProjects, personalInfo } from '../data/portfolioData';
import { useCaracasTime } from '../hooks/useCaracasTime';
import { useClipboard } from '../hooks/useClipboard';
import { useSoundFeedback } from '../hooks/useSoundFeedback';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  // Estado de sonido interactivo (persiste preferencia en localStorage)
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('sofia_sound_enabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('sofia_sound_enabled', JSON.stringify(next));
      } catch (e) {
        // Ignorar en sandbox
      }
      return next;
    });
  }, []);

  // Hook de micro-retroalimentación auditiva
  const sound = useSoundFeedback(soundEnabled);

  // Hook de hora en vivo de Caracas
  const caracasTime = useCaracasTime();

  // Hooks de copiado para email y teléfono
  const { copied: copiedEmail, copy: copyEmailAction } = useClipboard(2500);
  const { copied: copiedPhone, copy: copyPhoneAction } = useClipboard(2500);

  const copyEmail = useCallback(() => {
    sound.playSuccess();
    return copyEmailAction(personalInfo.contact.email);
  }, [copyEmailAction, sound]);

  const copyPhone = useCallback(() => {
    sound.playSuccess();
    return copyPhoneAction(personalInfo.contact.phoneFormatted);
  }, [copyPhoneAction, sound]);

  // Estado de proyectos y vistas
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Estado del modal de Dossier PDF
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  const openPdfModal = useCallback(() => {
    sound.playModalOpen();
    setIsPdfOpen(true);
  }, [sound]);

  const closePdfModal = useCallback(() => {
    sound.playClick();
    setIsPdfOpen(false);
  }, [sound]);

  // Sección activa en el scroll
  const [activeSection, setActiveSection] = useState('inicio');

  // Categorías disponibles inferidas de los datos
  const categories = useMemo(() => {
    const set = new Set(rawProjects.map((p) => p.category));
    return ['Todos', ...Array.from(set)];
  }, []);

  // Proyectos filtrados reactivamente por categoría y texto de búsqueda
  const filteredProjects = useMemo(() => {
    return rawProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'Todos' || project.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.role.toLowerCase().includes(q) ||
        project.overview.toLowerCase().includes(q) ||
        project.challenges.some((c) => c.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Proyecto activo seleccionado en el modal
  const selectedProject = useMemo(() => {
    if (!selectedProjectId) return null;
    return rawProjects.find((p) => p.id === selectedProjectId) || null;
  }, [selectedProjectId]);

  // Índice actual para permitir navegación entre proyectos
  const currentProjectIndex = useMemo(() => {
    if (!selectedProjectId) return -1;
    return rawProjects.findIndex((p) => p.id === selectedProjectId);
  }, [selectedProjectId]);

  // Apertura de modal con reproducción de sonido
  const openProjectModal = useCallback(
    (projectOrId) => {
      const id = typeof projectOrId === 'string' ? projectOrId : projectOrId.id;
      setSelectedProjectId(id);
      sound.playModalOpen();
    },
    [sound]
  );

  const closeProjectModal = useCallback(() => {
    setSelectedProjectId(null);
    sound.playClick();
  }, [sound]);

  // Navegación secuencial dentro del modal
  const nextProject = useCallback(() => {
    if (currentProjectIndex === -1) return;
    const nextIdx = (currentProjectIndex + 1) % rawProjects.length;
    setSelectedProjectId(rawProjects[nextIdx].id);
    sound.playClick();
  }, [currentProjectIndex, sound]);

  const prevProject = useCallback(() => {
    if (currentProjectIndex === -1) return;
    const prevIdx = (currentProjectIndex - 1 + rawProjects.length) % rawProjects.length;
    setSelectedProjectId(rawProjects[prevIdx].id);
    sound.playClick();
  }, [currentProjectIndex, sound]);

  // Manejo de teclado global para el modal (Escape para cerrar, flechas para navegar)
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

  // Despachador de telemetría / eventos comerciales
  const trackEvent = useCallback((eventName, data = {}) => {
    // Arquitectura preparada para analítica respetuosa con la privacidad
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Analytics Event] ${eventName}:`, data);
    }
  }, []);

  const value = {
    // Proyectos
    projects: rawProjects,
    categories,
    selectedCategory,
    setSelectedCategory: (cat) => {
      sound.playClick();
      setSelectedCategory(cat);
    },
    searchQuery,
    setSearchQuery,
    filteredProjects,
    viewMode,
    setViewMode: (mode) => {
      sound.playClick();
      setViewMode(mode);
    },

    // Modal de proyectos
    selectedProject,
    selectedProjectId,
    openProjectModal,
    closeProjectModal,
    nextProject,
    prevProject,
    currentProjectIndex,
    totalProjects: rawProjects.length,

    // Modal de Dossier PDF
    isPdfOpen,
    openPdfModal,
    closePdfModal,

    // Scroll & Navegación
    activeSection,
    setActiveSection,

    // Preferencias y feedback sensorial
    soundEnabled,
    toggleSound,
    sound,

    // Datos y copiado
    caracasTime,
    copiedEmail,
    copyEmail,
    copiedPhone,
    copyPhone,

    // Métricas y seguimiento
    trackEvent
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

/**
 * Hook para consumir el contexto global del portafolio
 * @returns {object} Estado y acciones de PortfolioContext
 */
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio debe ser utilizado dentro de un PortfolioProvider');
  }
  return context;
};
