import { StyleSheet, Image, Platform, View, Text, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { windowAverage, windowHeight } from '@/constants/Dimensions';
import MainPartTrains from '@/components/MainPartTrains';
import { useState } from 'react';


export default function TrainsPage() {

  const [isSortPopupActive, setIsSortPopupActive] = useState<boolean>(false)
  const [scrollY, setScrollY] = useState<number>(0);

    const router = useRouter();
  
    const onGestureEvent = (event: any) => {
      const { translationX } = event.nativeEvent;
  
      if (translationX > 40) {
        router.push('/(tabs)');
      } else if (translationX < -40) {
        router.push('/(tabs)/ExercisesPage');
      }
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (scrollY < windowAverage * 29) {
        setScrollY(event.nativeEvent.contentOffset.y);
      } else if (scrollY >= windowAverage * 29 && event.nativeEvent.contentOffset.y < windowAverage * 29) {
        setScrollY(event.nativeEvent.contentOffset.y);
      }   
    };

  return (
    <ScrollView style={{height: windowHeight}} scrollEnabled={!isSortPopupActive} onScroll={handleScroll} scrollEventThrottle={16}>
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <View>
            <MainPartTrains bgColor='#070707' textColor='#fff' bgItemColor='#1d2025' headerColor='#1D2025' isSortPopupActive={isSortPopupActive} setIsSortPopupActive={setIsSortPopupActive} scrollY={scrollY}/>
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
