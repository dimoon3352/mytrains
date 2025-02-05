import { StyleSheet, Image, Platform, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

export default function Exercises() {

    const router = useRouter();
  
    const onGestureEvent = (event: any) => {
      const { translationX } = event.nativeEvent;
  
      if (translationX > 80) {
        router.push('/(tabs)/Trains');
      } else if (translationX < -80) {
        router.push('/(tabs)/Calculators');
      }
    };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <View style={{backgroundColor: "red"}}>
          <Text>Exercises page</Text>
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
