import { useTheme } from '@react-navigation/native';
import { Tabs } from 'expo-router';


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
        tabBarStyle: {
          display: "none"      
        }
      }}>
      <Tabs.Screen
        name="[id]"
      />
    </Tabs>
  );
}
