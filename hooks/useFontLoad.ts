import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";


export const useFontLoad = () => {

  const [loaded] = useFonts({
      SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return loaded;
  }
  return loaded
}