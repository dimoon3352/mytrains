import { View } from 'react-native';
import { SplashScreen, Stack } from 'expo-router';

import { useAppTheme } from '@/components/ThemeAppProvider';
import { Colors } from '@/constants/Colors';


SplashScreen.preventAutoHideAsync();

export default function App() {

  const AppTheme = useAppTheme()

  return (
    <View style={{ flex: 1, backgroundColor: AppTheme?.theme === "light" ? Colors.light.background : Colors.dark.background }}>  
      <Stack>
        <Stack.Screen name="(tabs)" options={{ 
          headerShown: false, 
          statusBarBackgroundColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground, 
          navigationBarColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground,
          animation: "slide_from_left",
          animationDuration: 400
        }}/>
        <Stack.Screen name="(info)" options={{ 
          headerShown: false, 
          statusBarBackgroundColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground, 
          navigationBarColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground,
          animation: "slide_from_right",
          animationDuration: 400
        }}/>
        <Stack.Screen name="(settings)" options={{ 
          headerShown: false, 
          statusBarBackgroundColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground, 
          navigationBarColor: AppTheme?.theme === "light" ? Colors.light.background : Colors.dark.background,
          animation: "slide_from_right",
          animationDuration: 400
        }}/>
        <Stack.Screen name="(exercises)" options={{ 
          headerShown: false, 
          statusBarBackgroundColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground, 
          navigationBarColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground,
          animation: "slide_from_right",
          animationDuration: 400
        }}/>
        <Stack.Screen name="(trains)" options={{ 
          headerShown: false, 
          statusBarBackgroundColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground, 
          navigationBarColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground,
          animation: "slide_from_right",
          animationDuration: 400
        }}/>
        <Stack.Screen name="(createTrain)" options={{ 
          headerShown: false, 
          statusBarBackgroundColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground, 
          navigationBarColor: AppTheme?.theme === "light" ? Colors.light.background : Colors.dark.background,
          animation: "none"
        }}/>
        <Stack.Screen name="(createMockup)" options={{ 
          headerShown: false, 
          statusBarBackgroundColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground, 
          navigationBarColor: AppTheme?.theme === "light" ? Colors.light.background : Colors.dark.background,
          animation: "none"
        }}/>
      </Stack>  
    </View>
  );
}
