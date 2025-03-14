import { useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import { windowAverage, windowHeight, windowWidth } from '@/constants/Dimensions';
import { useAppTheme } from './ThemeAppProvider';
import { useAppSelector } from '@/store/hooks';
import { defineExerciseTitle } from './MainPartTrains';

import type { Trains } from '@/store/trainsSlice';
import type { Exercises } from '@/store/exercisesSlice';


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
          <View style={{flexDirection: "row", maxWidth: windowWidth / 2.1}}>
            <Text style={{color: specialText, fontSize: windowAverage * 12, fontFamily: "YS-text"}}>
              {favourite}
            </Text>
          </View>
        </View>
        <View style={{backgroundColor: textColor, height: 2, width: (windowWidth - windowAverage * 16), alignSelf: "center", marginTop: windowAverage * 2}}></View>
      </View>

      <View style={{paddingTop: windowAverage * 8, width: windowWidth, alignItems: "center"}}>
        <Text style={[styles.text, {color: textColor}]}>
          {AppTheme?.language === "rus" ? "Описание" : AppTheme?.language === "eng" ? "About" : "Über"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: (windowHeight - windowAverage * 60),
    flexDirection: "column"
  },
  text: {
    fontSize: windowAverage * 14,
    fontFamily: "YS-text"
  },
});