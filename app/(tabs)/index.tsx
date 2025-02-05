import { Image, StyleSheet, Platform, TranslateXTransform } from 'react-native';

import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { windowAverage, windowHeight } from '@/constants/dimensions';
import { View, Pressable, Text, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Header from '@/components/Header';
import MainPartHome from '@/components/MainPartHome';


export default function HomeScreen() {

  const router = useRouter();

  const onGestureEvent = (event: any) => {
    const { translationX, translationY } = event.nativeEvent;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX < -40) {
        router.push('/(tabs)/Trains');
      }
    }
  };

  return (  
    <ScrollView style={{backgroundColor: "#242424"}} >
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onGestureEvent}>                     
          <View>          
            <Header bgColor='#1D2028' textColor='#fff' iconColor='#16A34A' />
            <MainPartHome bgColor='#242424' textColor='#fff' />          
          </View>             
        </PanGestureHandler>
      </GestureHandlerRootView>
    </ScrollView> 
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
