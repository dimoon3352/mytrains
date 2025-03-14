import { StyleSheet, Image, Platform, View, Text, ScrollView} from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import MainPartHome from '@/components/MainPartHome';
import { useEffect } from 'react';
import BenchPress from '@/components/BenchPress';
import MainPartCalculators from '@/components/MainPartActions';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useAppTheme } from '@/components/ThemeAppProvider';
import { ThemeAppProvider } from '@/components/ThemeAppProvider';
import HeaderBack from '@/components/HeaderBack';
import MainPartActions from '@/components/MainPartActions';
import { useFontLoad } from '@/hooks/useFontLoad';
import { Colors } from '@/constants/Colors';

SplashScreen.preventAutoHideAsync();

export default function ActionsPage() {

    const router = useRouter();

    const AppTheme = useAppTheme()
    const { light, dark } = Colors

    const loaded = useFontLoad()
  
    const onGestureEvent = (event: any) => {
      const { translationX, translationY } = event.nativeEvent;
  
      //console.error(Math.abs(translationX), Math.abs(translationY))

      if (Math.abs(translationX) > Math.abs(translationY)) {
        if (translationX > 40) {
          router.push('/(tabs)/ExercisesPage');
        }
      }
    }; //<Text style={{color: "#fff", fontSize: windowAverage * 10}}>Bench-press calculator</Text>

  return (
    <ScrollView>
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <View>
            <HeaderBack bgColor={AppTheme?.theme === "light" ? light.itemBackground : dark.itemBackground} textColor={AppTheme?.theme === "light" ? light.text : dark.text} iconColor={AppTheme?.theme === "light" ? light.navIcon : dark.navIcon} routerPath="(tabs)/ExercisesPage">
              Actions
            </HeaderBack>
            <MainPartActions bgColor={AppTheme?.theme === "light" ? light.background : dark.background} textColor={AppTheme?.theme === "light" ? light.text : "#16A34A"} bgItemColor={AppTheme?.theme === "light" ? light.itemBackground : dark.itemBackground} />  
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
