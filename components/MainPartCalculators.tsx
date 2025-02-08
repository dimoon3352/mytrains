import { StyleSheet, Image, Platform, View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { windowAverage, windowHeight, windowWidth } from '@/constants/dimensions';
import { Link } from 'expo-router';

import SettingsSVG from '@/assets/images/header/SettingsSVG';
import BenchPressSVG from '@/assets/images/calculators/BenchPressSVG';
import { useState } from 'react';
import PullUpSVG from '@/assets/images/calculators/PullUpSVG';
import PushUpSVG from '@/assets/images/calculators/PushUpSVG';
import SquatSVG from '@/assets/images/calculators/SquatSVG';


interface MainPartCalculatorsProps {
  bgColor: string,
  textColor: string,
  bgItemColor: string,
}

export default function MainPartCalculators({bgColor, textColor, bgItemColor}: MainPartCalculatorsProps) {

  const [reload, setReload] = useState<boolean>(true)

  function onReload() {
    setReload(reload => !reload)
    console.error("reload")
  }


  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <View>
        <Text style={{color: textColor, fontSize: windowAverage * 12, paddingLeft: windowAverage * 5}}>
          Info:
        </Text>
        <View style={{backgroundColor: textColor, height: 2, width: windowWidth - windowAverage * 10, alignSelf: "center"}}></View>
      </View>

      <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>   
        <Link href="/(calculators)/BenchPressPage">
          <View style={[styles.item, {backgroundColor: bgItemColor, position: "relative"}]}>
            <View style={{flexDirection: "column", position: "absolute", right: windowAverage * 8}}>
              <Text style={{color: textColor, fontSize: windowAverage * 8}}>Pull-ups</Text>
            </View>
            <View style={{}}>
              <PullUpSVG width="99px" height="155px" color={textColor}/>
            </View>        
          </View>
        </Link>

        <Link href="/(calculators)/BenchPressPage">
          <View style={[styles.item, {backgroundColor: bgItemColor, position: "relative"}]}>
            <View style={{flexDirection: "column", position: "absolute", right: windowAverage * 8}}>
              <Text style={{color: textColor, fontSize: windowAverage * 8}}>Push-ups</Text>
            </View>
            <View style={{}}>
              <PushUpSVG width="168px" height="86px" color={textColor}/>
            </View>        
          </View>
        </Link>
      </View>
      
      <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>   
        <Link href="/(calculators)/BenchPressPage">
          <View style={[styles.item, {backgroundColor: bgItemColor, position: "relative"}]}>
            <View style={{flexDirection: "column", position: "absolute", right: windowAverage * 8}}>
              <Text style={{color: textColor, fontSize: windowAverage * 8}}>Squat</Text>
            </View>
            <View style={{}}>
              <SquatSVG width="135px" height="161px" color={textColor}/>
            </View>        
          </View>
        </Link>

        <View style={[styles.item, {backgroundColor: bgItemColor}]}>
          <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: textColor, fontSize: windowAverage * 12}}>Coming</Text>
            <Text style={{color: textColor, fontSize: windowAverage * 12}}>soon</Text>
          </View>
        </View>
      </View>

      <View>
        <Text style={{color: textColor, fontSize: windowAverage * 12, paddingLeft: windowAverage * 5}}>
          Calculators:
        </Text>
        <View style={{backgroundColor: textColor, height: 2, width: (windowWidth - windowAverage * 10), alignSelf: "center"}}></View>
      </View>

      <View style={{flexDirection: "row", justifyContent: "space-evenly"}}> 
        <View style={[styles.item, {backgroundColor: bgItemColor}]}>
          <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: textColor, fontSize: windowAverage * 12}}>Coming</Text>
            <Text style={{color: textColor, fontSize: windowAverage * 12}}>soon</Text>
          </View>
        </View>

        <Link href="/(calculators)/BenchPressPage">
          <View style={[styles.item, {backgroundColor: bgItemColor, position: "relative"}]}>
            <View style={{flexDirection: "column", position: "absolute", right: windowAverage * 8}}>
              <Text style={{color: textColor, fontSize: windowAverage * 8}}>Bench</Text>
              <Text style={{color: textColor, fontSize: windowAverage * 8}}>press</Text>
            </View>
            <View style={{top: windowAverage * 15}}>
              <BenchPressSVG width="162px" height="210px" color={textColor}/>
            </View>        
          </View>
        </Link>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: windowAverage * 4,
    width: windowWidth,
    paddingTop: windowAverage * 5,
    paddingBottom: windowAverage * 35,
    justifyContent: "center"
  },
  item: {
    width: windowAverage * 92,
    height: windowAverage * 92,
    borderRadius: windowAverage * 5,
    justifyContent: "center",
    
  },
});
