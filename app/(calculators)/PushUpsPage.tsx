import { useEffect } from 'react';
import { View, Text} from 'react-native';
import { useFonts } from 'expo-font';
import { useRouter, SplashScreen } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

import { windowAverage, windowHeight } from '@/constants/dimensions';
import { useAppTheme } from '@/components/ThemeAppProvider';


export default function PushUpsPage() {

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
    }
  
    const onGestureEvent = (event: any) => {
      const { translationX, translationY } = event.nativeEvent;

      if (Math.abs(translationX) > Math.abs(translationY)) {
        if (translationX > 40) {
          router.push('/(calculators)/PullUpsPage');
        } 
      } 

      if (Math.abs(translationY) < 40) {
        if (translationX < -40) {
          router.push('/(calculators)/SquatPage');
        }
      }
    };

  return (
    <View style={{backgroundColor: AppTheme?.theme === "light" ? "#ffffff" : "#070707", flex: 1}}>
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <View style={{height: windowHeight, alignItems: "center", justifyContent: "center", bottom: windowAverage * 30}}>
            <View style={{justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "#fff", fontSize: windowAverage * 16}}>Coming</Text>
              <Text style={{color: "#fff", fontSize: windowAverage * 16}}>soon</Text>
            </View>          
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
}