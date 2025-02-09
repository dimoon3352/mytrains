import { StyleSheet, Image, Platform, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { windowAverage, windowHeight, windowWidth } from '@/constants/dimensions';

import SettingsSVG from '@/assets/images/header/SettingsSVG';


interface MainPartHomeProps {
  textColor: string
}

export default function MainPartHome({textColor}: MainPartHomeProps) {

  return (
    <View style={styles.container} >
      <Text style={[styles.text, {color: textColor}]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
        r. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: windowAverage * 28
  },
  text: {
    fontSize: 14,
    padding: 12,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "pink",
//   },
//   item: {
//     width: windowWidth / 4,
//     height: windowAverage * 28,
//     justifyContent: "center",
//     alignItems: "flex-end",
//     paddingRight: windowAverage * 8
//   },
//   textContainer: {
//     width: windowWidth / 2,
//     height: windowAverage * 28,
//     justifyContent: "center",
//     alignItems: "center"
//   },
// });
