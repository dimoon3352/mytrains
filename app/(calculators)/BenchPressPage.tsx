import { useEffect } from 'react';
import { View, Text} from 'react-native';
import { useFonts } from 'expo-font';
import { useRouter, SplashScreen } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

import { windowAverage, windowHeight } from '@/constants/dimensions';
import { useAppTheme } from '@/components/ThemeAppProvider';

import BenchPress from '@/components/BenchPress';


export default function BenchPressPage() {

    const AppTheme = useAppTheme()

    const router = useRouter();

    const [loaded] = useFonts({
        SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    });
    
    useEffect(() => {
      if (loaded) {
        SplashScreen.hideAsync();
      }
    }, [loaded]);
  
    if (!loaded) {
      return null;
    } // #ec4a89 
  
    const onGestureEvent = (event: any) => {
      const { translationX, translationY } = event.nativeEvent;

      if (Math.abs(translationX) > Math.abs(translationY)) {
        if (translationX > 40) {
          router.push('/(tabs)/CalculatorsPage');
        } 
      } 

      if (Math.abs(translationY) < 40) {
        if (translationX < -40) {
          router.push('/(calculators)/PullUpsPage');
        }
      }     
    }; 

  return (
    <View style={{backgroundColor: AppTheme?.theme === "light" ? "#ffffff" : "#070707", flex: 1}} >
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <View style={{height: windowHeight, alignItems: "center", justifyContent: "center", gap: windowAverage * 40, bottom: windowAverage * 30}}>
            <BenchPress bgColor={AppTheme?.theme === "light" ? "#ffffff" : "#1D2025"} textColor='#fff' />
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
}