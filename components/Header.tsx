import { StyleSheet, Image, Platform, View, Text, Pressable, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { windowAverage, windowWidth } from '@/constants/Dimensions';
import { Link } from 'expo-router';

import SettingsSVG from '@/assets/images/header/SettingsSVG';
import { ReactNode } from 'react';


interface HeaderProps {
  bgColor: string,
  textColor: string,
  iconColor: string,
  children: ReactNode
}

export default function Header({bgColor, textColor, iconColor, children}: HeaderProps) {

  const router = useRouter()

  function onPress() {
    router.push("/(settings)/Settings")
  }

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <View style={styles.item}></View>
      <View style={styles.textContainer}>
        <Text style={{color: textColor, fontSize: windowAverage * 11, fontFamily: "YS-text"}}>
          {children}
        </Text>
      </View>
      <TouchableOpacity  onPress={onPress}>
        <View style={styles.item}>
          <SettingsSVG color={iconColor} size={`${windowAverage * 15}px`} />
        </View> 
      </TouchableOpacity> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: windowAverage * 32,
    width: windowWidth,
    borderBottomLeftRadius: windowAverage * 4,
    borderBottomRightRadius: windowAverage * 4,
    boxShadow: "0px 4px 10px 4px rgba(34, 60, 80, 0.2)"
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
