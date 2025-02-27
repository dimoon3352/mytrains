import React, { createContext, useState, useContext } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark'; 
  changeTheme: (theme: "light" | "dark") => void; 
  language: 'rus' | 'eng' | 'ger'; 
  changeLanguage: (language: 'rus' | 'eng' | 'ger') => void; 
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeAppProvider = ({ children }: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState<"light" | "dark">('dark');
  const [language, setLanguage] = useState<'rus' | 'eng' | 'ger'>('eng');
  
  const changeTheme = (theme: "light" | "dark") => {
    setTheme((theme))
  };

  const changeLanguage = (language: 'rus' | 'eng' | 'ger') => {
    setLanguage((language))
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, language, changeLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  return useContext(ThemeContext);
};