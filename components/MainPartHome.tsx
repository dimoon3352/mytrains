import { StyleSheet, Image, Platform, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { windowAverage, windowHeight, windowWidth } from '@/constants/Dimensions';

import SettingsSVG from '@/assets/images/header/SettingsSVG';
import { useAppSelector } from '@/store/hooks';
import { Trains } from '@/store/trainsSlice';
import { Exercises } from '@/store/exercisesSlice';
import { defineExerciseTitle } from './MainPartTrains';
import { useEffect, useMemo } from 'react';
import { useAppTheme } from './ThemeAppProvider';


interface MainPartHomeProps {
  bgColor: string;
  textColor: string;
  specialText: string;
}

export default function MainPartHome({ bgColor, textColor, specialText }: MainPartHomeProps) {

  const AppTheme = useAppTheme()

  const trains = useAppSelector(state => state.trains)
  const exercises = useAppSelector(state => state.exercises)

  function getFavouriteExercise(trains: Trains, exercises: Exercises): string {
    console.log("расчет")
    let favouriteID: {[key: number]: number} = {}
    if (trains.length > 0 && exercises.length > 0) {
      for (let i = 0; i < trains.length; i++) {
        for (let j in trains[i].Exercises) {
          if (Object.keys(favouriteID).includes(j)) {
            favouriteID[j]++
          } else {
            favouriteID[j] = 1
          }
        }
      }

      let favourites: number[] = []
      let favourite: number = 0
      for (let i in favouriteID) {
        if (favouriteID[i] > favourite) {
          favourite = favouriteID[i]
        }
      }

      for (let i in favouriteID) {
        if (favouriteID[i] === favourite) {
          favourites.push(Number(i))
        }
      }

      if (favourites.length > 3) {
        return "none"
      }

      return defineExerciseTitle(favourites[0], exercises)

    } else {
      return "none"
    }
  }

  const favourite = useMemo(() => {
    return getFavouriteExercise(trains, exercises)
  }, [])

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <View style={{gap: windowAverage * 2}}>
        <View style={{width: windowWidth - windowAverage * 4, alignSelf: "center", justifyContent: "center", alignItems: "center", paddingTop: windowAverage * 8}}>
          <Text style={[styles.text, {color: textColor}]}>
            {AppTheme?.language === "rus" ? "Статистика" : AppTheme?.language === "eng" ? "Your stats" : "Ihre statistik"}
          </Text>
          <View style={{backgroundColor: textColor, height: 2, width: (windowWidth - windowAverage * 16), alignSelf: "center"}}></View>
        </View>
        <View style={{flexDirection:  "row", gap: windowAverage * 5, paddingLeft: windowAverage * 8, paddingTop: windowAverage * 2}}>
          <Text style={[styles.text, {color: textColor}]}>
            {AppTheme?.language === "rus" ? "Тренировки" : AppTheme?.language === "eng" ? "Total trains" : "Züge insgesamt"}:
          </Text>
          <Text style={[styles.text, {color: specialText}]}>
            {trains.length}
          </Text>
        </View>
        <View style={{flexDirection:  "row", gap: windowAverage * 5, paddingLeft: windowAverage * 8}}>
          <Text style={[styles.text, {color: textColor}]}>
            {AppTheme?.language === "rus" ? "Упражнения" : AppTheme?.language === "eng" ? "Total exercises" : "Ubungen insgesamt"}:
          </Text>
          <Text style={[styles.text, {color: specialText}]}>
            {exercises.length}
          </Text>
        </View>
        <View style={{flexDirection:  "row", gap: windowAverage * 5, paddingLeft: windowAverage * 8, alignItems: "center"}}>
          <Text style={[styles.text, {color: textColor}]}>
            {AppTheme?.language === "rus" ? "Любимое упр" : AppTheme?.language === "eng" ? "Favourite ex" : "Lieblingsübung"}:
          </Text>
          <View style={{flexDirection: "row", width: windowWidth / 2}}>
            <Text style={{color: specialText, fontSize: windowAverage * 11}}>
              {favourite}
            </Text>
          </View>
        </View>
        <View style={{backgroundColor: textColor, height: 2, width: (windowWidth - windowAverage * 16), alignSelf: "center", marginTop: windowAverage * 2}}></View>
      </View>

      <View style={{width: windowWidth - windowAverage * 4, alignSelf: "center", justifyContent: "center", alignItems: "center", paddingTop: windowAverage * 8}}>
        <Text style={[styles.text, {color: textColor}]}>
          FAQ
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: (windowHeight - windowAverage * 60),
  },
  text: {
    fontSize: windowAverage * 14,
    fontFamily: "YS-text"
  },
});