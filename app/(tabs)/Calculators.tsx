import { StyleSheet, Image, Platform, View, Text, ScrollView} from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import MainPartHome from '@/components/MainPartHome';
import { useEffect } from 'react';
import { windowAverage, windowHeight } from '@/constants/dimensions';
import BenchPress from '@/components/BenchPress';
import MainPartCalculators from '@/components/MainPartCalculators';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function Calculators() {

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
  
      //console.error(Math.abs(translationX), Math.abs(translationY))

      if (Math.abs(translationX) > Math.abs(translationY)) {
        if (translationX > 40) {
          router.push('/(tabs)/Exercises');
        }
      }
    }; //<Text style={{color: "#fff", fontSize: windowAverage * 10}}>Bench-press calculator</Text>

  return (
    <ScrollView style={{backgroundColor: "#242424"}} >
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <View style={{height: windowHeight, alignItems: "center", justifyContent: "center", gap: windowAverage * 40, bottom: windowAverage * 30}}>
            <MainPartCalculators bgColor='#242424' textColor='#fff' />
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
