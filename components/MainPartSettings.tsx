import { StyleSheet, View, Text, Linking, TouchableOpacity } from 'react-native';

import { windowAverage, windowHeight, windowWidth } from '@/constants/Dimensions';
import { useAppTheme } from './ThemeAppProvider';


interface MainPartSettingsProps {
  bgColor: string,
  textColor: string,
  titleColor: string,
  bgItemColor: string,
  checkbox: string,
  checkboxBorder: string
}

export default function MainPartSettings({bgColor, textColor, titleColor, bgItemColor, checkbox, checkboxBorder}: MainPartSettingsProps) {

  const AppTheme = useAppTheme()

  function setDarkTheme() {
    AppTheme?.changeTheme("dark")
  }

  function setLightTheme() {
    AppTheme?.changeTheme("light")
  }

  function setRusLanguage() {
    AppTheme?.changeLanguage("rus")
  }

  function setEngLanguage() {
    AppTheme?.changeLanguage("eng")
  }

  function setGerLanguage() {
    AppTheme?.changeLanguage("ger")
  }

  const handleTelegramPress = () => {
    Linking.openURL('tg://resolve?domain=dimoon3352');
  };

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>

      <View style={{gap: windowAverage * 4, marginTop: windowAverage * 6}}>
        <Text style={{color: titleColor, fontSize: windowAverage * 9, paddingLeft: windowAverage * 7, fontFamily: "YS-text"}}>
          {AppTheme?.language === "rus" ? "Тема приложения" : AppTheme?.language === "eng" ? "App theme" : "App thema"}:
        </Text>

        <View style={{}}>
        <TouchableOpacity activeOpacity={0.9}>
          <View style={{backgroundColor: bgItemColor, paddingVertical: windowAverage * 9, flexDirection: "row", justifyContent: "space-between"}} onTouchEnd={setLightTheme}>
            <Text style={{color: textColor, fontSize: windowAverage * 8, paddingLeft: windowAverage * 7, fontFamily: "YS-text"}}>
              {AppTheme?.language === "rus" ? "Светлая" : AppTheme?.language === "eng" ? "Light" : "Helles"}
            </Text>
            <View style={{backgroundColor: checkbox, borderColor: checkboxBorder, borderWidth: 1, borderRadius: "50%", width: windowAverage * 12, height: windowAverage * 12, marginRight: windowAverage * 12, justifyContent: "center", alignItems: "center"}}>
              {AppTheme?.theme === "light" &&<View style={{backgroundColor: "#16A34A", borderRadius: "50%", width: windowAverage * 7, height: windowAverage * 7}}></View>}
            </View>
          </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9}>
            <View style={{backgroundColor: bgItemColor, paddingVertical: windowAverage * 9, flexDirection: "row", justifyContent: "space-between"}} onTouchEnd={setDarkTheme}>
              <Text style={{color: textColor, fontSize: windowAverage * 8, paddingLeft: windowAverage * 7, fontFamily: "YS-text"}}>
                {AppTheme?.language === "rus" ? "Тёмная" : AppTheme?.language === "eng" ? "Dark" : "Dunkles"}
              </Text>
              <View style={{backgroundColor: checkbox, borderColor: checkboxBorder, borderWidth: 1, borderRadius: "50%", width: windowAverage * 12, height: windowAverage * 12, marginRight: windowAverage * 12, justifyContent: "center", alignItems: "center"}}>
                {AppTheme?.theme === "dark" && <View style={{backgroundColor: "#16A34A", borderRadius: "50%", width: windowAverage * 7, height: windowAverage * 7}}></View>}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{gap: windowAverage * 4, marginTop: windowAverage * 5}}>
        <Text style={{color: titleColor, fontSize: windowAverage * 9, paddingLeft: windowAverage * 7, fontFamily: "YS-text"}}>
          {AppTheme?.language === "rus" ? "Язык" : AppTheme?.language === "eng" ? "Language" : "Sprachlich"}:
        </Text>

        <View>
          <TouchableOpacity activeOpacity={0.9}>
            <View style={{backgroundColor: bgItemColor, paddingVertical: windowAverage * 9, flexDirection: "row", justifyContent: "space-between"}} onTouchEnd={setRusLanguage}>
              <Text style={{color: textColor, fontSize: windowAverage * 8, paddingLeft: windowAverage * 7, fontFamily: "YS-text"}}>
                Русский
              </Text>
              <View style={{backgroundColor: checkbox, borderColor: checkboxBorder, borderWidth: 1, borderRadius: "50%", width: windowAverage * 12, height: windowAverage * 12, marginRight: windowAverage * 12, justifyContent: "center", alignItems: "center"}}>
                {AppTheme?.language === "rus" &&<View style={{backgroundColor: "#16A34A", borderRadius: "50%", width: windowAverage * 7, height: windowAverage * 7}}></View>}
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9}>
            <View style={{backgroundColor: bgItemColor, paddingVertical: windowAverage * 9, flexDirection: "row", justifyContent: "space-between"}} onTouchEnd={setEngLanguage}>
              <Text style={{color: textColor, fontSize: windowAverage * 8, paddingLeft: windowAverage * 7, fontFamily: "YS-text"}}>
                English
              </Text>
              <View style={{backgroundColor: checkbox, borderColor: checkboxBorder, borderWidth: 1, borderRadius: "50%", width: windowAverage * 12, height: windowAverage * 12, marginRight: windowAverage * 12, justifyContent: "center", alignItems: "center"}}>
                {AppTheme?.language === "eng" && <View style={{backgroundColor: "#16A34A", borderRadius: "50%", width: windowAverage * 7, height: windowAverage * 7}}></View>}
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9}>
            <View style={{backgroundColor: bgItemColor, paddingVertical: windowAverage * 9, flexDirection: "row", justifyContent: "space-between"}} onTouchEnd={setGerLanguage}>
              <Text style={{color: textColor, fontSize: windowAverage * 8, paddingLeft: windowAverage * 7, fontFamily: "YS-text"}}>
                Deutsch
              </Text>
              <View style={{backgroundColor: checkbox, borderColor: checkboxBorder, borderWidth: 1, borderRadius: "50%", width: windowAverage * 12, height: windowAverage * 12, marginRight: windowAverage * 12, justifyContent: "center", alignItems: "center"}}>
                {AppTheme?.language === "ger" && <View style={{backgroundColor: "#16A34A", borderRadius: "50%", width: windowAverage * 7, height: windowAverage * 7}}></View>}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: windowWidth, alignItems: 'center', paddingLeft: windowAverage * 7, paddingRight: windowAverage * 2, paddingTop: windowAverage * 2}}>
        <Text style={{color: textColor, fontSize: windowAverage * 5, fontFamily: "YS-text"}}>
          {AppTheme?.language === "rus" ? "Версия" : AppTheme?.language === "eng" ? "Version" : "Version"}: 1.0-alpha
        </Text>
        <TouchableOpacity onPress={handleTelegramPress}>
          <Text style={{color: textColor,fontSize: windowAverage * 5, fontFamily: "YS-text"}}>
            {AppTheme?.language === "rus" ? "Разработчик" : AppTheme?.language === "eng" ? "Developer" : "Entwickler"}: @dimoon3352
          </Text>
        </TouchableOpacity> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: windowAverage * 4,
    width: windowWidth,
    paddingTop: windowAverage * 3,
    paddingBottom: windowAverage * 35,
    justifyContent: "flex-start",
    minHeight: (windowHeight - windowAverage * 32)
  }
});
