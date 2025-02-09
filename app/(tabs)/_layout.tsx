import { Tabs } from 'expo-router';
//import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { windowAverage, windowWidth } from '@/constants/dimensions';

import CalcSVG from '../../assets/images/navigation/CalcSVG';
import HomeSVG from '../../assets/images/navigation/HomeSVG';
import ExercisesSVG from '../../assets/images/navigation/ExercisesSVG';
import TrainsSVG from '../../assets/images/navigation/TrainsSVG';

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
        headerShown: false,
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
        name="index"
        options={{
          tabBarIcon: ({focused}) => <HomeSVG color={focused ? "#008ef4" : "#808487"} size={`${windowAverage*20}px`} />,
        }}
      />
      <Tabs.Screen
        name="Trains"
        options={{
          tabBarIcon: ({focused}) => <TrainsSVG color={focused ? "#008ef4" : "#808487"} size={`${windowAverage*20}px`} />,
        }}
      />
      <Tabs.Screen
        name="Exercises"
        options={{
          tabBarIcon: ({focused}) => <ExercisesSVG color={focused ? "#008ef4" : "#808487"} size={`${windowAverage*20}px`} />,
        }}
      />
      <Tabs.Screen
        name="Calculators"
        options={{
          tabBarIcon: ({focused}) => <CalcSVG color={focused ? "#008ef4" : "#808487"} size={`${windowAverage*20}px`} />,
        }}
      />
    </Tabs>
  );
}
