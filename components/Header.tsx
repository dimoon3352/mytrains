import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { windowAverage, windowWidth } from '@/constants/Dimensions';

import type { ReactNode } from 'react';

import SettingsSVG from '@/assets/images/header/SettingsSVG';


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
        <View style={[styles.item, {justifyContent: "center", alignItems: "center", right: windowAverage * 8}]}>
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
    justifyContent: "space-between",
    height: windowAverage * 32,
    width: windowWidth,
    borderBottomLeftRadius: windowAverage * 4,
    borderBottomRightRadius: windowAverage * 4,
  },
  item: {
    width: windowWidth / 10,
    height: windowAverage * 28,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  textContainer: {
    height: windowAverage * 28,
    justifyContent: "center",
    alignItems: "center"
  },
});
