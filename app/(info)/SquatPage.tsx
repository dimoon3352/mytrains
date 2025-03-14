import { View, Text} from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

import { windowAverage, windowHeight } from '@/constants/Dimensions';
import { useAppTheme } from '@/components/ThemeAppProvider';
import { Colors } from '@/constants/Colors';

import HeaderBack from '@/components/HeaderBack';


export default function SquatPage() {

    const AppTheme = useAppTheme()

    const router = useRouter();
  
    const onGestureEvent = (event: any) => {
      const { translationX, translationY } = event.nativeEvent;

      if (Math.abs(translationX) > Math.abs(translationY)) {
        if (translationX > 40) {
          router.push('/(info)/PushUpsPage');
        }
      }
    };

  return (
    <View style={{backgroundColor: AppTheme?.theme === "light" ? Colors.light.background : Colors.dark.background, flex: 1}}>
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <View style={{height: windowHeight, alignItems: "center", gap: windowAverage * 125}}>
            <HeaderBack 
              bgColor={AppTheme?.theme === "light" ? Colors.light.itemBackground : Colors.dark.itemBackground} 
              textColor={AppTheme?.theme === "light" ? Colors.light.text : Colors.dark.text} 
              iconColor={AppTheme?.theme === "light" ? Colors.light.navIcon : Colors.dark.navIcon} 
              routerPath="(tabs)/ActionsPage"
            >
              {AppTheme?.language === "rus" ? "Присед" : AppTheme?.language === "eng" ? "Squat" : "Kniebeuge"}
            </HeaderBack>
            <View style={{justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: AppTheme?.theme === "light" ? Colors.light.text : Colors.dark.text, fontSize: windowAverage * 16, fontFamily: "YS-text"}}>
                {AppTheme?.language === "rus" ? "Скоро" : AppTheme?.language === "eng" ? "Coming" : "Kommt"}
              </Text>
              {AppTheme?.language !== "rus" && <Text style={{color: AppTheme?.theme === "light" ? Colors.light.text : Colors.dark.text, fontSize: windowAverage * 16, fontFamily: "YS-text"}}>
                {AppTheme?.language === "eng" ? "soon" : "bald"}
              </Text>}
            </View>          
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
}
