import { createContext, useState, useContext, ReactNode } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeAppTheme, changeAppLanguage } from '@/store/settingsSlice';


interface ThemeContextType {
  theme: 'light' | 'dark'; 
  changeTheme: (theme: "light" | "dark") => void; 
  language: 'rus' | 'eng' | 'ger'; 
  changeLanguage: (language: 'rus' | 'eng' | 'ger') => void; 
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeAppProvider = ({ children }: {children: ReactNode}) => {

  const settings = useAppSelector((state) => state.settings)
  const dispatch = useAppDispatch()

  const [theme, setTheme] = useState<"light" | "dark">(settings.theme);
  const [language, setLanguage] = useState<'rus' | 'eng' | 'ger'>(settings.language);
  
  const changeTheme = (theme: "light" | "dark") => {
    dispatch(changeAppTheme(theme))
    setTheme(theme)
  };

  const changeLanguage = (language: 'rus' | 'eng' | 'ger') => {
    dispatch(changeAppLanguage(language))
    setLanguage(language)
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