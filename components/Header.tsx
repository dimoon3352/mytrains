import { StyleSheet, Image, Platform, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { windowAverage, windowWidth } from '@/constants/dimensions';

import SettingsSVG from '@/assets/images/header/SettingsSVG';


interface HeaderProps {
  bgColor: string,
  textColor: string,
  iconColor: string
}

export default function Header({bgColor, textColor, iconColor}: HeaderProps) {

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <View style={styles.item}></View>
      <View style={styles.textContainer}>
        <Text style={{color: textColor, fontSize: windowAverage * 10}}>
          Home
        </Text>
      </View>
      <View style={styles.item}>
        <SettingsSVG color={iconColor} size={`${windowAverage * 15}px`} />
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: windowAverage * 28,
    width: windowWidth,
    borderBottomLeftRadius: windowAverage * 4,
    borderBottomRightRadius: windowAverage * 4
  },
  item: {
    width: windowWidth / 4,
    height: windowAverage * 28,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: windowAverage * 8
  },
  textContainer: {
    width: windowWidth / 2,
    height: windowAverage * 28,
    justifyContent: "center",
    alignItems: "center"
  },
});
