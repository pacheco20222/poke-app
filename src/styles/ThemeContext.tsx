import { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';


interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}


const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
});


export const useThemeMode = () => useContext(ThemeContext);


interface ThemeProviderWrapperProps {
  children: ReactNode;
}


export function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
  // Get initial theme from localStorage or default to 'light'
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const savedMode = getLocalStorage('themeMode') as 'light' | 'dark' | null;
    return savedMode || 'light';
  });

  // Toggle function
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      setLocalStorage('themeMode', newMode);
      return newMode;
    });
  };

  const contextValue = useMemo(
    () => ({ mode, toggleTheme }),
    [mode]
  );

  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}