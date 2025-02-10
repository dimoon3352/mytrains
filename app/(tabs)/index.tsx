import { Image, StyleSheet, Platform, TranslateXTransform } from 'react-native';

import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { windowAverage, windowHeight } from '@/constants/dimensions';
import { View, Pressable, Text, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Header from '@/components/Header';
import MainPartHome from '@/components/MainPartHome';
import { useAppTheme } from '@/components/ThemeAppProvider';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useNavigation } from 'expo-router';


export default function HomeScreen() {

  const AppTheme = useAppTheme()

  const router = useRouter();

  const onGestureEvent = (event: any) => {
    const { translationX, translationY } = event.nativeEvent;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX < -40) {
        router.push('/(tabs)/TrainsPage');
      }
    }
  };

  return (  
    <ScrollView style={{backgroundColor: AppTheme?.theme === "light" ? "#ffffff" : "#070707" }}>
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onGestureEvent}>                     
          <View>          
            <Header bgColor='#1D2025' textColor='#fff' iconColor='#808487' />
            <MainPartHome textColor='#fff' />          
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
