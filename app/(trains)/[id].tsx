import { View, ScrollView} from 'react-native';
import { useRouter, useLocalSearchParams, SplashScreen } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

import { useAppSelector } from '@/store/hooks';
import { useAppTheme } from '@/components/ThemeAppProvider';
import { Colors } from '@/constants/Colors';

import HeaderBack from '@/components/HeaderBack';
import TrainsIndex from '@/components/TrainsIndex';


SplashScreen.preventAutoHideAsync();

export default function ExercisesIndex() {

    const trains = useAppSelector(state => state.trains)

    const { id } = useLocalSearchParams();
    const pid = id.slice(0, id.length - 1)

    const router = useRouter();

    const AppTheme = useAppTheme()
  
    const onGestureEvent = (event: any) => {
      const { translationX, translationY } = event.nativeEvent

      if (Math.abs(translationX) > Math.abs(translationY)) {
        if (translationX > 40) {
          router.push('/(tabs)/TrainsPage');
        }
      }
    }; 

  return (
      <ScrollView>
        <GestureHandlerRootView>
          <PanGestureHandler onGestureEvent={onGestureEvent}>                     
            <View>          
              <HeaderBack bgColor={AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground} textColor={AppTheme?.theme === "light" ? Colors.light.text : Colors.dark.text} iconColor={AppTheme?.theme === "light" ? Colors.light.navIcon : Colors.dark.navIcon} routerPath='(tabs)/TrainsPage'>
                Train ID: {pid}
              </HeaderBack>
              <TrainsIndex bgColor={AppTheme?.theme === "light" ? Colors.light.background : Colors.dark.background} textColor={AppTheme?.theme === "light" ? Colors.light.text : Colors.dark.text} input={AppTheme?.theme === "light" ? Colors.light.trainsInput : Colors.dark.trainsInput} checkModal={AppTheme?.theme === "light" ? Colors.light.checkModal : Colors.dark.checkModal} ID={pid} />      
            </View>             
          </PanGestureHandler>
        </GestureHandlerRootView>
      </ScrollView>
  );
}