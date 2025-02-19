import { Tabs } from 'expo-router';
//import React from 'react';

import { HapticTab } from '@/components/UI/HapticTab';
import { windowAverage, windowWidth } from '@/constants/Dimensions';
import { Colors } from '@/constants/Colors';

import CalcSVG from '../../assets/images/navigation/CalcSVG';
import HomeSVG from '../../assets/images/navigation/HomeSVG';
import ExercisesSVG from '../../assets/images/navigation/ExercisesSVG';
import TrainsSVG from '../../assets/images/navigation/TrainsSVG';
import { useAppTheme } from '@/components/ThemeAppProvider';

export default function TabLayout() {

  const AppTheme = useAppTheme()

  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,  
        animation: "shift",    
        tabBarStyle: {
          backgroundColor: AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground,
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
          tabBarIcon: ({focused}) => <HomeSVG color={focused && AppTheme?.theme === "light" ? Colors.light.navIconFocused : focused && AppTheme?.theme === "dark" ? Colors.dark.navIconFocused : AppTheme?.theme === "light" ? Colors.light.navIcon : Colors.dark.navIcon} size={`${windowAverage*20}px`}/>,
        }}
      />
      <Tabs.Screen
        name="TrainsPage"
        options={{
          tabBarIcon: ({focused}) => <TrainsSVG color={focused && AppTheme?.theme === "light" ? Colors.light.navIconFocused : focused && AppTheme?.theme === "dark" ? Colors.dark.navIconFocused : AppTheme?.theme === "light" ? Colors.light.navIcon : Colors.dark.navIcon} size={`${windowAverage*20}px`}/>,
        }}
      />
      <Tabs.Screen
        name="ExercisesPage"
        options={{
          tabBarIcon: ({focused}) => <ExercisesSVG color={focused && AppTheme?.theme === "light" ? Colors.light.navIconFocused : focused && AppTheme?.theme === "dark" ? Colors.dark.navIconFocused : AppTheme?.theme === "light" ? Colors.light.navIcon : Colors.dark.navIcon} size={`${windowAverage*20}px`}/>,
        }}
      />
      <Tabs.Screen
        name="ActionsPage"
        options={{
          tabBarIcon: ({focused}) => <CalcSVG color={focused && AppTheme?.theme === "light" ? Colors.light.navIconFocused : focused && AppTheme?.theme === "dark" ? Colors.dark.navIconFocused : AppTheme?.theme === "light" ? Colors.light.navIcon : Colors.dark.navIcon} size={`${windowAverage*20}px`}/>,
        }}
      />
    </Tabs>
  );
}
