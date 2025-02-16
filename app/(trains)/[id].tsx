import { StyleSheet, Image, Platform, View, Text, ScrollView} from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import MainPartHome from '@/components/MainPartHome';
import { useEffect } from 'react';
import { windowAverage, windowHeight } from '@/constants/dimensions';
import BenchPress from '@/components/BenchPress';
import MainPartCalculators from '@/components/MainPartActions';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useAppTheme } from '@/components/ThemeAppProvider';
import { ThemeAppProvider } from '@/components/ThemeAppProvider';
import { useLocalSearchParams } from 'expo-router';
import HeaderBack from '@/components/HeaderBack';

SplashScreen.preventAutoHideAsync();

export default function ExercisesIndex() {

    const { id } = useLocalSearchParams();

    const router = useRouter();

    const AppTheme = useAppTheme()

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
  
      //console.error(Math.abs(translationX), Math.abs(translationY))

      if (Math.abs(translationX) > Math.abs(translationY)) {
        if (translationX > 40) {
          router.push('/(tabs)/TrainsPage');
        }
      }
    }; //<Text style={{color: "#fff", fontSize: windowAverage * 10}}>Bench-press calculator</Text>

  return (
      <ScrollView style={{backgroundColor: AppTheme?.theme === "light" ? "#ffffff" : "#070707" }}>
        <GestureHandlerRootView>
          <PanGestureHandler onGestureEvent={onGestureEvent}>                     
            <View>          
              <HeaderBack bgColor='#1D2025' textColor='#fff' iconColor='#808487'>Exercise {id}</HeaderBack>
              <MainPartHome textColor='#fff' />          
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
