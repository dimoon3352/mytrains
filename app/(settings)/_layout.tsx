import { Tabs } from 'expo-router';
//import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { windowAverage, windowWidth } from '@/constants/dimensions';
import { useTheme } from '@react-navigation/native';



import CalcSVG from '../../assets/images/navigation/CalcSVG';
import HomeSVG from '../../assets/images/navigation/HomeSVG';
import ExercisesSVG from '../../assets/images/navigation/ExercisesSVG';
import TrainsSVG from '../../assets/images/navigation/TrainsSVG';

export default function TabLayout() {

  const theme = useTheme();
  theme.colors.background = 'transparent';

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
          backgroundColor: "#1D2028", // add theme
          justifyContent: "center",
          alignItems: "center",
          height: windowAverage * 28,
          width: windowWidth,
          paddingTop: windowAverage * 4.8,
          paddingBottom: windowAverage * 4,
          borderTopLeftRadius: windowAverage * 4,
          borderTopRightRadius: windowAverage * 4,
          borderTopWidth: 0,
          position: "absolute",
          opacity: 0       
        }
      }}>
      <Tabs.Screen
        name="Settings"
        options={{
          tabBarIcon: ({focused}) => <HomeSVG color={focused ? "#2873fd" : "#16A34A"} size={`${windowAverage*20}px`} />,
        }}
      />
    </Tabs>
  );
}
