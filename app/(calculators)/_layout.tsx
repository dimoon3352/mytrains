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
        tabBarStyle: {
          display: "none"       
        }
      }}>
      <Tabs.Screen
        name="BenchPressPage"
        options={{
          tabBarIcon: ({focused}) => <HomeSVG color={focused ? "#2873fd" : "#16A34A"} size={`${windowAverage*20}px`} />,
        }}
      />
    </Tabs>
  );
}
