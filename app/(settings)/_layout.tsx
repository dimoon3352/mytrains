import { Tabs } from 'expo-router';


export default function TabLayout() {

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
        name="Settings"
      />
    </Tabs>
  );
}
