import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

import { useAppTheme } from '@/components/ThemeAppProvider';
import { Colors } from '@/constants/Colors';

import Header from '@/components/Header';
import MainPartHome from '@/components/MainPartHome';


export default function HomeScreen() {

  const AppTheme = useAppTheme()
  const {light, dark} = Colors

  const router = useRouter();

  const onGestureEvent = (event: any) => {
    const { translationX, translationY } = event.nativeEvent;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX < -40) {
        router.push('/(tabs)/TrainsPage');
      }
    }
  };

  return (  
    <ScrollView style={{backgroundColor: AppTheme?.theme === "light" ? "#ffffff" : "#070707" }}>
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onGestureEvent}>                     
          <View>          
            <Header bgColor={AppTheme?.theme === "light" ? light.itemBackground : dark.itemBackground} textColor={AppTheme?.theme === "light" ? light.text : dark.text} iconColor={light.navIcon}>
              {AppTheme?.language === "rus" ? "Главная" : AppTheme?.language === "eng" ? "Home" : "Startseite"}
            </Header>
            <MainPartHome bgColor={AppTheme?.theme === "light" ? light.background : dark.background} textColor={AppTheme?.theme === "light" ? light.text : dark.text} specialText={light.navIconFocused}/>          
          </View>             
        </PanGestureHandler>
      </GestureHandlerRootView>
    </ScrollView> 
  );
}