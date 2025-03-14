import { View, ScrollView} from 'react-native';
import { useRouter, SplashScreen } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

import { useAppTheme } from '@/components/ThemeAppProvider';
import { Colors } from '@/constants/Colors';

import HeaderBack from '@/components/HeaderBack';
import MainPartActions from '@/components/MainPartActions';


SplashScreen.preventAutoHideAsync();

export default function ActionsPage() {

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
    <ScrollView>
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <View>
            <HeaderBack 
              bgColor={AppTheme?.theme === "light" ? light.itemBackground : dark.itemBackground} 
              textColor={AppTheme?.theme === "light" ? light.text : dark.text} 
              iconColor={AppTheme?.theme === "light" ? light.navIcon : dark.navIcon} 
              routerPath="(tabs)/ExercisesPage"
            >
              {AppTheme?.language === "rus" ? "Действия" : AppTheme?.language === "eng" ? "Actions" : "Aktionen"}
            </HeaderBack>
            <MainPartActions 
              bgColor={AppTheme?.theme === "light" ? light.background : dark.background} 
              textColor={AppTheme?.theme === "light" ? light.text : "#16A34A"} 
              bgItemColor={AppTheme?.theme === "light" ? light.itemBackground : dark.itemBackground} 
              AppTheme={AppTheme}
            />  
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </ScrollView>
  );
}
