import { StyleSheet, Image, Platform, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { windowAverage, windowWidth } from '@/constants/dimensions';
import { Link } from 'expo-router';

import SettingsSVG from '@/assets/images/header/SettingsSVG';
import BenchPressSVG from '@/assets/images/calculators/BenchPressSVG';


interface MainPartCalculatorsProps {
  bgColor: string,
  textColor: string,
}

export default function MainPartCalculators({bgColor, textColor}: MainPartCalculatorsProps) {

  const router = useRouter()

  function benchPressOnTouchEnd() {
    router.push('/(calculators)/BenchPressPage');
  }

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <Text>wefgwefffff</Text>
      <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>   
        <View style={[styles.item, {backgroundColor: "#1D2028"}]}>
          <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "#16A34A", fontSize: windowAverage * 12}}>Coming</Text>
            <Text style={{color: "#16A34A", fontSize: windowAverage * 12}}>soon</Text>
          </View>
        </View>

        <View style={[styles.item, {backgroundColor: "#1D2028"}]}>
          <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "#16A34A", fontSize: windowAverage * 12}}>Coming</Text>
            <Text style={{color: "#16A34A", fontSize: windowAverage * 12}}>soon</Text>
          </View>
        </View>
      </View>

      <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>   
        <View style={[styles.item, {backgroundColor: "#1D2028"}]}>
          <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "#16A34A", fontSize: windowAverage * 12}}>Coming</Text>
            <Text style={{color: "#16A34A", fontSize: windowAverage * 12}}>soon</Text>
          </View>
        </View>

        <Link href="/(calculators)/BenchPressPage">
          <View style={[styles.item, {backgroundColor: "#1D2028", position: "relative"}]}>
            <View style={{flexDirection: "column", position: "absolute", right: windowAverage * 8}}>
              <Text style={{color: "#16A34A", fontSize: windowAverage * 8}}>Bench</Text>
              <Text style={{color: "#16A34A", fontSize: windowAverage * 8}}>Press</Text>
            </View>
            <View style={{top: windowAverage * 15}}>
              <BenchPressSVG width="162px" height="210px" color='#16A34A'/>
            </View>        
          </View>
        </Link>
      </View>

      <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>   
      <View style={[styles.item, {backgroundColor: "#1D2028"}]}>
          <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "#16A34A", fontSize: windowAverage * 12}}>Coming</Text>
            <Text style={{color: "#16A34A", fontSize: windowAverage * 12}}>soon</Text>
          </View>
        </View>

        <View style={[styles.item, {backgroundColor: "#1D2028"}]}>
          <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "#16A34A", fontSize: windowAverage * 12}}>Coming</Text>
            <Text style={{color: "#16A34A", fontSize: windowAverage * 12}}>soon</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: windowAverage * 28,
    gap: windowAverage * 4,
    width: windowWidth,
    justifyContent: "center"
  },
  item: {
    width: windowAverage * 92,
    height: windowAverage * 92,
    borderRadius: windowAverage * 5,
    justifyContent: "center",
    
  },
  textContainer: {
    width: windowWidth / 2,
    height: windowAverage * 28,
    justifyContent: "center",
    alignItems: "center"
  },
});
