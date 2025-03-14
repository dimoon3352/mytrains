import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

import { useAppTheme } from '@/components/ThemeAppProvider';
import { Colors } from '@/constants/Colors';

import HeaderBack from '@/components/HeaderBack';
import MainPartSettings from '@/components/MainPartSettings';


export default function Settings() {

    const router = useRouter();

    const AppTheme = useAppTheme()

    const {light, dark} = Colors
  
    const onGestureEvent = (event: any) => {
      const { translationX, translationY } = event.nativeEvent;
  
      if (Math.abs(translationX) > Math.abs(translationY)) {
        if (translationX > 40) {
          router.push('/(tabs)');
        }
      }
    };

  return (
    
      <ScrollView showsVerticalScrollIndicator={false}>
        <GestureHandlerRootView>
          <PanGestureHandler onGestureEvent={onGestureEvent}>
            <View>
              <HeaderBack 
                bgColor={AppTheme?.theme === "light" ? light.itemBackground : dark.itemBackground} 
                textColor={AppTheme?.theme === "light" ? light.text : dark.text} 
                iconColor={AppTheme?.theme === "light" ? light.navIcon : dark.navIcon} 
                routerPath="(tabs)"
              >
                {AppTheme?.language === "rus" ? "Настройки" : AppTheme?.language === "eng" ? "Settings" : "Einstellungen"}
              </HeaderBack>
              <MainPartSettings 
                bgColor={AppTheme?.theme === "light" ? light.background : dark.background} 
                textColor={AppTheme?.theme === "light" ? light.text : dark.text} 
                titleColor={AppTheme?.theme === "light" ? light.settingsTitleColor : dark.settingsTitleColor} 
                bgItemColor={AppTheme?.theme === "light" ? light.settingsItemBackground : dark.settingsItemBackground} 
                checkbox={AppTheme?.theme === "light" ? light.checkboxBackground : dark.checkboxBackground} 
                checkboxBorder={AppTheme?.theme === "light" ? light.checkboxBorder : dark.checkboxBorder}
              />  
            </View>
          </PanGestureHandler>
        </GestureHandlerRootView>
      </ScrollView>
    
  );
}