import { useState } from 'react';
import { View, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

import { windowAverage, windowHeight } from '@/constants/Dimensions';
import { useAppTheme } from '@/components/ThemeAppProvider';
import { Colors } from '@/constants/Colors';

import MainPartExercises from '@/components/MainPartExercises';


export default function ExercisesPage() {

    const [isPopupActive, setIsPopupActive] = useState(false)
    const [isSortPopupActive, setIsSortPopupActive] = useState<boolean>(false)
    const [scrollY, setScrollY] = useState<number>(0);

    const router = useRouter();

    const AppTheme = useAppTheme()
    const { light, dark } = Colors
  
    const onGestureEvent = (event: any) => {
      const { translationX } = event.nativeEvent;
  
      if (translationX > 40) {
        setIsPopupActive(false)
        setIsSortPopupActive(false)
        router.push('/(tabs)/TrainsPage');
      } else if (translationX < -40) {
        setIsPopupActive(false)
        setIsSortPopupActive(false)
        router.push('/(tabs)/ActionsPage');
      }
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (scrollY < windowAverage * 18) {
        setScrollY(event.nativeEvent.contentOffset.y);
      } else if (scrollY >= windowAverage * 18 && event.nativeEvent.contentOffset.y < windowAverage * 29) {
        setScrollY(event.nativeEvent.contentOffset.y);
      }   
    };

  return (
    <ScrollView scrollEnabled={!isSortPopupActive} onScroll={handleScroll} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <View style={{minHeight: windowHeight}}>
            <MainPartExercises 
              bgColor={AppTheme?.theme === "light" ? light.background : dark.background} 
              textColor={AppTheme?.theme === "light" ? light.text : dark.text} 
              bgItemColor={AppTheme?.theme === "light" ? light.itemBackground : dark.itemBackground} 
              controlsBackground={AppTheme?.theme === "light" ? light.controlsBackground : dark.controlsBackground}
              checkModal={AppTheme?.theme === "light" ? light.checkModal : dark.checkModal}
              sortSigns={AppTheme?.theme === "light" ? light.sortSigns : dark.sortSigns}
              isPopupActive={isPopupActive}
              setIsPopupActive={setIsPopupActive}
              isSortPopupActive={isSortPopupActive}
              setIsSortPopupActive={setIsSortPopupActive}
              AppTheme={AppTheme}
              scrollY={scrollY}
            />
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </ScrollView>
  );
}
