import { Image, StyleSheet, Platform, TranslateXTransform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';

import { View, Pressable, Text } from 'react-native';
import { Link, router, useRouter } from 'expo-router';

export default function HomeScreen() {

  const router = useRouter();

  const onGestureEvent = (event: any) => {
    const { translationX } = event.nativeEvent;

    if (translationX < -50) {
      // Свайп вправо
      router.push('/(tabs)/Trains');
    }
  };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <View>
          <Text>Home page</Text>
          <Link href="/(tabs)/Trains">go to trains</Link>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(tabs)/Trains"
              })
            }>
              <Text>Go to trains</Text>
          </Pressable>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
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
