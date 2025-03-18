import { View, ScrollView } from 'react-native';
import { SplashScreen, useLocalSearchParams, useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

import { useAppTheme } from '@/components/ThemeAppProvider';
import { Colors } from '@/constants/Colors';

import HeaderBack from '@/components/HeaderBack';
import ExercisesIndex from '@/components/ExercisesIndex';


SplashScreen.preventAutoHideAsync();

export default function Exercises() {

    const { id } = useLocalSearchParams();
    const pid = id.slice(0, id.length - 1)

    const router = useRouter();

    const AppTheme = useAppTheme()
    const { light, dark } = Colors
  
    const onGestureEvent = (event: any) => {
      const { translationX, translationY } = event.nativeEvent;

      if (Math.abs(translationX) > Math.abs(translationY)) {
        if (translationX > 40) {
          router.push('/(tabs)/ExercisesPage');
        }
      }
    };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onGestureEvent}>                     
          <View>          
            <HeaderBack 
              bgColor={AppTheme?.theme === "light" ? light.itemBackground : dark.itemBackground} 
              textColor={AppTheme?.theme === "light" ? light.text : dark.text} 
              iconColor={AppTheme?.theme === "light" ? light.navIcon : dark.navIcon} 
              routerPath='(tabs)/ExercisesPage'
            >
              Exercise ID: {pid}
            </HeaderBack>
            <ExercisesIndex 
              bgColor={AppTheme?.theme === "light" ? Colors.light.background : Colors.dark.background} 
              textColor={AppTheme?.theme === "light" ? Colors.light.text : Colors.dark.text} 
              input={AppTheme?.theme === "light" ? Colors.light.trainsInput : Colors.dark.trainsInput} 
              checkModal={AppTheme?.theme === "light" ? Colors.light.checkModal : Colors.dark.checkModal} 
              AppTheme={AppTheme} 
              ID={pid} 
            />  
          </View>             
        </PanGestureHandler>
      </GestureHandlerRootView>
    </ScrollView>
  );
}