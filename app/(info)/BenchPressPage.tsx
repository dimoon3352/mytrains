import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

import { windowAverage, windowHeight } from '@/constants/Dimensions';
import { useAppTheme } from '@/components/ThemeAppProvider';

import BenchPress from '@/components/BenchPress';
import { Colors } from '@/constants/Colors';


import HeaderBack from '@/components/HeaderBack';


export default function BenchPressPage() {

    const AppTheme = useAppTheme()

    const router = useRouter();
  
    const onGestureEvent = (event: any) => {
      const { translationX, translationY } = event.nativeEvent;

      if (Math.abs(translationX) > Math.abs(translationY)) {
        if (translationX > 40) {
          router.push('/(tabs)/ActionsPage');
        } 
      } 

      if (Math.abs(translationY) < 40) {
        if (translationX < -40) {
          router.push('/(info)/PullUpsPage');
        }
      }     
    }; 

  return (
    <View style={{backgroundColor: AppTheme?.theme === "light" ? Colors.light.background : Colors.dark.background, flex: 1}} >
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <View style={{height: windowHeight, alignItems: "center", gap: windowAverage * 70}}>
            <HeaderBack bgColor={AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground} textColor={AppTheme?.theme === "light" ? Colors.light.text : Colors.dark.text} iconColor={AppTheme?.theme === "light" ? Colors.light.navIcon : Colors.dark.navIcon} routerPath="(tabs)/ActionsPage">
              Bench-press
            </HeaderBack>
            <BenchPress bgColor={AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground} textColor={AppTheme?.theme === "light" ? Colors.light.text : Colors.dark.text} bgInput={AppTheme?.theme === "light" ? Colors.light.controlsBackground : Colors.dark.controlsBackground}/>
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
}