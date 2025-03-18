import { Tabs } from 'expo-router';


export default function TabLayout() {

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
        name="Upload"
        options={{
          animation: "none"
        }}
      />
    </Tabs>
  );
}
