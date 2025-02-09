import React, { createContext, useState, useContext } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark'; 
  toggleTheme: () => void; 
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeAppProvider = ({ children }: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState<"light" | "dark">('dark');
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  //console.error(useContext(ThemeContext))
  return useContext(ThemeContext);
};