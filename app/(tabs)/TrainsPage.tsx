import { StyleSheet, Image, Platform, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { windowHeight } from '@/constants/Dimensions';
import MainPartTrains from '@/components/MainPartTrains';


export default function TrainsPage() {

    const router = useRouter();
  
    const onGestureEvent = (event: any) => {
      const { translationX } = event.nativeEvent;
  
      if (translationX > 40) {
        router.push('/(tabs)');
      } else if (translationX < -40) {
        router.push('/(tabs)/ExercisesPage');
      }
    };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <View style={{height: windowHeight}}>
          <MainPartTrains bgColor='#070707' textColor='#fff' bgItemColor='#1d2025' headerColor='#1D2025'/>
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
