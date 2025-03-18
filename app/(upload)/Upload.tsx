import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';

import { windowAverage, windowHeight, windowWidth } from '@/constants/Dimensions';
import { useAppTheme } from '@/components/ThemeAppProvider';
import { Colors } from '@/constants/Colors';
import { useAppDispatch } from '@/store/hooks';
import { setTrains } from '@/store/trainsSlice';
import { setExercises } from '@/store/exercisesSlice';
import { setReadyMadeTrains } from '@/store/readyMadeTrainsSlice';

import HeaderBack from '@/components/HeaderBack';


export default function Upload() {

    const dispatch = useAppDispatch()

    const AppTheme = useAppTheme()
    const { light, dark } = Colors

    const [mockupsText, setMockupsText] = useState<string>()
    const [trainsText, setTrainsText] = useState<string>()
    const [exercisesText, setExercisesText] = useState<string>()

    const storeAsync = async (key: string, value: any) => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log(error);
      }
    };

    function storeTrains(): void {
      if (trainsText && trainsText.length > 0) {
        if (typeof JSON.parse(trainsText) === "object") {
          storeAsync("trains", trainsText)
          dispatch(setTrains(JSON.parse(trainsText)))
          setTrainsText('')
        }
      }
    }

    function storeExercises(): void {
      if (exercisesText && exercisesText.length > 0) {
        if (typeof JSON.parse(exercisesText) === "object") {
          storeAsync("exercises", JSON.parse(exercisesText))
          dispatch(setExercises(JSON.parse(exercisesText)))
          setExercisesText('')
        }
      }
    }

    function storeMockups(): void {
      if (mockupsText && mockupsText.length > 0) {
        if (typeof JSON.parse(mockupsText) === "object") {
          storeAsync("mockups", JSON.parse(mockupsText))
          dispatch(setReadyMadeTrains(JSON.parse(mockupsText)))
          setMockupsText('')
        }
      }
    }

    function trainsOnChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
      setTrainsText(event.nativeEvent.text)
    }

    function exercisesOnChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
      setExercisesText(event.nativeEvent.text)
    }

    function mockupsOnChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
      setMockupsText(event.nativeEvent.text)
    }

  return (
    <>  
    <HeaderBack bgColor={AppTheme?.theme === "light" ? light.itemBackground : dark.itemBackground} textColor={AppTheme?.theme === "light" ? light.text : dark.text} iconColor={AppTheme?.theme === "light" ? light.navIcon : dark.navIcon} routerPath="(tabs)/ActionsPage">
      {AppTheme?.language === "rus" ? "Загрузить" : AppTheme?.language === "eng" ? "Upload" : "Laden"}
    </HeaderBack>
    <GestureHandlerRootView>
      <View style={[styles.container, {backgroundColor: AppTheme?.theme === "light" ? light.background : dark.background}]}>
        <View style={styles.wrapper}>
          <View style={{flexDirection: "row-reverse"}}>
            <TouchableOpacity style={{flexDirection: "row", width: windowWidth / 2}} onPress={storeTrains}>
              <View style={styles.button}>
                <Text style={{color: "#fff", fontFamily: "YS-text", fontSize: windowAverage * 9}}>
                  {AppTheme?.language === "rus" ? "Загрузить" : AppTheme?.language === "eng" ? "Upload" : "Laden"}
                </Text>
              </View> 
            </TouchableOpacity> 
            <View style={{width: windowWidth / 2, justifyContent: "center", alignItems: "center"}}>
              <TextInput value={trainsText} onChange={trainsOnChange} placeholder={AppTheme?.language === "rus" ? "Вставьте тренировки" : AppTheme?.language === "eng" ? "Enter trains" : "Züge eingeben"} placeholderTextColor="#838383" cursorColor="#008ef4" style={{width: windowWidth / 100 * 45, height: windowAverage * 28, backgroundColor: AppTheme?.theme === "light" ? light.controlsBackground : dark.controlsBackground, color: AppTheme?.theme === "light" ? light.text : dark.text, paddingLeft: windowAverage * 4, borderRadius: windowAverage * 2}}/> 
            </View>
          </View> 

          <View style={{flexDirection: "row-reverse"}}>
            <TouchableOpacity style={{flexDirection: "row", width: windowWidth / 2}} onPress={storeExercises}>
              <View style={styles.button}>
                <Text style={{color: "#fff", fontFamily: "YS-text", fontSize: windowAverage * 9}}>
                  {AppTheme?.language === "rus" ? "Загрузить" : AppTheme?.language === "eng" ? "Upload" : "Laden"}
                </Text>
              </View> 
            </TouchableOpacity> 
            <View style={{width: windowWidth / 2, justifyContent: "center", alignItems: "center"}}>
              <TextInput value={exercisesText} onChange={exercisesOnChange} placeholder={AppTheme?.language === "rus" ? "Вставьте упражнения" : AppTheme?.language === "eng" ? "Enter exercises" : "Übungen eingeben"} placeholderTextColor="#838383" cursorColor="#008ef4" style={{width: windowWidth / 100 * 45, height: windowAverage * 28, backgroundColor: AppTheme?.theme === "light" ? light.controlsBackground : dark.controlsBackground, color: AppTheme?.theme === "light" ? light.text : dark.text, paddingLeft: windowAverage * 4, borderRadius: windowAverage * 2}}/> 
            </View>
          </View>

          <View style={{flexDirection: "row-reverse"}}>
            <TouchableOpacity style={{flexDirection: "row", width: windowWidth / 2}} onPress={storeMockups}>
              <View style={styles.button}>
                <Text style={{color: "#fff", fontFamily: "YS-text", fontSize: windowAverage * 9}}>
                  {AppTheme?.language === "rus" ? "Загрузить" : AppTheme?.language === "eng" ? "Upload" : "Laden"}
                </Text>
              </View> 
            </TouchableOpacity> 
            <View style={{width: windowWidth / 2, justifyContent: "center", alignItems: "center"}}>
              <TextInput value={mockupsText} onChange={mockupsOnChange} placeholder={AppTheme?.language === "rus" ? "Вставьте заготовки" : AppTheme?.language === "eng" ? "Enter mockups" : "Modelle eingeben"} placeholderTextColor="#838383" cursorColor="#008ef4" style={{width: windowWidth / 100 * 45, height: windowAverage * 28, backgroundColor: AppTheme?.theme === "light" ? light.controlsBackground : dark.controlsBackground, color: AppTheme?.theme === "light" ? light.text : dark.text, paddingLeft: windowAverage * 4, borderRadius: windowAverage * 2}}/> 
            </View>
          </View>
          
        </View>
      </View>
    </GestureHandlerRootView>
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