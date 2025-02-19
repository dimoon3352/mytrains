import { Provider } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import { store } from '@/store/store';
import { ThemeAppProvider } from '@/components/ThemeAppProvider';
import { useFontLoad } from '@/hooks/useFontLoad';

import App from './App';


SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {

  const theme = useTheme();
  theme.colors.background = 'transparent';

  const loaded = useFontLoad()

  return (
    <Provider store={store}>
      <ThemeAppProvider>
        <App />
      </ThemeAppProvider>
    </Provider>
  );
}
