import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';


import CalcSVG from '../navigation/CalcSVG';
import HomeSVG from '../navigation/HomeSVG';
import ExercisesSVG from '../navigation/ExercisesSVG';
import TrainsSVG from '../navigation/TrainsSVG';

export default function TabLayout() {

  const tabDarkTheme = {
    bg: "#242424",
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
          backgroundColor: tabDarkTheme.bg, // add theme
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 56,
          paddingTop: 8,
          paddingBottom: 8,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => <HomeSVG color='#16A34A' size='40px' />,
        }}
      />
      <Tabs.Screen
        name="Trains"
        options={{
          tabBarIcon: () => <TrainsSVG color='#16A34A' size='40px' />,
        }}
      />
      <Tabs.Screen
        name="Exercises"
        options={{
          tabBarIcon: () => <ExercisesSVG color='#16A34A' size='40px' />,
        }}
      />
      <Tabs.Screen
        name="Calculators"
        options={{
          tabBarIcon: () => <CalcSVG color='#16A34A' size='40px' />,
        }}
      />
    </Tabs>
  );
}
