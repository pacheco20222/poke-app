// =============================================================================
// WHAT: Language Context - Manages app language (English/Spanish)
// WHY: Allow users to toggle between languages for better UX
// =============================================================================

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations = {
  en: {
    // Header
    welcome: 'Welcome',
    logout: 'Logout',
    
    // Search & Filters
    searchPlaceholder: 'Search Pokémon by name...',
    list: 'List',
    grid: 'Grid',
    
    // Table Headers
    number: 'Number',
    name: 'Name',
    image: 'Image',
    types: 'Types',
    abilities: 'Abilities',
    actions: 'Actions',
    shiny: 'Shiny',
    
    // Detail Page
    backToList: 'Back to List',
    officialArt: 'Official Art',
    allSprites: 'All Sprites',
    description: 'Description',
    physicalStats: 'Physical Stats',
    height: 'Height',
    weight: 'Weight',
    abilitiesTitle: 'Abilities',
    movesTitle: 'Moves (First 10)',
    moveName: 'Name',
    movePower: 'Power',
    moveAccuracy: 'Accuracy',
    moveType: 'Type',
    
    // Shiny Modal
    shinyVariants: 'Shiny Variants',
    normal: 'Normal',
    shinyLabel: 'Shiny',
    
    // Loading & Errors
    loading: 'Loading...',
    error: 'Error',
    pokemonNotFound: 'Pokémon not found',
    
    // Login
    loginTitle: 'Login',
    username: 'Username',
    password: 'Password',
    loginButton: 'Login',
  },
  es: {
    // Header
    welcome: 'Bienvenido',
    logout: 'Cerrar sesión',
    
    // Search & Filters
    searchPlaceholder: 'Buscar Pokémon por nombre...',
    list: 'Lista',
    grid: 'Cuadrícula',
    
    // Table Headers
    number: 'Número',
    name: 'Nombre',
    image: 'Imagen',
    types: 'Tipos',
    abilities: 'Habilidades',
    actions: 'Acciones',
    shiny: 'Shiny',
    
    // Detail Page
    backToList: 'Volver a la lista',
    officialArt: 'Arte oficial',
    allSprites: 'Todos los sprites',
    description: 'Descripción',
    physicalStats: 'Estadísticas físicas',
    height: 'Altura',
    weight: 'Peso',
    abilitiesTitle: 'Habilidades',
    movesTitle: 'Movimientos (Primeros 10)',
    moveName: 'Nombre',
    movePower: 'Poder',
    moveAccuracy: 'Precisión',
    moveType: 'Tipo',
    
    // Shiny Modal
    shinyVariants: 'Variantes Shiny',
    normal: 'Normal',
    shinyLabel: 'Shiny',
    
    // Loading & Errors
    loading: 'Cargando...',
    error: 'Error',
    pokemonNotFound: 'Pokémon no encontrado',
    
    // Login
    loginTitle: 'Iniciar sesión',
    username: 'Usuario',
    password: 'Contraseña',
    loginButton: 'Iniciar sesión',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  // WHAT: Load language from localStorage or default to English
  const [language, setLanguage] = useState<Language>(() => {
    const saved = getLocalStorage('language');
    return (saved === 'en' || saved === 'es') ? saved : 'en';
  });

  // WHAT: Save language preference to localStorage
  useEffect(() => {
    setLocalStorage('language', language);
  }, [language]);

  // WHAT: Toggle between English and Spanish
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  // WHAT: Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// WHAT: Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
