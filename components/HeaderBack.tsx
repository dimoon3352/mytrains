import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { windowAverage, windowWidth } from '@/constants/Dimensions';

import ArrowLeftSVG from '@/assets/images/common/ArrowLeftSVG';


interface HeaderProps {
  children: React.ReactNode,
  bgColor: string,
  textColor: string,
  iconColor: string,
  routerPath: string
}

export default function HeaderBack({children, bgColor, textColor, iconColor, routerPath}: HeaderProps) {

  const router = useRouter()

  function onTouchEnd() {
    router.push(`/${routerPath}`)
  }

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <View style={styles.item}>
        <TouchableOpacity onPress={onTouchEnd}>
          <ArrowLeftSVG color={iconColor} size={windowAverage * 15} />
        </TouchableOpacity>
      </View>  
      <View style={styles.textContainer}>
        <Text style={{color: textColor, fontSize: windowAverage * 11, fontFamily: "YS-text"}}>
          {children}
        </Text>
      </View>
      <View style={styles.item}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",   
    height: windowAverage * 32,
    alignItems: "center",
    width: windowWidth,
    borderBottomLeftRadius: windowAverage * 4,
    borderBottomRightRadius: windowAverage * 4,
    boxShadow: "0px 4px 8px 0px rgba(34, 60, 80, 0.2)"
  },
  item: {
    width: windowWidth / 7,
    height: windowAverage * 28,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: windowAverage * 8
  },
  textContainer: {
    width: windowWidth / 7 * 5,
    height: windowAverage * 28,
    justifyContent: "center",
    alignItems: "center",
  },
});
