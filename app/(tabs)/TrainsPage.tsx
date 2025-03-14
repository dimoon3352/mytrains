import { StyleSheet, Image, Platform, View, Text, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { windowAverage, windowHeight } from '@/constants/Dimensions';
import MainPartTrains from '@/components/MainPartTrains';
import { useState } from 'react';
import { useAppTheme } from '@/components/ThemeAppProvider';
import { Colors } from '@/constants/Colors';


export default function TrainsPage() {

    const [isSortPopupActive, setIsSortPopupActive] = useState<boolean>(false)
    const [scrollY, setScrollY] = useState<number>(0);

    const AppTheme = useAppTheme()
    const {light, dark} = Colors

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
    <ScrollView style={{height: windowHeight}} scrollEnabled={!isSortPopupActive} onScroll={handleScroll} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <View>
            <MainPartTrains 
              bgColor={AppTheme?.theme === "light" ? light.background : dark.background} 
              textColor={AppTheme?.theme === "light" ? light.text : dark.text} 
              bgItemColor={AppTheme?.theme === "light" ? light.itemBackground : dark.itemBackground} 
              controlsBackground={AppTheme?.theme === "light" ? light.controlsBackground : dark.controlsBackground} 
              green={AppTheme?.theme === "light" ? light.green : dark.green} 
              draggableItemBg={AppTheme?.theme === "light" ? light.draggableItemBg : dark.draggableItemBg} 
              sortSigns={AppTheme?.theme === "light" ? light.sortSigns : dark.sortSigns} 
              isSortPopupActive={isSortPopupActive} 
              setIsSortPopupActive={setIsSortPopupActive} scrollY={scrollY}
            />
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
