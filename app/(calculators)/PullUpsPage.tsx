import { StyleSheet, Image, Platform, View, Text, ScrollView, KeyboardAvoidingView} from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import MainPartHome from '@/components/MainPartHome';
import { windowAverage, windowHeight } from '@/constants/dimensions';
import BenchPress from '@/components/BenchPress';
import MainPartCalculators from '@/components/MainPartCalculators';
import { useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';


SplashScreen.preventAutoHideAsync();
export default function PullUpsPage() {

    const theme = useTheme();
    theme.colors.background = 'transparent';
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
          router.push('/(calculators)/BenchPressPage');
        } 
      } 

      if (Math.abs(translationY) < 40) {
        if (translationX < -40) {
          router.push('/(calculators)/PushUpsPage');
        }
      }
    };

  return (
    <View style={{backgroundColor: "#242424", flex: 1}} >
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <View style={{height: windowHeight, alignItems: "center", justifyContent: "center", gap: windowAverage * 40, bottom: windowAverage * 30}}>
            <Text>Pull Ups</Text>
            <BenchPress bgColor='#242424' textColor='#fff' />
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
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
