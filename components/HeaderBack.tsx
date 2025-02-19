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
          <ArrowLeftSVG color={iconColor} size={`${windowAverage * 15}px`} />
        </TouchableOpacity>
      </View>  
      <View style={styles.textContainer}>
        <Text style={{color: textColor, fontSize: windowAverage * 10}}>
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
    borderBottomRightRadius: windowAverage * 4
  },
  item: {
    width: windowWidth / 4,
    height: windowAverage * 28,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: windowAverage * 8
  },
  textContainer: {
    width: windowWidth / 2,
    height: windowAverage * 28,
    justifyContent: "center",
    alignItems: "center"
  },
});
