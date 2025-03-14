import { Tabs } from 'expo-router';
//import React from 'react';

import { HapticTab } from '@/components/UI/HapticTab';
import { useTheme } from '@react-navigation/native';



import CalcSVG from '../../assets/images/navigation/CalcSVG';
import HomeSVG from '../../assets/images/navigation/HomeSVG';
import ExercisesSVG from '../../assets/images/navigation/ExercisesSVG';
import TrainsSVG from '../../assets/images/navigation/TrainsSVG';

export default function TabLayout() {

  // const theme = useTheme();
  // theme.colors.background = 'transparent';

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
        tabBarShowLabel: false, 
        animation: "none",     
        tabBarStyle: {
          display: "none"      
        }
      }}>
      <Tabs.Screen
        name="AddExercise"
        options={{
          animation: "none"
        }}
      />
    </Tabs>
  );
}
