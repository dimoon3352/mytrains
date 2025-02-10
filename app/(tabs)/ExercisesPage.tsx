import { StyleSheet, Image, Platform, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { windowHeight } from '@/constants/dimensions';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import MainPartExercises from '@/components/MainPartExercises';

export default function ExercisesPage() {

    const router = useRouter();
  
    const onGestureEvent = (event: any) => {
      const { translationX } = event.nativeEvent;
  
      if (translationX > 40) {
        router.push('/(tabs)/TrainsPage');
      } else if (translationX < -40) {
        router.push('/(tabs)/CalculatorsPage');
      }
    };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <View style={{height: windowHeight}}>
          <MainPartExercises bgColor='#070707' textColor='#fff' bgItemColor='#1d2025' headerColor='#1D2025'/>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
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
