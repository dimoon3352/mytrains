import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeAppTheme, changeAppLanguage, setSettings, Settings } from '@/store/settingsSlice';


interface ThemeContextType {
  theme: 'light' | 'dark'; 
  changeTheme: (theme: "light" | "dark") => void; 
  language: 'rus' | 'eng' | 'ger'; 
  changeLanguage: (language: 'rus' | 'eng' | 'ger') => void; 
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeAppProvider = ({ children }: {children: ReactNode}) => {

  const dispatch = useAppDispatch()
  const settings = useAppSelector(state => state.settings)
  const [isSettings, setIsSettings] = useState<Settings>(settings);
  const [theme, setTheme] = useState<"light" | "dark">(isSettings.theme);
  const [language, setLanguage] = useState<'rus' | 'eng' | 'ger'>(isSettings.language);

  useEffect(() => {
    const getAsync = async () => {
      try {
        const stored = await AsyncStorage.getItem("settings");
        if (stored) {
          const parsed = JSON.parse(stored);
          dispatch(setSettings(parsed))
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAsync()
  }, [dispatch])

  useEffect(() => {
    setIsSettings(settings)
    setTheme(settings.theme)
    setLanguage(settings.language)
  }, [settings])
  
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