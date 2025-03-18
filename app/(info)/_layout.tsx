import { Text, View } from 'react-native';
import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/UI/HapticTab';
import { useAppTheme } from '@/components/ThemeAppProvider';
import { windowAverage, windowWidth } from '@/constants/Dimensions';
import { Colors } from '@/constants/Colors';

import BenchPressNavSVG from '@/assets/images/navigation/BenchPressNavSVG';
import PullUpNavSVG from '@/assets/images/navigation/PullUpsNavSVG';
import PushUpNavSVG from '@/assets/images/navigation/PushUpNavSVG';
import SquatNavSVG from '@/assets/images/navigation/SquatNavSVG';


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
        name="BenchPressPage"
        options={{
          tabBarIcon: ({focused}) => 
            <View style={{width: windowWidth / 4, justifyContent: "center", alignItems: "center"}}>
              <BenchPressNavSVG color={focused && AppTheme?.theme === "light" ? Colors.light.infoNavIconFocused : focused && AppTheme?.theme === "dark" ? Colors.dark.infoNavIconFocused : AppTheme?.theme === "light" ? Colors.light.navIcon : Colors.dark.navIcon} size={windowAverage*14} />
              <Text style={[{fontSize: windowAverage * 5, fontWeight: "600"}, {color: focused && AppTheme?.theme === "light" ? Colors.light.infoNavIconFocused : focused && AppTheme?.theme === "dark" ? Colors.dark.infoNavIconFocused : AppTheme?.theme === "light" ? Colors.light.navIcon : Colors.dark.navIcon}]}>
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
              <PullUpNavSVG color={focused && AppTheme?.theme === "light" ? Colors.light.infoNavIconFocused : focused && AppTheme?.theme === "dark" ? Colors.dark.infoNavIconFocused : AppTheme?.theme === "light" ? Colors.light.navIcon : Colors.dark.navIcon} size={windowAverage*14} />
              <Text style={[{fontSize: windowAverage * 5, fontWeight: "600"}, {color: focused && AppTheme?.theme === "light" ? Colors.light.infoNavIconFocused : focused && AppTheme?.theme === "dark" ? Colors.dark.infoNavIconFocused : AppTheme?.theme === "light" ? Colors.light.navIcon : Colors.dark.navIcon}]}>
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
              <PushUpNavSVG color={focused && AppTheme?.theme === "light" ? Colors.light.infoNavIconFocused : focused && AppTheme?.theme === "dark" ? Colors.dark.infoNavIconFocused : AppTheme?.theme === "light" ? Colors.light.navIcon : Colors.dark.navIcon} size={windowAverage*14} />
              <Text style={[{fontSize: windowAverage * 5, fontWeight: "600"}, {color: focused && AppTheme?.theme === "light" ? Colors.light.infoNavIconFocused : focused && AppTheme?.theme === "dark" ? Colors.dark.infoNavIconFocused : AppTheme?.theme === "light" ? Colors.light.navIcon : Colors.dark.navIcon}]}>
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
              <SquatNavSVG color={focused && AppTheme?.theme === "light" ? Colors.light.infoNavIconFocused : focused && AppTheme?.theme === "dark" ? Colors.dark.infoNavIconFocused : AppTheme?.theme === "light" ? Colors.light.navIcon : Colors.dark.navIcon} size={windowAverage*14} />
              <Text style={[{fontSize: windowAverage * 5, fontWeight: "600"}, {color: focused && AppTheme?.theme === "light" ? Colors.light.infoNavIconFocused : focused && AppTheme?.theme === "dark" ? Colors.dark.infoNavIconFocused : AppTheme?.theme === "light" ? Colors.light.navIcon : Colors.dark.navIcon}]}>
                Squat
              </Text>
            </View>,       
        }}
      />
    </Tabs>
  );
}