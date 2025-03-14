import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { useRouter, SplashScreen } from 'expo-router';

import { windowAverage, windowWidth } from '@/constants/Dimensions';
import { useAppTheme } from '@/components/ThemeAppProvider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { defineID } from '@/components/MainPartExercises';
import { addReadyMadeTrain } from '@/store/readyMadeTrainsSlice';
import { Colors } from '@/constants/Colors';

import type { Exercise, Exercises } from '@/store/exercisesSlice';

import HeaderBack from '@/components/HeaderBack';



SplashScreen.preventAutoHideAsync();

export default function CreateMockup() {

    const router = useRouter();
    const dispatch = useAppDispatch()

    const AppTheme = useAppTheme()
    const { light, dark } = Colors

    const exercises = useAppSelector((state) => state.exercises)
    const readyMadeTrains = useAppSelector((state) => state.readyMadeTrains)

    const [sortedArr, setSortedArr] = useState<Exercises>(exercises)
    const [trainExercises, setTrainExercises] = useState<number[]>([])

    useEffect(() => {
      setSortedArr(exercises)
    }, [exercises])
    
    function getExercisesObject() {
      let Exercises: {[key: number]: string[]} = {}
      
      for (let i = 0; i < trainExercises.length; i++) {
        Exercises[trainExercises[i]] = []
      }

      return Exercises
    }

    function createMockup() {
      if (trainExercises.length > 0) {

        const Exercises = getExercisesObject()

        setTrainExercises([])

        dispatch(addReadyMadeTrain({
          ID: defineID(readyMadeTrains),
          Date: "17.01.2006",
          Exercises         
        }))
        router.push("/(tabs)/TrainsPage")
      }  
    } 

    function handleCheckbox(id: number) {
      if (trainExercises.indexOf(id) >= 0) {
        const newArr = trainExercises.filter(item => item !== id)
        setTrainExercises(newArr)
      }

      if (trainExercises.indexOf(id) < 0) {
        setTrainExercises([...trainExercises, id]) 
      }
    }

  return (
    <>
    <HeaderBack bgColor={AppTheme?.theme === "light" ? light.itemBackground : dark.itemBackground} textColor={AppTheme?.theme === "light" ? light.text : dark.text} iconColor={AppTheme?.theme === "light" ? light.navIcon : dark.navIcon} routerPath="(tabs)/TrainsPage">
      Choose exercises
    </HeaderBack> 
    <View style={[styles.container, {backgroundColor: AppTheme?.theme === "light" ? light.background : dark.background}]}>
      <ScrollView>
        <View style={styles.wrapper}>
          {sortedArr.map((item: Exercise, index: number) => (
            <View key={item.ID} onTouchEnd={() => handleCheckbox(item.ID)}>
              <View style={[styles.item, {backgroundColor: trainExercises.indexOf(item.ID) >= 0 ? "#16A34A" : AppTheme?.theme === "light" ? light.itemBackground : dark.itemBackground, paddingVertical: windowAverage * 12, justifyContent: "center"}]}>
                <Text style={{color: trainExercises.indexOf(item.ID) >= 0 ? "#fff" : AppTheme?.theme === "light" ? light.text : dark.text, paddingHorizontal: windowAverage * 6, fontSize: windowAverage * 8, fontFamily: "YS-text"}}>
                  {item.ExerciseName}
                </Text>
              </View>        
            </View>
          ))}
        </View>
      </ScrollView>
      {trainExercises.length > 0 &&
        <TouchableOpacity onPress={createMockup}>
        <View style={{backgroundColor: "#16A34A", paddingVertical: windowAverage * 8, paddingHorizontal: windowAverage * 26, alignItems: "center", justifyContent: "center", borderRadius: windowAverage * 6, position: "absolute", bottom: windowAverage * 25, alignSelf: "center", boxShadow: "0px 3px 10px 2px rgba(34, 60, 80, 0.2) inset"}}>
          <Text style={{color: "#fff", fontSize: windowAverage * 9, fontFamily: "YS-text"}}>
            Create mockup
          </Text>
        </View>
      </TouchableOpacity>
      }
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    paddingTop: windowAverage * 5,
    paddingBottom: windowAverage * 35,
  },
  wrapper: {
    flexDirection: "row",
    gap: windowAverage * 4,
    justifyContent: "flex-start",
    flexWrap: "wrap",
    paddingLeft: windowAverage * 4,
    paddingBottom: windowAverage * 2
  },
  item: {
    width: (windowWidth / 2 - windowAverage * 6.3),
    borderRadius: windowAverage * 5,  
    flexShrink: 0,
    gap: windowAverage * 4
  }
});