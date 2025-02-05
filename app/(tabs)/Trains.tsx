import { StyleSheet, Image, Platform, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';


export default function Trains() {

    const router = useRouter();
  
    const onGestureEvent = (event: any) => {
      const { translationX } = event.nativeEvent;
  
      if (translationX > 80) {
        router.push('/(tabs)');
      } else if (translationX < -80) {
        router.push('/(tabs)/Exercises');
      }
    };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <View style={{backgroundColor: "red"}}>
          <Text>Trains page</Text>
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
