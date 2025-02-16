import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View } from 'react-native';
import { ThemeAppProvider } from '@/components/ThemeAppProvider';
import { useAppTheme } from '@/components/ThemeAppProvider';
import App from './App';
import { store } from '@/store/store';
import { Provider } from 'react-redux';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

 // const { color, toggle } = useAppTheme()

  return (
    <Provider store={store}>
      <ThemeAppProvider>
        <App />
      </ThemeAppProvider>
    </Provider>
  );
}
