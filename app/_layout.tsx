import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

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

  return (
    <View style={{ flex: 1, backgroundColor: "#242424" }}>  
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, statusBarBackgroundColor: "#1D2028", animation: "slide_from_left"}} />
        <Stack.Screen name="(calculators)" options={{ headerShown: false, statusBarBackgroundColor: "#1D2028", animation: "slide_from_right"}} />
        <Stack.Screen name="(settings)" options={{ headerShown: false, statusBarBackgroundColor: "#1D2028", animation: "slide_from_right"}} />
      </Stack>  
    </View>
  );
}
