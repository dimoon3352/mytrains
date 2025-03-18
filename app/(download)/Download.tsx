import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { windowAverage, windowHeight, windowWidth } from '@/constants/Dimensions';
import { useAppTheme } from '@/components/ThemeAppProvider';
import { Colors } from '@/constants/Colors';

import HeaderBack from '@/components/HeaderBack';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Upload() {

    const AppTheme = useAppTheme()
    const { light, dark } = Colors

    const [isMockupsCopied, setIsMockupsCopied] = useState<boolean>(false)
    const [isTrainsCopied, setIsTrainsCopied] = useState<boolean>(false)
    const [isExercisesCopied, setIsExercisesCopied] = useState<boolean>(false)

    const getAsync = async (key: string) => {
      try {
        const stored = await AsyncStorage.getItem(key);
        if (stored) {
          return stored
        }
      } catch (error) {
        console.log(error);
      }
    };

    async function getTrains(): Promise<string> {
      const trainsJSON = await getAsync("trains")
      if (trainsJSON) {
        return trainsJSON
      }
      return ''
    }

    async function getExercises(): Promise<string> {
      const exercisesJSON = await getAsync("exercises")
      if (exercisesJSON) {
        return exercisesJSON
      }
      return ''
    }

    async function getMockups(): Promise<string> {
      const mockupsJSON = await getAsync("mockups")
      if (mockupsJSON) {
        return mockupsJSON
      }
      return ''
    }

    async function copyTrains() {
      const textToCopy = await getTrains()
      if (textToCopy) {
        await Clipboard.setStringAsync(textToCopy);

        setIsTrainsCopied(true)

        setTimeout(() => {
          setIsTrainsCopied(false)
        }, 2000)
      } 
    };

    async function copyExercises() {
      const textToCopy = await getExercises()
      if (textToCopy) {
        await Clipboard.setStringAsync(textToCopy);

        setIsExercisesCopied(true)

        setTimeout(() => {
          setIsExercisesCopied(false)
        }, 2000)
      } 
    };

    async function copyMockups() {
      const textToCopy = await getMockups()
      if (textToCopy) {
        await Clipboard.setStringAsync(textToCopy);

        setIsMockupsCopied(true)

        setTimeout(() => {
          setIsMockupsCopied(false)
        }, 2000)
      } 
    };

  return (
    <>  
    <HeaderBack bgColor={AppTheme?.theme === "light" ? light.itemBackground : dark.itemBackground} textColor={AppTheme?.theme === "light" ? light.text : dark.text} iconColor={AppTheme?.theme === "light" ? light.navIcon : dark.navIcon} routerPath="(tabs)/ActionsPage">
      {AppTheme?.language === "rus" ? "Выгрузить" : AppTheme?.language === "eng" ? "Download" : "Herunterladen"}
    </HeaderBack>
    <View style={[styles.container, {backgroundColor: AppTheme?.theme === "light" ? light.background : dark.background}]}>
      <View style={styles.wrapper}>
        <TouchableOpacity style={{flexDirection: "row", width: windowWidth / 2}} onPress={copyTrains}>
          <View style={styles.button}>
            <Text style={{color: "#fff", fontFamily: "YS-text", fontSize: windowAverage * 12}}>
              {AppTheme?.language === "rus" ? "Тренировки" : AppTheme?.language === "eng" ? "Get trains" : "Uebungen"}
            </Text>
          </View>  
          {isTrainsCopied && <View style={{width: windowWidth / 2, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "#16A34A", fontFamily: "YS-text", fontSize: windowAverage * 10}}>
              {AppTheme?.language === "rus" ? "Скопировано" : AppTheme?.language === "eng" ? "Copied" : "Kopiert"}! 
            </Text>  
          </View>}
        </TouchableOpacity> 
        <TouchableOpacity style={{flexDirection: "row", width: windowWidth / 2}} onPress={copyExercises}>
          <View style={styles.button}>
            <Text style={{color: "#fff", fontFamily: "YS-text", fontSize: windowAverage * 12}}>
              {AppTheme?.language === "rus" ? "Упражнения" : AppTheme?.language === "eng" ? "Get exercises" : "Übungen"}
            </Text>
          </View>  
          {isExercisesCopied && <View style={{width: windowWidth / 2, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "#16A34A", fontFamily: "YS-text", fontSize: windowAverage * 10}}>
              {AppTheme?.language === "rus" ? "Скопировано" : AppTheme?.language === "eng" ? "Copied" : "Kopiert"}!
            </Text>  
          </View>}
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: "row", width: windowWidth / 2}} onPress={copyMockups}>
          <View style={styles.button}>
            <Text style={{color: "#fff", fontFamily: "YS-text", fontSize: windowAverage * 12}}>
             {AppTheme?.language === "rus" ? "Заготовки" : AppTheme?.language === "eng" ? "Get mockups" : "Modell"}
            </Text>
          </View>  
          {isMockupsCopied && <View style={{width: windowWidth / 2, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "#16A34A", fontFamily: "YS-text", fontSize: windowAverage * 10}}>
             {AppTheme?.language === "rus" ? "Скопировано" : AppTheme?.language === "eng" ? "Copied" : "Kopiert"}!  
            </Text>  
          </View>}
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    paddingTop: windowAverage * 5,
    paddingBottom: windowAverage * 35,
    minHeight: windowHeight
  },
  wrapper: {
    width: windowWidth,
    flexDirection: "column",
    gap: windowAverage * 5,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingHorizontal: windowAverage * 6,  
  },
  button: {
    backgroundColor: "#16A34A", 
    height: windowAverage * 28,
    width: windowAverage * 88, 
    borderRadius: windowAverage * 2,
    justifyContent: "center",
    alignItems: "center"
  },
});