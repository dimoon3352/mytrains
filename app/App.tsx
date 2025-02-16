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
import { useTheme } from '@react-navigation/native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function App() {
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

  const Rtheme = useTheme();
      Rtheme.colors.background = 'transparent';

  const AppTheme = useAppTheme()

  const theme = typeof(AppTheme?.theme) === "string" ? AppTheme.theme : "light"

  return (
    <View style={{ flex: 1, backgroundColor: AppTheme?.theme === "light" ? "#ffffff" : "#070707" }}>  
      <Stack>
        <Stack.Screen name="(tabs)" options={{ 
          headerShown: false, 
          statusBarBackgroundColor: AppTheme?.theme === "light" ? "#ffffff" : "#1D2025", 
          navigationBarColor: AppTheme?.theme === "light" ? "#ffffff" : "#1D2025",
          animation: "slide_from_left"
        }}/>
        <Stack.Screen name="(info)" options={{ 
          headerShown: false, 
          statusBarBackgroundColor: AppTheme?.theme === "light" ? "#ffffff" : "#070707", 
          navigationBarColor: AppTheme?.theme === "light" ? "#ffffff" : "#1D2025",
          animation: "slide_from_right"
        }}/>
        <Stack.Screen name="(settings)" options={{ 
          headerShown: false, 
          statusBarBackgroundColor: AppTheme?.theme === "light" ? "#ffffff" : "#070707", 
          navigationBarColor: AppTheme?.theme === "light" ? "#ffffff" : "#070707",
          animation: "slide_from_right"
        }}/>
        <Stack.Screen name="(exercises)" options={{ 
          headerShown: false, 
          statusBarBackgroundColor: AppTheme?.theme === "light" ? "#ffffff" : "#1D2025", 
          navigationBarColor: AppTheme?.theme === "light" ? "#ffffff" : "#070707",
          animation: "slide_from_right"
        }}/>
        <Stack.Screen name="(trains)" options={{ 
          headerShown: false, 
          statusBarBackgroundColor: AppTheme?.theme === "light" ? "#ffffff" : "#1D2025", 
          navigationBarColor: AppTheme?.theme === "light" ? "#ffffff" : "#070707",
          animation: "slide_from_right"
        }}/>
      </Stack>  
    </View>
  );
}
