import { Stack } from 'expo-router';

import 'react-native-reanimated';
import { View } from 'react-native';
import { useAppTheme } from '@/components/ThemeAppProvider';

export default function App() {

  const AppTheme = useAppTheme()

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
