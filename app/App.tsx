import { View } from 'react-native';
import { Stack } from 'expo-router';

import { useAppTheme } from '@/components/ThemeAppProvider';
import { Colors } from '@/constants/Colors';


export default function App() {

  const AppTheme = useAppTheme()

  return (
    <View style={{ flex: 1, backgroundColor: AppTheme?.theme === "light" ? Colors.light.background : Colors.dark.background }}>  
      <Stack>
        <Stack.Screen name="(tabs)" options={{ 
          headerShown: false, 
          statusBarBackgroundColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground, 
          navigationBarColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground,
          animation: "slide_from_left"
        }}/>
        <Stack.Screen name="(info)" options={{ 
          headerShown: false, 
          statusBarBackgroundColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground, 
          navigationBarColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground,
          animation: "slide_from_right"
        }}/>
        <Stack.Screen name="(settings)" options={{ 
          headerShown: false, 
          statusBarBackgroundColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground, 
          navigationBarColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground,
          animation: "slide_from_right"
        }}/>
        <Stack.Screen name="(exercises)" options={{ 
          headerShown: false, 
          statusBarBackgroundColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground, 
          navigationBarColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground,
          animation: "slide_from_right"
        }}/>
        <Stack.Screen name="(trains)" options={{ 
          headerShown: false, 
          statusBarBackgroundColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground, 
          navigationBarColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground,
          animation: "slide_from_right"
        }}/>
        <Stack.Screen name="(createTrain)" options={{ 
          headerShown: false, 
          statusBarBackgroundColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground, 
          navigationBarColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground,
          animation: "none"
        }}/>
      </Stack>  
    </View>
  );
}
