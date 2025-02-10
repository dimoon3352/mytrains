import { Tabs } from 'expo-router';
//import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { windowAverage, windowWidth } from '@/constants/dimensions';

import CalcSVG from '../../assets/images/navigation/CalcSVG';
import HomeSVG from '../../assets/images/navigation/HomeSVG';
import ExercisesSVG from '../../assets/images/navigation/ExercisesSVG';
import TrainsSVG from '../../assets/images/navigation/TrainsSVG';
import { Text, View } from 'react-native';
import BenchPressNavSVG from '@/assets/images/navigation/BenchPressNavSVG';
import PullUpNavSVG from '@/assets/images/navigation/PullUpsNavSVG';
import PushUpNavSVG from '@/assets/images/navigation/PushUpNavSVG';
import SquatNavSVG from '@/assets/images/navigation/SquatNavSVG';

export default function TabLayout() {

  const tabDarkTheme = {
    bg: "#1D2028",
    element: "#16A34A"
  }

  const tabLightTheme = {
    bg: "#fff",
    element: "#16A34A"
  }

  return (
    <Tabs 
      screenOptions={{
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarShowLabel: false,  
        animation: "shift",    
        tabBarStyle: {
          backgroundColor: "#1D2025", // add theme
          justifyContent: "center",
          alignItems: "center",
          height: windowAverage * 28,
          width: windowWidth,
          paddingTop: windowAverage * 4.8,
          paddingBottom: windowAverage * 4,
          borderTopLeftRadius: windowAverage * 4,
          borderTopRightRadius: windowAverage * 4,
          borderTopWidth: 0,
          position: "absolute"       
        }
      }}>
      <Tabs.Screen
        name="BenchPressPage"
        options={{
          tabBarIcon: ({focused}) => 
            <View style={{width: windowWidth / 4, justifyContent: "center", alignItems: "center"}}>
              <BenchPressNavSVG color={focused ? "#00bfbf" : "#808487"} size={`${windowAverage*14}px`} />
              <Text style={{color: focused ? "#00bfbf" : "#808487", fontSize: windowAverage * 5, fontWeight: "600"}}>
                Bench-press
              </Text>
            </View>,       
        }}
      />
      <Tabs.Screen
        name="PullUpsPage"
        options={{
          tabBarIcon: ({focused}) => 
            <View style={{width: windowWidth / 4, justifyContent: "center", alignItems: "center"}}>
              <PullUpNavSVG color={focused ? "#00bfbf" : "#808487"} size={`${windowAverage*14}px`} />
              <Text style={{color: focused ? "#00bfbf" : "#808487", fontSize: windowAverage * 5, fontWeight: "600"}}>
                Pull-ups
              </Text>
            </View>,       
        }}
      />
      <Tabs.Screen
        name="PushUpsPage"
        options={{
          tabBarIcon: ({focused}) => 
            <View style={{width: windowWidth / 4, justifyContent: "center", alignItems: "center"}}>
              <PushUpNavSVG color={focused ? "#00bfbf" : "#808487"} size={`${windowAverage*14}px`} />
              <Text style={{color: focused ? "#00bfbf" : "#808487", fontSize: windowAverage * 5, fontWeight: "600"}}>
                Push-ups
              </Text>
            </View>,       
        }}
      />
      <Tabs.Screen
        name="SquatPage"
        options={{
          tabBarIcon: ({focused}) => 
            <View style={{width: windowWidth / 4, justifyContent: "center", alignItems: "center"}}>
              <SquatNavSVG color={focused ? "#00bfbf" : "#808487"} size={`${windowAverage*14}px`} />
              <Text style={{color: focused ? "#00bfbf" : "#808487", fontSize: windowAverage * 5, fontWeight: "600"}}>
                Squat
              </Text>
            </View>,       
        }}
      />
    </Tabs>
  );
}
