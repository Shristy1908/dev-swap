import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getThemePreference, saveThemePreference } from '../utils/localStorage';

type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Get theme preference from localStorage on initial load
    const savedTheme = getThemePreference();
    setDarkMode(savedTheme);
    
    // Apply theme class to document
    if (savedTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newTheme = !prev;
      
      // Save to localStorage
      saveThemePreference(newTheme);
      
      // Apply theme class
      if (newTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};